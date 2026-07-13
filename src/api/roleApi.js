import api from "./axiosClient";
import { apiSuccess, apiError } from "../utils/apiHelpers";

// Lightweight list: only { roleId, roleName } — used both for the
// Roles grid and anywhere a role dropdown/select is needed.
export const getRoleDropdown = async () => {
  try {
    const response = await api.get("/role/dropdown");
    return apiSuccess(response.data);
  } catch (error) {
    return apiError(error, "Failed to fetch roles");
  }
};

// Nested menu tree (modules -> submodules) used to render the
// "Screens and Permission" table in the Role form.
export const getMenuTree = async () => {
  try {
    const response = await api.get("/menu/tree");
    return apiSuccess(response.data);
  } catch (error) {
    return apiError(error, "Failed to fetch menu tree");
  }
};

export const getRoleById = async (id) => {
  try {
    const response = await api.get(`/role/${id}`);
    return apiSuccess(response.data);
  } catch (error) {
    return apiError(error, "Failed to fetch role");
  }
};

export const createRole = async (roleData) => {
  try {
    const response = await api.post("/role/create", roleData);
    return apiSuccess(response.data);
  } catch (error) {
    return apiError(error, "Failed to create role");
  }
};

export const updateRole = async (id, roleData) => {
  try {
    const response = await api.put(`/role/${id}`, roleData);
    return apiSuccess(response.data);
  } catch (error) {
    return apiError(error, "Failed to update role");
  }
};

export const deleteRole = async (id) => {
  try {
    await api.delete(`/role/${id}`);
    return { success: true };
  } catch (error) {
    return apiError(error, "Failed to delete role");
  }
};