import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationItem } from '../../../../domain/models/AccesModel';
import { useOutletContext } from 'react-router-dom';
import HeaderPage from '../../../components/containers/HeaderPage';
import { userContainer } from '../../../../di/userContainer';
import * as MUIcons from '@mui/icons-material';
import {Typography,Grid} from '@mui/material';
import { Loading } from '../../../components/Loading';
import TableReportVenta from './components/TableReportVenta';
import ModalReport from './components/ModaReport';
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
import { Report, ReportContratoFilter } from '../../../../domain/models/ReportModel';
import { formatDate } from '../../../utils/dateUtils';
import CustomAutocomplete from '../../../components/inputs/CustomAutocomplete';
import { Sucursal } from '../../../../domain/models/SucursalModel';
import { sucursalUserContainer } from '../../../../di/security/sucursalUserContainer';
import { useAuth } from '../../../hooks/useAuth';
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}
const validationSchema = yup.object().shape({
  i_fecha: yup.string().required('Seleccione una fecha'),
  id_sucursal: yup.string().required('Seleccione una Sucursal'),
  f_fecha: yup.string().required('Seleccione una fecha'),
});
const RporteVentasView: React.FC = memo(() => {
  
  const { authResponse } = useAuth();
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const reportViewModel = reportContainer.resolve('reportViewModel');
  const SucursalUserViewModel = sucursalUserContainer.resolve('sucursalUserViewModel');
  const [loading, setLoading] = useState(false)
  const [listReport , setListReport] = useState<Report[]>([])
  const [buttons , setButtons] = useState<Button[]>([])
  const [openModalReport, setOpenModalReport] = useState(false)
  const [selectReport, setSelectReport] = useState<Report|null>(null)
  const [listSucursales, setListSucursales] = useState<Sucursal[]>([])
  const { handleSubmit,control, formState: { errors}, setValue} = useForm<ReportContratoFilter>({
    resolver: yupResolver(validationSchema),
      defaultValues: {...{
        i_fecha:'',
        f_fecha:'',
        id_sucursal:''
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
          id_sucursal: String(data.id_sucursal)
        }
      reportContratos(niewData)})();
  }

useEffect(()=>{
  if(authResponse?.id_sucursal!=0){
    setValue('id_sucursal',String(authResponse?.id_sucursal));
  }
},[authResponse])
  useEffect(()=>{
    setValue('i_fecha',String(dayjs()) )
    setValue('f_fecha',String(dayjs()) )
    if(currentMenuItem){
      getButtuns(currentMenuItem?.id_menu_acceso);
      handleSearch();
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
  const reportContratos = async (reportContratoFilter:ReportContratoFilter) => {
    setLoading(true)
    try {
      const response = await reportViewModel.reportContratos(reportContratoFilter);
      if ('status' in response && response.status === 'success') {
        setListReport(response.data);
      } else {
      }
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
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} rowSpacing={{ xs: 2, sm: 1, md: 1 }}>
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
                sm: 6,
                md: 3
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
                sm: 6,
                md: 3
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
                xs: 6,
                sm: 6,
                md: 2
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
        {<TableReportVenta
          listReports={listReport}
          handleOpenModalReport={handleOpenModalReport}
        />
        }
      </div>
      <ModalReport
      open={openModalReport}
      onClose={handleCloseModalReport}
      pagarDeuda={()=>{}}
      report={selectReport}
      buttons={buttons}
      ></ModalReport>
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default RporteVentasView;