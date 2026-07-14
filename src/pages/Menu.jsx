import { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Breadcrumbs,
  Box,
  Button,
  Backdrop,
  CircularProgress,
  Chip,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CommonDataGrid from "../components/CommonDataGrid";
import CommonDialog from "../components/CommonDialog";
import MenuForm from "../components/MenuForm";
import { getAllMenus, saveMenu, deleteMenu } from "../api/menuApi";
import "../common.css";

// ─── Shared UI helpers — import these in other pages too ──────────────────────

export const StatusChip = ({ value }) => (
  <Chip
    label={value ? "Active" : "Inactive"}
    size="small"
    className={`status-chip ${value ? "status-chip--active" : "status-chip--inactive"}`}
  />
);

export const SaveBackdrop = ({ open }) => (
  <Backdrop className="save-backdrop" open={open}>
    <CircularProgress color="inherit" />
  </Backdrop>
);

export const PageHeader = ({ breadcrumbs = [], title, onCreateLabel, onCreate }) => (
  <>
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className="page-breadcrumbs">
      {breadcrumbs.map((b, i) => (
        <Typography key={i}>{b}</Typography>
      ))}
    </Breadcrumbs>
    <Box className="page-header">
      <Typography variant="h5" fontWeight={600}>
        {title}
      </Typography>
      <Box className="page-header-actions">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onCreate}
          className="btn-create"
        >
          {onCreateLabel}
        </Button>
      </Box>
    </Box>
  </>
);

export const RowActions = ({ onEdit, onDelete }) => (
  <Box className="row-actions">
    <Tooltip title="Edit">
      <IconButton color="primary" size="small" onClick={onEdit}>
        <EditIcon fontSize="small" />
      </IconButton>
    </Tooltip>
    <Tooltip title="Delete">
      <IconButton color="error" size="small" onClick={onDelete}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  </Box>
);

// ─── Initial form state ────────────────────────────────────────────────────────

const initialForm = {
  menuName: "",
  menuCode: "",
  menuType: "MODULE",
  parentMenuId: null,
  url: "",
  icon: "",
  displayOrder: 0,
  isActive: true,
};

// ─── Menu Page ─────────────────────────────────────────────────────────────────

function Menu() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState("create");
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    setLoading(true);
    const result = await getAllMenus();
    if (result.success) {
      const rows = result.data.map((m) => ({
        id: m.menuId,
        menuId: m.menuId,
        menuName: m.menuName,
        menuCode: m.menuCode,
        menuType: m.menuType,
        parentMenuId: m.parentMenuId,
        // Resolve parent name for display
        parentMenuName:
          m.parentMenuId
            ? result.data.find((x) => x.menuId === m.parentMenuId)?.menuName ?? m.parentMenuId
            : "—",
        url: m.url ?? "—",
        icon: m.icon ?? "—",
        displayOrder: m.displayOrder,
        isActive: m.isActive,
      }));
      setMenus(rows);
    }
    setLoading(false);
  };

  const handleCreate = () => {
    setMode("create");
    setSelectedMenu(null);
    setForm(initialForm);
    setOpenForm(true);
  };

  const handleEdit = (row) => {
    setMode("edit");
    setSelectedMenu(row);
    setForm({
      menuName: row.menuName || "",
      menuCode: row.menuCode || "",
      menuType: row.menuType || "MODULE",
      parentMenuId: row.parentMenuId ?? null,
      url: row.url === "—" ? "" : row.url || "",
      icon: row.icon === "—" ? "" : row.icon || "",
      displayOrder: row.displayOrder ?? 0,
      isActive: row.isActive,
    });
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    const result = await deleteMenu(id);
    if (result.success) loadMenus();
  };

  const handleSave = async () => {
    if (!form.menuName || !form.menuCode || !form.menuType) {
      alert("Menu Name, Menu Code and Menu Type are required.");
      return;
    }

    // SUBMODULE must have a parent; MODULE must not.
    if (form.menuType === "SUBMODULE" && !form.parentMenuId) {
      alert("Parent Menu is required for a Submodule.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        menuId: mode === "edit" ? selectedMenu.menuId : 0,
        menuName: form.menuName,
        menuCode: form.menuCode,
        menuType: form.menuType,
        parentMenuId:
          form.menuType === "SUBMODULE" && form.parentMenuId
            ? Number(form.parentMenuId)
            : null,
        url: form.url || null,
        icon: form.icon || null,
        displayOrder: Number(form.displayOrder),
        isActive: form.isActive,
      };

      const result = await saveMenu(payload);

      if (result.success) {
        setOpenForm(false);
        loadMenus();
      }
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    { field: "menuName", headerName: "Menu Name", width: 180 },
    { field: "menuCode", headerName: "Menu Code", width: 160 },
    { field: "menuType", headerName: "Type", width: 110 },
    { field: "parentMenuName", headerName: "Parent Menu", width: 160 },
    // { field: "url", headerName: "URL", width: 160 },
    // { field: "icon", headerName: "Icon", width: 120 },
    { field: "displayOrder", headerName: "Order", width: 80 },
    {
      field: "isActive",
      headerName: "Status",
      width: 120,
      renderCell: (params) => <StatusChip value={params.value} />,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <RowActions
          onEdit={() => handleEdit(params.row)}
          onDelete={() => handleDelete(params.row.id)}
        />
      ),
    },
  ];

  return (
    <Paper elevation={0} className="page-container">
      <PageHeader
        breadcrumbs={["Administration", "Menus"]}
        title="Menus"
        onCreateLabel="Create Menu"
        onCreate={handleCreate}
      />

      <CommonDataGrid rows={menus} columns={columns} loading={loading} />

      <CommonDialog
        open={openForm}
        title={mode === "create" ? "Create Menu" : "Edit Menu"}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSave}
        loading={saving}
      >
        <MenuForm
          form={form}
          setForm={setForm}
          parentMenuOptions={menus.filter((m) =>
            mode === "edit" ? m.menuId !== selectedMenu?.menuId : true
          )}
        />
      </CommonDialog>

      <SaveBackdrop open={saving} />
    </Paper>
  );
}

export default Menu;