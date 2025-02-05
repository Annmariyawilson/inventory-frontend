import axios from "axios";

const API_URL = "https://inventory-backend-v5i9.vercel.app";

export const getInventory = async () => {
  try {
    const response = await axios.get(`${API_URL}/inventory`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch inventory");
  }
};

export const addItem = async (newItem) => {
  try {
    const response = await axios.post(`${API_URL}/inventory`, newItem);
    return response.data;
  } catch (error) {
    throw new Error("Failed to add item");
  }
};

export const updateItem = async (id, updatedItem) => {
  try {
    const response = await axios.put(`${API_URL}/inventory/${id}`, updatedItem);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update item");
  }
};

export const deleteItem = async (id) => {
  try {
    await axios.delete(`${API_URL}/inventory/${id}`);
  } catch (error) {
    throw new Error("Failed to delete item");
  }
};

export const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Invalid username or password. Please check your credentials.");
      }
      throw new Error(error.response?.data?.message || "Login failed, please try again.");
    }
  };
      
  export const register = async (userDetails) => {
    try {
      await axios.post(`${API_URL}/auth/register`, userDetails);
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed, please try again.");
    }
  };