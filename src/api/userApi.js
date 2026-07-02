import api from "./axiosClient";
import { apiSuccess, apiError } from "../utils/apiHelpers";

export const getAllUsers = async () => {
  try {
    const response = await api.get("/users/getAll");
    return apiSuccess(response.data);
  } catch (error) {
    return apiError(error, "Failed to fetch users");
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return apiSuccess(response.data);
  } catch (error) {
    return apiError(error, "Failed to fetch user");
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post("/users/create", userData);
    return apiSuccess(response.data);
  } catch (error) {
    return apiError(error, "Failed to create user");
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.put(`/users/${id}`, userData);
    return apiSuccess(response.data);
  } catch (error) {
    return apiError(error, "Failed to update user");
  }
};

export const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);
    return { success: true };
  } catch (error) {
    return apiError(error, "Failed to delete user");
  }
};