import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationItem } from '../../../domain/models/AccesModel';
import { useOutletContext } from 'react-router-dom';
import HeaderPage from '../../components/containers/HeaderPage';
import { userContainer } from '../../../di/userContainer';
import * as MUIcons from '@mui/icons-material';
import {Typography,Tooltip, IconButton, Grid} from '@mui/material';
import { Loading } from '../../components/Loading';
import { AlertConfirm, AlertError, AlertSave } from '../../components/alerts';
import { Calendar, DiaCalendario} from '../../../domain/models/CalendarModel';
import { Button } from '../../../domain/models/ButtonModel';
import ContainerFilter from '../../components/containers/ContainerFilter';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useForm } from 'react-hook-form';
import ActionButton from '../../components/buttons/ActionButton';
import { calendarContainer } from '../../../di/calendarContainer';
import CalendarioMensual from './components/CalendarioMensual';
import ModalGenerateCalendar from './components/ModalGenerateCalendar';
import CustomAutocomplete from '../../components/inputs/CustomAutocomplete';
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}
const ANIO = 2025
const validationSchema = yup.object().shape({
  anio: yup.string().required('Seleccione un año'),
});
const CalendarView: React.FC = memo(() => {
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const CalendarViewModel = calendarContainer.resolve('calendarViewModel');
  const [loading, setLoading] = useState(false)
  const [listCalendar , setListCalendar] = useState<Calendar[]|[]>([])
  const [buttonsHeader , setButtonsHeader ] = useState<any>([])
  const [buttons , setButtons] = useState<Button[]>([])
  const [openModalCalendar, setOpenModalCalendar] = useState(false)
  const [listAnios, setListAnios] = useState<any>([])
  const { handleSubmit,control, formState: { errors}} = useForm<any>({
    resolver: yupResolver(validationSchema),
      defaultValues: {...{
        anio:'0',
      },
    }
  });
  const handleOpenModalCalendar = useCallback(()=>{
    setOpenModalCalendar(true);
  },[])
  const handleCloseModalCalendar = ()=>{
    setOpenModalCalendar(false);
  }
  useEffect(()=>{
    let anio:number = Number(dayjs().get('year'))
    let anios:any =[];
    for (let i = ANIO; i < anio+3; i++) {
      anios.push({value:String(i),label:String(i)});
    }
    setListAnios(anios);
  },[])
  useEffect(()=>{
    //setValue('i_fecha',String(dayjs()) )
    if(currentMenuItem){
      getButtuns(currentMenuItem?.id_menu_acceso);
    }
  },[currentMenuItem])
  const handleCreate = useCallback(()=>{
    handleOpenModalCalendar()
  },[])
  const handlePoblarPorAnio = useCallback(async(anio:number):Promise<boolean>=>{
    const result = await AlertConfirm({title:'Estas seguro de generar el calendar para el año: '+anio+'?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return false;
    setLoading(true)
    try {
      const response = await CalendarViewModel.poblarCalendarioPorAnio(anio);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalCalendar();
        AlertSave({ title: '', message: response.message });
        return true;
      } else {
        AlertError({ title: '', message: response.message })
        return false
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
      return false
    }
  },[])
  const handlePoblarPorMes = useCallback(async(anio:number,mes:string)=>{
    const result = await AlertConfirm({title:'Estas seguro de generar el calendar para el año: '+anio+'?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await CalendarViewModel.poblarCalendarioPorMes(anio,mes);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalCalendar();
        handleSearch();
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
    }
    setLoading(false)
  },[])
  const handleUpdate = useCallback(async(diaCalendario:DiaCalendario):Promise<boolean>=>{
    const result = await AlertConfirm({});
    if (!result.isConfirmed) return false;
    setLoading(true)
    try {
      const response = await CalendarViewModel.updateDate(diaCalendario);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalCalendar()
        handleSearch();
        AlertSave({ title: '', message: response.message });
        return true;
      } else {
        AlertError({ title: '', message: response.message })
        return false
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
      return false;
    }
  },[])
  const actionHandlers:any = {
    handleCreate: handleCreate
  };
  const handleSearch=async()=>{
      await handleSubmit((data: any) => {
        getCalendar(Number(data.anio))})();
    }
  const getButtuns = async (idAcces:number) => {
    setLoading(true)
    try {
      const response = await UserViewModel.getButtunsAccess(idAcces);
      if ('buttons' in response) {
        var btnHeader:any = [];
        var btnTable:any= [];
        setButtons(response!.buttons);
        response!.buttons.forEach((button:any) => {
          const IconComponent = MUIcons[button.icono as keyof typeof MUIcons] || MUIcons.Label;
          if (!IconComponent) {
            console.warn(`Icono "${button.icono}" no encontrado en MUIcons.`);
          }
          const newButton = {
            title: button.descripcion,
            tooltip: button.tooltip,
            icon: <IconComponent />,
            onClick:  () => {
              if (button.onclick && typeof actionHandlers[button.onclick] === 'function') {
                actionHandlers[button.onclick](); 
              } else if (typeof button.onclick === 'function') {
                button.onclick();
              }
            }
          }
          if(button!.tipo ==='header'){
            btnHeader.push(newButton);
          }else{
            btnTable.push(newButton);
          }
        });
        setButtonsHeader(btnHeader);
      } else {

      }
    } catch (error) {

    }
    setLoading(false)
  };
  const getCalendar = async (anio:number) => {
    setLoading(true)
    try {
      const response = await CalendarViewModel.getCalendarioByAnio(anio);
      if ('status' in response && response.status === 'success') {
        setListCalendar(response.data);
      } else {
        setListCalendar([]);
      }
    } catch (error) {
    setListCalendar([]);}
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
          {buttonsHeader.map((button:any) => (
            <Tooltip key={button.title} title={button.tooltip}>
              <IconButton color="secondary" onClick={button.onClick} sx={{ ml: 1 }}>
                {button.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Grid>
      </HeaderPage>
      <div>
        <ContainerFilter>
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} rowSpacing={{ xs: 2, sm: 1, md: 1 }}>
            <Grid
              flexDirection={'column'}
              size={{
                xs: 4,
                sm: 4
              }}>
                  <CustomAutocomplete
                    control={control}
                    name='anio'
                    label='seleccione un año'
                    labelOption='label'
                    valueOption='value'
                    options={listAnios}
                  />
                </Grid>
            <Grid
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
        <Grid container columnSpacing={{ xs:0.5,sm:1,md:1 }} rowSpacing={{ xs: 1, sm: 1, md: 1 }}>
          {listCalendar?.map((mes:any)=>{
            return (
              <Grid
                size={{
                  xs: 6,
                  sm: 4,
                  md: 4
                }}>
                <CalendarioMensual
                handleUpdateDate={handleUpdate}
                estructura={mes}
                buttons={buttons}
                />
              </Grid>
            );
          })
          }
        </Grid>
      </div>
      {<ModalGenerateCalendar
      open={openModalCalendar}
      onClose={handleCloseModalCalendar}
      handlePoblarPorAnio={handlePoblarPorAnio}
      buttons={buttons}
      />}
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default CalendarView;