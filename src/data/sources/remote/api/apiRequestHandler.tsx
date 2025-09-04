import axios from "axios";

const apiRequestHandler = axios.create({
  baseURL: import.meta.env.VITE_URL_API ,
  headers: {
    'Content-Type': 'application/json'
  }
});
apiRequestHandler.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem('auth');
    const data = JSON.parse(userData as any);
    const token  = data?.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { apiRequestHandler };
