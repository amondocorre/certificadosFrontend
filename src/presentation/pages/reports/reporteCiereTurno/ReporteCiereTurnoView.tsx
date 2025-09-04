import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationItem } from '../../../../domain/models/AccesModel';
import { useOutletContext } from 'react-router-dom';
import HeaderPage from '../../../components/containers/HeaderPage';
import { userContainer } from '../../../../di/userContainer';
import * as MUIcons from '@mui/icons-material';
import {Typography, Grid} from '@mui/material';
import { Loading } from '../../../components/Loading';
import TableReportCierreTurno from './components/TableReportCierreTurno';
import ModalReportCierreTurno from './components/ModaReportCiereTurno';
import { Button } from '../../../../domain/models/ButtonModel';
import { reportContainer } from '../../../../di/reports/reportContainer';
import ContainerFilter from '../../../components/containers/ContainerFilter';
import CustomDatePicker from '../../../components/inputs/CustomDatePicker';
import ActionButton from '../../../components/buttons/ActionButton';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Report, ReportCierreFilter} from '../../../../domain/models/ReportModel';
import { formatDate } from '../../../utils/dateUtils';
import { User } from '../../../../domain/models/User';
import CustomAutocomplete from '../../../components/inputs/CustomAutocomplete';
import { printContainer } from '../../../../di/prints/printContainer';
import { Sucursal } from '../../../../domain/models/SucursalModel';
import { useAuth } from '../../../hooks/useAuth';
import { sucursalUserContainer } from '../../../../di/security/sucursalUserContainer';
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}
const validationSchema = yup.object().shape({
  id_usuario: yup.string().required('Seleccione un usuario'),
  id_sucursal: yup.string().required('Seleccione una Sucursal'),
  i_fecha: yup.string().required('Seleccione una fecha'),
  f_fecha: yup.string().required('Seleccione una fecha'),
});
const ReporteCiereTurnoView: React.FC = memo(() => {
  const { authResponse } = useAuth();
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const reportViewModel = reportContainer.resolve('reportViewModel');
  const PrintViewModel = printContainer.resolve('printViewModel');
  const SucursalUserViewModel = sucursalUserContainer.resolve('sucursalUserViewModel');
  const [loading, setLoading] = useState(false)
  const [listReport , setListReport] = useState<Report[]>([])
  const [buttons , setButtons] = useState<Button[]>([])
  const [usersList , setUsersList ] = useState<User[]>([])
  const [openModalReport, setOpenModalReport] = useState(false)
  const [selectReport, setSelectReport] = useState<Report|null>(null)
    const [listSucursales, setListSucursales] = useState<Sucursal[]>([])
  const { handleSubmit,control, formState: { errors}, setValue} = useForm<ReportCierreFilter>({
    resolver: yupResolver(validationSchema),
      defaultValues: {...{
        id_usuario:'',
        id_sucursal:'',
        i_fecha:'',
        f_fecha:'',
      }, 
    }
  });
  const handleOpenModalReport = useCallback((report:Report|null)=>{
    setOpenModalReport(true);
    setSelectReport(report);
  },[])
  const handleCloseModalReport = ()=>{
    setSelectReport(null);
    setOpenModalReport(false)}

  const handleSearch=async()=>{
    await handleSubmit((data: any) => {
      
      const niewData = {
          i_fecha: String(formatDate(data.i_fecha)),
          f_fecha: String(formatDate(data.f_fecha)),
          id_usuario: String(data.id_usuario),
          id_sucursal: String(data.id_sucursal),
        }
      reportCierreTurno(niewData)})();
  }
useEffect(()=>{
  if(authResponse?.id_sucursal!=0){
    setValue('id_sucursal',String(authResponse?.id_sucursal));
  }
},[authResponse])
  useEffect(()=>{
    const dateA = String(dayjs());
    setValue('i_fecha', dateA)
    setValue('f_fecha', dateA)
    setValue('id_usuario','All' )
    if(currentMenuItem){
      getButtuns(currentMenuItem?.id_menu_acceso);
      handleSearch();
      getUsers();
      getSucursales();
    }
  },[currentMenuItem])
  const getButtuns = async (idAcces:number) => {
    setLoading(true)
    try {
      const response = await UserViewModel.getButtunsAccess(idAcces);
      if ('buttons' in response) {
        setButtons(response!.buttons);
      } else {
        setButtons([]);
      }
    } catch (error) {

    }
    setLoading(false)
  };
  const getSucursales = async () => {
    setLoading(true)
    try {
      const response = await SucursalUserViewModel.getSucursalesUser();
      if ('status' in response && response.status === 'success') {
        setListSucursales(response.data);
      } else {
        setListSucursales([]);
      }
    } catch (error) {}
    setLoading(false)
  };
  const reportCierreTurno = async (reportCierreFilter:ReportCierreFilter) => {
    setLoading(true)
    try {
      const response = await reportViewModel.reportCierreTurno(reportCierreFilter);
      if ('status' in response && response.status === 'success') {
        setListReport(response.data);
      } else {
      }
    } catch (error) {}
    setLoading(false)
  };
   const getUsers = async () => {
    setLoading(true)
    try {
      const response = await UserViewModel.findActive();
      if ('users' in response) {
        response?.users?.unshift({id_usuario:'All',nombre:'Todos',id_perfil:'',email:'',estado:'Activo',usuario:''});
        setUsersList(response.users)
      } else {
        setUsersList([{id_usuario:'All',nombre:'Todos',id_perfil:'',email:'',estado:'Activo',usuario:''}])
      }
    } catch (error) {
    }
    setLoading(false)
  };
  const imprimimirCierreTurno = async (id:number) => {
    setLoading(true)
    try {
      await PrintViewModel.printCierreTurno(id);
    } catch (error) {}
    setLoading(false)
  };
  return (
    <div>
      <HeaderPage>
      <Grid
        size={{
          xs: 6.5,
          sm: 7,
          md: 8
        }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentMenuItem?.title ? currentMenuItem?.title : '...'}
          </Typography>
        </Grid>
        <Grid
          container
          justifyContent="end"
          alignItems="end"
          alignSelf={'center'}
          size={{
            xs: 5.5,
            sm: 5,
            md: 4
          }}>
        </Grid>
      </HeaderPage>
      <div>
        <ContainerFilter>
          <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1 }} rowSpacing={{ xs: 2, sm: 0.2, md: 0.1 }}>
            <Grid
              size={{
                xs: 6,
                sm: 3,
                md: 3
              }}>
              <CustomAutocomplete
                control={control}
                name='id_sucursal'
                label='seleccione una sucursal'
                labelOption='nombre'
                valueOption='id_sucursal'
                options={listSucursales}
                disabled={(authResponse?.id_sucursal!==0)}
                handleChange={()=>{setListReport([]);}}
              />
            </Grid>
            <Grid
              size={{
                xs: 6,
                sm: 3,
                md: 3
              }}>
              <CustomAutocomplete
                control={control}
                name='id_usuario'
                label='Seleccione un Usuario'
                labelOption='nombre'
                valueOption='id_usuario'
                options={usersList}
              />
            </Grid>
            <Grid
              size={{
                xs: 6,
                sm: 3,
                md: 2.3
              }}>
              <CustomDatePicker
                name="i_fecha" 
                control={control} 
                label="Fecha Inicio" 
                disabled={false}
                maxDate={dayjs()}
                onChange={() =>{setListReport([]);}}
              />
            </Grid>
            <Grid
              size={{
                xs: 6,
                sm: 3,
                md: 2.3
              }}>
              <CustomDatePicker
                name="f_fecha" 
                control={control} 
                label="Fecha Inicio" 
                disabled={false}
                maxDate={dayjs()}
                onChange={() =>{setListReport([]);}}
              />
            </Grid>
            <Grid
              textAlign='center'
              size={{
                xs: 12,
                sm: 3,
                md: 1.4
              }}>
            <ActionButton
              key={`table-button`}
              icon={<MUIcons.Search/>}
              onClick={ handleSearch}
              labelOverride='Buscar'
              disabled={false} 
            />
            </Grid>
          </Grid>
        </ContainerFilter>
        </div>
      <div>
        {<TableReportCierreTurno
          listReports={listReport}
          handleOpenModalReport={handleOpenModalReport}
          imprimimirCierreTurno={imprimimirCierreTurno}
        />
        }
      </div>
      <ModalReportCierreTurno
      open={openModalReport}
      onClose={handleCloseModalReport}
      imprimimirCierreTurno={imprimimirCierreTurno}
      report={selectReport}
      buttons={buttons}
      ></ModalReportCierreTurno>
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default ReporteCiereTurnoView;