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

/*
----------------------------------
GET ALL USERS
----------------------------------
*/

export const getAllUsers = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/users/getAll`,

      getAuthHeaders(),
    );

    return {
      success: true,

      data: response.data,
    };
  } catch (error) {
    return {
      success: false,

      message: error.response?.data?.message || "Failed to fetch users",
    };
  }
};

/*
----------------------------------
GET USER BY ID
----------------------------------
*/

export const getUserById = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/users/${id}`,

      getAuthHeaders(),
    );

    return {
      success: true,

      data: response.data,
    };
  } catch (error) {
    return {
      success: false,

      message: error.response?.data?.message || "Failed to fetch user",
    };
  }
};

/*
----------------------------------
CREATE USER
----------------------------------
*/

export const createUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/create`,

      userData,

      getAuthHeaders(),
    );

    return {
      success: true,

      data: response.data,
    };
  } catch (error) {
    return {
      success: false,

      message: error.response?.data?.message || "Failed to create user",
    };
  }
};

/*
----------------------------------
UPDATE USER
----------------------------------
*/

export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/users/${id}`,

      userData,

      getAuthHeaders(),
    );

    return {
      success: true,

      data: response.data,
    };
  } catch (error) {
    return {
      success: false,

      message: error.response?.data?.message || "Failed to update user",
    };
  }
};

/*
----------------------------------
DELETE USER
----------------------------------
*/

export const deleteUser = async (id) => {
  try {
    await axios.delete(
      `${BASE_URL}/users/${id}`,

      getAuthHeaders(),
    );

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,

      message: error.response?.data?.message || "Failed to delete user",
    };
  }
};
