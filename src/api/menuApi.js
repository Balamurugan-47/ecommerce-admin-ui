import axios from "axios";

const BASE_URL = "https://ecommerce-monolithic-2.onrender.com/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllMenus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/menu/getAll`, getAuthHeaders());
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to fetch menus" };
  }
};

export const getMenuById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/menu/${id}`, getAuthHeaders());
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to fetch menu" };
  }
};

// Both create & update use POST /save
// Create: menuId = 0
// Update: menuId = existing id
export const saveMenu = async (menuData) => {
  try {
    const response = await axios.post(`${BASE_URL}/menu/save`, menuData, getAuthHeaders());
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to save menu" };
  }
};

export const deleteMenu = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/menu/${id}`, getAuthHeaders());
    return { success: true };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Failed to delete menu" };
  }
};