import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationItem } from '../../../../domain/models/AccesModel';
import { useOutletContext } from 'react-router-dom';
import HeaderPage from '../../../components/containers/HeaderPage';
import { userContainer } from '../../../../di/userContainer';
import * as MUIcons from '@mui/icons-material';
import {Typography,Tooltip, IconButton, Grid} from '@mui/material';
import { statusContainer } from '../../../../di/configurations/statusContainer';
import { Status } from '../../../../domain/models/StatusModel';
import { Loading } from '../../../components/Loading';
import { AlertConfirm, AlertError, AlertSave } from '../../../components/alerts';
import { Button } from '../../../../domain/models/ButtonModel';
import TableStatus from './components/TableStatus';
import ModalStatus from './components/ModalStatus';
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}
const StatusView: React.FC = memo(() => {
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const StatusViewModel = statusContainer.resolve('statusViewModel');
  const [loading, setLoading] = useState(false)
  const [listStatuss , setListStatuss] = useState<Status[]>([])
  const [buttonsHeader , setButtonsHeader ] = useState<any>([])
  const [buttons , setButtons] = useState<Button[]>([])
  const [openModalStatus, setOpenModalStatus] = useState(false);
  const [selectStatus, setSelectStatus] = useState<Status|null>(null)
  const handleOpenModalStatus = useCallback((Status:Status|null)=>{
    setOpenModalStatus(true);
    setSelectStatus(Status);
  },[])
  const handleCloseModalStatus = ()=>{
    setSelectStatus(null);
    setOpenModalStatus(false)}
  useEffect(()=>{
    getStatus();
  },[])
  useEffect(()=>{
    if(currentMenuItem){
      getButtuns(currentMenuItem?.id_menu_acceso);
    }
  },[currentMenuItem])
  const handleCreate = useCallback(()=>{
    handleOpenModalStatus(null)
  },[])
  const handleCreateSave = useCallback(async(Status:Status)=>{
    const result = await AlertConfirm({title:'Estas seguro de crear una mascota?',confirmButtonText:'Crear'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await StatusViewModel.create(Status);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalStatus();
        getStatus();
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const handleUpdate = useCallback(async(Status:Status,id:number)=>{
    const result = await AlertConfirm({});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await StatusViewModel.update(id,Status);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalStatus()
        getStatus()
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
    const result = await AlertConfirm({title:'¿Estas seguro de elimiar el mascota?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await StatusViewModel.delete(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalStatus()
        getStatus()
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
    const result = await AlertConfirm({title:'¿Estas seguro de Habilitar el mascota?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await StatusViewModel.activate(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalStatus()
        getStatus()
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
  const getStatus = async () => {
    setLoading(true)
    try {
      const response = await StatusViewModel.findAll();
      if ('status' in response && response.status === 'success') {
        setListStatuss(response.data);
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
        {<TableStatus
          listStatuss={listStatuss}
          handleOpenModalStatus={handleOpenModalStatus}
        />}
      </div>{
        <ModalStatus
        open={openModalStatus}
        onClose={handleCloseModalStatus}
        createStatus={handleCreateSave}
        updateStatus={handleUpdate}
        deleteStatus={handleDelete}
        activateStatus={handleActivate}
        status={selectStatus}
        buttons={buttons}
        ></ModalStatus>}
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default StatusView;