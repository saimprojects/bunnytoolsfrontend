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

// Updated: getProducts function with pagination support
export async function getProducts(page = 1, pageSize = 100) {
  try {
    const data = await request(`/api/products/?page=${page}&page_size=${pageSize}`);
    
    // Return full response including pagination info
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

// New: Function to get all products (handles pagination automatically)
export async function getAllProducts() {
  try {
    let allProducts = [];
    let nextUrl = '/api/products/';
    let page = 1;
    const maxPages = 10; // Safety limit
    
    while (nextUrl && page <= maxPages) {
      const data = await request(nextUrl);
      
      if (data && data.results) {
        allProducts = [...allProducts, ...data.results];
        nextUrl = data.next;
      } else {
        break;
      }
      
      page++;
    }
    
    return allProducts;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
}

// Original getProducts function for backward compatibility (returns only array)
export async function getProductsArray() {
  try {
    const data = await request("/api/products/");
    return data?.results ?? data ?? [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
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

/* =========================
   REVIEWS API METHODS
   ========================= */

export async function getReviews() {
  const data = await request("/api/reviews/");
  return data?.results ?? data ?? [];
}

export async function getReviewsByProduct(productId) {
  if (!productId) throw new Error("Product ID is required");
  const data = await request(`/api/reviews/?product=${productId}`);
  return data?.results ?? data ?? [];
}

export async function getReviewStats() {
  try {
    const data = await request("/api/review-stats/");
    return data;
  } catch (error) {
    console.warn("Review stats endpoint not available:", error.message);
    return null;
  }
}