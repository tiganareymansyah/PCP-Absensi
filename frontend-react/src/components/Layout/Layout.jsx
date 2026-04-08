import { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import Navbar from "../Navbar/Navbar";

export default function Layout({ children }) {
  const [open, setOpen] = useState(true);
  const drawerWidth = 140;

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar open={open} setOpen={setOpen} drawerWidth={drawerWidth} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: "0.3s",
          marginLeft: open ? `${drawerWidth}px` : 0,
        }}
      >
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
}
