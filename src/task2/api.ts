// api.ts

import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = 'http://20.244.56.144/test';

let accessToken: string | null = null;

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL
});

// Add a request interceptor to add Authorization header with the bearer token
axiosInstance.interceptors.request.use(
  async (config) => {
    // Check if access token is not set or expired
    if (!accessToken) {
      await authenticateAndGetToken();
    }

    // Set Authorization header with the bearer token
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication function to obtain and store access token
const authenticateAndGetToken = async (): Promise<void> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth`, {
      companyName: 'goMart',
      clientID: '203ee454-2d2b-4f95-a014-6e9ed5c6660d',
      clientSecret: 'rBzOmqkATvkhjhGp',
      ownerName: 'Bajrang',
      ownerEmail: 'bajranggour666@gmail.com',
      rollNo: '11212766'
    });

    accessToken = response.data.access_token;
  } catch (error) {
    throw new Error('Authentication failed');
  }
};

export default axiosInstance;
