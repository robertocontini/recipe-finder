import { Typography } from "@mui/material";
import theme from "src/theme/theme";
import { PageTitleProps } from "src/types";

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <Typography
      component="h1"
      variant="h5"
      gutterBottom
      sx={{
        backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {title}
    </Typography>
  );
};

export default PageTitle;
