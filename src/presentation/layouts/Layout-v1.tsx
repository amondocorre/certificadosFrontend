import * as React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { container } from '../../di/container';
import { CustomPageContainer } from './CustomPageContainer';
import { useAuth } from '../hooks/useAuth';
import { NavigationItem } from '../../domain/models/AccesModel';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

interface LayoutContext {
  currentMenuItem: NavigationItem | null;
  getItemMenu: () => Promise<NavigationItem | null>;
}

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

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { menuItem } = useAuth();
  const authUseCases = container.resolve('authUseCases');
  
  const stableContextRef = React.useRef<LayoutContext | null>(null);
  const currentMenuItemRef = React.useRef<NavigationItem | null>(null);
  const [isReady, setIsReady] = React.useState(false);
  const [forceUpdate, setForceUpdate] = React.useState(0);

  const findItem = React.useCallback((items: NavigationItem[], pathSegments: string[]): NavigationItem | null => {
    for (const item of items) {
      if (pathSegments.join('/') === item.segment) {
        return item;
      }
      if (pathSegments[0] === item.segment) {
        if (pathSegments.length === 1) {
          return item;
        } else if (item.children && item.children.length > 0) {
          return findItem(item.children, pathSegments.slice(1));
        }
      }
    }
    return null;
  }, []);

  const getItemMenu = React.useCallback(async (): Promise<NavigationItem | null> => {
    if (menuItem && menuItem.length > 0) {
      const pathSegments = location.pathname.split('/').filter(segment => segment);
      const foundMenuItem = findItem(menuItem, pathSegments);
      return foundMenuItem || null;
    }
    return null;
  }, [menuItem, location.pathname, findItem]);

  const validateSession = React.useCallback(async () => {
    const authData = await authUseCases.getAuthSession.execute();
    if (!authData) {
      const redirectTo = `/sign-in?callbackUrl=${encodeURIComponent(location.pathname)}`;
      return navigate(redirectTo);
    }
  }, [authUseCases, location.pathname, navigate]);

  React.useEffect(() => {
    const processRoute = async () => {
      setIsReady(false);
      
      try {
        await validateSession();
        const foundMenuItem = await getItemMenu();
        
        const hasChanged = !currentMenuItemRef.current || 
                          currentMenuItemRef.current.id_menu_acceso !== foundMenuItem?.id_menu_acceso;
        
        if (hasChanged) {
          currentMenuItemRef.current = foundMenuItem;
          
          stableContextRef.current = {
            currentMenuItem: foundMenuItem,
            getItemMenu
          };
          
          setForceUpdate(prev => prev + 1);
        }
        
        setIsReady(true);

      } catch (error) {
        console.error('Error processing route:', error);
        setIsReady(true);
      }
    };

    processRoute();
  }, [location.pathname, menuItem, validateSession, getItemMenu]);

  if (!isReady || !stableContextRef.current) {
    return (
      <DashboardLayout>
        <CustomPageContainer>
          <ThemeProvider theme={theme2}>
            <div>Loading...</div>
          </ThemeProvider>
        </CustomPageContainer>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <CustomPageContainer>
        <ThemeProvider theme={theme2}>
          <Outlet key={forceUpdate} context={stableContextRef.current} />
        </ThemeProvider>
      </CustomPageContainer>
    </DashboardLayout>
  );
};

export default Layout;
