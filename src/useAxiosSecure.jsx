import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
    baseURL: "https://blog-web-server-kappa.vercel.app",
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { logout } = useAuth();
    useEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                // You can modify the request here if needed
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        const responseInterceptor = axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    logout();
                }
                return Promise.reject(error);
            }
        );

        return () => {
            // Cleanup interceptors to prevent memory leaks
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [logout]); // Dependency array ensures `logout` is up-to-date

    return axiosInstance;
};

export default useAxiosSecure;
