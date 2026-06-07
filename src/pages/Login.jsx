import { useState } from "react";

import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Divider,
  Snackbar,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";

import GoogleIcon from "@mui/icons-material/Google";
import StorefrontIcon from "@mui/icons-material/Storefront";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setSnackbar({
        open: true,
        message: "Username and Password are required",
        severity: "warning",
      });
      return;
    }

    setLoading(true);
    const result = await loginUser({ username, password });
    setLoading(false);

    if (result.success) {
      login(result.data);
      setSnackbar({ open: true, message: "Login Successful", severity: "success" });
      navigate("/dashboard", { replace: true });
    } else {
      setSnackbar({ open: true, message: result.message, severity: "error" });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "linear-gradient(135deg, #0f0c29 0%, #1a1560 40%, #24243e 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative circles */}
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "rgba(124,106,247,0.08)",
          top: -100,
          left: -100,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(124,106,247,0.06)",
          bottom: -80,
          right: 100,
          pointerEvents: "none",
        }}
      />

      {/* LEFT SECTION */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          px: 8,
          gap: 3,
        }}
      >
        {/* Brand */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "14px",
              background: "linear-gradient(135deg, #7c6af7 0%, #5b4fcf 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 20px rgba(124,106,247,0.45)",
            }}
          >
            <StorefrontIcon sx={{ color: "#fff", fontSize: 26 }} />
          </Box>
          <Box>
            <Typography
              sx={{ fontWeight: 700, fontSize: "20px", color: "#fff", lineHeight: 1.2 }}
            >
              Ecommerce Admin
            </Typography>
            <Typography
              sx={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.45)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Business Management Platform
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: "36px",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.3,
            maxWidth: 420,
          }}
        >
          Manage your business{" "}
          <Box component="span" sx={{ color: "#7c6af7" }}>
            smarter
          </Box>
          , not harder.
        </Typography>

        <Typography
          sx={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.5)",
            maxWidth: 380,
            lineHeight: 1.8,
          }}
        >
          Track products, orders, customers and tenants — all from one powerful
          dashboard built for modern ecommerce.
        </Typography>

        {/* Feature pills */}
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mt: 1 }}>
          {["Orders", "Inventory", "Analytics", "Multi-tenant"].map((item) => (
            <Box
              key={item}
              sx={{
                px: 2,
                py: 0.75,
                borderRadius: "20px",
                border: "1px solid rgba(124,106,247,0.35)",
                background: "rgba(124,106,247,0.1)",
                color: "rgba(255,255,255,0.75)",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              {item}
            </Box>
          ))}
        </Box>
      </Box>

      {/* RIGHT — LOGIN CARD */}
      <Box
       sx={{
    flex: { xs: 1, md: "0 0 560px" },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    px: { xs: 3, md: 6 },
    py: 6,
    mr: { md: 15 },   // ← add this
  }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 400,
            borderRadius: 4,
            p: 4,
            background: "rgba(255,255,255,0.97)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
          }}
        >
          {/* Card header */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #1a1560 0%, #7c6af7 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 2,
                boxShadow: "0 6px 16px rgba(124,106,247,0.4)",
              }}
            >
              <StorefrontIcon sx={{ color: "#fff", fontSize: 22 }} />
            </Box>
            <Typography variant="h5" fontWeight={700} sx={{ color: "#0f0c29" }}>
              Welcome back
            </Typography>
            <Typography sx={{ fontSize: "13px", color: "#888", mt: 0.5 }}>
              Sign in to your admin account
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              size="small"
              label="Username"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon sx={{ fontSize: 18, color: "#7c6af7" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&.Mui-focused fieldset": { borderColor: "#7c6af7" },
                },
                "& label.Mui-focused": { color: "#7c6af7" },
              }}
            />

            <TextField
              fullWidth
              size="small"
              type={showPassword ? "text" : "password"}
              label="Password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ fontSize: 18, color: "#7c6af7" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon sx={{ fontSize: 18 }} />
                      ) : (
                        <VisibilityIcon sx={{ fontSize: 18 }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&.Mui-focused fieldset": { borderColor: "#7c6af7" },
                },
                "& label.Mui-focused": { color: "#7c6af7" },
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                mt: 2.5,
                mb: 1.5,
                py: 1.25,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                fontSize: "15px",
                background: "linear-gradient(135deg, #1a1560 0%, #7c6af7 100%)",
                boxShadow: "0 4px 16px rgba(124,106,247,0.45)",
                "&:hover": {
                  background: "linear-gradient(135deg, #0f0c29 0%, #5b4fcf 100%)",
                  boxShadow: "0 6px 20px rgba(124,106,247,0.55)",
                },
                "&.Mui-disabled": {
                  background: "rgba(124,106,247,0.3)",
                  color: "rgba(255,255,255,0.5)",
                },
              }}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : "Sign In"}
            </Button>

            <Typography
              sx={{
                textAlign: "center",
                fontSize: "13px",
                color: "#7c6af7",
                cursor: "pointer",
                mb: 2,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Forgot Password?
            </Typography>

            <Divider sx={{ my: 2, fontSize: "12px", color: "#aaa" }}>OR</Divider>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{
                py: 1.1,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
                fontSize: "14px",
                borderColor: "rgba(124,106,247,0.4)",
                color: "#5b4fcf",
                "&:hover": {
                  borderColor: "#7c6af7",
                  background: "rgba(124,106,247,0.05)",
                },
              }}
            >
              Continue with Google
            </Button>
          </form>
        </Paper>
      </Box>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Login;