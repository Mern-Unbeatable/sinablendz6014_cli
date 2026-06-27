import { PROPERTY_LIST } from "@/data/propertyList";

const KEYS = {
  inquiries: "aurora_inquiries",
  properties: "aurora_properties",
  auth: "aurora_admin_auth",
  authUser: "aurora_admin_user",
};

/** Demo credentials — replace with real auth when a backend is connected. */
export const ADMIN_CREDENTIALS = {
  email: "admin@aurorasuites.com.au",
  password: "aurora2024",
};

// --- Initialization & Seeding ---
function initializeStore() {
  // Initialize Properties
  if (!localStorage.getItem(KEYS.properties)) {
    // Seed with PROPERTY_LIST, defaulting to 'published' status
    const seededProperties = PROPERTY_LIST.map((p) => ({
      ...p,
      status: "published",
      id: p.slug, // Use slug as ID initially
    }));
    localStorage.setItem(KEYS.properties, JSON.stringify(seededProperties));
  }

  // Initialize Inquiries with dummy data if empty
  if (!localStorage.getItem(KEYS.inquiries)) {
    const dummyInquiries = [
      {
        id: crypto.randomUUID(),
        type: "homeowner",
        status: "new",
        name: "Sarah Jenkins",
        email: "sarah.j@example.com",
        phone: "0412 345 678",
        propertyTitle: "Luxury Penthouse in Southbank",
        address: "Southbank, VIC",
        message:
          "I have a 3-bedroom penthouse in Southbank that I'm looking to list for short-term rental. I love your portfolio and would like to discuss management fees.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      },
      {
        id: crypto.randomUUID(),
        type: "booking",
        status: "contacted",
        name: "Michael Chen",
        email: "m.chen88@example.com",
        phone: "0423 456 789",
        checkIn: "2026-11-15",
        checkOut: "2026-11-20",
        guests: 4,
        message:
          "Looking for a 2-bedroom place near the CBD for a business trip. Is the Designer Kitchen Loft available these dates?",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      },
      {
        id: crypto.randomUUID(),
        type: "contact",
        status: "closed",
        name: "Emma Wilson",
        email: "emma.w@example.com",
        message: "Just wanted to say we had an amazing stay at the Skyline Studio! Thank you.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
      },
    ];
    localStorage.setItem(KEYS.inquiries, JSON.stringify(dummyInquiries));
  }
}

// Run initialization immediately
initializeStore();

// --- Auth ---
export function login(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  if (
    normalizedEmail === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password
  ) {
    sessionStorage.setItem(KEYS.auth, "true");
    sessionStorage.setItem(KEYS.authUser, normalizedEmail);
    return { ok: true };
  }
  return { ok: false, error: "Invalid email or password." };
}

export function getAuthUser() {
  return sessionStorage.getItem(KEYS.authUser) || ADMIN_CREDENTIALS.email;
}

export function isAuthenticated() {
  return sessionStorage.getItem(KEYS.auth) === "true";
}

export function logout() {
  sessionStorage.removeItem(KEYS.auth);
  sessionStorage.removeItem(KEYS.authUser);
}

// --- Inquiries ---
export const INQUIRY_TYPES = {
  homeowner: "Homeowner",
  guest: "Guest",
  contact: "General contact",
  booking: "Stay inquiry",
};

export const INQUIRY_STATUSES = {
  new: "New",
  contacted: "Contacted",
  closed: "Closed",
};

export function getInquiries() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.inquiries) || "[]");
  } catch {
    return [];
  }
}

export function addInquiry(inquiry) {
  const entry = {
    id: crypto.randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
    ...inquiry,
  };
  localStorage.setItem(KEYS.inquiries, JSON.stringify([entry, ...getInquiries()]));
  window.dispatchEvent(new Event("aurora-store-update"));
  return entry;
}

export function updateInquiry(id, updates) {
  const next = getInquiries().map((item) =>
    item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item,
  );
  localStorage.setItem(KEYS.inquiries, JSON.stringify(next));
  window.dispatchEvent(new Event("aurora-store-update"));
}

export function deleteInquiry(id) {
  localStorage.setItem(
    KEYS.inquiries,
    JSON.stringify(getInquiries().filter((item) => item.id !== id)),
  );
  window.dispatchEvent(new Event("aurora-store-update"));
}

// --- Properties ---
export function getProperties() {
  try {
    return JSON.parse(localStorage.getItem(KEYS.properties) || "[]");
  } catch {
    return [];
  }
}

export function getPropertyAdminList() {
  return getProperties();
}

export function getPublishedProperties() {
  return getProperties().filter((p) => p.status === "published");
}

export function addProperty(propertyData) {
  const slug = propertyData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
    
  const newProperty = {
    id: crypto.randomUUID(),
    slug: `${slug}-${Math.random().toString(36).substring(2, 6)}`,
    status: "draft",
    ...propertyData,
  };
  
  localStorage.setItem(KEYS.properties, JSON.stringify([newProperty, ...getProperties()]));
  window.dispatchEvent(new Event("aurora-store-update"));
  return newProperty;
}

export function updateProperty(id, updates) {
  const next = getProperties().map((item) =>
    item.id === id ? { ...item, ...updates } : item,
  );
  localStorage.setItem(KEYS.properties, JSON.stringify(next));
  window.dispatchEvent(new Event("aurora-store-update"));
}

export function deleteProperty(id) {
  localStorage.setItem(
    KEYS.properties,
    JSON.stringify(getProperties().filter((item) => item.id !== id)),
  );
  window.dispatchEvent(new Event("aurora-store-update"));
}

export function setPropertyStatus(id, status) {
  updateProperty(id, { status });
}

export function isPropertyPublished(slug) {
  const prop = getProperties().find(p => p.slug === slug);
  return prop ? prop.status === "published" : false;
}

// --- Dashboard ---
export function getDashboardStats() {
  const inquiries = getInquiries();
  const properties = getProperties();
  return {
    totalInquiries: inquiries.length,
    newInquiries: inquiries.filter((i) => i.status === "new").length,
    totalProperties: properties.length,
    publishedProperties: properties.filter((p) => p.status === "published").length,
    draftProperties: properties.filter((p) => p.status === "draft").length,
  };
}
