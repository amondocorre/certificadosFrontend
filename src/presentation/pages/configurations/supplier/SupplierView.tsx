import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationItem } from '../../../../domain/models/AccesModel';
import { useOutletContext } from 'react-router-dom';
import HeaderPage from '../../../components/containers/HeaderPage';
import { userContainer } from '../../../../di/userContainer';
import * as MUIcons from '@mui/icons-material';
import {Typography,Tooltip, IconButton, Grid} from '@mui/material';
import { supplierContainer } from '../../../../di/configurations/supplierContainer';
import { Supplier } from '../../../../domain/models/SupplierModel';
import { Loading } from '../../../components/Loading';
import { AlertConfirm, AlertError, AlertSave } from '../../../components/alerts';
import { Button } from '../../../../domain/models/ButtonModel';
import TableSupplier from './components/TableSupplier';
import ModalSupplier from './components/ModalSupplier';
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}
const SupplierView: React.FC = memo(() => {
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const SupplierViewModel = supplierContainer.resolve('supplierViewModel');
  
  const [loading, setLoading] = useState(false)
  const [listSuppliers , setListSuppliers] = useState<Supplier[]>([])
  const [buttonsHeader , setButtonsHeader ] = useState<any>([])
  const [buttons , setButtons] = useState<Button[]>([])
  const [openModalSupplier, setOpenModalSupplier] = useState(false)
  const [selectSupplier, setSelectSupplier] = useState<Supplier|null>(null)
  const handleOpenModalSupplier = useCallback((Supplier:Supplier|null)=>{
    setOpenModalSupplier(true);
    setSelectSupplier(Supplier);
  },[])
  const handleCloseModalUser = ()=>{setOpenModalSupplier(false),setSelectSupplier(null)}
  useEffect(()=>{
    getSupplier();
  },[])
  useEffect(()=>{
    if(currentMenuItem){
      getButtuns(currentMenuItem?.id_menu_acceso);
    }
  },[currentMenuItem])
  const handleCreate = useCallback(()=>{
    handleOpenModalSupplier(null)
  },[])
  const handleCreateSave = useCallback(async(Supplier:Supplier)=>{
    const result = await AlertConfirm({title:'Estas seguro de crear un Proveedor.?',confirmButtonText:'Crear'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await SupplierViewModel.create(Supplier);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalUser();
        getSupplier();
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const handleUpdate = useCallback(async(supplier:Supplier,id:number)=>{
    const result = await AlertConfirm({});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await SupplierViewModel.update(id,supplier);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalUser()
        getSupplier()
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
    const result = await AlertConfirm({title:'¿Estas seguro de elimiar el Proveedor?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await SupplierViewModel.delete(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalUser()
        getSupplier()
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
    const result = await AlertConfirm({title:'¿Estas seguro de Habilitar el Proveedor?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await SupplierViewModel.activate(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalUser()
        getSupplier()
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
  const getSupplier = async () => {
    setLoading(true)
    try {
      const response = await SupplierViewModel.findAll();
      if ('status' in response && response.status === 'success') {
        setListSuppliers(response.data);
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
        {<TableSupplier
          listSuppliers={listSuppliers}
          handleOpenModalSupplier={handleOpenModalSupplier}
        />}
      </div>{
        <ModalSupplier
        open={openModalSupplier}
        onClose={handleCloseModalUser}
        createSupplier={handleCreateSave}
        updateSupplier={handleUpdate}
        deleteSupplier={handleDelete}
        activateSupplier={handleActivate}
        supplier={selectSupplier}
        buttons={buttons}
        ></ModalSupplier>}
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default SupplierView;