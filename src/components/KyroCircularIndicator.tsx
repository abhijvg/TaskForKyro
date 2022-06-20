import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface Props {
  style: React.CSSProperties;
}
const KyroCircularIndicator: React.FC<Props> = (props) => {
  return (
    <Box sx={props.style}>
      <CircularProgress />
    </Box>
  );
};
export default KyroCircularIndicator;
