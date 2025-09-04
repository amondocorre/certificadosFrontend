import { Button, styled } from "@mui/material";

export const CloseButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.black,
  '&:hover': {
    color: theme.palette.common.white,
  },
}));