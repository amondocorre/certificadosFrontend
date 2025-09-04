
import { dark } from '@mui/material/styles/createPalette';
import { COLORS } from './colors';

export const palette = {
      primary: {
         main: COLORS.primary.main,
         light: COLORS.primary.light,
         dark: COLORS.primary.dark,
         contrastText: COLORS.primary.contrastText,
       },
       secondary: {
         main: COLORS.secondary.main,
         light: COLORS.secondary.light,
         dark: COLORS.secondary.dark,
         contrastText: COLORS.secondary.contrastText,
       },
       error: {
         main: COLORS.accent.main,
         light: COLORS.accent.light,
         dark: COLORS.accent.dark,
         contrastText: COLORS.accent.contrastText,
       },
       background: {
         default: COLORS.background.default,
         paper: COLORS.background.paper,
         dark: COLORS.background.dark,
         gradient: COLORS.background.gradient,
       },
       text: COLORS.text,
       
  }
