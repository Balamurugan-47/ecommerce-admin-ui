import { TextField, Grid, FormControlLabel, Switch, MenuItem } from "@mui/material";
import "../common.css";

function UserForm({ form, setForm, mode, roleOptions = [] }) {
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Grid container spacing={2} className="form-grid-mt">
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          size="small"
          label="Username"
          name="username"
          required
          value={form.username}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          size="small"
          label="Email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          size="small"
          label="First Name"
          name="firstName"
          required
          value={form.firstName}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          size="small"
          label="Last Name"
          name="lastName"
          required
          value={form.lastName}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          size="small"
          label="Phone"
          name="phone"
          required
          value={form.phone}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          size="small"
          label="Timezone"
          name="timezone"
          required
          value={form.timezone || "Asia/Kolkata"}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          select
          fullWidth
          size="small"
          label="Role"
          name="roleId"
          required
          value={form.roleId ?? ""}
          onChange={handleChange}
        >
          {roleOptions.map((role) => (
            <MenuItem key={role.roleId} value={role.roleId}>
              {role.roleName}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {mode === "create" && (
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
        </Grid>
      )}

      <Grid item xs={12} md={6}>
        <FormControlLabel
          control={
            <Switch
              checked={form.isActive}
              onChange={(e) =>
                setForm({
                  ...form,
                  isActive: e.target.checked,
                })
              }
              color="success"
            />
          }
          label={form.isActive ? "Active" : "Inactive"}
        />
      </Grid>
    </Grid>
  );
}

export default UserForm;