import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Tooltip,
  Divider,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import StorefrontIcon from "@mui/icons-material/Storefront";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [notifHover, setNotifHover] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "U";

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "linear-gradient(135deg, #0f0c29 0%, #1a1560 40%, #24243e 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 1px 24px rgba(0,0,0,0.45)",
        zIndex: 1300,
        backdropFilter: "blur(12px)",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "64px !important",
          px: { xs: 2, sm: 3 },
          gap: 1,
        }}
      >
        {/* Hamburger */}
        <Tooltip title="Toggle Sidebar" arrow>
          <IconButton
            edge="start"
            onClick={toggleSidebar}
            sx={{
              color: "rgba(255,255,255,0.7)",
              borderRadius: "10px",
              p: 1,
              transition: "all 0.2s ease",
              "&:hover": {
                color: "#fff",
                background: "rgba(255,255,255,0.1)",
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Brand */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            ml: 0.5,
          }}
        >
          {/* Icon pill */}
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #7c6af7 0%, #5b4fcf 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(124,106,247,0.4)",
              flexShrink: 0,
            }}
          >
            <StorefrontIcon sx={{ color: "#fff", fontSize: 18 }} />
          </Box>

          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "15px",
                lineHeight: 1.15,
                color: "#ffffff",
                letterSpacing: "0.01em",
              }}
            >
              Ecommerce Admin
            </Typography>
            <Typography
              sx={{
                fontSize: "10.5px",
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.03em",
                textTransform: "uppercase",
              }}
            >
              Business Management Platform
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

          {/* Notification Bell */}
          <Tooltip title="Notifications" arrow>
            <IconButton
              onMouseEnter={() => setNotifHover(true)}
              onMouseLeave={() => setNotifHover(false)}
              sx={{
                color: "rgba(255,255,255,0.65)",
                borderRadius: "10px",
                p: 1,
                position: "relative",
                transition: "all 0.2s ease",
                "&:hover": {
                  color: "#fff",
                  background: "rgba(255,255,255,0.08)",
                },
              }}
            >
              <NotificationsNoneOutlinedIcon fontSize="small" />
              {/* Notification dot */}
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#7c6af7",
                  border: "1.5px solid #1a1560",
                }}
              />
            </IconButton>
          </Tooltip>

          {/* Divider */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              borderColor: "rgba(255,255,255,0.1)",
              mx: 0.5,
              my: 1.5,
            }}
          />

          {/* User Card */}
          <Tooltip title="Logout" arrow>
            <Box
              onClick={handleLogout}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                px: 1.5,
                py: 0.75,
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                border: "1px solid transparent",
                "&:hover": {
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                },
              }}
            >
              {/* Avatar */}
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  fontSize: "12px",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #7c6af7 0%, #5b4fcf 100%)",
                  boxShadow: "0 2px 8px rgba(124,106,247,0.5)",
                  color: "#fff",
                  letterSpacing: "0.05em",
                }}
              >
                {initials}
              </Avatar>

              {/* Name & Role */}
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#ffffff",
                    lineHeight: 1.2,
                  }}
                >
                  {user?.username || "Admin"}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "10.5px",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.2,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                  }}
                >
                  Administrator
                </Typography>
              </Box>

              {/* Logout icon */}
              <LogoutIcon
                sx={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.4)",
                  ml: 0.25,
                  transition: "color 0.2s",
                  "&:hover": { color: "#EF4444" },
                }}
              />
            </Box>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;