import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationItem } from '../../../domain/models/AccesModel';
import { useOutletContext } from 'react-router-dom';
import HeaderPage from '../../components/containers/HeaderPage';
import { userContainer } from '../../../di/userContainer';
import * as MUIcons from '@mui/icons-material';
import {Typography,Tooltip, IconButton, Grid} from '@mui/material';
import { Perfil } from '../../../domain/models/PerfilModel';
import { Loading } from '../../components/Loading';
import { AlertConfirm, AlertError, AlertSave } from '../../components/alerts';
import TableClient from './components/TableClient';
import ModalClient from './components/ModaClient';
import { Client } from '../../../domain/models/ClientModel';
import { clientContainer } from '../../../di/clientContainer';
import { Button } from '../../../domain/models/ButtonModel';
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}
const ClientsView: React.FC = memo(() => {
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const ClientViewModel = clientContainer.resolve('clientViewModel');
  const [loading, setLoading] = useState(false)
  const [listClient , setListClient] = useState<Perfil[]>([])
  const [buttonsHeader , setButtonsHeader ] = useState<any>([])
  const [buttons , setButtons] = useState<Button[]>([])
  const [buttonsTable , setButtonsTable ] = useState<any>([])
  const [openModalClient, setOpenModalClient] = useState(false)
  const [selectClient, setSelectClient] = useState<Client|null>(null)
  const handleOpenModalClient = useCallback((client:Client|null)=>{
    setOpenModalClient(true);
    setSelectClient(client);
  },[])
  const handleCloseModalClient = ()=>{
    setSelectClient(null);
    setOpenModalClient(false);
  }
  useEffect(()=>{
    if(currentMenuItem){
      getButtuns(currentMenuItem?.id_menu_acceso);
      getClient();
    }
  },[currentMenuItem])
  const handleCreate = useCallback(()=>{
    handleOpenModalClient(null)
  },[])
  const handleCreateSave = useCallback(async(client:Client)=>{
    const result = await AlertConfirm({title:'Estas seguro de crear un nuevo cliente?',confirmButtonText:'Crear'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await ClientViewModel.create(client);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalClient();
        getClient();
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const handleUpdate = useCallback(async(client:Client)=>{
    const result = await AlertConfirm({});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await ClientViewModel.update(client);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalClient()
        getClient()
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
    const result = await AlertConfirm({title:'¿Estas seguro de elimiar al Cliente?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await ClientViewModel.delete(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalClient()
        getClient()
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
    const result = await AlertConfirm({title:'¿Estas seguro de Activar al Cliente?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await ClientViewModel.activate(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalClient()
        getClient()
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
  const getClient = async () => {
    setLoading(true)
    try {
      const response = await ClientViewModel.findAll();
      if ('status' in response && response.status === 'success') {
        setListClient(response.data);
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
        {<TableClient
          listClient={listClient}
          handleOpenModalClient={handleOpenModalClient}
        />
        }
      </div>
      <ModalClient 
      open={openModalClient}
      onClose={handleCloseModalClient}
      createClient={handleCreateSave}
      updateClient={handleUpdate}
      deleteClient={handleDelete}
      activateClient={handleActivate}
      client={selectClient}
      buttons={buttons}
      tipo='1'
      ></ModalClient>
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default ClientsView;