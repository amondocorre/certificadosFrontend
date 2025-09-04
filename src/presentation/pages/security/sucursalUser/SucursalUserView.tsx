import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationItem } from '../../../../domain/models/AccesModel';
import { useOutletContext } from 'react-router-dom';
import HeaderPage from '../../../components/containers/HeaderPage';
import { userContainer } from '../../../../di/userContainer';
import * as MUIcons from '@mui/icons-material';
import {Typography,Tooltip, IconButton, Grid} from '@mui/material';
import { sucursalUserContainer } from '../../../../di/security/sucursalUserContainer';
import { Sucursal } from '../../../../domain/models/SucursalModel';
import { Loading } from '../../../components/Loading';
import { AlertConfirm, AlertError, AlertSave } from '../../../components/alerts';
import { Button } from '../../../../domain/models/ButtonModel';
import TableSucursalUser from './components/TableSucursalUser';
import ModalSucursalUser from './components/ModalSucursalUser';
import { sucursalContainer } from '../../../../di/configurations/sucursalContainer';
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}
const SucursalUserView: React.FC = memo(() => {
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const SucursalUserViewModel = sucursalUserContainer.resolve('sucursalUserViewModel');
  const SucursalViewModel = sucursalContainer.resolve('sucursalViewModel');
  const [loading, setLoading] = useState(false)
  const [listSucursalesUser , setListSucursalesUser] = useState([])
  const [listSucursales , setListSucursales] = useState<Sucursal[]>([])
  const [buttons , setButtons] = useState<Button[]>([])
  const [openModalSucursalUser, setOpenModalSucursalUser] = useState(false)
  const [selectSucursal, setSelectSucursal] = useState<Sucursal|null>(null)
  const handleOpenModalSucursalUser = useCallback((Sucursal:Sucursal|null)=>{
    setOpenModalSucursalUser(true);
    setSelectSucursal(Sucursal);
  },[])
  const handleCloseModalSucursalUser = ()=>{
    setSelectSucursal(null);
    setOpenModalSucursalUser(false)}
  useEffect(()=>{
    getSucursalUser();
    getSucursales();
  },[])
  useEffect(()=>{
    if(currentMenuItem){
      getButtuns(currentMenuItem?.id_menu_acceso);
    }
  },[currentMenuItem])
  const addSucursales = useCallback(async(id_usuario:number,sucursales:string[])=>{
    const result = await AlertConfirm({title:'Estas seguro de guardar la información.?',confirmButtonText:'Crear'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await SucursalUserViewModel.addSucursales(id_usuario,sucursales);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalSucursalUser();
        await getSucursalUser();
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
    }
    setLoading(false)
  },[])
  const getButtuns = async (idAcces:number) => {
    setLoading(true)
    try {
      const response = await UserViewModel.getButtunsAccess(idAcces);
      if ('buttons' in response) {
        setButtons(response!.buttons);
      } else {
        setButtons([]);
      }
    } catch (error) {

    }
    setLoading(false)
  };
  const getSucursalUser = async () => {
    setLoading(true)
    try {
      const response = await SucursalUserViewModel.findAll();
      if ('status' in response && response.status === 'success') {
        setListSucursalesUser(response.data);
      } else {
      }
    } catch (error) {}
    setLoading(false)
  };  
  const getSucursales = async () => {
    setLoading(true)
    try {
      const response = await SucursalViewModel.findActive();
      if ('status' in response && response.status === 'success') {
        setListSucursales(response.data);
      } else {
        setListSucursales([])
      }
    } catch (error) {}
    setLoading(false)
  };
  return (
    <div>
      <HeaderPage>
      <Grid size={{xs:6.5,sm:7,md:8}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentMenuItem?.title ? currentMenuItem?.title : '...'}
          </Typography>
        </Grid>
        <Grid size={{xs:5.5,sm:5,md:4}} container justifyContent="end" alignItems="end" alignSelf={'center'}>
          
        </Grid>
      </HeaderPage>
      <div>
        {<TableSucursalUser
          listSucursalUser={listSucursalesUser}
          handleOpenModalSucursalUser={handleOpenModalSucursalUser}
        />}
      </div>{
      <ModalSucursalUser
      open={openModalSucursalUser}
      onClose={handleCloseModalSucursalUser}
      updateSucursalUser={addSucursales}
      sucursalUser={selectSucursal}
      listSucursales={listSucursales}
      buttons={buttons}
      ></ModalSucursalUser>}
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default SucursalUserView;