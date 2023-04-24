import { Box } from "@mui/material";
import { styled } from "@mui/system";

// Styled Components : DRY for repetitive CSS properties
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});
export default FlexBetween;
