import { createTheme } from '@mui/material/styles';
import {palette} from './presentation/utils/palette'
 export const theme = createTheme({
   palette, // 👈 Ahora MUI usará tus colores
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 2000,  // Este es el que estás usando
      xl: 2536,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: palette.background.paper,
          color: palette.text.primary,
          boxShadow: 'none',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root:{
          //maxWidth: '220px', define el ancho de menu acceso
        },
        paper: {
          backgroundColor: palette.background.paper,
          color: palette.text.primary,
          //minWidth: '220px',
          //maxWidth: '220px',define el ancho de menu acceso
          '& .MuiSvgIcon-root': {
            color: palette.text.primary+'!important',
          },
        },
      },
    },
    MuiContainer:{
      styleOverrides: {
        root:{
          padding:'0',
          paddingTop:'0px',
          '@media (min-width: 60px)': {
          paddingInline: '5px',
          '.MuiBox-root':{
            
          //backgroundColor:'red'
          }
        },
          //backgroundColor:'red'
        },  
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          padding: '12px 16px',
          margin: '2px 8px',
          borderRadius: '4px',
          transition: 'all 0.2s ease',
          '&:hover, &.Mui-selected': {
            backgroundColor: palette.primary.main,
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: palette.text.primary,
          //minWidth: '40px',
          '& .MuiSvgIcon-root': {
            color: palette.text.primary +'!important',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '0.95rem',
          fontWeight: 400,
          color: palette.text.primary,
        },
      },
    },
    // Para los iconos en la cabecera
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: palette.text.primary, //'white !important',
          '& .MuiSvgIcon-root': {
            color: palette.text.primary,//'white !important',
          },
        },
      },
    },
  },
});