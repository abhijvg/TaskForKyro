import React, { ReactNode } from "react";
import { TextField, InputAdornment } from "@mui/material";

interface Props {
  id: string;
  variant?: "outlined" | "filled" | "standard";
  displayImage?: ReactNode;
  label: string;
  value?: string;
  error?: boolean;
  helperText?: string;
  changeAction: (targetValue: string) => any;
}

const KyroMailInput: React.FC<Props> = (props) => {
  return (
    <TextField
      id={props.id}
      label={props.label}
      variant={props.variant}
      error = {props.error}
      helperText = {props.helperText}
      value={props.value}
      sx={{ width: "90%" }}
      onChange={(e) => props.changeAction(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{props.displayImage}</InputAdornment>
        ),
      }}
    />
  );
};

export default KyroMailInput;
