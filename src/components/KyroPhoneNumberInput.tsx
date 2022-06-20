import React, { ReactNode } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { PhoneNumberType } from "../models/KyroApiDataModels";

interface Props {
  id: string;
  variant?: "outlined" | "filled" | "standard";
  displayImage?: ReactNode;
  label: string;
  value?: string;
  inputType?: PhoneNumberType;
  changeAction: (targetValue: string, numberType: PhoneNumberType) => any;
}

const KyroPhoneNumberInput: React.FC<Props> = (props) => {
  return (
    <TextField
      id={props.id}
      label={props.label}
      variant={props.variant}
      value={props.value}
      sx={{ width: "90%" }}
      onChange={(e) =>
        props.changeAction(
          e.target.value,
          props.inputType ? props.inputType : PhoneNumberType.home
        )
      }
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{props.displayImage}</InputAdornment>
        ),
      }}
    />
  );
};

export default KyroPhoneNumberInput;
