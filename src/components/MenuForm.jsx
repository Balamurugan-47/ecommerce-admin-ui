import { TextField, Grid, FormControlLabel, Switch, MenuItem } from "@mui/material";
import "../common.css";

const MENU_TYPES = ["MODULE", "SUBMODULE"];

function MenuForm({ form, setForm, parentMenuOptions = [] }) {
  const isSubmodule = form.menuType === "SUBMODULE";

  // Only MODULE-type menus can be a parent
  const moduleOptions = parentMenuOptions.filter((m) => m.menuType === "MODULE");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "menuType") {
      // If switching to MODULE, parent menu is not applicable — clear it
      setForm((prev) => ({
        ...prev,
        menuType: value,
        parentMenuId: value === "SUBMODULE" ? prev.parentMenuId : null,
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitch = (e) => {
    setForm((prev) => ({ ...prev, isActive: e.target.checked }));
  };

  const parentMenuMissing = isSubmodule && !form.parentMenuId;

  return (
    <Grid container spacing={2} className="form-grid-mt-half">
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

      {/* Parent Menu only applies to SUBMODULE type */}
      {isSubmodule && (
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Parent Menu *"
            name="parentMenuId"
            value={form.parentMenuId ?? ""}
            onChange={handleChange}
            fullWidth
            size="small"
            error={parentMenuMissing}
            helperText={parentMenuMissing ? "Parent menu is required for a submodule" : ""}
          >
            {moduleOptions.length === 0 ? (
              <MenuItem value="" disabled>
                No modules available
              </MenuItem>
            ) : (
              moduleOptions.map((m) => (
                <MenuItem key={m.menuId} value={m.menuId}>
                  {m.menuName}
                </MenuItem>
              ))
            )}
          </TextField>
        </Grid>
      )}

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