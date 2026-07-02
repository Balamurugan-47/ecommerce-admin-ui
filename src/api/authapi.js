import api from "./axiosClient";
import { apiSuccess, apiError } from "../utils/apiHelpers";

export const loginUser = async (payload) => {
  try {
    const response = await api.post("/auth/login", payload);
    return apiSuccess(response.data);
  } catch (error) {
    return apiError(error, "Login Failed. Please try again.");
  }
};

export default api;