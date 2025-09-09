import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationItem } from '../../../../domain/models/AccesModel';
import { useOutletContext } from 'react-router-dom';
import HeaderPage from '../../../components/containers/HeaderPage';
import { userContainer } from '../../../../di/userContainer';
import * as MUIcons from '@mui/icons-material';
import {Typography,Grid} from '@mui/material';
import { Loading } from '../../../components/Loading';
import { AlertConfirm, AlertError, AlertSave } from '../../../components/alerts';
import { Button } from '../../../../domain/models/ButtonModel';
import DataClient from './components/DataClient';
import { ExplorationContainer } from '../../../../di/evaluation/ExplorationContainer';
import { Exploration } from '../../../../domain/models/Evaluation';
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}
const PsychologicalView: React.FC = memo(() => {
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const ExplorationViewModel = ExplorationContainer.resolve('explorationViewModel');
  const [loading, setLoading] = useState(false)
  const [buttonsHeader , setButtonsHeader ] = useState<any>([])
  const [buttons , setButtons] = useState<Button[]>([])
  const [buttonsTable , setButtonsTable ] = useState<any>([])
  const [selectClient, setSelectClient] = useState<any>(null)
  
  useEffect(()=>{
    if(currentMenuItem){
      getButtuns(currentMenuItem?.id_menu_acceso);
      getClient();
    }
  },[currentMenuItem])
  const handleCreate = useCallback(async(client:any)=>{
    const result = await AlertConfirm({title:'Estas seguro de crear un nuevo cliente?',confirmButtonText:'Crear'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response:any = null;// await ClientViewModel.create(client);
      setLoading(false)
      if ('status' in response && response.status==='success') {
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
  const handleUpdate = useCallback(async(client:any)=>{
    const result = await AlertConfirm({});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response:any = null;//await ClientViewModel.update(client);
      setLoading(false)
      if ('status' in response && response.status==='success') {
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
      const response:any =null// await ClientViewModel.findAll();
      if ('status' in response && response.status === 'success') {
        setSelectClient(response.data);
      } else {
      }
    } catch (error) {}
    setLoading(false)
  };
  const getExploration = useCallback(async (exploration:Exploration):Promise<Exploration[]> => {
    try {
      const response = await ExplorationViewModel.search(exploration);
      if ('status' in response && response.status === 'success') {
        return response.data;
      } else 
        return [];
    } catch (error) {}
    return []
  },[]);
  const handleCreateExploration = useCallback(async(exploration:Exploration)=>{
    const result = await AlertConfirm({title:'Estas seguro de giuardar la ingormacion?',confirmButtonText:'Guardar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response =  await ExplorationViewModel.create(exploration);
      if ('status' in response && response.status==='success') {
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
  return (
    <div>
      <HeaderPage>
      <Grid size={{xs: 6.5,sm: 7,md: 8}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentMenuItem?.title ? currentMenuItem?.title : '...'}
          </Typography>
        </Grid>
        <Grid size={{xs: 5.5,sm: 5,md: 4}} container justifyContent="end"alignItems="end"alignSelf={'center'}>
        </Grid>
      </HeaderPage>
      <div>
      <DataClient
        createClient={handleCreate}
        updateClient={handleUpdate}
        getExploration={getExploration}
        createExploration={handleCreateExploration}
        client={selectClient}
        buttons={buttons}
        />
      </div>
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default PsychologicalView;