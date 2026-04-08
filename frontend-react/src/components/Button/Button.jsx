import { Box, Button } from "@mui/material";

export default function CustomButton(props) {
  console.log("Props Button", props);

  return (
    <Box>
      <Button
        variant="text"
        sx={{
          color: `${props.color}`,
          backgroundColor: `${props.backgroundColor}`,
          width: "96px",
          height: "40px",
          borderRadius: "20px",
          fontWeight: "bold",
          "&:hover": {
            color: `${props.hover.color}`,
            backgroundColor: `${props.hover.backgroundColor}`,
          },
          transition: `${props.transition}`,
        }}
      >
        {props.text}
      </Button>
    </Box>
  );
}
