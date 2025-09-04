import { createContext, useEffect, useState, useMemo, useCallback } from "react";
import { AuthResponse } from "../../domain/models/AuthResponse";
import { MenuItem, NavigationItem } from "../../domain/models/AccesModel";
import * as MUIcons from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Company } from "../../domain/models/CompanyModel";
const accesDefault: NavigationItem = {
  id_menu_acceso: 0,
  title: 'Dashboard',
  icon: <DashboardIcon />,
  segment: '',
  description: 'Página principal del panel de control',
};
export interface AuthContextProps {
  authResponse: AuthResponse | null;
  dataConpany: Company | null;
  menuItem: NavigationItem[] | [];
  saveAuthSession: (authResponse: AuthResponse) => Promise<void>;
  getAuthSession: () => Promise<void>;
  removeAuthSession: () => Promise<void>;
  saveMenuSesion: (menuItem: MenuItem[]) => Promise<void>;
  saveDataCompany: (company: Company) => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children, authUseCases }: any) => {
  const [authResponse, setAuthresponse] = useState<AuthResponse | null>(null);
  const [menuItem, setMenuItem] = useState<NavigationItem[]>([]);
  const [dataConpany, setDataConpany] = useState<Company | null>(null);
  const [rawMenuData, setRawMenuData] = useState<any[]>([]);

  useEffect(() => {
    getAuthSession();
    getMenuSession();
    if (!dataConpany) {
      getDataCompany();
    }
  }, []);

  const saveDataCompany = useCallback(async (company: Company) => {
    setDataConpany(company);
    await authUseCases.saveDataCompany.execute(company);
  }, [authUseCases]);

  const saveAuthSession = useCallback(async (authResponse: AuthResponse) => {
    setAuthresponse(authResponse);
    await authUseCases.saveAuthSession.execute(authResponse);
  }, [authUseCases]);

  const getAuthSession = useCallback(async () => {
    const authData = await authUseCases.getAuthSession.execute();
    setAuthresponse(authData);
  }, [authUseCases]);

  const getDataCompany = useCallback(async () => {
    const company = await authUseCases.getDataCompany.execute();
    setDataConpany(company);
  }, [authUseCases]);

  const removeAuthSession = useCallback(async () => {
    await authUseCases.removeAuthSession.execute();
    await removeMenuSession();
  }, [authUseCases]);

  const saveMenuSesion = useCallback(async (menuItem: MenuItem[]) => {
    await authUseCases.saveMenuSession.execute(menuItem);
    await getMenuSession();
  }, [authUseCases]);

  const getMenuSession = useCallback(async () => {
    const navigationItem = await authUseCases.getMenuSession.execute();
    setRawMenuData(navigationItem || []);
  }, [authUseCases]);

  const removeMenuSession = useCallback(async () => {
    setAuthresponse(null);
    setRawMenuData([]);
    await authUseCases.removeMenuSession.execute();
  }, [authUseCases]);

  // Memoizar la generación de navegación para evitar recreaciones innecesarias
  const generateNavigation = useCallback((menu: any[]): NavigationItem[] => {
    return menu?.map((item: any) => {
      const IconComponent = MUIcons[item.icono as keyof typeof MUIcons] || MUIcons.Label;
      if (!IconComponent) {
        console.warn(`Icono "${item.icono}" no encontrado en MUIcons.`);
      }

      const newItem: NavigationItem = {
        id_menu_acceso: item.id_menu_acceso,
        title: item.nombre,
        icon: <IconComponent />,
        segment: item.link || '',
        description: item.tooltip || '',
        tooltip: 'Agregamos el tooltip aquí',
      };

      if (item.subMenu?.length > 0) {
        newItem.children = generateNavigation(item.subMenu);
      }
      return newItem;
    }) || [];
  }, []);

  // Memoizar el menú generado
  const processedMenuItems = useMemo(() => {
    if (!rawMenuData || rawMenuData.length === 0) {
      return [accesDefault];
    }

    const menuAccess = generateNavigation(rawMenuData);
    return [accesDefault, ...menuAccess];
  }, [rawMenuData, generateNavigation]);

  // Actualizar menuItem solo cuando processedMenuItems cambie
  useEffect(() => {
    setMenuItem(processedMenuItems);
  }, [processedMenuItems]);

  // Memoizar el valor del contexto
  const contextValue = useMemo(() => ({
    authResponse,
    dataConpany,
    menuItem,
    saveAuthSession,
    getAuthSession,
    removeAuthSession,
    saveMenuSesion,
    saveDataCompany,
  }), [
    authResponse,
    dataConpany,
    menuItem,
    saveAuthSession,
    getAuthSession,
    removeAuthSession,
    saveMenuSesion,
    saveDataCompany,
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
