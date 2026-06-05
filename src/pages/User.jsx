import {
  useEffect,
  useState,
} from "react";

import {
  Typography,
  Paper,
} from "@mui/material";

import CommonDataGrid
  from "../components/CommonDataGrid";

import {
  getAllUsers,
} from "../api/userApi";

function User() {

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    loadUsers();

  }, []);

  const loadUsers = async () => {

    setLoading(true);

    const result =
      await getAllUsers();

    if (result.success) {

      const formattedRows =
        result.data.map((user) => ({

          id: user.userId,

          userId:
            user.userId,

          username:
            user.username,

          email:
            user.email,

          tenant:
            user.tenant?.name,

          active:
            user.isActive
              ? "Yes"
              : "No",

          createdAt:
            user.createdAt,
        }));

      setUsers(formattedRows);
    }

    setLoading(false);
  };

  const columns = [

    {
      field: "userId",
      headerName: "User ID",
      width: 120,
    },

    {
      field: "username",
      headerName: "Username",
      width: 180,
    },

    {
      field: "email",
      headerName: "Email",
      width: 250,
    },

    {
      field: "tenant",
      headerName: "Tenant",
      width: 150,
    },

    {
      field: "active",
      headerName: "Active",
      width: 120,
    },

    {
      field: "createdAt",
      headerName: "Created Date",
      width: 220,
    },
  ];

  return (

    <Paper sx={{ p: 0 }}>

      <Typography
        variant="h5"
        mb={2}
      >
        Users
      </Typography>

      <CommonDataGrid
        rows={users}
        columns={columns}
        loading={loading}
      />

    </Paper>
  );
}

export default User;