import { useEffect, useState } from "react";
import { Typography, Paper, Breadcrumbs, Box, Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CommonDataGrid from "../components/CommonDataGrid";
import CommonDialog from "../components/CommonDialog";
import UserForm from "../components/UserForm";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../api/userApi";
function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [mode, setMode] = useState("create");
  const initialForm = {
    tenantId: "",
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    timezone: "",
  };
  const [form, setForm] = useState(initialForm);
  useEffect(() => {
    loadUsers();
  }, []);
  const loadUsers = async () => {
    setLoading(true);
    const result = await getAllUsers();
    if (result.success) {
      const formattedRows = result.data.map((user) => ({
        id: user.userId,
        userId: user.userId,
        username: user.username,
        email: user.email,
        tenant: user.tenant?.name,
        tenantId: user.tenant?.tenantId,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        timezone: user.timezone,
        active: user.isActive ? "Yes" : "No",
        createdAt: user.createdAt,
      }));
      setUsers(formattedRows);
    }
    setLoading(false);
  };
  const handleCreate = () => {
    setMode("create");
    setSelectedUser(null);
    setForm(initialForm);
    setOpenForm(true);
  };
  const handleEdit = (row) => {
    setMode("edit");
    setSelectedUser(row);
    setForm({
      tenantId: row.tenantId || "",
      username: row.username || "",
      email: row.email || "",
      password: "",
      firstName: row.firstName || "",
      lastName: row.lastName || "",
      phone: row.phone || "",
      timezone: row.timezone || "",
    });
    setOpenForm(true);
  };
  const handleDelete = async (id) => {
    const result = await deleteUser(id);
    if (result.success) {
      loadUsers();
    }
  };
  const saveUser = async () => {
    let result;
    if (mode === "create") {
      result = await createUser(form);
    } else {
      result = await updateUser(selectedUser.id, form);
    }
    if (result.success) {
      setOpenForm(false);
      loadUsers();
    }
  };
  const columns = [
    { field: "userId", headerName: "User ID", width: 120 },
    { field: "username", headerName: "Username", width: 180 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "tenant", headerName: "Tenant", width: 150 },
    { field: "active", headerName: "Active", width: 120 },
    { field: "createdAt", headerName: "Created Date", width: 220 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit User">
            <IconButton
              color="primary"
              size="small"
              onClick={() => handleEdit(params.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete User">
            <IconButton
              color="error"
              size="small"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
      {" "}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 2 }}
      >
        {" "}
        <Typography> Administration </Typography>{" "}
        <Typography> Users </Typography>{" "}
      </Breadcrumbs>{" "}
      <Box
        sx={{
          display: "flex",

          alignItems: "center",

          width: "100%",

          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Users
        </Typography>

        <Box sx={{ ml: "auto" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreate}
            sx={{
              borderRadius: 2,

              textTransform: "none",

              fontWeight: 600,
            }}
          >
            Create User
          </Button>
        </Box>
      </Box>
      <CommonDataGrid rows={users} columns={columns} loading={loading} />{" "}
      <CommonDialog
        open={openForm}
        title={mode === "create" ? "Create User" : "Edit User"}
        onClose={() => setOpenForm(false)}
        onSubmit={saveUser}
      >
        {" "}
        <UserForm form={form} setForm={setForm} />{" "}
      </CommonDialog>{" "}
    </Paper>
  );
}
export default User;
