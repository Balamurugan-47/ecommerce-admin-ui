import { TextField, Stack } from "@mui/material";

function UserForm({
  form,

  setForm,
}) {
  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  return (
    <Stack spacing={2} mt={1}>
      <TextField
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
      />

      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />

      <TextField
        label="First Name"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
      />

      <TextField
        label="Last Name"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
      />
    </Stack>
  );
}

export default UserForm;
