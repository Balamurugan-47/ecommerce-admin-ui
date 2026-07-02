import api from "./axiosClient";
import { apiSuccess, apiError } from "../utils/apiHelpers";

export const getAllMenus = async () => {
  try {
    const response = await api.get("/menu/getAll");
    return apiSuccess(response.data);
  } catch (error) {
    return apiError(error, "Failed to fetch menus");
  }
};

export const getMenuById = async (id) => {
  try {
    const response = await api.get(`/menu/${id}`);
    return apiSuccess(response.data);
  } catch (error) {
    return apiError(error, "Failed to fetch menu");
  }
};

// Both create & update use POST /save
// Create: menuId = 0
// Update: menuId = existing id
export const saveMenu = async (menuData) => {
  try {
    const response = await api.post("/menu/save", menuData);
    return apiSuccess(response.data);
  } catch (error) {
    return apiError(error, "Failed to save menu");
  }
};

export const deleteMenu = async (id) => {
  try {
    await api.delete(`/menu/${id}`);
    return { success: true };
  } catch (error) {
    return apiError(error, "Failed to delete menu");
  }
};