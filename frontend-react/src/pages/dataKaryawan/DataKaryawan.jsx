import { useState } from "react";
import {
  Box,
  Button,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { DeleteForever, ManageSearch, Tune } from "@mui/icons-material";
import Layout from "../../components/Layout/Layout";
import Alert from "../../components/Alert/Alert";
import Select, { components } from "react-select";

export default function DataKaryawan(props) {
  console.log("Data Karyawan", props);

  const [listDataKaryawan, setListDataKaryawan] = useState([]);
  const [pageListDataKaryawan, setPageListDataKaryawan] = useState(1);
  const [detailListDataKaryawan, setDetailListDataKaryawan] = useState();
  const [openDetail, setOpenDetail] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectState, setSelectState] = useState({
    status: {
      selectedState: "",
      states: [
        { value: "aktif", label: "AKTIF" },
        { value: "belum bayar", label: "BELUM BAYAR" },
        { value: "selesai", label: "SELESAI" },
        { value: "kadaluarsa", label: "KADALUARSA" },
      ],
    },
  });

  let itemPerPagesListDataKaryawan = 5;

  const styles = {
    containerParent: {
      marginLeft: "10vw",
      marginRight: "10vw",
      marginTop: "5vw",
      marginBottom: "5vw",
    },

    containerChild: {
      marginBottom: "10px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    tableContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    inputUppercase: {
      fontFamily: "Roboto, sans-serif",
      // fontWeight: "bold",
      textTransform: "uppercase",
      WebkitTextFillColor: "black",
    },

    inputCapitalize: {
      fontFamily: "Roboto, sans-serif",
      // fontWeight: "bold",
      textTransform: "capitalize",
      WebkitTextFillColor: "black",
    },

    disabled: {
      "& .MuiInputBase-input": {
        color: "black !important",
        fontSize: 17,
        // fontWeight: "600",
        fontFamily: "Roboto, sans-serif",
        WebkitTextFillColor: "black !important",
        //   textTransform: "UPPERCASE",
      },
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderWidth: 0,
        },
        "&:hover fieldset": {
          borderWidth: 0,
        },
        "& fieldset": {
          borderWidth: 0,
        },
      },
      "& .Mui-disabled": {
        borderRadius: "5px",
        // backgroundColor: "#d8d4d4",
      },
      "&.css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root": {
        padding: "0px",
      },
    },

    label: {
      fontWeight: "700",
      fontSize: "18px",
      textTransform: "capitalize",
    },

    buttonAdd: {
      padding: "7px 14px",
      textAlign: "center",
      cursor: "pointer",
      borderRadius: "6px",
      color: "#fff",
      backgroundColor: "#0F67B1",
      "&:hover": {
        backgroundColor: "#3FA2F6",
      },
    },

    buttonCekDetail: {
      padding: "7px 14px",
      textAlign: "center",
      cursor: "pointer",
      borderRadius: "6px",
      color: "#fff",
      backgroundColor: "#0F67B1",
      "&:hover": {
        backgroundColor: "#3FA2F6",
      },
      // backgroundColor: "#367E18",
      // "&:hover": {
      //     backgroundColor: "#54B435",
      // },
    },

    buttonPayment: {
      padding: "7px 14px",
      textAlign: "center",
      cursor: "pointer",
      borderRadius: "6px",
      color: "#fff",
      backgroundColor: "#D21312",
      "&:hover": {
        backgroundColor: "#FF0303",
      },
    },

    stackPagination: {
      paddingTop: "16px",
      "& .MuiPagination-root": {
        display: "flex",
        justifyContent: "end",
      },
    },

    pagination: {
      "& .MuiPaginationItem-root": {
        color: "#000",
        borderColor: "#000",
        "&.Mui-selected": {
          color: "#000",
          backgroundColor: "#000",
          borderColor: "#000",
        },
        "&:hover": {
          color: "#000",
          backgroundColor: "#0000",
          borderColor: "#000",
        },
      },
    },
  };

  const handleChangeSelectState = (name, state) => {
    setSelectState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        selectedState: state,
      },
    }));
  };

  const handleChangePageListDataKaryawan = (event, value) => {
    setPageListDataKaryawan(value);
  };

  const totalPagesListDataKaryawan = Math.ceil(
    listDataKaryawan?.length / itemPerPagesListDataKaryawan,
  );
  const mapListDataKaryawan = listDataKaryawan?.slice(
    (pageListDataKaryawan - 1) * itemPerPagesListDataKaryawan,
    pageListDataKaryawan * itemPerPagesListDataKaryawan,
  );

  const customControl = ({ children, ...props }) => (
    <components.Control {...props}>
      <Tune sx={{ marginLeft: "8px" }} /> {children}
    </components.Control>
  );

  const handleAlert = (open, severity, title, message) => {
    setOpenAlert(open);
    setSeverity(severity);
    setTitle(title);
    setMessage(message);
  };

  const handleOpenDetail = (data) => {
    console.log("Detail List Data Karyawan", value);
    return;

    setDetailListDataKaryawan(data);
    setOpenDetail(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    if (severity === "successNoReload") {
      location.href = "/kelola-admin";
    }
  };

  const handleDeleteListDataKaryawan = async (value) => {
    try {
      console.log("Delete List Data Karyawan", value);
      return;

      let payload = value;

      const result = await apiDeleteDataBooking({
        body: JSON.stringify(payload),
      });

      const { code, status, message, data } = result;

      if (status === "success") {
        handleAlert(true, "successNoReload", "Success", message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Layout>
        <Box sx={{ margin: "12px" }}>
          <Box className={styles.containerParent}>
            <Box className={styles.containerChild}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Data Karyawan
              </Typography>
              <Select
                placeholder="filter status"
                components={{ Control: customControl }}
                onChange={(state) => handleChangeSelectState("status", state)}
                value={selectState.status.selectedState}
                options={selectState.status.states}
                styles={{
                  container: (baseStyles, _state) => ({
                    ...baseStyles,
                    ...styles.label,
                    fontSize: 14,
                    width: "21%",
                  }),
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    textIndent: "10px",
                    backgroundColor: state.isDisabled && "#d8d4d4",
                  }),
                  singleValue: (baseStyles, state) => ({
                    ...baseStyles,
                    color: "#000000",
                  }),
                }}
                className="form-input"
              />
            </Box>

            <TableContainer
              component={Paper}
              className={styles.tableContainer}
            >
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      No.
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      Id Karyawan
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      Nama Lengkap
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      Tanggal Lahir
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                {mapListDataKaryawan?.length > 0 ? (
                  <TableBody>
                    {mapListDataKaryawan?.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">
                          {(pageListDataKaryawan - 1) *
                            itemPerPagesListDataKaryawan +
                            index +
                            1}
                          .
                        </TableCell>
                        <TableCell align="center">{data.id_karyawan}</TableCell>
                        <TableCell
                          align="center"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {data.nama_lengkap}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {data.tanggal_lahir}
                        </TableCell>
                        <TableCell
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <Button
                              sx={styles.buttonCekDetail}
                              startIcon={<ManageSearch />}
                              onClick={() => handleOpenDetail(data)}
                            >
                              Detail
                            </Button>

                            <Button
                              sx={styles.buttonPayment}
                              startIcon={<DeleteForever />}
                              onClick={() => handleDeleteListDataKaryawan(data)}
                            >
                              Hapus
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <Typography sx={{ fontStyle: "italic" }}>
                        Tidak ada data karyawan.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </Table>
            </TableContainer>

            <Stack spacing={2} sx={styles.stackPagination}>
              <Pagination
                count={totalPagesListDataKaryawan}
                page={pageListDataKaryawan}
                onChange={handleChangePageListDataKaryawan}
                variant="outlined"
                sx={styles.pagination}
              />
            </Stack>
          </Box>
        </Box>
      </Layout>

      {openAlert && (
        <Alert
          open={openAlert}
          close={handleCloseAlert}
          severity={severity}
          title={title}
          message={message}
        />
      )}
    </>
  );
}
