import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1300,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,

            fontWeight: 600,

            color: "#F8FAFC",
          }}
        >
          Ecommerce Admin
        </Typography>

        <Box mr={2}>{user?.username}</Box>

        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
