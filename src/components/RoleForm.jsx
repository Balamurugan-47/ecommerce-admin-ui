import {
  TextField,
  Grid,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import "../common.css";

// form shape expected:
// {
//   roleName: string,
//   description: string,
//   isActive: boolean,
//   menus: [{ menuId, menuName, level, canView, canCreate, canEdit, canDelete, canExport }]
// }

function RoleForm({ form, setForm }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (menuId, field, checked) => {
    setForm((prev) => ({
      ...prev,
      menus: prev.menus.map((m) =>
        m.menuId === menuId ? { ...m, [field]: checked } : m
      ),
    }));
  };

  // Leftmost checkbox on each row toggles all 5 permissions for that screen at once
  const handleRowSelectAll = (menuId, checked) => {
    setForm((prev) => ({
      ...prev,
      menus: prev.menus.map((m) =>
        m.menuId === menuId
          ? {
              ...m,
              canView: checked,
              canCreate: checked,
              canEdit: checked,
              canDelete: checked,
              canExport: checked,
            }
          : m
      ),
    }));
  };

  return (
    <Grid container spacing={2} className="form-grid-mt">
      <Grid item xs={12} sm={4}>
        <TextField
          label="Role Name *"
          name="roleName"
          value={form.roleName}
          onChange={handleChange}
          fullWidth
          size="small"
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          label="Description *"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          size="small"
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          select
          label="Status *"
          name="isActive"
          value={form.isActive}
          onChange={handleChange}
          fullWidth
          size="small"
        >
          <MenuItem value={true}>Active</MenuItem>
          <MenuItem value={false}>Inactive</MenuItem>
        </TextField>
      </Grid>

      <Grid item xs={12}>
        <Box className="permissions-header">
          <GroupIcon fontSize="small" className="permissions-header-icon" />
          <Typography variant="subtitle1" fontWeight={600}>
            Screens and Permission
          </Typography>
        </Box>
        <Divider className="permissions-divider" />
      </Grid>

      <Grid item xs={12}>
        <Box className="permissions-table-container">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" />
                <TableCell>Screen Name</TableCell>
                <TableCell align="center">View</TableCell>
                <TableCell align="center">Create</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
                <TableCell align="center">Export</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {form.menus.map((m) => {
                const allChecked =
                  m.canView &&
                  m.canCreate &&
                  m.canEdit &&
                  m.canDelete &&
                  m.canExport;

                return (
                  <TableRow key={m.menuId}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        size="small"
                        checked={allChecked}
                        onChange={(e) =>
                          handleRowSelectAll(m.menuId, e.target.checked)
                        }
                      />
                    </TableCell>
                    <TableCell style={{ paddingLeft: 16 + m.level * 24 }}>
                      {m.menuName}
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        size="small"
                        checked={m.canView}
                        onChange={(e) =>
                          handlePermissionChange(m.menuId, "canView", e.target.checked)
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        size="small"
                        checked={m.canCreate}
                        onChange={(e) =>
                          handlePermissionChange(m.menuId, "canCreate", e.target.checked)
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        size="small"
                        checked={m.canEdit}
                        onChange={(e) =>
                          handlePermissionChange(m.menuId, "canEdit", e.target.checked)
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        size="small"
                        checked={m.canDelete}
                        onChange={(e) =>
                          handlePermissionChange(m.menuId, "canDelete", e.target.checked)
                        }
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        size="small"
                        checked={m.canExport}
                        onChange={(e) =>
                          handlePermissionChange(m.menuId, "canExport", e.target.checked)
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Grid>
    </Grid>
  );
}

export default RoleForm;