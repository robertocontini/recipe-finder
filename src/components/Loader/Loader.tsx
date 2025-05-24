import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      aria-label="loading-overlay"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        zIndex: 1300,
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
};

export default Loader;
