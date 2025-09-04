import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationItem } from '../../../../domain/models/AccesModel';
import { useOutletContext } from 'react-router-dom';
import HeaderPage from '../../../components/containers/HeaderPage';
import { userContainer } from '../../../../di/userContainer';
import * as MUIcons from '@mui/icons-material';
import {Typography,Tooltip, IconButton, Grid, Paper, Container, Alert} from '@mui/material';
import { moviCajaContainer } from '../../../../di/caja/moviCajaContainer';
import { cajaContainer } from '../../../../di/caja/cajaContainer';
import { Caja } from '../../../../domain/models/CajaModel';
import { Loading } from '../../../components/Loading';
import { AlertConfirm, AlertError, AlertSave } from '../../../components/alerts';
import { Button } from '../../../../domain/models/ButtonModel';
import { Box } from '@mui/system';
import { StyledHeaderSecondary } from '../../../components/text/StyledHeader';
import { useForm } from 'react-hook-form';
import CustomTextField from '../../../components/inputs/CustomTextField';
import {Money,Description,FormatOverline} from '@mui/icons-material';
import ActionButton from '../../../components/buttons/ActionButton';
import CustomSelect from '../../../components/inputs/CustomSelect';
import { MoviCaja } from '../../../../domain/models/MoviCajaModel';
import { printContainer } from '../../../../di/prints/printContainer';
import { sucursalUserContainer } from '../../../../di/security/sucursalUserContainer';
import { Sucursal } from '../../../../domain/models/SucursalModel';
import CustomAutocomplete from '../../../components/inputs/CustomAutocomplete';
import { useAuth } from '../../../hooks/useAuth';
import ModalSelectSucursal from '../../../components/modal/ModalSelectSucursal';

