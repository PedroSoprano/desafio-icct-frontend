import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3003",
});

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('@token');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});


export { api };