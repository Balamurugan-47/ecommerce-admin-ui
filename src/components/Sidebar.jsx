import { useState, useEffect, useRef } from "react";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Toolbar,
  Box,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";

import {
  ExpandLess,
  ExpandMore,
  Dashboard,
  People,
  Security,
  AdminPanelSettings,
  Inventory,
  ShoppingCart,
  Apps,
  MenuOpen,
  Menu,
} from "@mui/icons-material";

import { useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const drawerWidth = 260;

function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const location = useLocation();

  const [openMenu, setOpenMenu] = useState(null);

  const drawerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  const { user } = useAuth();

  const menus = user?.menus || [];

  const modules = menus

    .filter((m) => m.parentMenuId === null)

    .sort((a, b) => a.displayOrder - b.displayOrder);

  const routeMap = {
    Dashboard: "/dashboard",

    Users: "/user",

    Roles: "/user-role",

    Product: "/product",

    Order: "/order",

    Tenants: "/tenant",

    Administration: "/administration",
  };

  const iconMap = {
    Dashboard: <Dashboard />,

    Administration: <AdminPanelSettings />,

    Users: <People />,

    Roles: <Security />,

    Product: <Inventory />,

    Order: <ShoppingCart />,
  };

  const getIcon = (menuName) => {
    return iconMap[menuName] || <Apps />;
  };

  return (
    <Drawer
      ref={drawerRef}
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: open ? drawerWidth : 0,

        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : 0,

          boxSizing: "border-box",

          overflowX: "hidden",

          whiteSpace: "nowrap",

          transition: "all .3s ease",

          background: "linear-gradient(180deg,#0F172A 0%, #111827 100%)",

          color: "#ffffff",

          borderRight: "1px solid rgba(255,255,255,0.08)",

          boxShadow: "4px 0px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Toolbar />

      <Box
        sx={{
          display: "flex",

          alignItems: "center",

          gap: 2,

          px: 2,

          py: 2,
        }}
      >
        <Avatar
          sx={{
            bgcolor: "#2563EB",
            width: 34,
            height: 34,
            fontSize: "16px",
          }}
        >
          E
        </Avatar>

        {open && (
          <Box>
            <Typography fontWeight={600} fontSize={16} lineHeight={1.1}>
              Ecommerce
            </Typography>

            <Typography fontSize={10} color="#94A3B8">
              Admin Panel
            </Typography>
          </Box>
        )}
      </Box>

      <Divider
        sx={{
          borderColor: "rgba(255,255,255,0.08)",
        }}
      />

      <List sx={{ mt: 1 }}>
        {modules.map((module) => {
          const children = menus.filter(
            (menu) => menu.parentMenuId === module.menuId,
          );

          const hasChildren = children.length > 0;

          return (
            <Box key={module.menuId}>
              <ListItemButton
                selected={location.pathname === routeMap[module.menuName]}
                sx={{
                  mx: 1,
                  mb: 0.3,
                  borderRadius: 2,
                  minHeight: 42,
                  px: 1.5,
                  fontSize: "14px",
                }}
                onClick={() => {
                  if (!hasChildren) {
                    navigate(routeMap[module.menuName]);

                    setOpen(false);

                    return;
                  }

                  setOpenMenu(
                    openMenu === module.menuId ? null : module.menuId,
                  );
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "white",

                    minWidth: 0,

                    mr: open ? 3 : 0,

                    justifyContent: "center",
                  }}
                >
                  {getIcon(module.menuName)}
                </ListItemIcon>

                {open && (
                  <>
                    <ListItemText primary={module.menuName} />

                    {hasChildren &&
                      (openMenu === module.menuId ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      ))}
                  </>
                )}
              </ListItemButton>

              {hasChildren && (
                <Collapse in={openMenu === module.menuId}>
                  <List>
                    {children.map((child) => (
                      <ListItemButton
                        key={child.menuId}
                        onClick={() => {
                          navigate(routeMap[child.menuName]);

                          setOpen(false);
                        }}
                        sx={{
                          pl: open ? 5 : 2,

                          mx: 1,

                          mb: 0.3,

                          minHeight: 36,

                          borderRadius: 2,

                          justifyContent: open ? "initial" : "center",

                          "& .MuiTypography-root": {
                            fontSize: "13px",
                          },

                          "&:hover": {
                            background: "#1E293B",
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: "#CBD5E1",

                            minWidth: 0,

                            mr: open ? 2 : 0,
                          }}
                        >
                          {getIcon(child.menuName)}
                        </ListItemIcon>

                        {open && <ListItemText primary={child.menuName} />}
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          );
        })}
      </List>

      <Box
        sx={{
          mt: "auto",

          p: 1.5,

          borderTop: "1px solid rgba(255,255,255,.08)",

          display: "flex",

          alignItems: "center",

          gap: 1.2,
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            fontSize: "14px",
          }}
        >
          {user?.username?.[0]}
        </Avatar>

        {open && (
          <Box>
            <Typography fontWeight={700} fontSize={14}>
              {user?.username}
            </Typography>

            <Typography fontSize={12} color="#94A3B8">
              {user?.roles?.[0]}
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}

export default Sidebar;
