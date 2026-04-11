import { Check, Close, PriorityHigh } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Alert({ open, close, severity, title, message }) {
  const isMobile = useMediaQuery({ maxWidth: 991 });

  const styles = {
    rowContainer: {
        paddingTop: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        justifyContent: "center",
        alignItems: "center",
        width: isMobile ? "150px" : "300px"
    },

    dialogTitle: {
        position: "relative"
    },

    iconClose : {
        cursor: "pointer",
        position: "absolute",
        right: "0px",
        top: "0px",
        color: "#000"
    },

    boxButton: {
        paddingTop: "24px",
        display: "flex",
        gap: "128px"
    },

    textTitle: {
      fontFamily: "sans-serif",
      fontSize: "24px",
      fontWeight: "bold",
      textTransform: "uppercase",
    },

    textMessage: {
      fontFamily: "sans-serif",
      fontSize: "16px",
      textAlign: "center",
    },

    textRedirect: {
      fontFamily: "sans-serif",
      fontSize: "12px",
    },

    buttonPrev: {
      padding: "7px 14px",
      textAlign: "center",
      cursor: "pointer",
      borderRadius: "8px",
      color: "black",
      backgroundColor: "#f00",
      "&:hover": {
        color: "black",
      },
    },

    buttonNext: {
      padding: "7px 14px",
      textAlign: "center",
      cursor: "pointer",
      borderRadius: "8px",
      color: "black",
      backgroundColor: "#0f0",
      "&:hover": {
        color: "black",
      },
    },
  };

  const [redirectCount, setRedirectCount] = useState(3);

  const handleAutoClose = () => {
    if (open && redirectCount > 0) {
      setTimeout(() => setRedirectCount(redirectCount - 1), 1000);
    } else if (redirectCount === 0) {
      close();
      setRedirectCount(3);
    }
  };

  useEffect(() => {
    if (severity === "success") {
      handleAutoClose();
      if (!open) {
        setRedirectCount(3);
      }
    }
  }, [open, redirectCount]);

  return (
    <Dialog
      open={open}
      onClose={close}
      PaperProps={{
        style: {
          borderRadius: "10px",
          padding: 20,
          zIndex: 999999999,
        },
      }}
    >
      <DialogTitle className={styles.dialogTitle}>
        {severity !== "choose" ? (
          <Close
            onClick={close}
            className={styles.iconClose}
            sx={{
              backgroundColor: "#bbb",
              padding: "4px",
              borderRadius: "16px",
              "&:hover": {
                backgroundColor: "#aaa",
              },
            }}
          />
        ) : null}
      </DialogTitle>

      <DialogContent>
        <Box className={styles.rowContainer}>
          {severity === "success" && (
            <>
              <Check
                sx={{
                  fontSize: 100,
                  color: "white",
                  backgroundColor: "#A5DD9B",
                  padding: 5,
                  borderRadius: "50%",
                }}
              />
              <Typography sx={styles.textTitle}>{title}</Typography>
              <Typography sx={styles.textMessage}>{message}</Typography>
              <p style={styles.textRedirect}>
                Redirect dalam : {redirectCount}
              </p>
            </>
          )}

          {severity === "successNoReload" && (
            <>
              <Check
                sx={{
                  fontSize: 100,
                  color: "white",
                  backgroundColor: "#A5DD9B",
                  padding: 5,
                  borderRadius: "50%",
                }}
              />
              <Typography sx={styles.textTitle}>{title}</Typography>
              <Typography sx={styles.textMessage}>{message}</Typography>
            </>
          )}

          {severity === "error" && (
            <>
              <Close
                sx={{
                  fontSize: 100,
                  color: "white",
                  backgroundColor: "#b81414",
                  padding: 3,
                  borderRadius: "50%",
                }}
              />
              <Typography sx={styles.textTitle}>{title}</Typography>
              <Typography sx={styles.textMessage}>{message}</Typography>
            </>
          )}

          {severity === "choose" && (
            <>
              <PriorityHigh
                sx={{
                  fontSize: 100,
                  color: "white",
                  backgroundColor: "#FFC700",
                  padding: 3,
                  borderRadius: "50%",
                }}
              />
              <Typography sx={styles.textTitle}>{title}</Typography>
              <Typography sx={styles.textMessage}>{message}</Typography>
              <Box className={styles.boxButton}>
                <Button sx={styles.buttonPrev} onClick={() => close("tidak")}>
                  Tidak
                </Button>
                <Button sx={styles.buttonNext} onClick={() => close("lanjut")}>
                  Lanjut
                </Button>
              </Box>
            </>
          )}

          {severity === "warning" && (
            <>
              <PriorityHigh
                sx={{
                  fontSize: 100,
                  color: "white",
                  backgroundColor: "#FFC700",
                  padding: 3,
                  borderRadius: "50%",
                }}
              />
              <Typography sx={styles.textTitle}>{title}</Typography>
              <Typography sx={styles.textMessage}>{message}</Typography>
            </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
