import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import * as MUIcons from '@mui/icons-material';
import {Typography,Tooltip, IconButton, Grid} from '@mui/material';
import TableMenuAcces from './components/TableMenuAcces';
import ModalMenuAcces from './components/ModaMenuAcces';
import { menuAccesContainer } from '../../../../di/configurations/menuAccesContainer';
import { MenuItem, NavigationItem } from '../../../../domain/models/AccesModel';
import { userContainer } from '../../../../di/userContainer';
import { AlertConfirm, AlertError, AlertSave } from '../../../components/alerts';
import HeaderPage from '../../../components/containers/HeaderPage';
import { Loading } from '../../../components/Loading';
import { Button } from '../../../../domain/models/ButtonModel';
import { buttonContainer } from '../../../../di/configurations/buttonContainer';
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}


const MenuAccesView: React.FC = memo(() => {
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const MenuAccesViewModel = menuAccesContainer.resolve('menuAccesViewModel');
  const ButtonViewModel = buttonContainer.resolve('buttonViewModel');
  //const { menuItem, } = useAuth();
  const [loading, setLoading] = useState(false)
  const [listMenuAcces , setListMenuAcces] = useState<MenuItem[]>([])
  const [buttonsHeader , setButtonsHeader ] = useState<any>([])
  const [buttons , setButtons] = useState<Button[]>([])
  const [buttonsActive , setButtonsActive] = useState<Button[]>([])
  const [buttonsTable , setButtonsTable ] = useState<any>([])
  const [openModalMenuAcces, setOpenModalMenuAcces] = useState(false)
  const [selectMenuAcces, setSelectMenuAcces] = useState<MenuItem|null>(null)
  const [selectNivelSuperior, setSelectNivelSuperior] = useState<MenuItem|null>(null)
  const handleOpenModalMenuAcces = useCallback((menuAcces:MenuItem|null,isCreate:boolean)=>{
    if(isCreate){
      setSelectNivelSuperior(menuAcces);
      setSelectMenuAcces(null);
    }else{
      setSelectMenuAcces(menuAcces);
      setSelectNivelSuperior(null);
    }
    setOpenModalMenuAcces(true);
  },[])
  const handleCloseModalUser = ()=>{
    setSelectNivelSuperior(null);
    setSelectMenuAcces(null);
    setOpenModalMenuAcces(false)}
  useEffect(()=>{
    if(currentMenuItem){
      getMenuAcces();
      getButtuns(currentMenuItem?.id_menu_acceso);
      getButtunsActive();
    }
  },[currentMenuItem])
  const handleCreate = useCallback(()=>{
    handleOpenModalMenuAcces(null,true)
  },[])
  const handleCreateSave = useCallback(async(menuAcces:MenuItem)=>{
    const result = await AlertConfirm({title:'Estas seguro de crear un nuevo Acceso?',confirmButtonText:'Crear'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await MenuAccesViewModel.create(menuAcces);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalUser();
        getMenuAcces();
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })    
    }
    setLoading(false)
  },[])
  const handleUpdate = useCallback(async(menuAcces:MenuItem)=>{
    const result = await AlertConfirm({});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const id:string = String(menuAcces?.id_menu_acceso);
      const response = await MenuAccesViewModel.update(id,menuAcces);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalUser()
        getMenuAcces()
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const handleDelete = useCallback(async(id:number)=>{
    const result = await AlertConfirm({title:'¿Estas seguro de elimiar el Acceso?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await MenuAccesViewModel.delete(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalUser()
        getMenuAcces()
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const handleActivate = useCallback(async(id:number)=>{
    const result = await AlertConfirm({title:'¿Estas seguro de Activar el Acceso?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await MenuAccesViewModel.activate(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalUser()
        getMenuAcces()
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
    handleActivate: handleActivate,
  };
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
        setButtonsTable(btnTable)
      } else {

      }
    } catch (error) {

    }
    setLoading(false)
  };
  const getButtunsActive = async () => {
    setLoading(true)
    try {
      const response = await ButtonViewModel.findActive();
      if ('buttons' in response) {
        setButtonsActive(response!.buttons);
      } else {

      }
    } catch (error) {

    }
    setLoading(false)
  };
  const getMenuAcces = async () => {
    setLoading(true)
    try {
      const response = await MenuAccesViewModel.findAll();
      if ('status' in response && response.status === 'success') {
        setListMenuAcces(response.menu);
      } else {
        setListMenuAcces([]);
      }
    } catch (error) {
    setListMenuAcces([]);}
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
        {<TableMenuAcces
          listMenuAcces={listMenuAcces}
          handleOpenModalMenuAcces={handleOpenModalMenuAcces}
        />
        }
      </div>
      <ModalMenuAcces
      open={openModalMenuAcces}
      onClose={handleCloseModalUser}
      createMenuAcces={handleCreateSave}
      updateMenuAcces={handleUpdate}
      deleteMenuAcces={handleDelete}
      activateMenuAcces={handleActivate}
      menuAcces={selectMenuAcces}
      nivelSuperior={selectNivelSuperior}
      buttons={buttons}
      buttonsActive={buttonsActive}
      ></ModalMenuAcces>
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default MenuAccesView;