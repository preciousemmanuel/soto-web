import axios from "axios";
import { toast } from "react-toastify";

// Create an axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Check for custom property in config to determine which token to use
    // const isVendor = config.isVendorRequest;

    const userToken = localStorage.getItem("userToken");
    const vendorToken = localStorage.getItem("vendorToken");

    if (vendorToken) {
      config.headers["Authorization"] = `Bearer ${vendorToken}`;
    } else {
      config.headers["Authorization"] = `Bearer ${userToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Any status code within 2xx range will trigger this function
    return response;
  },
  (error) => {
    // console.log(error);
    // const status = error.response ? error.response.status : null;

    // switch (status) {
    //   case 400:
    //     console.error('Bad Request:', error.response.data);
    //     toast.warn('There was an issue with your request. Please check and try again.');
    //     break;

    //   case 404:
    //     console.error('Not Found:', error.response.data);
    //     toast.error('The requested resource was not found.');
    //     break;

    //   case 500:
    //     console.error('Server Error:', error.response.data);
    //     toast.error('An error occurred on the server. Please try again later.');
    //     break;

    //   case 401:
    //     console.error('Unauthorized:', error.response.data);
    //     localStorage.removeItem('token');
    //     window.location.href = '/auth'; // Redirect to login page
    //     break;

    //   default:
    //     console.error('An unexpected error occurred:', error);
    //     toast.error('An unexpected error occurred. Please try again.');
    // }

    // Return a rejected promise to keep the error in the promise chain
    return Promise.reject(error);
  }
);

export default apiClient;