const dataOptions = [
  { value: 'Ingreso', label: 'Ingreso' },
  { value: 'Egreso', label: 'Egreso' }
];
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}
const MoviCajaView: React.FC = memo(() => {
  const { authResponse } = useAuth();
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const MoviCajaViewModel = moviCajaContainer.resolve('moviCajaViewModel');
  const SucursalUserViewModel = sucursalUserContainer.resolve('sucursalUserViewModel');
  const CajaViewModel = cajaContainer.resolve('cajaViewModel');
  const PrintViewModel = printContainer.resolve('printViewModel');
  const { control,reset,getValues,setValue } = useForm({})
  const [error, setError] = useState<string | null>(null);
  const [modalSucursal, setModalSucursal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataCaja , setDataCaja] = useState<Caja|null>(null)
  const [buttonsHeader , setButtonsHeader ] = useState<any>([])
  const [buttons , setButtons] = useState<Button[]>([])
  const [listSucursales, setListSucursales] = useState<Sucursal[]>([])
  const handleCloseModal=()=>{
    setModalSucursal(false)
  }
  const selectSucursal=()=>{
    handleCloseModal();
  }
  useEffect(()=>{
    getSucursales()
    if(authResponse?.id_sucursal===0){
      //setModalSucursal(true);
    }else{
      setValue('id_sucursal',String(authResponse?.id_sucursal));
      getCaja();
    }
  },[authResponse])
  useEffect(()=>{
    if(currentMenuItem){
      getButtuns(currentMenuItem?.id_menu_acceso);
    }
  },[currentMenuItem])
  const handleCreate = useCallback(async()=>{
    const tipo:string = getValues('tipo');
    const monto:number = Number(getValues('monto'));
    setError(null);
    const id_sucursal = getValues('id_sucursal');
    if(!id_sucursal){
      setError('Selecione una sucursal.');
      return;
    }
    if(tipo === undefined || !tipo){
      setError('Seleccione un tipo de movimiento.');
      return;
    }
    if(isNaN(monto) || monto === undefined || !monto || 0===monto){
      setError('Debes ingresar un valor mayor a 0 en monto.');
      return;
    }
    const moviCaja: MoviCaja = {
          id_pago: 0,
          tipo: tipo,
          descripcion: getValues('descripcion'),
          monto: monto,
          id_sucursal:id_sucursal,
      };
    const result = await AlertConfirm({title:'Estas seguro de registrar el movimiento.?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await MoviCajaViewModel.create(moviCaja);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        if('id' in response && response?.id>0){
          await printMovimientoCaja(response?.id);
        }
        //getCaja();
        reset();
        setValue('tipo',tipo);
        setValue('id_sucursal',id_sucursal);
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
    }
    setLoading(false)
  },[getValues,dataCaja])
  const handleUpdate = useCallback(async()=>{
    const monto:number = getValues('monto');
    setError(null);
    if(isNaN(monto) || monto === undefined || !monto){
      setError('Debes ingresar un valor en monto de cierre de caja.');
      return;
    }
    const result = await AlertConfirm({title:'Estas seguro de Cerrar el turno?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const id:number = Number(dataCaja?.id);
      const response = await MoviCajaViewModel.update(id,monto);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        getCaja()
        reset()
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[getValues,dataCaja])
  
  const actionHandlers:any = {
    handleCreate: handleCreate,
    handleUpdate: handleUpdate,
  };
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
  const getCaja = async () => {
    setError(null);
    const id_sucursal = getValues('id_sucursal');
    if(!id_sucursal){
      setError('Selecione una sucursal.');
      return;
    }
    setLoading(true)
    try {
      const response = await CajaViewModel.findActive(Number(id_sucursal));
      if ('status' in response && response.status === 'success') {
        setDataCaja(response.data);
        if(response?.data?.length==0){
          setError('Para poder Registrar debe aperturar la caja.');
        }
      } else {
      }
    } catch (error) {}
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
  const printMovimientoCaja = async (id:number) => {
    setLoading(true)
    try {
      await PrintViewModel.printMovimientoCaja(id);
    } catch (error) {}
    setLoading(false)
  };
  return (
    <div>
      <HeaderPage>
      <Grid size={{xs: 6.5,sm: 7,md: 8}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentMenuItem?.title ? currentMenuItem?.title : '...'}
          </Typography>
        </Grid>
        <Grid container size={{xs: 5.5,sm: 5,md: 4}} justifyContent="end"alignItems="end"alignSelf={'center'}>
          {buttonsHeader.map((button:any) => (
            <Tooltip key={button.title} title={button.tooltip}>
              <IconButton color="secondary" onClick={button.onClick} sx={{ ml: 1 }}>
                {button.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Grid>
      </HeaderPage>
      <Container component="main" maxWidth="xs" sx={{paddingTop:1}}>
        <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
          <Paper
            elevation={24}
            sx={{ paddingTop: 4,display: 'flex',flexDirection: 'column',alignItems: 'center',width: '100%',}}>
            <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
              {dataCaja?.id?'Movimientos de caja':'Movimientos de caja'}
            </Typography>
            <Box sx={{padin: 0,width: '85%',display: 'flex',flexDirection: 'column',alignItems: 'center',border: '1px solid #FAD461', borderRadius: '8px', marginInline:3, }}>
              {//!dataCaja?.id && <Alert severity="error" sx={{ width: '100%', m: 1 }}>{'Para poder Registrar debe aperturar la caja.'}</Alert>
              !dataCaja?.id && error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>
              }
              <StyledHeaderSecondary sx={{ mb: 0 }}>
              </StyledHeaderSecondary>
              <Box sx={{mb:2, width: '85%',display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
                <CustomAutocomplete
                  control={control}
                  name='id_sucursal'
                  label='seleccione una sucursal'
                  labelOption='nombre'
                  valueOption='id_sucursal'
                  options={listSucursales}
                  disabled={(authResponse?.id_sucursal!==0)}
                  handleChange={()=>{getCaja();}}
                />
              </Box>
              {dataCaja?.id &&
               <Box sx={{width: '85%',display: 'flex',flexDirection: 'column',alignItems: 'center',margin:3,paddingTop:2}}>
                <Grid container spacing={3}>
                  <Grid size={{xs: 12,sm: 12}}>
                    <CustomSelect
                      control={control} 
                      name="tipo" 
                      label="Tipo" 
                      options={dataOptions} 
                      disabled={false}
                      placeholder="Selecciona un tipo de movimiento" 
                      icon={<FormatOverline/>}
                    />
                  </Grid>
                  <Grid size={{xs: 12,sm: 12}}>
                    <CustomTextField
                      name="monto" 
                      type='number'
                      control={control} 
                      label={dataCaja?.id?"Monto de cierre caja":"Monto de apertura caja"} 
                      placeholder="Debe ingresar un valor" 
                      disabled={false}
                      icon={<Money />} 
                    />
                  </Grid>
                  <Grid size={{ xs: 12,sm: 12}}>
                    <CustomTextField
                      name="descripcion" 
                      type='text'
                      control={control} 
                      label="descripción"
                      placeholder="ingrese un descripción" 
                      disabled={false}
                      icon={<Description />} 
                    />
                  </Grid>
                </Grid>
              </Box>
              }
            </Box>
              { dataCaja?.id && error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
              <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
                {buttons.filter((button: Button) =>(dataCaja?.id && button.nombre === 'update')|| (dataCaja?.id && button.nombre === 'create'))
                  .map((button: any,index:number) => {
                   if (dataCaja?.id && button?.tipo === 'header' && button?.nombre === 'create') {
                      return (
                        <ActionButton
                          key={`table-button-${button.id || index}`}
                          type={button?.nombre}
                          label=''
                          onClick={ () => {
                            if (button.onclick && typeof actionHandlers[button.onclick] === 'function') {
                              actionHandlers[button.onclick](); 
                            } else if (typeof button.onclick === 'function') {
                              button.onclick();
                            }
                          }}
                          disabled={!dataCaja?.myTurno} 
                        />
                      );
                    }
                    return null; 
                  })}  
                <br></br>
              </Box>
        </Paper>

      </Box>
    </Container>
      <ModalSelectSucursal
        onClose={handleCloseModal}
        open={modalSucursal}
        dataResponse={authResponse}
        selectSucursal={selectSucursal}
        />
      {loading &&<Loading></Loading>}
    </div>
  );
}
)
export default MoviCajaView;