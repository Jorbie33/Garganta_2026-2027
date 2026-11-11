
const BASE = "/api";

export const tokens = {
  get access() { return localStorage.getItem("access"); },
  get refresh() { return localStorage.getItem("refresh"); },
  set({ access, refresh }) {
    if (access) localStorage.setItem("access", access);
    if (refresh) localStorage.setItem("refresh", refresh);
  },
  clear() {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  },
};

function errorMessage(data) {
  if (!data) return "Something went wrong. Please try again.";
  if (typeof data === "string") return data;
  if (data.detail) return data.detail;
  const first = Object.entries(data)[0];
  if (!first) return "Something went wrong. Please try again.";
  const [field, msgs] = first;
  return `${field}: ${Array.isArray(msgs) ? msgs[0] : msgs}`;
}

async function refreshAccess() {
  if (!tokens.refresh) return false;
  const res = await fetch(`${BASE}/auth/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: tokens.refresh }),
  });
  if (!res.ok) { tokens.clear(); return false; }
  tokens.set(await res.json());
  return true;
}

async function request(path, { method = "GET", body, retry = true } = {}) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";
  if (tokens.access) headers.Authorization = `Bearer ${tokens.access}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401 && retry && tokens.refresh && (await refreshAccess())) {
    return request(path, { method, body, retry: false });
  }
  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(errorMessage(data));
    err.status = res.status;
    throw err;
  }
  return data;
}

export const api = {
  login: (username, password) => request("/auth/login/", { method: "POST", body: { username, password } }),
  register: (body) => request("/auth/register/", { method: "POST", body }),
  me: () => request("/auth/me/"),
  products: (params = {}) => {
    const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v)).toString();
    return request(`/products/${qs ? `?${qs}` : ""}`);
  },
  product: (id) => request(`/products/${id}/`),
  cart: () => request("/cart/"),
  addToCart: (product_id, quantity = 1) =>
    request("/cart/items/", { method: "POST", body: { product_id, quantity } }),
  setQuantity: (itemId, quantity) => request(`/cart/items/${itemId}/`, { method: "PATCH", body: { quantity } }),
  removeItem: (itemId) => request(`/cart/items/${itemId}/`, { method: "DELETE" }),
  checkout: () => request("/checkout/", { method: "POST" }),
  transactions: () => request("/transactions/"),
};
