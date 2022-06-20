import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import React from "react";

interface Props {
  name: string;
}

const KyroProfileSettings: React.FC<Props> = (props) => {
  return (
    <Card sx={{ display: "flex", height: 50 }}>
      <CardMedia
        component="img"
        sx={{ width: 50, height: 50 }}
        image={require("../images/placeHolder.png")}
      />
      <CardContent style={{ padding: 0, marginLeft: 10 }}>
        <Typography variant="subtitle1">{props.name}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Project Manager
        </Typography>
      </CardContent>
    </Card>
  );
};

export default KyroProfileSettings;
