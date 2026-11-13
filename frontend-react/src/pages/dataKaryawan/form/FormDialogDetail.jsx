import { useState, forwardRef } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  styled,
  TextField,
} from "@mui/material";
import {
  CalendarToday,
  Close,
  Send,
  VisibilityOff,
  Visibility,
  Save,
} from "@mui/icons-material";
import DatePicker from "react-datepicker";
import { IMaskInput } from "react-imask";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      tabIndex={0}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function FormDialogDetail({
  classes,
  openDetail,
  payloadNewKaryawan,
  handleChange,
  handleCloseDetail,
  handleDetailDataKaryawan,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState(false);

  const handleInputClick = (e) => {
    if (e && e.target) {
      e.target.readOnly = true;
      e.target.placeholder = "dd/MM/yyyy";
      e.target.blur();
      e.target.readOnly = false;
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const MaskedInput = forwardRef(function MaskedInput(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="00/00/0000"
        inputRef={ref}
        onAccept={(value) => onChange({ target: { value } })}
        overwrite
      />
    );
  });

  console.log("Isi Value", value);

  return (
    <>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={openDetail}
        PaperProps={{ style: { width: "500px", padding: "20px" } }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseDetail}
        >
          Detail Karyawan
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChangeTab}
                aria-label="basic tabs example"
              >
                <Tab label="Ubah Data" {...a11yProps(0)} />
                <Tab label="Ubah Kata Sandi" {...a11yProps(1)} />
              </Tabs>
            </Box>
            {value !== false && (
              <>
                <CustomTabPanel value={value} index={0} />
                <CustomTabPanel value={value} index={1} />  
              </>
            )}
          </Box>

          {value === 0 ? (
            <Box>
              <form onSubmit={(e) => handleDetailDataKaryawan(e)}>
                <TextField
                  label="Nama Lengkap"
                  name="fullName"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={payloadNewKaryawan.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                />

                <Box className={classes.datePickerWrapper}>
                  <DatePicker
                    onInputClick={handleInputClick}
                    dateFormat={"dd/MM/yyyy"}
                    showYearDropdown
                    showMonthDropdown
                    yearDropdownItemNumber={100}
                    maxDate={new Date()}
                    scrollableYearDropdown
                    popperPlacement="bottom-start"
                    withPortal
                    popperClassName={classes.datePickerPopper}
                    className={classes.calendarContainer}
                    calendarClassName={classes.calendar}
                    selected={
                      payloadNewKaryawan.dob
                        ? new Date(payloadNewKaryawan.dob)
                        : null
                    }
                    onChangeRaw={(event) => {
                      const rawInput = event.target.value;

                      // kalau kosong reset value
                      if (!rawInput) {
                        handleChange("dob", null);
                        return;
                      }

                      const isValidInput =
                        /^[0-3]?[0-9]\/[0-1]?[0-9]\/[0-9]{4}$/.test(rawInput);

                      if (isValidInput && rawInput.length === 10) {
                        const [day, month, year] = rawInput.split("/");
                        const parsedDate = new Date(`${year}-${month}-${day}`);

                        if (!isNaN(parsedDate.getTime())) {
                          handleChange("dob", parsedDate);
                        }
                      }
                    }}
                    onChange={(e) => handleChange("dob", e)}
                    customInput={
                      <TextField
                        label="Birthday (dd/mm/yyyy)"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="tel"
                        InputProps={{
                          inputComponent: MaskedInput,
                          endAdornment: (
                            <CalendarToday
                              sx={{ paddingBottom: "6px", cursor: "pointer" }}
                            />
                          ),
                        }}
                        sx={{
                          "& .Mui-disabled": {
                            WebkitTextFillColor: "black !important",
                            background: "#ffffff",
                          },
                        }}
                      />
                    }
                  />
                </Box>

                <FormControl sx={{ paddingTop: "16px" }}>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Jenis Kelamin
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={payloadNewKaryawan.jenisKelamin}
                    onChange={(e) =>
                      handleChange("jenisKelamin", e.target.value)
                    }
                  >
                    <FormControlLabel
                      value="l"
                      control={<Radio color="default" />}
                      label="Laki-laki"
                    />
                    <FormControlLabel
                      value="p"
                      control={<Radio color="default" />}
                      label="Perempuan"
                    />
                  </RadioGroup>
                </FormControl>

                <TextField
                  label="Email"
                  name="email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={payloadNewKaryawan.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />

                <Box
                  sx={{
                    paddingTop: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      background: "#18345c",
                      color: "white",
                      fontWeight: "bold",
                      marginTop: "5px",
                      width: "30%",
                    }}
                    startIcon={<Save />}
                  >
                    Simpan
                  </Button>
                </Box>
              </form>
            </Box>
          ) : value === 1 ? (
            <Box>
              <form onSubmit={(e) => handleDetailDataKaryawan(e)}>
                <FormControl
                  variant="outlined"
                  sx={{ width: "100%", marginTop: "16px" }}
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Kata Sandi Baru
                  </InputLabel>
                  <OutlinedInput
                    id="password"
                    label="Kata Sandi Baru"
                    value={payloadNewKaryawan.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <Box
                  sx={{
                    paddingTop: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      background: "#18345c",
                      color: "white",
                      fontWeight: "bold",
                      marginTop: "5px",
                      width: "30%",
                    }}
                    startIcon={<Save />}
                  >
                    Simpan
                  </Button>
                </Box>
              </form>
            </Box>
          ) : (
            <Box>
              <form onSubmit={(e) => handleDetailDataKaryawan(e)}>
                <TextField
                  label="Nama Lengkap"
                  name="fullName"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={payloadNewKaryawan.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  disabled
                  slotProps={{
                    input: {
                      classes: {
                        disabled: classes.disabled,
                      },
                      sx: {
                        // Menghilangkan kursor pengetikan (caret) dengan membuat warnanya transparan
                        caretColor: "transparent",
                        cursor: "default",
                      },
                    },
                  }}
                />

                <Box className={classes.datePickerWrapper}>
                  <DatePicker
                    onInputClick={handleInputClick}
                    dateFormat={"dd/MM/yyyy"}
                    showYearDropdown
                    showMonthDropdown
                    yearDropdownItemNumber={100}
                    maxDate={new Date()}
                    scrollableYearDropdown
                    popperPlacement="bottom-start"
                    withPortal
                    popperClassName={classes.datePickerPopper}
                    className={classes.calendarContainer}
                    calendarClassName={classes.calendar}
                    selected={
                      payloadNewKaryawan.dob
                        ? new Date(payloadNewKaryawan.dob)
                        : null
                    }
                    onChangeRaw={(event) => {
                      const rawInput = event.target.value;

                      // kalau kosong reset value
                      if (!rawInput) {
                        handleChange("dob", null);
                        return;
                      }

                      const isValidInput =
                        /^[0-3]?[0-9]\/[0-1]?[0-9]\/[0-9]{4}$/.test(rawInput);

                      if (isValidInput && rawInput.length === 10) {
                        const [day, month, year] = rawInput.split("/");
                        const parsedDate = new Date(`${year}-${month}-${day}`);

                        if (!isNaN(parsedDate.getTime())) {
                          handleChange("dob", parsedDate);
                        }
                      }
                    }}
                    onChange={(e) => handleChange("dob", e)}
                    customInput={
                      <TextField
                        label="Birthday (dd/mm/yyyy)"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="tel"
                        InputProps={{
                          inputComponent: MaskedInput,
                          endAdornment: (
                            <CalendarToday
                              sx={{ paddingBottom: "6px", cursor: "pointer" }}
                            />
                          ),
                        }}
                        sx={{
                          "& .Mui-disabled": {
                            WebkitTextFillColor: "black !important",
                            background: "#d8d4d4",
                          },
                        }}
                      />
                    }
                    disabled
                  />
                </Box>

                <FormControl sx={{ paddingTop: "16px" }}>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Jenis Kelamin
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={payloadNewKaryawan.jenisKelamin}
                    onChange={(e) =>
                      handleChange("jenisKelamin", e.target.value)
                    }
                  >
                    <FormControlLabel
                      value="l"
                      control={<Radio color="default" />}
                      label="Laki-laki"
                      disabled
                    />
                    <FormControlLabel
                      value="p"
                      control={<Radio color="default" />}
                      label="Perempuan"
                      disabled
                    />
                  </RadioGroup>
                </FormControl>

                <TextField
                  label="Email"
                  name="email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={payloadNewKaryawan.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  disabled
                  slotProps={{
                    input: {
                      classes: {
                        disabled: classes.disabled,
                      },
                      sx: {
                        caretColor: "transparent",
                        cursor: "default",
                      },
                    },
                  }}
                />
              </form>
            </Box>
          )}
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
