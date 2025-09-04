import { JSX } from "react";
import { Company } from "./CompanyModel";

export interface MenuItem {
  id_menu_acceso?: string;
  nombre: string;
  nivel_superior?: string;
  icono: string;
  link: string;
  estado?: string;
  tipo?: string | null;
  numero_orden?: string;
  sistema_ventas?: string;
  sistema_general?: string;
  tooltip?: string | null;
  subMenu?: MenuItem[];
  nivel?: number;
  id_botones?: string[]|[]
}
export interface MenuResponse{
  menu:MenuItem[];
  dataConpany?:Company | null
} 

export interface NavigationItem { 
  id_menu_acceso:  number;
  title: string;
  icon: JSX.Element;
  segment: string;
  description?: string;
  tooltip?: string;
  children?: NavigationItem[];
}

export interface AccesUser {
  id_menu_acceso: string;
  nombre: string;
  nivel_superior?: string;
  icono: string;
  acceso?: string;
  tipo?: string | null;
  numero_orden?: string
  subMenu?: MenuItem[];
  nivel?: number;
  id_botones?: string[]|[]
  botones?: string[]|[]
}
export interface AccesUserResponse{
  menu:AccesUser[];
} 
