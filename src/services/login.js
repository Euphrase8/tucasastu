import axios from "axios";

const API_BASE = "https://api.tucasastu.com";

export const getToken = () => localStorage.getItem("token");

 export const login = async (data) => {
    try{
        const response = await axios.post(`${API_BASE}/api/user/login`, {
            email:data.email,
            password: data.password,
        });
        return response.data;
    } catch(error) {
        console.error("login error: ", error.response?.data|| error.message);
        throw error;
    }
 };
