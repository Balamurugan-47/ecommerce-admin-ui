import { TextField, Grid, FormControlLabel, Switch } from "@mui/material";
import "../common.css";

function TenantForm({ form, setForm }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitch = (e) => {
    setForm((prev) => ({ ...prev, isActive: e.target.checked }));
  };

  return (
    <Grid container spacing={2} className="form-grid-mt">
      <Grid item xs={12} sm={6}>
        <TextField
          label="Tenant Name *"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          size="small"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Domain *"
          name="domain"
          value={form.domain}
          onChange={handleChange}
          fullWidth
          size="small"
          placeholder="e.g. acme.com"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Timezone *"
          name="timezone"
          value={form.timezone}
          onChange={handleChange}
          fullWidth
          size="small"
          placeholder="e.g. Asia/Kolkata"
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
          label={form.isActive ? "Active" : "Inactive"}
        />
      </Grid>
    </Grid>
  );
}

export default TenantForm;
