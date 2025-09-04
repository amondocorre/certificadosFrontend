import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import * as MUIcons from '@mui/icons-material';
import {Typography,Tooltip, IconButton, Grid} from '@mui/material';
import TableAccesUser from './components/TableAccesUser';
import ModalAccesUser from './components/ModalAccesUser';
import { AccesUserContainer } from '../../../../di/security/AccesUSerContainer';
import { AccesUser, NavigationItem } from '../../../../domain/models/AccesModel';
import { userContainer } from '../../../../di/userContainer';
import { AlertConfirm, AlertError, AlertSave } from '../../../components/alerts';
import HeaderPage from '../../../components/containers/HeaderPage';
import { Loading } from '../../../components/Loading';
import { Button } from '../../../../domain/models/ButtonModel';
import { buttonContainer } from '../../../../di/configurations/buttonContainer';
import { User } from '../../../../domain/models/User';
import ContainerFilter from '../../../components/containers/ContainerFilter';
import CustomAutocomplete from '../../../components/inputs/CustomAutocomplete';
import { useForm } from 'react-hook-form';
import ActionButton from '../../../components/buttons/ActionButton';
interface LayoutContext {currentMenuItem: NavigationItem | null,getItemMenu:()=>void}

const AccesUserView: React.FC = memo(() => {
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const { control, formState: { errors }, reset, setValue,getValues } = useForm()
  const UserViewModel = userContainer.resolve('UserViewModel');
  const AccesUserViewModel = AccesUserContainer.resolve('accesUserViewModel');
  const ButtonViewModel = buttonContainer.resolve('buttonViewModel');
  const [loading, setLoading] = useState(false)
  const [listAccesUser , setListAccesUser] = useState<AccesUser[]>([])
  const [buttons , setButtons] = useState<Button[]>([])
  const [buttonsActive , setButtonsActive] = useState<Button[]>([])
  const [buttonsHeader , setButtonsHeader ] = useState<any>([])
  const [openModalAccesUser, setOpenModalAccesUser] = useState(false)
  const [selectAccesUser, setSelectAccesUser] = useState<AccesUser|null>(null)
  const [selectUser, setSelectUser] = useState<User|null>(null)
  const [listUsers, setListUsers] = useState([])
  const handleOpenModalAccesUser = useCallback((accesUser:AccesUser|null)=>{
    setSelectAccesUser(accesUser);
    setOpenModalAccesUser(true);
  },[])
  const handleCloseModalAccesUser = ()=>{
    setSelectAccesUser(null);
    setOpenModalAccesUser(false)}
  useEffect(()=>{
      getUsers();
      getButtunsActive();
  },[])
  useEffect(()=>{
    if(currentMenuItem){
      getButtuns(currentMenuItem?.id_menu_acceso);
    }
  },[currentMenuItem])
  const handleCreate = useCallback(()=>{
    handleOpenModalAccesUser(null)
  },[])
  const handleUpdate = useCallback(async(idAcces:number,idUser:number,estado:number,buttons:string[])=>{
    const result = await AlertConfirm({});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await AccesUserViewModel.update(idAcces,idUser,estado,buttons);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalAccesUser()
        if(selectUser){
          await getAccesUser(selectUser)
        }
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
    }
    setLoading(false)
  },[currentMenuItem,selectUser])
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
  const getAccesUser = async (user:User|null) => {
    setLoading(true)
    try {
      const idUser = Number(user?.id_usuario);
      const response = await AccesUserViewModel.findByUser(idUser);
      if ('status' in response && response.status === 'success') {
        setListAccesUser(response.menu);
      } else {
        setListAccesUser([]);
      }
    } catch (error) {
    setListAccesUser([]);}
    setLoading(false)
  };
  const getUsers = async () => {
    setLoading(true)
    try {
      const response = await UserViewModel.getAllUsers();
      if ('users' in response) {
        setListUsers(response!.users);
        //setValue('usuario',response!.users[0].id_usuario??'');
        //getAccesUser(response!.users[0]);
        //setSelectUser(response!.users[0])
      } else {
        setListUsers([])
      }
    } catch (error) {

    }
    setLoading(false)
  };
  const handleSelectUser =(user:User)=>{
    setSelectUser(user);
    //getAccesUser(user);
  }
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
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
            <Grid
              size={{
                xs: 6,
                sm: 6,
                md: 3
              }}>
              <CustomAutocomplete
                control={control}
                name='usuario'
                label='seleccione un usuario'
                labelOption='nombre'
                valueOption='id_usuario'
                options={listUsers}
                handleChange={handleSelectUser}
              />
            </Grid>
            <Grid
              size={{
                xs: 6,
                sm: 6,
                md: 3
              }}>
            <ActionButton
              key={`table-button`}
              icon={<MUIcons.Search/>}
              
              onClick={ () => {getAccesUser(selectUser)}}
              labelOverride='Buscar'
              disabled={false} 
            />
            </Grid>
          </Grid>
        </ContainerFilter>
      </div>
      <div>
        {<TableAccesUser
          listAccesUser={listAccesUser}
          handleOpenModalAccesUser={handleOpenModalAccesUser}
        />
        }
      </div>
      <ModalAccesUser
      open={openModalAccesUser}
      onClose={handleCloseModalAccesUser}
      updateAccesUser={handleUpdate}
      accesUser={selectAccesUser}
      user={selectUser}
      buttons={buttons}
      buttonsActive={buttonsActive}
      ></ModalAccesUser>
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default AccesUserView;