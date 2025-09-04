import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationItem } from '../../../domain/models/AccesModel';
import { useOutletContext } from 'react-router-dom';
import HeaderPage from '../../components/containers/HeaderPage';
import { userContainer } from '../../../di/userContainer';
import * as MUIcons from '@mui/icons-material';
import {Typography,Tooltip, IconButton, Grid} from '@mui/material';
import { perfilContainer } from '../../../di/perfilContainer';
import { Perfil } from '../../../domain/models/PerfilModel';
import { Loading } from '../../components/Loading';
import { AlertConfirm, AlertError, AlertSave } from '../../components/alerts';
import TableProfile from './components/TableProfile';
import ModalProfile from './components/ModaProfile';
import { Button } from '../../../domain/models/ButtonModel';
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}
const ProfilesView: React.FC = memo(() => {
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const PerfilViewModel = perfilContainer.resolve('perfilViewModel');
  const [loading, setLoading] = useState(false)
  const [listProfile , setListProfile] = useState<Perfil[]>([])
  const [buttonsHeader , setButtonsHeader ] = useState<any>([])
  const [buttons , setButtons] = useState<Button[]>([])
  const [buttonsTable , setButtonsTable ] = useState<any>([])
  const [openModalProfile, setOpenModalProfile] = useState(false)
  const [selectProfile, setSelectProfile] = useState<Perfil|null>(null)
  const handleOpenModalProfile = useCallback((profile:Perfil|null)=>{
    setOpenModalProfile(true);
    setSelectProfile(profile);
  },[])
  const handleCloseModalUser = ()=>{
    setSelectProfile(null);
    setOpenModalProfile(false)}
  useEffect(()=>{
    if(currentMenuItem){
      getButtuns(currentMenuItem?.id_menu_acceso);
      getPerfil();
    }
  },[currentMenuItem])
  const handleCreate = useCallback(()=>{
    handleOpenModalProfile(null)
  },[])
  const handleCreateSave = useCallback(async(profile:Perfil)=>{
    const result = await AlertConfirm({title:'Estas seguro de crear un nuevo pefil?',confirmButtonText:'Crear'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await PerfilViewModel.create(profile);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalUser();
        getPerfil();
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const handleUpdate = useCallback(async(profile:Perfil)=>{
    const result = await AlertConfirm({});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const id:string = String(profile?.id);
      const response = await PerfilViewModel.update(id,profile);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalUser()
        getPerfil()
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
    const result = await AlertConfirm({title:'¿Estas seguro de elimiar el pefil?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await PerfilViewModel.delete(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalUser()
        getPerfil()
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
    const result = await AlertConfirm({title:'¿Estas seguro de Habilitar el pefil?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await PerfilViewModel.activate(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalUser()
        getPerfil()
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
  const getPerfil = async () => {
    setLoading(true)
    try {
      const response = await PerfilViewModel.getPerfilAll();
      if ('status' in response && response.status === 'success') {
        setListProfile(response.data);
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
        {<TableProfile
          listProfile={listProfile}
          handleOpenModalProfile={handleOpenModalProfile}
        />
        }
      </div>
      <ModalProfile
      open={openModalProfile}
      onClose={handleCloseModalUser}
      createProfile={handleCreateSave}
      updateProfile={handleUpdate}
      deleteProfile={handleDelete}
      activateProfile={handleActivate}
      profile={selectProfile}
      buttons={buttons}
      ></ModalProfile>
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default ProfilesView;