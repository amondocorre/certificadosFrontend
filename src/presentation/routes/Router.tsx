import { createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import Layout from '../layouts/Layout';
import SignIn from '../pages/auth/login/SignIn';
import DashboardView from '../pages/home/DashboardView';
import ClientsView from '../pages/clients/ClientsView';
import ProfilesView from '../pages/profiles/ProfilesView';
import EmployeesView from '../pages/configurations/employees/EmployeesView';
import UsersView from '../pages/configurations/users/UsersView';
import CompanyDataView from '../pages/configurations/initial-configurations/company-data/CompanyDataView';
import PaymentsMethodsView from '../pages/configurations/initial-configurations/payments-methods/PaymentMethodView';
import MenuAccesView from '../pages/configurations/menuAcces/MenuAccesView';
import AccesUserView from '../pages/security/accesUser/AccesUserView';
import AccesProfileView from '../pages/security/accesProfile/AccesProfileView';
import CajaView from '../pages/cajas/caja/CajaView';
import MoviCajaView from '../pages/cajas/moviCaja/MoviCajaView';
import ProductView from '../pages/configurations/product/ProductView';
import ReportMoviCajaView from '../pages/cajas/moviCaja/ReportMoviCajaView';
import ReporteCiereTurnoView from '../pages/reports/reporteCiereTurno/ReporteCiereTurnoView';
import StatusView from '../pages/configurations/status/StatusView';
import ComboView from '../pages/configurations/combo/ComboView';
import SupplierView from '../pages/configurations/supplier/SupplierView';
import SucursalView from '../pages/configurations/sucursal/SucursalView';
import SucursalUserView from '../pages/security/sucursalUser/SucursalUserView';
import CalendarView from '../pages/calendar/CalendarView';
import ResetPasswordView from '../pages/security/Security/ReserPasswordView';
import ChangePasswordView from '../pages/security/Security/ChangePasswordView';
import ErrorPage from '../components/ErrorPage';
import MedicalView from '../pages/evaluation/medical/MedicalView';
import PsychologicalView from '../pages/evaluation/psychological/PsychologicalView';
import ReportPsychologicalView from '../pages/evaluation/report-psychological/ReportPsychologicalView';
import ReportMedicalView from '../pages/reports/reportMedical/ReportMedicalView';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    //errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          { path: '', element: <DashboardView /> },
          { path: 'calendar', element: <CalendarView/> },
          { path: 'evaluation/medical', element: <MedicalView/> },
          { path: 'evaluation/psychological', element: <PsychologicalView/> },
          { path: 'evaluation/report-psychological', element: <ReportPsychologicalView/> },
          { path: 'reports/cierre-turno', element: <ReporteCiereTurnoView /> },
          { path: 'configurations/users', element: <UsersView /> },
          { path: 'configurations/acces', element: <MenuAccesView /> },
          { path: 'configurations/status', element: <StatusView /> },
          { path: 'configurations/supplier', element: <SupplierView /> },
          { path: 'configurations/products', element: <ProductView /> },
          { path: 'configurations/combo', element: <ComboView /> },
          { path: 'configurations/employees', element: <EmployeesView /> },
          { path: 'configurations/sucursales', element: <SucursalView /> },
          { path: 'configurations/profiles', element: <ProfilesView /> },
          { path: 'configurations/initial-config/company-data', element: <CompanyDataView /> },
          { path: 'configurations/initial-config/payments-methods', element: <PaymentsMethodsView /> },
          { path: 'cash-mgmt/cajas', element: <CajaView /> },
          { path: 'reports/report-mov', element: <ReportMoviCajaView /> },
          { path: 'reports/report-medical', element: <ReportMedicalView /> },
          { path: 'cash-mgmt/ingreso-egreso', element: <MoviCajaView /> },
          { path: 'security/acces-user', element: <AccesUserView /> },
          { path: 'security/acces-profile', element: <AccesProfileView /> },
          { path: 'security/suc-users', element: <SucursalUserView/> },
          { path: 'security/reset-password', element: <ResetPasswordView/> },
          { path: 'security/change-password', element: <ChangePasswordView/> },
          { path: 'cli/clients', element: <ClientsView /> },
          { path: 'profiles', element: <ProfilesView /> },
        ],
      },
      { path: '/sign-in', element: <SignIn /> },
    ],
  },
], {
  basename: import.meta.env.VITE_BASE_NAME || '/',
});
