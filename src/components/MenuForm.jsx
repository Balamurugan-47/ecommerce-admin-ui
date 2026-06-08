import { TextField, Grid, FormControlLabel, Switch, MenuItem } from "@mui/material";

const MENU_TYPES = ["MODULE", "MENU", "ACTION"];

function MenuForm({ form, setForm, parentMenuOptions = [] }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitch = (e) => {
    setForm((prev) => ({ ...prev, isActive: e.target.checked }));
  };

  return (
    <Grid container spacing={2} sx={{ mt: 0.5 }}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Menu Name *"
          name="menuName"
          value={form.menuName}
          onChange={handleChange}
          fullWidth
          size="small"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Menu Code *"
          name="menuCode"
          value={form.menuCode}
          onChange={handleChange}
          fullWidth
          size="small"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          select
          label="Menu Type *"
          name="menuType"
          value={form.menuType}
          onChange={handleChange}
          fullWidth
          size="small"
        >
          {MENU_TYPES.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          select
          label="Parent Menu"
          name="parentMenuId"
          value={form.parentMenuId ?? ""}
          onChange={handleChange}
          fullWidth
          size="small"
        >
          <MenuItem value="">None</MenuItem>
          {parentMenuOptions.map((m) => (
            <MenuItem key={m.menuId} value={m.menuId}>
              {m.menuName}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="URL"
          name="url"
          value={form.url}
          onChange={handleChange}
          fullWidth
          size="small"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Icon"
          name="icon"
          value={form.icon}
          onChange={handleChange}
          fullWidth
          size="small"
          placeholder="e.g. DashboardIcon"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Display Order"
          name="displayOrder"
          value={form.displayOrder}
          onChange={handleChange}
          fullWidth
          size="small"
          type="number"
          inputProps={{ min: 0 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControlLabel
          control={
            <Switch
              checked={form.isActive}
              onChange={handleSwitch}
              color="primary"
            />
          }
          label="Active"
        />
      </Grid>
    </Grid>
  );
}

export default MenuForm;