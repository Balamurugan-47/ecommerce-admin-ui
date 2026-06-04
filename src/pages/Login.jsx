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
} from "@mui/material";

import GoogleIcon from "@mui/icons-material/Google";

import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";

import "../styles/Login.css";

import { loginUser } from "../api/authApi";

import { useAuth } from "../context/AuthContext";

function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

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

    const payload = {
      username,
      password,
    };

    const result = await loginUser(payload);

    setLoading(false);

    if (result.success) {

  const data = result.data;

login(data);

  setSnackbar({
    open: true,
    message: "Login Successful",
    severity: "success",
  });

 navigate("/dashboard", { replace: true });

} else {

      setSnackbar({
        open: true,
        message: result.message,
        severity: "error",
      });
    }
  };

  return (

    <Box className="login-page">

      {/* LEFT SECTION */}

      <Box className="login-left">

        <Box className="brand-box">

          <img
            src={logo}
            alt="Logo"
            className="brand-logo"
          />

        </Box>

        <Typography className="login-subtitle">

          Manage your products, orders and customers
          with a modern ecommerce dashboard.

        </Typography>

      </Box>

      {/* LOGIN CARD */}

      <Paper
        elevation={0}
        className="login-card"
      >

        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          mb={3}
        >
          Sign In
        </Typography>

        <form onSubmit={handleSubmit}>

          <TextField
            fullWidth
            size="small"
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <TextField
            fullWidth
            size="small"
            type="password"
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            className="login-btn"
            disabled={loading}
          >

            {loading ? (
              <CircularProgress
                size={22}
                color="inherit"
              />
            ) : (
              "Login"
            )}

          </Button>

          <Typography className="forgot-text">
            Forgot Password?
          </Typography>

          <Divider className="divider">
            OR
          </Divider>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<GoogleIcon />}
            className="google-btn"
          >
            Continue with Google
          </Button>

        </form>

      </Paper>

      {/* SNACKBAR */}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
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