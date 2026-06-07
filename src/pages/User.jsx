import { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Breadcrumbs,
  Box,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import CommonDataGrid from "../components/CommonDataGrid";
import CommonDialog from "../components/CommonDialog";
import UserForm from "../components/UserForm";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { TextField, Grid, FormControlLabel, Switch, Chip } from "@mui/material";
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
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState("create");
  const initialForm = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    timezone: "Asia/Kolkata",
    isActive: true,
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
        isActive: user.isActive,
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
      username: row.username || "",
      email: row.email || "",
      password: "",
      firstName: row.firstName || "",
      lastName: row.lastName || "",
      phone: row.phone || "",
      timezone: row.timezone || "Asia/Kolkata",
      isActive: row.isActive,
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
    if (
      !form.username ||
      !form.email ||
      !form.firstName ||
      !form.lastName ||
      !form.phone ||
      !form.timezone
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setSaving(true);

      const tenantRaw = localStorage.getItem("tenant");

      console.log("tenantRaw:", tenantRaw);

      let tenant = null;

      try {
        tenant = tenantRaw ? JSON.parse(tenantRaw) : null;
      } catch (error) {
        console.error("Error parsing tenant from localStorage:", error);
      }

      console.log("Tenant from localStorage:", tenant);
      console.log("Tenant ID:", tenant?.tenantId);

      const payload = {
        ...form,
        tenantId: tenant?.tenantId ?? null,
        isActive: form.isActive,
      };

      console.log("Final Payload:", payload);

      if (mode === "edit" && !payload.password) {
        delete payload.password;
      }

      let result;

      if (mode === "create") {
        result = await createUser(payload);
      } else {
        result = await updateUser(selectedUser.id, payload);
      }

      if (result.success) {
        setOpenForm(false);
        loadUsers();
      }
    } finally {
      setSaving(false);
    }
  };
  const columns = [
    { field: "username", headerName: "Username", width: 180 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "firstName", headerName: "First Name", width: 120 },
    { field: "lastName", headerName: "Last Name", width: 120 },
    { field: "tenant", headerName: "Tenant", width: 150 },
    {
      field: "isActive",
      headerName: "Status",
      width: 140,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Active" : "Inactive"}
          size="small"
          sx={{
            fontWeight: 600,
            background: params.value
              ? "linear-gradient(135deg, #15602b 0%, #6af7a0 100%)"
              : "linear-gradient(135deg, #7f1d1d 0%, #ef4444 100%)",
            color: "#fff",
            boxShadow: params.value
              ? "0 2px 8px rgba(124,106,247,0.4)"
              : "0 2px 8px rgba(239,68,68,0.4)",
          }}
        />
      ),
    },
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
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreate}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              background: "linear-gradient(135deg, #1a1560 0%, #7c6af7 100%)",
              boxShadow: "0 4px 12px rgba(124,106,247,0.4)",
              "&:hover": {
                background: "linear-gradient(135deg, #0f0c29 0%, #5b4fcf 100%)",
                boxShadow: "0 6px 16px rgba(124,106,247,0.5)",
              },
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
        loading={saving}
      >
        {" "}
        <UserForm form={form} setForm={setForm} mode={mode} />{" "}
      </CommonDialog>{" "}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 999,
        }}
        open={saving}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Paper>
  );
}
export default User;
