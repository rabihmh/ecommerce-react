/* import Axios from 'axios';

const createAxiosInstance = (authContext = null) => {
  const axios = Axios.create({
    baseURL: "http://localhost:5284/api",
    withCredentials: 'include',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 403) {
        authContext.fetchUser(); 
      }
      if (error.response && error.response.status === 401) {
        authContext && authContext.fetchUser(); 
      }
      return Promise.reject(error);
    }
  );

  return axios;
};

export default createAxiosInstance;
 */
import axios from "axios";
import router from "./router";

const axiosClient = axios.create({
  baseURL: 'http://localhost:5005/api',
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`
  return config
});

axiosClient.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('TOKEN')
    window.location.reload();
    // router.navigate('/login')
    return error;
  }
  throw error;
})

export default axiosClient;