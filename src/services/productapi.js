import api from "../api/api"

export const getAllProducts = async () => {
  const res = await api.get("/api/products");
  return res.data;
};

export const getProductById = (id) => api.get(`/api/products/${id}`);

export const addProducts = (data) => api.post("/api/products", data);

export const updateProduct = (id, data) => api.put(`/api/products/${id}`, data);

export const deleteProduct = (id) => api.delete(`/api/products/${id}`);

