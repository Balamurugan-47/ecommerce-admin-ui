// Consistent success/error response shape used across all *Api.js files.

export const apiSuccess = (data) => ({ success: true, data });

export const apiError = (error, fallbackMessage) => ({
  success: false,
  message: error.response?.data?.message || fallbackMessage,
});