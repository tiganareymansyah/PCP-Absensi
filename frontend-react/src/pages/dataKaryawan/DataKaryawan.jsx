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
import AddIcon from "@mui/icons-material/Add";
import FormDialogAdd from "./form/FormDialogAdd";
import { useMediaQuery } from "react-responsive";
import { useNewKaryawanStyles } from "./style";
import { formatDateIndonesia, formatDateYYYYMMDD } from "../../services/utils";
import FormDialogDetail from "./form/FormDialogDetail";
import { apiAddNewKaryawan } from "../../api/api";

export default function DataKaryawan(props) {
  console.log("Data Props", props);

  const isMobile = useMediaQuery({ maxWidth: 991 });
  const classes = useNewKaryawanStyles({ isMobile });

  const [listDataKaryawan, setListDataKaryawan] = useState([
    {
      id_karyawan: "111",
      nama_lengkap: "Hadi Kusuma",
      dob: "1945-08-17",
    },
    {
      id_karyawan: "112",
      nama_lengkap: "Tigana Reymansyah",
      dob: "1946-08-17",
    },
    {
      id_karyawan: "113",
      nama_lengkap: "Fazlulsyah Reza",
      dob: "1947-08-17",
    },
    {
      id_karyawan: "114",
      nama_lengkap: "Imam Syafi'i Pasaribu",
      dob: "1948-08-17",
    },
    {
      id_karyawan: "115",
      nama_lengkap: "Muhammad Abduh Laden Hutabarat",
      dob: "1949-08-17",
    },
    {
      id_karyawan: "116",
      nama_lengkap: "Ilham",
      dob: "1950-08-17",
    },
    {
      id_karyawan: "117",
      nama_lengkap: "Simon Andreas",
      dob: "1951-08-17",
    },
  ]);

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
      textTransform: "uppercase",
      WebkitTextFillColor: "black",
    },

    inputCapitalize: {
      fontFamily: "Roboto, sans-serif",
      textTransform: "capitalize",
      WebkitTextFillColor: "black",
    },

    disabled: {
      "& .MuiInputBase-input": {
        color: "black !important",
        fontSize: 17,
        fontFamily: "Roboto, sans-serif",
        WebkitTextFillColor: "black !important",
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
      },
      "&.css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root": {
        padding: "0px",
      },
    },

    // Batas css yang tidak dipindahin dari package mui styles

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
      backgroundColor: "#2F6B3F",
      "&:hover": {
        backgroundColor: "#7FB77E",
      },
    },

    buttonDetail: {
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

    buttonDelete: {
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
        color: "#1d113a",
        borderColor: "#1d113a",
        "&.Mui-selected": {
          color: "#fff",
          backgroundColor: "#1d113a",
          borderColor: "#1d113a",
        },
        "&:hover": {
          color: "#1d113a",
          backgroundColor: "#fff",
          borderColor: "#1d113a",
        },
      },
    },
  };

  const [pageListDataKaryawan, setPageListDataKaryawan] = useState(1);
  const [detailDataKaryawan, setDetailDataKaryawan] = useState();
  const [openDetail, setOpenDetail] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
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

  const [payloadNewKaryawan, setPayloadNewKaryawan] = useState({
    namaLengkap: "",
    dob: "",
    jenisKelamin: "",
    email: "",
    password: "",
  });

  let itemPerPagesListDataKaryawan = 5;

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

  const handleCloseAlert = () => {
    setOpenAlert(false);
    if (severity === "successNoReload") {
      location.href = "/datakaryawan";
    }
  };

  const handleChange = (name, value) => {
    setPayloadNewKaryawan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenAdd = () => {
    setOpenDialog(true);
    setPayloadNewKaryawan((prev) => ({
      ...prev,
      namaLengkap: "",
      dob: "",
      jenisKelamin: "",
      email: "",
      password: "",
    }));
  };

  const handleCloseAdd = () => {
    setOpenDialog(false);
  };

  const handleOpenDetail = (data) => {
    console.log("Detail Data Karyawan", data);

    setDetailDataKaryawan(data);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => {
    setOpenDetail(false);
  };

  const handleAddNewKaryawan = async (e) => {
    e.preventDefault();
    props.doLoad();
    try {
      let dataAdd = {
        namalengkap: payloadNewKaryawan.namaLengkap,
        dob: formatDateYYYYMMDD(payloadNewKaryawan.dob),
        gender: payloadNewKaryawan.jenisKelamin,
        email: payloadNewKaryawan.email,
        password: payloadNewKaryawan.password,
      };

      console.log("Payload Data Baru Karyawan", dataAdd);

      const result = await apiAddNewKaryawan({
        body: JSON.stringify(dataAdd),
      });

      const { code, status, message, data } = result;

      if (status === "success") {
        handleAlert(true, "successNoReload", "Success", message);
        props.doLoad();
      }
    } catch (err) {
      console.log(err);
      props.doLoad();
    }
  };

  const handleDetailNewKaryawan = async (e) => {
    e.preventDefault();
    props.doLoad();
    try {
      let dataAdd = {
        fullname: payloadNewKaryawan.namaLengkap,
        tbt: formatDateYYYYMMDD(payloadNewKaryawan.dob),
        gender: payloadNewKaryawan.jenisKelamin,
        email: payloadNewKaryawan.email,
        password: payloadNewKaryawan.password,
      };

      console.log("Payload Data Baru Karyawan", dataAdd);

      props.doLoad();
      return;

      // const result = await apiDetailPegawaiBaru({
      //   body: JSON.stringify(dataAdd),
      // });

      const { code, status, message, data } = result;

      if (status === "success") {
        handleAlert(true, "successNoReload", "Success", message);
        props.doLoad();
      }
    } catch (err) {
      console.log(err);
      props.doLoad();
    }
  };

  const handleDeleteDataKaryawan = async (value) => {
    try {
      console.log("Delete Data Karyawan", value);
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

  console.log("Data Karyawan", mapListDataKaryawan);

  return (
    <>
      <Layout>
        <Box sx={{ margin: "12px" }}>
          <Box className={styles.containerParent}>
            <Box
              sx={{
                marginBottom: "10px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Data Karyawan
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Button
                    sx={styles.buttonAdd}
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenAdd()}
                  >
                    Tambah
                  </Button>
                </Box>
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
                      // width: "14%",
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
            </Box>

            <TableContainer component={Paper} className={styles.tableContainer}>
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
                          {formatDateIndonesia(data.dob)}
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
                              sx={styles.buttonDetail}
                              startIcon={<ManageSearch />}
                              onClick={() => handleOpenDetail(data)}
                            >
                              Detail
                            </Button>

                            <Button
                              sx={styles.buttonDelete}
                              startIcon={<DeleteForever />}
                              onClick={() => handleDeleteDataKaryawan(data)}
                            >
                              Hapus
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <Typography sx={{ fontStyle: "italic" }}>
                          Tidak ada data karyawan.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
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

      {openDialog && (
        <FormDialogAdd
          classes={classes}
          openDialog={openDialog}
          payloadNewKaryawan={payloadNewKaryawan}
          handleChange={handleChange}
          handleCloseAdd={handleCloseAdd}
          handleAddNewKaryawan={handleAddNewKaryawan}
        />
      )}

      {openDetail && (
        <FormDialogDetail
          classes={classes}
          openDetail={openDetail}
          detailDataKaryawan={detailDataKaryawan}
          handleChange={handleChange}
          handleCloseDetail={handleCloseDetail}
          handleDetailNewKaryawan={handleDetailNewKaryawan}
        />
      )}
    </>
  );
}
