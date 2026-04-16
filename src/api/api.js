import axios from "axios";

const api = axios.create({
  baseURL: "https://coral-skin-backend.onrender.com",
});

export default api;