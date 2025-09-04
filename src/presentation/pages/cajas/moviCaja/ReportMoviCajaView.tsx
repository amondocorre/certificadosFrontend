import React, { memo,useEffect, useState } from 'react';
import { NavigationItem } from '../../../../domain/models/AccesModel';
import { useOutletContext } from 'react-router-dom';
import HeaderPage from '../../../components/containers/HeaderPage';
import { userContainer } from '../../../../di/userContainer';
import * as MUIcons from '@mui/icons-material';
import {Typography,Tooltip, IconButton, Grid,} from '@mui/material';
import { moviCajaContainer } from '../../../../di/caja/moviCajaContainer';
import { printContainer } from '../../../../di/prints/printContainer';
import { Loading } from '../../../components/Loading';
import { Button } from '../../../../domain/models/ButtonModel';
import { useForm } from 'react-hook-form';
import ActionButton from '../../../components/buttons/ActionButton';
import CustomSelect from '../../../components/inputs/CustomSelect';
import { MoviCaja, MoviCajaFilter } from '../../../../domain/models/MoviCajaModel';
import ContainerFilter from '../../../components/containers/ContainerFilter';
import CustomDatePicker from '../../../components/inputs/CustomDatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatDate } from '../../../utils/dateUtils';
import TableMovCaja from './components/TableMovCaja';
import { AlertConfirm } from '../../../components/alerts';
import { useAuth } from '../../../hooks/useAuth';
import { sucursalUserContainer } from '../../../../di/security/sucursalUserContainer';
import { Sucursal } from '../../../../domain/models/SucursalModel';
import CustomAutocomplete from '../../../components/inputs/CustomAutocomplete';

const dataOptions = [
  { value: 'Ingreso', label: 'Ingreso' },
  { value: 'Egreso', label: 'Egreso' },
  { value: 'ALL', label: 'Todos' }
];
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}
const validationSchema = yup.object().shape({
  tipo: yup.string().required('Seleccione un tipo'),
  id_sucursal: yup.string().required('Seleccione una Sucursal'),
  ifecha: yup.string().required('Seleccione una fecha'),
  ffecha: yup.string().required('Seleccione una fecha'),
});
const ReportMoviCajaView: React.FC = memo(() => {
  const { authResponse } = useAuth();
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const MoviCajaViewModel = moviCajaContainer.resolve('moviCajaViewModel');
  const PrintViewModel = printContainer.resolve('printViewModel');
  const SucursalUserViewModel = sucursalUserContainer.resolve('sucursalUserViewModel');
  const [loading, setLoading] = useState(false)
  const [buttonsHeader , setButtonsHeader ] = useState<any>([])
  const [buttons , setButtons] = useState<Button[]>([])
  const [listMovCaja, setlistMovCaja] = useState<MoviCaja[]>([])
  const [listSucursales, setListSucursales] = useState<Sucursal[]>([])
  const { handleSubmit,control, formState: { errors}, setValue} = useForm<MoviCajaFilter>({
    resolver: yupResolver(validationSchema),
      defaultValues: {...{
        tipo:'',
        ifecha:'',
        ffecha:'',
        id_sucursal:''
      },
    }
  });
  const handleSearch=async()=>{
      await handleSubmit((data: any) => {
        const niewData = {
          ifecha: String(formatDate(data.ifecha)),
          ffecha: String(formatDate(data.ffecha)),
          tipo: String(data.tipo),
          id_sucursal: String(data.id_sucursal),
        }
      findFilter(niewData)})();
    }
    
  useEffect(()=>{
    if(authResponse?.id_sucursal!=0){
      setValue('id_sucursal',String(authResponse?.id_sucursal));
    }
  },[authResponse])
  useEffect(()=>{
    setValue('ifecha',String(dayjs()) )
    setValue('ffecha',String(dayjs()) )
    setValue('tipo','ALL')
    if(currentMenuItem){
      getButtuns(currentMenuItem?.id_menu_acceso);
      handleSearch();
      getSucursales();
    }
  },[currentMenuItem])
  const actionHandlers:any = {};
  const getButtuns = async (idAcces:number) => {
    setLoading(true)
    try {
      const response = await UserViewModel.getButtunsAccess(idAcces);
      if ('buttons' in response) {
        var btnHeader:any = [];
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
          if(button!.tipo ==='header' && button?.nombre !== 'create'){
            btnHeader.push(newButton);
          }
        });
        setButtonsHeader(btnHeader);
      } else {

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
  const findFilter = async (moviCajaFilter:MoviCajaFilter) => {
    setLoading(true)
    try {
      const response = await MoviCajaViewModel.findFilter(moviCajaFilter);
      if ('status' in response && response.status === 'success') {
        setlistMovCaja(response.data);
      } else {
      }
    } catch (error) {}
    setLoading(false)
  };
  const printMovimientoCaja = async (id:number) => {
    const result = await AlertConfirm({title:'quieres imprimir el movimiento de caja.?',confirmButtonText:'Imprimir'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      await PrintViewModel.printMovimientoCaja(id);
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
        <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1 }} rowSpacing={{ xs: 2, sm: 1, md: 1 }}>
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
              handleChange={()=>{setlistMovCaja([]);}}
            />
          </Grid>
          <Grid
            size={{
              xs: 6,
              sm: 6,
              md: 3
            }}>
            <CustomSelect
              control={control} 
              name="tipo" 
              label="Tipo movimiento" 
              options={dataOptions} 
              disabled={false}
              placeholder="Selecciona un tipo movimiento"
              onChange={()=>{setlistMovCaja([])}} 
              //icon={<FormatOverline/>}
            />
          </Grid>
          <Grid
            size={{
              xs: 6,
              sm: 6,
              md: 2.3
            }}>
            <CustomDatePicker
              name="ifecha" 
              control={control} 
              label="Fecha Inicio" 
              disabled={false}
              maxDate={dayjs()}
              onChange={() =>{setlistMovCaja([]);}}
            />
          </Grid>
          <Grid
            size={{
              xs: 6,
              sm: 6,
              md: 2.3
            }}>
            <CustomDatePicker
              name="ffecha" 
              control={control} 
              label="Fecha Inicio" 
              disabled={false}
              maxDate={dayjs()}
              onChange={() =>{setlistMovCaja([]);}}
            />
          </Grid>
          <Grid
            textAlign='center'
            size={{
              xs: 6,
              sm: 6,
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
      <div>
      <TableMovCaja
        listMovCaja={listMovCaja}
        printMovimientoCaja={printMovimientoCaja}
      />
    </div>
    </div>
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default ReportMoviCajaView;