import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationItem } from '../../../../domain/models/AccesModel';
import { useOutletContext } from 'react-router-dom';
import HeaderPage from '../../../components/containers/HeaderPage';
import { userContainer } from '../../../../di/userContainer';
import * as MUIcons from '@mui/icons-material';
import {Typography,Tooltip, IconButton, Grid} from '@mui/material';
import { sucursalContainer } from '../../../../di/configurations/sucursalContainer';
import { Sucursal } from '../../../../domain/models/SucursalModel';
import { Loading } from '../../../components/Loading';
import { AlertConfirm, AlertError, AlertSave } from '../../../components/alerts';
import { Button } from '../../../../domain/models/ButtonModel';
import TableSucursal from './components/TableSucursal';
import ModalSucursal from './components/ModalSucursal';
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}
const SucursalView: React.FC = memo(() => {
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const SucursalViewModel = sucursalContainer.resolve('sucursalViewModel');
  const [loading, setLoading] = useState(false)
  const [listSucursales , setListSucursales] = useState<Sucursal[]>([])
  const [buttonsHeader , setButtonsHeader ] = useState<any>([])
  const [buttons , setButtons] = useState<Button[]>([])
  const [openModalSucursal, setOpenModalSucursal] = useState(false)
  const [selectSucursal, setSelectSucursal] = useState<Sucursal|null>(null)
  const handleOpenModalSucursal = useCallback((Sucursal:Sucursal|null)=>{
    setOpenModalSucursal(true);
    setSelectSucursal(Sucursal);
  },[])
  const handleCloseModalSucursal = ()=>{
    setSelectSucursal(null);
    setOpenModalSucursal(false)}
  useEffect(()=>{
    getSucursal();
  },[])
  useEffect(()=>{
    if(currentMenuItem){
      getButtuns(currentMenuItem?.id_menu_acceso);
    }
  },[currentMenuItem])
  const handleCreate = useCallback(()=>{
    handleOpenModalSucursal(null)
  },[])
  const handleCreateSave = useCallback(async(Sucursal:Sucursal)=>{
    const result = await AlertConfirm({title:'Estas seguro de crear una Sucursal?',confirmButtonText:'Crear'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await SucursalViewModel.create(Sucursal);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalSucursal();
        getSucursal();
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const handleUpdate = useCallback(async(Sucursal:Sucursal,id:number)=>{
    const result = await AlertConfirm({});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await SucursalViewModel.update(id,Sucursal);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalSucursal()
        getSucursal()
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const handleDelete = useCallback(async(id:string)=>{
    const result = await AlertConfirm({title:'¿Estas seguro de elimiar el Sucursal?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await SucursalViewModel.delete(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalSucursal()
        getSucursal()
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
    const result = await AlertConfirm({title:'¿Estas seguro de Habilitar el Sucursal?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await SucursalViewModel.activate(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalSucursal()
        getSucursal()
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
          }
        });
        setButtonsHeader(btnHeader);
      } else {

      }
    } catch (error) {

    }
    setLoading(false)
  };
  const getSucursal = async () => {
    setLoading(true)
    try {
      const response = await SucursalViewModel.findAll();
      if ('status' in response && response.status === 'success') {
        setListSucursales(response.data);
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
        {<TableSucursal
          listSucursales={listSucursales}
          handleOpenModalSucursal={handleOpenModalSucursal}
        />}
      </div>{
        <ModalSucursal
        open={openModalSucursal}
        onClose={handleCloseModalSucursal}
        createSucursal={handleCreateSave}
        updateSucursal={handleUpdate}
        deleteSucursal={handleDelete}
        activateSucursal={handleActivate}
        sucursal={selectSucursal}
        buttons={buttons}
        ></ModalSucursal>}
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default SucursalView;