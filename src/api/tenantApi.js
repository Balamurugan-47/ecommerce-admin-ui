import api from "./axiosClient";
import { apiSuccess, apiError } from "../utils/apiHelpers";

export const getAllTenants = async () => {
  try {
    const response = await api.get("/tenants/getAll");
    return apiSuccess(response.data);
  } catch (error) {
    return apiError(error, "Failed to fetch tenants");
  }
};

export const getTenantById = async (id) => {
  try {
    const response = await api.get(`/tenants/${id}`);
    return apiSuccess(response.data);
  } catch (error) {
    return apiError(error, "Failed to fetch tenant");
  }
};

// Both create & update use POST /save
// Create: tenantId = 0
// Update: tenantId = existing id
export const saveTenant = async (tenantData) => {
  try {
    const response = await api.post("/tenants/save", tenantData);
    return apiSuccess(response.data);
  } catch (error) {
    return apiError(error, "Failed to save tenant");
  }
};

export const deleteTenant = async (id) => {
  try {
    await api.delete(`/tenants/${id}`);
    return { success: true };
  } catch (error) {
    return apiError(error, "Failed to delete tenant");
  }
};