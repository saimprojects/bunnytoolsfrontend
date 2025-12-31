// // src/api.js

// // Vite env: .env file mein VITE_API_BASE_URL set kar sakte ho
// // Example: VITE_API_BASE_URL=http://127.0.0.1:8000
// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://127.0.0.1:8000";

// async function request(path, options = {}) {
//   const url = `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

//   const res = await fetch(url, {
//     ...options,
//     headers: {
//       "Accept": "application/json",
//       ...(options.headers || {}),
//     },
//   });

//   // Agar JSON ke bajaye HTML aa rahi ho to yahin pe clear error mil jayega
//   const contentType = res.headers.get("content-type") || "";
//   const isJson = contentType.includes("application/json");

//   if (!res.ok) {
//     // Try best to extract error message
//     let message = `Request failed: ${res.status} ${res.statusText}`;
//     try {
//       const text = await res.text();
//       message = text?.slice(0, 300) || message;
//     } catch (_) {}
//     throw new Error(message);
//   }

//   if (!isJson) {
//     const text = await res.text();
//     throw new Error(
//       `Expected JSON but got: ${contentType}. Response starts with: ${text.slice(0, 60)}`
//     );
//   }

//   return res.json();
// }

// // ✅ API functions
// export async function getProducts() {
//   const data = await request("/api/products/");
//   return Array.isArray(data) ? data : (data.results || []);
// }

// export async function getProductById(id) {
//   return request(`/api/products/${id}/`);
// }

// export async function getCategories() {
//   const data = await request("/api/categories/");
//   return Array.isArray(data) ? data : (data.results || []);
// }

// export async function getWhatsAppNumber() {
//   const data = await request("/api/whatsapp/");
//   return data.whatsapp_number;
// }


// src/api.js

// Env se base URL lo
// .env.local  -> VITE_API_BASE_URL=http://127.0.0.1:8000
// Vercel env  -> VITE_API_BASE_URL=https://bunnytools.up.railway.app

const RAW_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!RAW_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

// trailing slash hata do
const API_BASE_URL = RAW_BASE_URL.replace(/\/+$/, "");

async function request(path, options = {}) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE_URL}${cleanPath}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
    },
  });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    let message = `HTTP ${res.status} ${res.statusText}`;
    try {
      const text = await res.text();
      if (text) message = text.slice(0, 300);
    } catch (_) {}
    throw new Error(message);
  }

  if (!contentType.includes("application/json")) {
    const text = await res.text();
    throw new Error(
      `Expected JSON, got ${contentType}. Response: ${text.slice(0, 80)}`
    );
  }

  return res.json();
}

/* =========================
   API METHODS
   ========================= */

export async function getProducts() {
  const data = await request("/api/products/");
  return data?.results ?? data ?? [];
}

export async function getProductById(id) {
  if (!id) throw new Error("Product ID is required");
  return request(`/api/products/${id}/`);
}

export async function getCategories() {
  const data = await request("/api/categories/");
  return data?.results ?? data ?? [];
}

export async function getWhatsAppNumber() {
  const data = await request("/api/whatsapp/");
  return data?.whatsapp_number || null;
}
