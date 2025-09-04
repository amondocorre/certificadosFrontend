import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationItem } from '../../../../domain/models/AccesModel';
import { useOutletContext } from 'react-router-dom';
import HeaderPage from '../../../components/containers/HeaderPage';
import { userContainer } from '../../../../di/userContainer';
import UserTable from './components/TableUser';
import { User } from '../../../../domain/models/User';
import * as MUIcons from '@mui/icons-material';
import ModalUser  from './components/ModalUser'
import {Typography,Tooltip, IconButton, Grid} from '@mui/material';
import { perfilContainer } from '../../../../di/perfilContainer';
import { Perfil } from '../../../../domain/models/PerfilModel';
import { Loading } from '../../../components/Loading';
import { AlertConfirm, AlertError, AlertSave } from '../../../components/alerts';
import { Button } from '../../../../domain/models/ButtonModel';
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}

const UsersView: React.FC = memo(() => {
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const PerfilViewModel = perfilContainer.resolve('perfilViewModel');
  const [loading, setLoading] = useState(false)
  const [usersList , setUsersList ] = useState<User[]>([])
  const [buttonsHeader , setButtonsHeader ] = useState<any>([])
  const [buttons , setButtons] = useState<Button[]>([])
  const [buttonsTable , setButtonsTable ] = useState<any>([])
  const [openModalUser, setOpenModalUser] = useState(false)
  const [selectUser, setSelectUser] = useState<User|null>(null)
  const [listPerfil, setListPerfil] = useState<Perfil[]>([])
  const handleOpenModalUser = useCallback((user:User|null)=>{
    setOpenModalUser(true);
    setSelectUser(user);
  },[])
  const handleCloseModalUser = ()=>{
    setSelectUser(null);
    setOpenModalUser(false)}
  useEffect(()=>{
    if(currentMenuItem){
      getAllUsers();
      getButtuns(currentMenuItem?.id_menu_acceso);
      getPerfil();
    }
  },[currentMenuItem])
  const handleCreate = useCallback(()=>{
    handleOpenModalUser(null)
  },[])
  const handleCreateSave = useCallback(async(user:User)=>{
    const result = await AlertConfirm({title:'Estas seguro de crear un nuevo usuario?',confirmButtonText:'Crear'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await UserViewModel.create(user);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalUser();
        getAllUsers();
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const handleUpdate = useCallback(async(user:User)=>{
    const result = await AlertConfirm({});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const id_usuario:number = Number(user?.id_usuario);
      const response = await UserViewModel.update(user,id_usuario);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalUser();
        getAllUsers();
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const handleDelete = useCallback(async(id_usuario:number)=>{
    const result = await AlertConfirm({title:'¿Estas seguro de elimiar el usuario?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await UserViewModel.delete(id_usuario);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalUser();
        getAllUsers();
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const handleActivate = useCallback(async(id_usuario:number)=>{
    const result = await AlertConfirm({title:'¿Estas seguro de Activar el usuario?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await UserViewModel.activate(id_usuario);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalUser();
        getAllUsers();
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
      const response = await PerfilViewModel.getPerfil();
      if ('status' in response && response.status === 'success') {
        setListPerfil(response.data);
      } else {
      }
    } catch (error) {}
    setLoading(false)
  };
  const getAllUsers = async () => {
    setLoading(true)
    try {
      const response = await UserViewModel.getAllUsers();
      if ('users' in response) {
        setUsersList(response.users)
      } else {
        setUsersList([])
      }
    } catch (error) {
    }
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
        {<UserTable
          usersList={usersList}
          handleOpenModalUser={handleOpenModalUser}
        />
        }
      </div>
      <ModalUser
      open={openModalUser}
      onClose={handleCloseModalUser}
      createUser={handleCreateSave}
      updadeUser={handleUpdate}
      deletedUser={handleDelete}
      activateUser={handleActivate}
      user={selectUser}
      listPerfil={listPerfil}
      buttons={buttons}
      ></ModalUser>
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default UsersView;