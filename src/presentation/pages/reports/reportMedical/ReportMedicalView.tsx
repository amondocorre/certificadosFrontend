import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationItem } from '../../../../domain/models/AccesModel';
import { useOutletContext } from 'react-router-dom';
import HeaderPage from '../../../components/containers/HeaderPage';
import { userContainer } from '../../../../di/userContainer';
import * as MUIcons from '@mui/icons-material';
import {Typography,Grid, Tooltip, IconButton} from '@mui/material';
import { Loading } from '../../../components/Loading';
import TableReport from './components/TableReport';
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
import { Report, ReportMedicalFilter } from '../../../../domain/models/ReportModel';
import { formatDate, formatDateEU } from '../../../utils/dateUtils';
import CustomAutocomplete from '../../../components/inputs/CustomAutocomplete';
import { Sucursal } from '../../../../domain/models/SucursalModel';
import { sucursalUserContainer } from '../../../../di/security/sucursalUserContainer';
import { useAuth } from '../../../hooks/useAuth';
import { exportToPDF } from '../../../utils/reports/exportToPDF';
import { exportToExcel } from '../../../utils/reports/exportToExcel';
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}
const validationSchema = yup.object().shape({
  fecha: yup.string().required('Seleccione una fecha'),
  id_sucursal: yup.string().required('Seleccione una Sucursal'),
});
const ReportMedicalView: React.FC = memo(() => {
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
  const { handleSubmit,control, formState: { errors}, setValue,getValues} = useForm<ReportMedicalFilter>({
    resolver: yupResolver(validationSchema),
      defaultValues: {...{
        fecha:'',
        id_sucursal:'0'
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
          fecha: String(formatDate(data.fecha)),
          id_sucursal: String(data.id_sucursal)
        }
      reportMedical(niewData)})();
  }

useEffect(()=>{
  if(authResponse?.id_sucursal!=0){
    setValue('id_sucursal',String(authResponse?.id_sucursal));
  }
},[authResponse])
  useEffect(()=>{
    setValue('fecha',String(dayjs()) )
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
  const reportMedical = async (ReportMedicalFilter:ReportMedicalFilter) => {
    setLoading(true)
    try {
      const response = await reportViewModel.reportMedical(ReportMedicalFilter);
      if ('status' in response && response.status === 'success') {
        setListReport(response.data);
      } else {
      }
    } catch (error) {}
    setLoading(false)
  };
  const handleReportPdf = useCallback(async() => {
    if (!listReport || listReport.length === 0) {
      return;
    }
    const pdfColumns =[      
      {accessorKey: '__index', header: 'N°'},
      {accessorKey: 'ap_paterno',header: 'Apellido paterno',},
      {accessorKey: 'ap_materno',header: 'Apellido materno',},
      {accessorKey: 'nombre', header: 'Nombres',},

      {accessorKey: 'ci',header: 'N° CI',},
      {accessorKey: 'categoria_postula',header: 'Categoria a la que postula',},
      {accessorKey: 'foto',header: 'Foto',isImage:true},
      {accessorKey: 'tramite',header: 'Tramite que realiza',},
      {accessorKey: 'resultado_evaluacion',header: 'Apto/No apto',},
      {accessorKey: 'sucursal',header: 'Gabinete',},
      {accessorKey: 'motivo_resultado',header: 'Descripcion de impedimento',},
      
    ];
    const fecha=formatDateEU(getValues('fecha'));
    const dataWithIndex = listReport.map((item, index) => ({
      ...item,
      __index: index + 1,
    }));
    setLoading(true);
    await exportToPDF({
        data:dataWithIndex ,
        columns: pdfColumns,

        titleDoc: `reporte ${fecha}`,
        titlePdf: `Reporte evalucion medica ${fecha}`,
      })
    setLoading(false);
  },[listReport])
  const handleReportExcel = useCallback(async() => {
    if (!listReport || listReport.length === 0) {
      return;
    }
    const pdfColumns =[
      {accessorKey: '__index', header: 'N°' },
      {accessorKey: 'ap_paterno',header: 'APELLIDO PATERNO',},
      {accessorKey: 'ap_materno',header: 'APELLIDO MATERNO',},
      {accessorKey: 'nombre', header: 'NOMBRES',},

      {accessorKey: 'ci',header: 'CARNET DE IDENTIDAD',},
      {accessorKey: 'categoria_postula',header: 'CATEGORIA A LA QUE POSTULA',},
      {accessorKey: 'foto',header: 'FOTO',isImage:true},
      {accessorKey: 'tramite',header: 'TRAMITE QUE REALIZA',},
      {accessorKey: 'resultado_evaluacion',header: 'APTO/NO APTO',},
      {accessorKey: 'sucursal',header: 'GABINETE',},
      {accessorKey: 'motivo_resultado',header: 'DESCRIPCION DE IMPEDIMENTO EN CASO DE QUE NO SEA APTO',},
    ];
    const dataWithIndex = listReport.map((item, index) => ({
      ...item,
      __index: index + 1,
    }));
    const fecha=formatDateEU(String(dayjs()));
    setLoading(true);
    await exportToExcel({
        data:dataWithIndex ,
        columns: pdfColumns,
        titleDoc: `reporte evaluacion medica ${fecha}`,
        titleExcel: `Reporte evaluacion medica ${fecha}`,
        titleSheet: `${fecha}`,
      })
    setLoading(false);
  },[listReport])
  const actionHandlers:any = {
    handleReportPdf: handleReportPdf,
    handleReportExcel: handleReportExcel
  };
  return (
    <div>
      <HeaderPage>
      <Grid size={{xs: 6.5,sm: 7,md: 8}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentMenuItem?.title ? currentMenuItem?.title : '...'}
          </Typography>
        </Grid>
        <Grid key={'buttom-header'} container size={{xs: 5.5,sm: 5,md: 4}} justifyContent="end"alignItems="end"alignSelf={'center'}>
          {buttons.filter((boton:Button)=>boton.tipo==='header')
          .map((button:any) => {
            const IconComponent = MUIcons[button.icono as keyof typeof MUIcons] || MUIcons.Label;
            return(
            <Tooltip key={button.title} title={button.tooltip}>
              <IconButton color="secondary"  sx={{ ml: 1 }}
                onClick={() => {
                  if (button.onclick && typeof actionHandlers[button.onclick] === 'function') {
                    actionHandlers[button.onclick](); 
                  } else if (typeof button.onclick === 'function') {
                    button.onclick();
                  }
                }}>
                <IconComponent/>
              </IconButton>
            </Tooltip>
          )})}
        </Grid>
      </HeaderPage>
      <div>
        <ContainerFilter>
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} rowSpacing={{ xs: 2, sm: 1, md: 1 }}>
            <Grid size={{xs: 6,sm: 3,md: 3}}>
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
            <Grid size={{xs: 6,sm: 6,md: 3}}>
              <CustomDatePicker
                name="fecha" 
                control={control} 
                label="Fecha" 
                disabled={false}
                maxDate={dayjs()}
                onChange={() =>{setListReport([]);}}
              />
            </Grid>
            <Grid textAlign='center' size={{xs: 6,sm: 6,md: 2}}>
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
        {<TableReport
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
export default ReportMedicalView;