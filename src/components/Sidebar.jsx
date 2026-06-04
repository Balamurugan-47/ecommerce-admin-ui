import { useState } from "react";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Toolbar,
} from "@mui/material";

import {
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Sidebar(
  {open,
  toggleSidebar}
) {

  const navigate = useNavigate();

  const [openMenu, setOpenMenu] =
    useState(null);

const { user } = useAuth();

const menus = user?.menus || [];

  const modules = menus
    .filter((m) => m.parentMenuId === null)
    .sort(
      (a, b) =>
        a.displayOrder - b.displayOrder
    );

  const routeMap = {
    Dashboard: "/dashboard",
    Users: "/user",
    Roles: "/user-role",
    Product: "/product",
    Order: "/order",
  };

  return (

   <Drawer
  variant="persistent"
  open={open}
  sx={{
    width: 260,
    flexShrink: 0,

    "& .MuiDrawer-paper": {
      width: 260,
      boxSizing: "border-box",

      backgroundColor: "#E3F2FD",
      borderRight: "1px solid #BBDEFB",
    },
  }}
>

      <Toolbar />

      <List>

        {modules.map((module) => {

          const children = menus.filter(
            (menu) =>
              menu.parentMenuId ===
              module.menuId
          );

          const hasChildren =
            children.length > 0;

          return (
            <div key={module.menuId}>

              <ListItemButton  sx={{
    color: "#0D47A1",
    fontWeight: 700,

    "&:hover": {
      backgroundColor: "#BBDEFB",
    },
  }}
                onClick={() => {

                  if (!hasChildren) {

                    navigate(
                      routeMap[
                        module.menuName
                      ]
                    );

                    return;
                  }

                  setOpenMenu(
                    openMenu === module.menuId
                      ? null
                      : module.menuId
                  );
                }}
              >

                <ListItemText
                  primary={module.menuName}
                />

                {hasChildren &&
                  (openMenu === module.menuId
                    ? <ExpandLess />
                    : <ExpandMore />)}

              </ListItemButton>

              {hasChildren && (

                <Collapse
                  in={
                    openMenu ===
                    module.menuId
                  }
                >

                  <List>

                    {children.map(
                      (child) => (

                        <ListItemButton 
                          key={
                            child.menuId
                          }
                           sx={{
    pl: 6,

    color: "#1565C0",

    "&:hover": {
      backgroundColor: "#CFE8FC",
    },
  }}
                          onClick={() =>
                            navigate(
                              routeMap[
                                child
                                  .menuName
                              ]
                            )
                          }
                        >

                          <ListItemText
                            primary={
                              child.menuName
                            }
                          />

                        </ListItemButton>

                      )
                    )}

                  </List>

                </Collapse>

              )}

            </div>
          );
        })}

      </List>

    </Drawer>
  );
}

export default Sidebar;