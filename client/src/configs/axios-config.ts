import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

axios.defaults.baseURL = apiBaseUrl;

export default axios;
