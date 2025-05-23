import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#8334c2",
    },
    secondary: {
      main: "#00748b",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          color: "inherit",
          textDecoration: "none",
          cursor: "pointer",
          "&:visited": {
            color: "inherit",
          },
          "&:focus-visible": {
            border: "6px solid",
            borderColor: "#8334c2",
          },
        },
      },
    },
  },
});

export default theme;
