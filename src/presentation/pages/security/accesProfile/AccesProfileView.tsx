import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import * as MUIcons from '@mui/icons-material';
import {Typography,Tooltip, IconButton, Grid} from '@mui/material';
import TableAccesProfile from './components/TableAccesProfile';
import ModalAccesProfile from './components/ModalAccesProfile';
import { AccesProfileContainer } from '../../../../di/security/AccesProfileContainer';
import { AccesUser, NavigationItem } from '../../../../domain/models/AccesModel';
import { userContainer } from '../../../../di/userContainer';
import { AlertConfirm, AlertError, AlertSave } from '../../../components/alerts';
import HeaderPage from '../../../components/containers/HeaderPage';
import { Loading } from '../../../components/Loading';
import { Button } from '../../../../domain/models/ButtonModel';
import { buttonContainer } from '../../../../di/configurations/buttonContainer';
import ContainerFilter from '../../../components/containers/ContainerFilter';
import CustomAutocomplete from '../../../components/inputs/CustomAutocomplete';
import { useForm } from 'react-hook-form';
import ActionButton from '../../../components/buttons/ActionButton';
import { perfilContainer } from '../../../../di/perfilContainer';
import { Perfil } from '../../../../domain/models/PerfilModel';
interface LayoutContext {currentMenuItem: NavigationItem | null;}

const AccesProfileView: React.FC = memo(() => {
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const { control, formState: { errors }, reset, setValue,getValues } = useForm()
  const UserViewModel = userContainer.resolve('UserViewModel');
  const PerfilViewModel = perfilContainer.resolve('perfilViewModel');
  const AccesProfileViewModel = AccesProfileContainer.resolve('accesProfileViewModel');
  const ButtonViewModel = buttonContainer.resolve('buttonViewModel');
  const [loading, setLoading] = useState(false)
  const [listAccesProfile , setListAccesProfile] = useState<AccesUser[]>([])
  const [buttons , setButtons] = useState<Button[]>([])
  const [buttonsActive , setButtonsActive] = useState<Button[]>([])
  const [buttonsHeader , setButtonsHeader ] = useState<any>([])
  const [openModalAccesProfile, setOpenModalAccesProfile] = useState(false)
  const [selectAccesProfile, setSelectAccesProfile] = useState<AccesUser|null>(null)
  const [selectPerfil, setSelectPerfil] = useState<Perfil|null>(null)
  const [listProfile, setListProfile] = useState([])
  const handleOpenModalAccesProfile = useCallback((accesProfile:AccesUser|null)=>{
    setSelectAccesProfile(accesProfile);
    setOpenModalAccesProfile(true);
  },[])
  const handleCloseModalAccesProfile = ()=>{
    setSelectAccesProfile(null);
    setOpenModalAccesProfile(false)}
  useEffect(()=>{
    if(currentMenuItem){
      getProfile();
      getButtuns(currentMenuItem?.id_menu_acceso);
      getButtunsActive();
      //getAccesPerfil();
    }
  },[currentMenuItem])
  const handleCreate = useCallback(()=>{
    handleOpenModalAccesProfile(null)
  },[])
  const handleUpdate = useCallback(async(idAcces:number,idPerfil:string,estado:number,buttons:string[])=>{
    const result = await AlertConfirm({});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await AccesProfileViewModel.update(idAcces,idPerfil,estado,buttons);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalAccesProfile()
        if(selectPerfil){
          await getAccesPerfil(selectPerfil)
        }
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
    }
    setLoading(false)
  },[selectPerfil])
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
  const getAccesPerfil = async (perfil:Perfil|null) => {
    setLoading(true)
    try {
      const idPerfil = perfil?.id;
      const response = await AccesProfileViewModel.findByProfile(idPerfil);
      if ('status' in response && response.status === 'success') {
        setListAccesProfile(response.menu);
      } else {
        setListAccesProfile([]);
      }
    } catch (error) {
    setListAccesProfile([]);}
    setLoading(false)
  };
  const getProfile = async () => {
    setLoading(true)
    try {
      const response = await PerfilViewModel.getPerfil();
      if ('data' in response) {
        setListProfile(response!.data);
      } else {
        setListProfile([])
      }
    } catch (error) {

    }
    setLoading(false)
  };
  const handleSelectPerlfil =(perfil:Perfil)=>{
    setSelectPerfil(perfil);
    //getAccesPerfil(user);
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
            {currentMenuItem?.title ? currentMenuItem?.title: '...'}
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
                name='perfil'
                label='seleccione un perfil'
                labelOption='nombre'
                valueOption='id'
                options={listProfile}
                handleChange={handleSelectPerlfil}
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
              onClick={ () => {getAccesPerfil(selectPerfil)}}
              labelOverride='Buscar'
              disabled={false} 
            />
            </Grid>
          </Grid>
        </ContainerFilter>
      </div>
      <div>
        {<TableAccesProfile
          listAccesProfile={listAccesProfile}
          handleOpenModalAccesProfile={handleOpenModalAccesProfile}
        />
        }
      </div>
      <ModalAccesProfile
      open={openModalAccesProfile}
      onClose={handleCloseModalAccesProfile}
      updateAccesProfile={handleUpdate}
      accesProfile={selectAccesProfile}
      profile={selectPerfil}
      buttons={buttons}
      buttonsActive={buttonsActive}
      ></ModalAccesProfile>
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default AccesProfileView;