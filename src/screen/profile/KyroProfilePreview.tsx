import React from "react";
import KyroTypography from "../../components/KyroTypography";
import { Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import KyroProfileSettings from "../../components/KyroProfileSettings";

interface Props {
  name: string;
  email: string;
}
const KyroProfilePreview: React.FC<Props> = (props) => {
  return (
    <div style={{ width: "30%" }}>
      <Box
        sx={{
          display: "flex",
          padding: 5,
          gap: 3,
          alignItems: "center",
        }}
      >
        <Button
          style={{ width: 200, height: 40, borderRadius: 20 }}
          variant="contained"
          endIcon={<AddIcon />}
        >
          Add Project
        </Button>
        <KyroProfileSettings name={props.name}></KyroProfileSettings>
      </Box>

      <Box
        sx={{
          backgroundColor: "#f6f6f6",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
        }}
      >
        <img
          style={{ height: 200, width: 200, borderRadius: "50%", padding: 30 }}
          src={require("../../images/placeHolder.png")}
        ></img>

        {props.name != " " ? (
          <KyroTypography type="title" text={props.name}></KyroTypography>
        ) : (
          <KyroTypography type="title" text="Your Name"></KyroTypography>
        )}
        {props.email ? (
          <KyroTypography
            type="text"
            text={props.email}
            disabled={true}
          ></KyroTypography>
        ) : (
          <KyroTypography
            type="text"
            text="Your mail Id"
            disabled={true}
          ></KyroTypography>
        )}
      </Box>
    </div>
  );
};

export default KyroProfilePreview;
