import { logout } from "./store";

const getBaseUrl = () => import.meta.env.VITE_BASE_URL || "";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * A wrapper around fetch that automatically injects the access token
 * and handles 401 Unauthorized errors by refreshing the token.
 */
export async function apiFetch(endpoint, options = {}) {
  const baseUrl = getBaseUrl();
  let accessToken = localStorage.getItem("aurora_access_token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && accessToken) {
    const refreshToken = localStorage.getItem("aurora_refresh_token");
    if (!refreshToken) {
      logout();
      window.location.href = "/admin";
      throw new Error("Session expired. Please log in again.");
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          headers["Authorization"] = `Bearer ${token}`;
          return fetch(`${baseUrl}${endpoint}`, { ...options, headers });
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    isRefreshing = true;

    try {
      const refreshRes = await fetch(`${baseUrl}/api/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!refreshRes.ok) {
        throw new Error("Token refresh failed");
      }

      const refreshData = await refreshRes.json();
      if (!refreshData.success || !refreshData.data?.accessToken) {
        throw new Error("Token refresh failed");
      }

      accessToken = refreshData.data.accessToken;
      localStorage.setItem("aurora_access_token", accessToken);
      
      if (refreshData.data.refreshToken) {
        localStorage.setItem("aurora_refresh_token", refreshData.data.refreshToken);
      }

      processQueue(null, accessToken);

      // Retry the original request
      headers["Authorization"] = `Bearer ${accessToken}`;
      response = await fetch(`${baseUrl}${endpoint}`, {
        ...options,
        headers,
      });
    } catch (refreshErr) {
      processQueue(refreshErr, null);
      logout();
      window.location.href = "/admin";
      throw new Error("Session expired. Please log in again.");
    } finally {
      isRefreshing = false;
    }
  }

  return response;
}
