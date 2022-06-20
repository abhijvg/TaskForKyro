import React from "react";
import { Typography, createTheme } from "@mui/material";

interface Props {
  text: string;
  type?: string;
  disabled?: boolean;
}

const KyroTypography: React.FC<Props> = (props) => {
  return (
    <Typography
      sx={{ color: props.disabled ? "gray" : "black" }}
      variant={props.type == "title" ? "h4" : "h5"}
    >
      {props.text}
    </Typography>
  );
};

export default KyroTypography;
