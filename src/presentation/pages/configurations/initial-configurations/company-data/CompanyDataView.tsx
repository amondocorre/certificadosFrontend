import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationItem } from '../../../../../domain/models/AccesModel';
import { useOutletContext } from 'react-router-dom';
import HeaderPage from '../../../../components/containers/HeaderPage';
import { userContainer } from '../../../../../di/userContainer';
import * as MUIcons from '@mui/icons-material';
import {Typography,Tooltip, IconButton, Grid} from '@mui/material';
import { companyContainer } from '../../../../../di/configurations/companyContainer';
import { Company } from '../../../../../domain/models/CompanyModel';
import { Loading } from '../../../../components/Loading';
import { AlertConfirm, AlertError, AlertSave } from '../../../../components/alerts';
import { Button } from '../../../../../domain/models/ButtonModel';
import TableCompany from './components/TableCompany';
import ModalCompany from './components/ModalCompany';
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}
const CompanyDataView: React.FC = memo(() => {
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const CompanyViewModel = companyContainer.resolve('companyViewModel');
  const [loading, setLoading] = useState(false)
  const [listCompanys , setListCompanys] = useState<Company[]>([])
  const [buttonsHeader , setButtonsHeader ] = useState<any>([])
  const [buttons , setButtons] = useState<Button[]>([])
  const [openModalCompany, setOpenModalCompany] = useState(false)
  const [selectCompany, setSelectCompany] = useState<Company|null>(null)
  const handleOpenModalCompany = useCallback((company:Company|null)=>{
    setOpenModalCompany(true);
    setSelectCompany(company);
  },[])
  const handleCloseModalUser = ()=>{
    setSelectCompany(null);
    setOpenModalCompany(false)}
  useEffect(()=>{
    getCompany();
  },[])
  useEffect(()=>{
    if(currentMenuItem){
      getButtuns(currentMenuItem?.id_menu_acceso);
    }
  },[currentMenuItem])
  const handleCreate = useCallback(()=>{
    handleOpenModalCompany(null)
  },[])
  const handleCreateSave = useCallback(async(Company:Company)=>{
    const result = await AlertConfirm({title:'Estas seguro de crear ..?',confirmButtonText:'Crear'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await CompanyViewModel.create(Company);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalUser();
        getCompany();
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const handleUpdate = useCallback(async(Company:Company,id:number)=>{
    const result = await AlertConfirm({});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await CompanyViewModel.update(id,Company);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalUser()
        getCompany()
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
    const result = await AlertConfirm({title:'¿Estas seguro de elimiar ..?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await CompanyViewModel.delete(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalUser()
        getCompany()
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
    const result = await AlertConfirm({title:'¿Estas seguro de Habilitar ..?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await CompanyViewModel.activate(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalUser()
        getCompany()
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
  const getCompany = async () => {
    setLoading(true)
    try {
      const response = await CompanyViewModel.findAll();
      if ('status' in response && response.status === 'success') {
        setListCompanys(response.data);
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
        {<TableCompany
          listCompanys={listCompanys}
          handleOpenModalCompany={handleOpenModalCompany}
        />}
      </div>{
        <ModalCompany
        open={openModalCompany}
        onClose={handleCloseModalUser}
        createCompany={handleCreateSave}
        updateCompany={handleUpdate}
        deleteCompany={handleDelete}
        activateCompany={handleActivate}
        company={selectCompany}
        buttons={buttons}
        ></ModalCompany>}
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default CompanyDataView;