import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token from localStorage to each request
api.interceptors.request.use((config) => {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
  if (token) {
    config.headers = ({ ...(config.headers as any), Authorization: `Bearer ${token}` } as any);
  }
  return config;
});

// Admin login
export const adminLogin = (data: any) => api.post("/admin/login", data);

// Seller login
export const sellerLogin = (data: any) => api.post("/seller/login", data);

// Seller products
export const createSellerProduct = (data: any) => api.post("/seller/products", data);
export const getSellerProducts = (params?: { page?: number; limit?: number }) => api.get("/seller/products", { params });
export const deleteSellerProduct = (id: string) => api.delete(`/seller/products/${id}`);

// Admin sellers
export const getSellers = (params?: { page?: number; limit?: number }) => api.get("/admin/sellers", { params });
export const createSeller = (data: any) => api.post("/admin/sellers", data);
export const getSellerById = (id: string) => api.get(`/admin/sellers/${id}`);
export const deleteSeller = (id: string) => api.delete(`/admin/sellers/${id}`);

export default api;
