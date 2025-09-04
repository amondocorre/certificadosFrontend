import { styled, Typography } from "@mui/material";
import {palette} from '../../utils/palette'

export const StyledHeader = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.5), // Adjust margin as needed
  textAlign: 'center',
  marginLeft: theme.spacing(1), // Adjust margin as needed
  color: palette.text.default,
  fontSize: '1.2rem',
  fontFamily: 'Times New Roman',
}));


export const StyledHeaderSecondary = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.5), // Adjust margin as needed
  textAlign: 'center',
  marginLeft: theme.spacing(1), // Adjust margin as needed
  color: palette.text.disabled,
  fontSize: '1.2rem',
  fontFamily: 'Times New Roman',
}));