import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/auth/login", // coloque o endpoint da sua API Django
});

export default api;