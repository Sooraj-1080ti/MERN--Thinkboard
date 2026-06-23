import axios from "axios";
//in production we will use the production url and in development we will use localhost url
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";
const api = axios.create({
    baseURL: BASE_URL,
});

export default api;