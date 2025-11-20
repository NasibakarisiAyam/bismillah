import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api", // sesuaikan dengan backend URL
    withCredentials: true, // PENTING: untuk mengirim cookies
});
export default axiosInstance;
