import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import CommonDataGrid from "../components/CommonDataGrid";
import CommonDialog from "../components/CommonDialog";
import RoleForm from "../components/RoleForm";
import {
  getRoleDropdown,
  getMenuTree,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "../api/roleApi";
import { SaveBackdrop, PageHeader, RowActions } from "./Menu";
import "../common.css";

// Flatten the nested /menu/tree response into a flat list with an
// indent `level`, so it can be rendered as rows in the permission table.
const flattenMenuTree = (nodes = [], level = 0) => {
  let result = [];
  nodes.forEach((node) => {
    result.push({ menuId: node.menuId, menuName: node.menuName, level });
    if (node.children?.length) {
      result = result.concat(flattenMenuTree(node.children, level + 1));
    }
  });
  return result;
};

// Build the default (all-unchecked) permission rows from the flattened tree
const buildDefaultMenus = (flatTree) =>
  flatTree.map((m) => ({
    menuId: m.menuId,
    menuName: m.menuName,
    level: m.level,
    canView: false,
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canExport: false,
  }));

const baseForm = {
  roleName: "",
  description: "",
  isActive: true,
  menus: [],
};

function Role() {
  const [roles, setRoles] = useState([]);
  const [menuTree, setMenuTree] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState("create");
  const [form, setForm] = useState(baseForm);

  useEffect(() => {
    loadRoles();
    loadMenuTree();
  }, []);

  const loadRoles = async () => {
    setLoading(true);
    // NOTE: there's no dedicated "getAll roles" endpoint yet, so the grid
    // is backed by /role/dropdown, which only returns { roleId, roleName }.
    // Swap this for a fuller list endpoint later to show description/status.
    const result = await getRoleDropdown();
    if (result.success) {
      const rows = result.data.map((r) => ({
        id: r.roleId,
        roleId: r.roleId,
        roleName: r.roleName,
      }));
      setRoles(rows);
    }
    setLoading(false);
  };

  const loadMenuTree = async () => {
    const result = await getMenuTree();
    if (result.success) {
      setMenuTree(flattenMenuTree(result.data));
    }
  };

  const handleCreate = () => {
    setMode("create");
    setSelectedRole(null);
    setForm({ ...baseForm, menus: buildDefaultMenus(menuTree) });
    setOpenForm(true);
  };

  const handleEdit = async (row) => {
    setMode("edit");
    setSelectedRole(row);
    setOpenForm(true);
    setLoading(true);

    const result = await getRoleById(row.roleId);
    if (result.success) {
      const detail = result.data;
      const existingByMenuId = new Map(
        (detail.menus || []).map((m) => [m.menuId, m])
      );

      const mergedMenus = buildDefaultMenus(menuTree).map((m) => {
        const existing = existingByMenuId.get(m.menuId);
        return existing
          ? {
              ...m,
              canView: !!existing.canView,
              canCreate: !!existing.canCreate,
              canEdit: !!existing.canEdit,
              canDelete: !!existing.canDelete,
              canExport: !!existing.canExport,
            }
          : m;
      });

      setForm({
        roleName: detail.roleName || "",
        description: detail.description || "",
        isActive: true,
        menus: mergedMenus,
      });
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const result = await deleteRole(id);
    if (result.success) loadRoles();
  };

  const handleSave = async () => {
    if (!form.roleName || !form.description) {
      alert("Role Name and Description are required.");
      return;
    }

    try {
      setSaving(true);

      const tenantRaw = localStorage.getItem("tenant");
      let tenant = null;
      try {
        tenant = tenantRaw ? JSON.parse(tenantRaw) : null;
      } catch (error) {
        console.error("Error parsing tenant from localStorage:", error);
      }

      const payload = {
        tenantId: tenant?.tenantId ?? null,
        roleName: form.roleName,
        description: form.description,
        menus: form.menus.map((m) => ({
          menuId: m.menuId,
          canView: m.canView,
          canCreate: m.canCreate,
          canEdit: m.canEdit,
          canDelete: m.canDelete,
          canExport: m.canExport,
        })),
      };

      const result =
        mode === "edit"
          ? await updateRole(selectedRole.roleId, payload)
          : await createRole(payload);

      if (result.success) {
        setOpenForm(false);
        loadRoles();
      }
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    { field: "roleName", headerName: "Role Name", width: 280 },
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
        breadcrumbs={["Administration", "Roles"]}
        title="Roles"
        onCreateLabel="Create Role"
        onCreate={handleCreate}
      />

      <CommonDataGrid rows={roles} columns={columns} loading={loading} />

      <CommonDialog
        open={openForm}
        title={mode === "create" ? "Create Role" : "Edit Role"}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSave}
        loading={saving}
      >
        <RoleForm form={form} setForm={setForm} />
      </CommonDialog>

      <SaveBackdrop open={saving} />
    </Paper>
  );
}

export default Role;