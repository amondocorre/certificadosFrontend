import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationItem } from '../../../../domain/models/AccesModel';
import { useOutletContext } from 'react-router-dom';
import HeaderPage from '../../../components/containers/HeaderPage';
import { userContainer } from '../../../../di/userContainer';
import * as MUIcons from '@mui/icons-material';
import {Typography,Tooltip, IconButton, Grid, Paper, Container, Alert} from '@mui/material';
import { cajaContainer } from '../../../../di/caja/cajaContainer';
import { Caja } from '../../../../domain/models/CajaModel';
import { Loading } from '../../../components/Loading';
import { AlertConfirm, AlertError, AlertSave } from '../../../components/alerts';
import { Button } from '../../../../domain/models/ButtonModel';
import { Box } from '@mui/system';
import { StyledHeaderSecondary } from '../../../components/text/StyledHeader';
import { formatDateDMY, formatTime12H } from '../../../utils/dateUtils';
import { useForm } from 'react-hook-form';
import CustomTextField from '../../../components/inputs/CustomTextField';
import MoneyIcon from '@mui/icons-material/Money';
import ActionButton from '../../../components/buttons/ActionButton';
import { printContainer } from '../../../../di/prints/printContainer';
import { sucursalUserContainer } from '../../../../di/security/sucursalUserContainer';
import { Sucursal } from '../../../../domain/models/SucursalModel';
import CustomAutocomplete from '../../../components/inputs/CustomAutocomplete';
import ModalSelectSucursal from '../../../components/modal/ModalSelectSucursal';
import { useAuth } from '../../../hooks/useAuth';
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}
const CajaView: React.FC = memo(() => {
  const { authResponse } = useAuth();
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const CajaViewModel = cajaContainer.resolve('cajaViewModel');
  const PrintViewModel = printContainer.resolve('printViewModel');
  const SucursalUserViewModel = sucursalUserContainer.resolve('sucursalUserViewModel');
  const { control,reset,getValues,setValue } = useForm({})
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false)
  const [modalSucursal, setModalSucursal] = useState(false)
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
    //getCaja();
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
    const monto:number = getValues('monto');
    setError(null);
    const id_sucursal = getValues('id_sucursal');
    if(!id_sucursal){
      setError('Selecione una sucursal.');
      return;
    }
    if(isNaN(monto) || monto === undefined || !monto){
      setError('Debes ingresar un valor en monto de apertura de caja.');
      return;
    }
    const result = await AlertConfirm({title:'Estas de aperturar un turno?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await CajaViewModel.create(monto,Number(id_sucursal));
      setLoading(false)
      if ('status' in response && response.status==='success') {
        getCaja();
        reset();
        if('id' in response && response?.id>0){
          await printAperturaTurno(response?.id);
        }
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {}
    setLoading(false)
  },[getValues,dataCaja])
  const handleUpdate = useCallback(async()=>{
    const monto:number = getValues('monto');
    setError(null);
    const id_sucursal = getValues('id_sucursal');
    if(!id_sucursal){
      setError('Selecione una sucursal.');
      return;
    }
    if(isNaN(monto) || monto === undefined || !monto){
      setError('Debes ingresar un valor en monto de cierre de caja.');
      return;
    }
    const result = await AlertConfirm({title:'Estas seguro de Cerrar el turno?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const id:number = Number(dataCaja?.id);
      const response = await CajaViewModel.update(id,monto,Number(id_sucursal));
      setLoading(false)
      if ('status' in response && response.status==='success') {
        await getCaja()
        if('id' in response && response?.id>0){
          await printCierreTurno(response?.id);
        }
        AlertSave({ title: '', message: response.message });
        reset()
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[getValues,dataCaja])
  const handleDelete = useCallback(async(id:string)=>{
    const result = await AlertConfirm({title:'¿Estas seguro de elimiar el ..?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await CajaViewModel.delete(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        getCaja()
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const handleActivate = useCallback(async(id:string)=>{
    const result = await AlertConfirm({title:'¿Estas seguro de Habilitar el ..?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await CajaViewModel.activate(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        getCaja()
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const actionHandlers:any = {
    handleCreate: handleCreate,
    handleUpdate: handleUpdate,
    handleDelete: handleDelete,
    handleActivate:handleActivate
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
      setDataCaja(null)
      return;
    }
    setLoading(true)
    try {
      const response = await CajaViewModel.findActive(id_sucursal);
      if ('status' in response && response.status === 'success') {
        setDataCaja(response.data);
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
  const printAperturaTurno = async (id:number) => {
    setLoading(true)
    try {
      await PrintViewModel.printAperturaTurno(id);
    } catch (error) {}
    setLoading(false)
  };
  const printCierreTurno = async (id:number) => {
    setLoading(true)
    try {
      await PrintViewModel.printCierreTurno(id);
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
              {dataCaja?.id?'Cierre de Caja':'Apertura de Caja'}
            </Typography>
            {dataCaja?.id && 
            <Box sx={{padin: 0,display: 'flex',flexDirection: 'column',alignItems: 'center',border: '1px solid #FAD461', borderRadius: '8px', paddingInline:3, }}>
              <StyledHeaderSecondary sx={{ mb: 0 }}>
                Información de caja
              </StyledHeaderSecondary>
              <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'start',}}>
                <StyledHeaderSecondary variant="h6" sx={{ mb: -1 }}>
                  <strong>Usuario: </strong> {dataCaja?.usuario}
                </StyledHeaderSecondary>
                <StyledHeaderSecondary variant="h6" sx={{ mb: -1 }}>
                  <strong>Monto inicial: </strong> {dataCaja?.monto_inicial} <strong>Bs.</strong>
                </StyledHeaderSecondary>     
                <StyledHeaderSecondary variant="h6" sx={{ mb: -1 }}>
                  <strong>Fecha Apertura: </strong> {formatDateDMY(dataCaja?.fecha_apertura)} 
                </StyledHeaderSecondary>
                <StyledHeaderSecondary variant="h6" sx={{ mb: 0 }}>
                  <strong>Hora Apertura: </strong> {formatTime12H(dataCaja?.fecha_apertura)} 
                </StyledHeaderSecondary>
              </Box>
            </Box>}
            <br></br>
            {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
              <Box sx={{mb:2, width: '60%',display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
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
              <Box sx={{width: '60%',display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
                <CustomTextField
                name="monto" 
                type='number'
                control={control} 
                label={dataCaja?.id?"Monto de cierre caja":"Monto de apertura caja"} 
                placeholder="Debe ingresar un valor" 
                disabled={false}
                icon={<MoneyIcon />} 
              />
                <br></br>
                {buttons.filter((button: Button) =>(dataCaja?.id && button.nombre === 'update')|| (!dataCaja?.id && button.nombre === 'create'))
                  .map((button: any,index:number) => {
                    if (dataCaja?.id && button?.tipo === 'table' && button.nombre === 'update' ) {
                      return (
                        <ActionButton
                          key={`header-button-${button.id || index}`}
                          type={button?.nombre}
                          label='Cerrar turno'
                          onClick={() => {
                            if (button.onclick && typeof actionHandlers[button.onclick] === 'function') {
                              actionHandlers[button.onclick](); 
                            } else if (typeof button.onclick === 'function') {
                              button.onclick();
                            }
                          }}
                          disabled={!dataCaja.myTurno} 
                        />
                      );
                    } else if (!dataCaja?.id && button?.tipo === 'header' && button?.nombre === 'create') {
                      return (
                        <ActionButton
                          key={`table-button-${button.id || index}`}
                          type={button?.nombre}
                          label='Apertura turno'
                          onClick={ () => {
                            if (button.onclick && typeof actionHandlers[button.onclick] === 'function') {
                              actionHandlers[button.onclick](); 
                            } else if (typeof button.onclick === 'function') {
                              button.onclick();
                            }
                          }}
                          disabled={false} 
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
export default CajaView;