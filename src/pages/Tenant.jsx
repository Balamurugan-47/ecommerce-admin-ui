import { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import CommonDataGrid from "../components/CommonDataGrid";
import CommonDialog from "../components/CommonDialog";
import TenantForm from "../components/TenantForm";
import { getAllTenants, saveTenant, deleteTenant } from "../api/tenantApi";
import { StatusChip, SaveBackdrop, PageHeader, RowActions } from "./Menu";
import "../common.css";

// ─── Initial form state ────────────────────────────────────────────────────────

const initialForm = {
  name: "",
  domain: "",
  timezone: "",
  isActive: true,
};

// ─── Tenant Page ───────────────────────────────────────────────────────────────

function Tenant() {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState("create");
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    loadTenants();
  }, []);

  const loadTenants = async () => {
    setLoading(true);
    const result = await getAllTenants();
    if (result.success) {
      const rows = result.data.map((t) => ({
        id: t.tenantId,
        tenantId: t.tenantId,
        name: t.name,
        domain: t.domain,
        timezone: t.timezone,
        isActive: t.isActive,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
      }));
      setTenants(rows);
    }
    setLoading(false);
  };

  const handleCreate = () => {
    setMode("create");
    setSelectedTenant(null);
    setForm(initialForm);
    setOpenForm(true);
  };

  const handleEdit = (row) => {
    setMode("edit");
    setSelectedTenant(row);
    setForm({
      name: row.name || "",
      domain: row.domain || "",
      timezone: row.timezone || "",
      isActive: row.isActive,
    });
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    const result = await deleteTenant(id);
    if (result.success) loadTenants();
  };

  const handleSave = async () => {
    if (!form.name || !form.domain || !form.timezone) {
      alert("Tenant Name, Domain and Timezone are required.");
      return;
    }

    try {
      setSaving(true);

      const now = new Date().toISOString();

      const payload = {
        tenantId: mode === "edit" ? selectedTenant.tenantId : 0,
        name: form.name,
        domain: form.domain,
        timezone: form.timezone,
        isActive: form.isActive,
        createdAt: mode === "edit" ? selectedTenant.createdAt : now,
        updatedAt: now,
      };

      const result = await saveTenant(payload);

      if (result.success) {
        setOpenForm(false);
        loadTenants();
      }
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    { field: "name", headerName: "Tenant Name", width: 180 },
    { field: "domain", headerName: "Domain", width: 200 },
    { field: "timezone", headerName: "Timezone", width: 160 },
    {
      field: "isActive",
      headerName: "Status",
      width: 120,
      renderCell: (params) => <StatusChip value={params.value} />,
    },
    { field: "createdAt", headerName: "Created Date", width: 200 },
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
        breadcrumbs={["Administration", "Tenants"]}
        title="Tenants"
        onCreateLabel="Create Tenant"
        onCreate={handleCreate}
      />

      <CommonDataGrid rows={tenants} columns={columns} loading={loading} />

      <CommonDialog
        open={openForm}
        title={mode === "create" ? "Create Tenant" : "Edit Tenant"}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSave}
        loading={saving}
      >
        <TenantForm form={form} setForm={setForm} />
      </CommonDialog>

      <SaveBackdrop open={saving} />
    </Paper>
  );
}

export default Tenant;
