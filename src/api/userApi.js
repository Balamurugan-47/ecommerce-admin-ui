import axios from "axios";

const BASE_URL =
  "https://ecommerce-monolithic-2.onrender.com/api";

export const getAllUsers = async () => {

  try {

    const token =
      localStorage.getItem("token");

    const response = await axios.get(
      `${BASE_URL}/users/getAll`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      data: response.data,
    };

  } catch (error) {

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to fetch users",
    };
  }
};