import * as React from 'react';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet, useNavigate } from 'react-router';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { useAuth } from './presentation/hooks/useAuth';
import { NavigationItem } from './domain/models/AccesModel';
import DashboardIcon from '@mui/icons-material/Dashboard'; // Importa el ícono correctamente
import './LogoComponent.css';
export default function App() {
  const { menuItem, removeAuthSession, authResponse,dataConpany } = useAuth();
  const navigate = useNavigate();
  
  const accesDefault: NavigationItem = {
    id_menu_acceso: 0,
    title: 'Dashboard',
    icon: <DashboardIcon />, // Icono definido como un componente React válido
    segment: '',
    description: 'Página principal del panel de control',
  };
  const BRANDING = React.useMemo(() => ({
    title: dataConpany ? dataConpany.nombre : 'Centro Médico',
    logo: dataConpany?.logo_empresa?<div className="custom-paper-style"><img src={dataConpany?.logo_empresa} alt="Logo" width={150} /></div>: undefined
  }), [dataConpany]);
  const normalizedSession = React.useMemo(() => {
    if (!authResponse || !authResponse.user) {
        return null; 
    }
    return {
        user: {
            image: authResponse.user.foto,
            name: authResponse.user.nombre,
            email: authResponse.user.email,
            id: authResponse.user.id_usuario
        },
        token: authResponse.token,
    };
}, [authResponse]);

  React.useEffect(() => {
    validateSession();
  }, [menuItem]);

  async function validateSession() {
    //const authData = await authUseCases.getAuthSession.execute();
  }
  const signIn = React.useCallback(() => {
    navigate('/sign-in');
  }, [navigate]);

  const signOut = React.useCallback(async() => {
    await removeAuthSession();
    await navigate('/sign-in');
  }, [navigate]);

  if (!menuItem) {
    return <div>Cargando...</div>; // Indicador de carga (puedes personalizarlo)
  }

  return (
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <ReactRouterAppProvider
        navigation={menuItem ? menuItem : [accesDefault]}
        branding={BRANDING}
        session={normalizedSession} 
        //router={router}
        theme={theme}
        authentication={{ signIn, signOut }}
      >
        <Outlet />
      </ReactRouterAppProvider>
     </ThemeProvider>
  );
}
