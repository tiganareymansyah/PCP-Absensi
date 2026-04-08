import { Box, Typography } from "@mui/material";
import Layout from "../../components/Layout/Layout";

export default function DataKaryawan(props) {
  console.log("Data Karyawan", props);

  return (
    <>
      <Layout>
        <Box sx={{ margin: "12px" }}>
          <Typography sx={{ fontSize: "22px", fontWeight: "bold" }}>
            Data Karyawan
          </Typography>
        </Box>
      </Layout>
    </>
  );
}
