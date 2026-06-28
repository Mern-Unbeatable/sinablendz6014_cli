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

  // Initialize Inquiries with dummy data if empty or very few
  let existingInquiries = [];
  try {
    existingInquiries = JSON.parse(localStorage.getItem(KEYS.inquiries) || "[]");
  } catch (e) {}

  if (existingInquiries.length < 10) {
    const dummyInquiries = [
      {
        id: crypto.randomUUID(),
        type: "homeowner",
        status: "new",
        name: "Sarah Jenkins",
        email: "sarah.j@example.com",
        phone: "0412 345 678",
        propertyTitle: "Sub-Penthouse | Pool, Gym & 2 Parking",
        address: "Southbank, VIC",
        message:
          "I have a 3-bedroom penthouse in Southbank that I'm looking to list for short-term rental. I love your portfolio and would like to discuss management fees.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        type: "booking",
        status: "contacted",
        name: "Michael Chen",
        email: "m.chen88@example.com",
        phone: "0423 456 789",
        propertyTitle: "Designer Kitchen Loft",
        checkIn: "2026-11-15",
        checkOut: "2026-11-20",
        guests: 4,
        message:
          "Looking for a 2-bedroom place near the CBD for a business trip. Is the Designer Kitchen Loft available these dates?",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        type: "contact",
        status: "closed",
        name: "Emma Wilson",
        email: "emma.w@example.com",
        propertyTitle: "Skyline Studio Retreat",
        message: "Just wanted to say we had an amazing stay at the Skyline Studio! Thank you.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        type: "booking",
        status: "new",
        name: "Liam O'Connor",
        email: "liam.oc@example.com",
        phone: "0498 765 432",
        propertyTitle: "Central Apt | Tennis, Pool & Gym",
        checkIn: "2026-12-01",
        checkOut: "2026-12-10",
        guests: 2,
        message: "Hi, wondering if you offer a discount for a 10-night stay?",
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        type: "guest",
        status: "contacted",
        name: "Sophia Martinez",
        email: "smartinez99@example.com",
        phone: "0411 222 333",
        propertyTitle: "Sunlit Family Residence",
        message:
          "We're currently staying here and can't figure out how to turn on the heating. Could someone call us?",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        type: "homeowner",
        status: "new",
        name: "David Kim",
        email: "dkim.invest@example.com",
        phone: "0433 444 555",
        propertyTitle: "Gorgeous City Views | 2BR APT",
        message:
          "I am considering buying a unit in this same building. Could you share what the typical occupancy rate is like?",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        type: "booking",
        status: "new",
        name: "Olivia Brown",
        email: "olivia.brown@example.com",
        propertyTitle: "Sub-Penthouse | Pool, Gym & 2 Parking",
        checkIn: "2026-10-10",
        checkOut: "2026-10-12",
        guests: 6,
        message: "Is early check-in available? Our flight lands at 8 AM.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        type: "contact",
        status: "closed",
        name: "James Taylor",
        email: "jtaylor.design@example.com",
        propertyTitle: "Designer Kitchen Loft",
        message:
          "Can you tell me where you got the dining table for this property? I love the aesthetic.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        type: "booking",
        status: "new",
        name: "Isabella Davis",
        email: "bella.d@example.com",
        phone: "0455 666 777",
        propertyTitle: "Sunlit Family Residence",
        checkIn: "2027-01-05",
        checkOut: "2027-01-15",
        guests: 5,
        message:
          "We're planning a family holiday. Does the property have a cot and high chair available?",
        createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        type: "guest",
        status: "contacted",
        name: "William Jones",
        email: "wjones88@example.com",
        propertyTitle: "Central Apt | Tennis, Pool & Gym",
        message:
          "Left my sunglasses on the kitchen counter after check-out today. Is there any way someone could check for them?",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        type: "booking",
        status: "new",
        name: "Mia Garcia",
        email: "mia.g@example.com",
        phone: "0477 888 999",
        propertyTitle: "Skyline Studio Retreat",
        checkIn: "2026-09-20",
        checkOut: "2026-09-22",
        guests: 2,
        message:
          "Celebrating our anniversary. Can we arrange for some flowers to be placed in the room before arrival?",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      },
      {
        id: crypto.randomUUID(),
        type: "homeowner",
        status: "closed",
        name: "Thomas Anderson",
        email: "neo@example.com",
        propertyTitle: "Gorgeous City Views | 2BR APT",
        message: "Just updating my contact details for the monthly statements.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
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
  if (normalizedEmail === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
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
  contact: "General contact",
  booking: "Short Stay",
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
  const next = getProperties().map((item) => (item.id === id ? { ...item, ...updates } : item));
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
  const prop = getProperties().find((p) => p.slug === slug);
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
