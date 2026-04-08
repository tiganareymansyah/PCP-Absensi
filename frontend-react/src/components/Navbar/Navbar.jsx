import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import TodayIcon from "@mui/icons-material/Today";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logoPlatinumCineplex from "../../assets/Logo Platinum Cineplex RemoveBg.png";
import logoPPlatinumCineplex from "../../assets/Logo P Platinum Cineplex RemoveBg.png";
import CustomButton from "../Button/Button";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { orange } from "@mui/material/colors";

export default function Navbar({ open, setOpen, drawerWidth }) {
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const TopNavbar = (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#1d113a",
        transition: "0.3s",
        marginLeft: open ? `${drawerWidth}px` : 0,
        width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: "16px" }}>
          {!open && (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{
                  mr: 2,
                  "&:hover": { color: "#120b27" },
                  transition: "color 0.2s ease",
                }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>

              <img
                src={logoPlatinumCineplex}
                width={140}
                height={50}
                style={{ cursor: "pointer" }}
              />
            </>
          )}
        </Box>
        <CustomButton
          text={"Logout"}
          color={"#1d113a"}
          backgroundColor={"#fff"}
          hover={{ color: "#fff", backgroundColor: "#120b27" }}
          transition={"color 0.2s ease"}
        />
      </Toolbar>
    </AppBar>
  );

  const DrawerList = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
        }}
      >
        <CloseIcon
          onClick={toggleDrawer(false)}
          sx={{
            fontSize: "32px",
            color: "#fff",
            "&:hover": { color: "#120b27" },
            transition: "color 0.2s ease",
            cursor: "pointer",
          }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img
          src={logoPPlatinumCineplex}
          width={70}
          height={95}
          style={{ cursor: "pointer" }}
        />
      </Box>
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                position: "relative",
                "&::before, &::after": {
                  content: '""',
                  position: "absolute",
                  left: "60%",
                  width: "0%",
                  transition: "width 0.3s ease",
                },
                "&::before": {
                  top: 0,
                  borderTop: "2px solid #fff",
                  transform: "translateX(-30%)",
                },
                "&::after": {
                  bottom: 0,
                  borderBottom: "2px solid #fff",
                  transform: "translateX(-130%)",
                },
                "&:hover::before, &:hover::after": {
                  width: "40%",
                },

                "&:hover": { backgroundColor: "#120b27" },
              }}
            >
              <ListItemIcon>
                <PeopleIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary={"Data Karyawan"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                position: "relative",
                "&::before, &::after": {
                  content: '""',
                  position: "absolute",
                  left: "60%",
                  width: "0%",
                  transition: "width 0.3s ease",
                },
                "&::before": {
                  top: 0,
                  borderTop: "2px solid #fff",
                  transform: "translateX(-30%)",
                },
                "&::after": {
                  bottom: 0,
                  borderBottom: "2px solid #fff",
                  transform: "translateX(-130%)",
                },
                "&:hover::before, &:hover::after": {
                  width: "40%",
                },

                "&:hover": { backgroundColor: "#120b27" },
              }}
            >
              <ListItemIcon>
                <TodayIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary={"Absensi"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                position: "relative",
                "&::before, &::after": {
                  content: '""',
                  position: "absolute",
                  left: "60%",
                  width: "0%",
                  transition: "width 0.3s ease",
                },
                "&::before": {
                  top: 0,
                  borderTop: "2px solid #fff",
                  transform: "translateX(-30%)",
                },
                "&::after": {
                  bottom: 0,
                  borderBottom: "2px solid #fff",
                  transform: "translateX(-130%)",
                },
                "&:hover::before, &:hover::after": {
                  width: "40%",
                },

                "&:hover": { backgroundColor: "#120b27" },
              }}
            >
              <ListItemIcon>
                <SettingsIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ListItemText primary={"Pengaturan"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Box>
    </Box>
  );

  return (
    <>
      {TopNavbar}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: open && drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            backgroundColor: "#1d113a",
            color: "#fff",
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
}
