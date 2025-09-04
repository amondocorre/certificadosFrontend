import * as React from 'react';
import { Outlet,useLocation, useNavigate } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { container } from '../../di/container';
import { CustomPageContainer } from './CustomPageContainer';
import { useAuth } from '../hooks/useAuth';
import { NavigationItem } from '../../domain/models/AccesModel';
import { Box, createTheme, Stack } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import ErrorAccesPage from '../components/ErrorAccesPage';
import { Account } from '@toolpad/core';
import { StyledTitle } from '../components/text/StyledTitle';

const theme2 = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '',
        },
      },
    },
  },
});
function ToolbarActions({authResponse}:any){
  const sucursal = authResponse?.user?.sucursales?.find((suc: any) => authResponse?.id_sucursal == suc.id_sucursal)
  let nombreSucursal:string = '  ';
  if(sucursal) nombreSucursal = sucursal.nombre
  nombreSucursal = nombreSucursal.replace(/sucursal\s*/i, "").trim()
  return (
    <Stack direction="row">
      <Box sx={{alignContent:'center'}}>
        <StyledTitle sx={{fontSize: '25px',}}>{'Sucursal: '}</StyledTitle>
      </Box>
      <Box sx={{alignContent:'center'}}>
        <StyledTitle sx={{fontSize: '25px',}}>{nombreSucursal}</StyledTitle>
      </Box>
      <Account />
    </Stack>
  );
}

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { menuItem,authResponse, } = useAuth();
  const authUseCases = container.resolve('authUseCases');
  React.useEffect(() => {
    validateSession();
  }, [location, ]);
  async function validateSession() {
    const authData = await authUseCases.getAuthSession.execute();
    if (!authData) {
      const redirectTo = `/sign-in?callbackUrl=${encodeURIComponent(location.pathname)}`;
      return navigate(redirectTo);
    }
  }
  const findItem=(items: any[],pathSegments: string[])=>{
    for (const item of items) {
      if (pathSegments.join('/') === item.segment) {
        return item;
      }
      if (pathSegments[0] === item.segment) {
        if (pathSegments.length === 1) {
          return item;
        } else if (item.children && item.children.length > 0) {
          const found:any = findItem(item.children, pathSegments.slice(1));
          if (found) return found;
        }
      }
    }
    return null;
  }

  const getItemMenu=() =>{
    if (!menuItem || menuItem?.length===0 || (menuItem?.length===1 && menuItem[0].segment==='')) return '';
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const foundMenuItem: NavigationItem | null = findItem(menuItem,pathSegments);
    return foundMenuItem ?? null;
  }
  const currentMenuItem = React.useMemo(() => {
    return getItemMenu()
  }, [menuItem,location.pathname]);
  if (currentMenuItem === null) {
      return (<ErrorAccesPage></ErrorAccesPage>)
  }
  return (
    <DashboardLayout slots={{ toolbarActions:  () => (<ToolbarActions authResponse={authResponse}/>),}}>
      <CustomPageContainer>
        <ThemeProvider theme={theme2}>
          {<Outlet context={{ currentMenuItem }} />}
        </ThemeProvider>
      </CustomPageContainer>
    </DashboardLayout>
  );
};

export default Layout;