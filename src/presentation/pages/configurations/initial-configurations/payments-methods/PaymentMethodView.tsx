import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavigationItem } from '../../../../../domain/models/AccesModel';
import { useOutletContext } from 'react-router-dom';
import HeaderPage from '../../../../components/containers/HeaderPage';
import { userContainer } from '../../../../../di/userContainer';
import * as MUIcons from '@mui/icons-material';
import {Typography,Tooltip, IconButton, Grid} from '@mui/material';
import { paymentMethodContainer } from '../../../../../di/configurations/paymentMethodContainer';
import { PaymentMethod } from '../../../../../domain/models/PaymentMethodModel';
import { Loading } from '../../../../components/Loading';
import { AlertConfirm, AlertError, AlertSave } from '../../../../components/alerts';
import { Button } from '../../../../../domain/models/ButtonModel';
import TablePaymentMethod from './components/TablePaymentMethod';
import ModalPaymentMethod from './components/ModalPaymentMethod';
interface LayoutContext {
  currentMenuItem: NavigationItem | null;
}
const PaymentsMethodsView: React.FC = memo(() => {
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const PaymentMethodViewModel = paymentMethodContainer.resolve('paymentMethodViewModel');
  const [loading, setLoading] = useState(false)
  const [listPaymentMethods , setListPaymentMethods] = useState<PaymentMethod[]>([])
  const [buttonsHeader , setButtonsHeader ] = useState<any>([])
  const [buttons , setButtons] = useState<Button[]>([])
  const [openModalPaymentMethod, setOpenModalPaymentMethod] = useState(false)
  const [selectPaymentMethod, setSelectPaymentMethod] = useState<PaymentMethod|null>(null)
  const handleOpenModalPaymentMethod = useCallback((paymentMethod:PaymentMethod|null)=>{
    setOpenModalPaymentMethod(true);
    setSelectPaymentMethod(paymentMethod);
  },[])
  const handleCloseModalPaymentMethod = ()=>{
    setSelectPaymentMethod(null);
    setOpenModalPaymentMethod(false)}
  useEffect(()=>{
    getPaymentMethod();
  },[])
  useEffect(()=>{
    if(currentMenuItem){
      getButtuns(currentMenuItem?.id_menu_acceso);
    }
  },[currentMenuItem])
  const handleCreate = useCallback(()=>{
    handleOpenModalPaymentMethod(null)
  },[])
  const handleCreateSave = useCallback(async(PaymentMethod:PaymentMethod)=>{
    const result = await AlertConfirm({title:'Estas seguro de crear una Metodo de pago?',confirmButtonText:'Crear'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await PaymentMethodViewModel.create(PaymentMethod);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalPaymentMethod();
        getPaymentMethod();
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
      AlertError({ title: '', message: 'Ocurrió un error al guardar la información. Por favor, intenta nuevamente o contacta al encargado.' })
    }
    setLoading(false)
  },[])
  const handleUpdate = useCallback(async(PaymentMethod:PaymentMethod,id:number)=>{
    const result = await AlertConfirm({});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await PaymentMethodViewModel.update(id,PaymentMethod);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalPaymentMethod()
        getPaymentMethod()
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
    const result = await AlertConfirm({title:'¿Estas seguro de elimiar el Metodo de pago?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await PaymentMethodViewModel.delete(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalPaymentMethod()
        getPaymentMethod()
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
    const result = await AlertConfirm({title:'¿Estas seguro de Habilitar el Metodo de pago?',confirmButtonText:'Confirmar'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await PaymentMethodViewModel.activate(id);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        handleCloseModalPaymentMethod()
        getPaymentMethod()
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
  const getPaymentMethod = async () => {
    setLoading(true)
    try {
      const response = await PaymentMethodViewModel.findAll();
      if ('status' in response && response.status === 'success') {
        setListPaymentMethods(response.data);
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
        {<TablePaymentMethod
          listPaymentMethods={listPaymentMethods}
          handleOpenModalPaymentMethod={handleOpenModalPaymentMethod}
        />}
      </div>{
        <ModalPaymentMethod
        open={openModalPaymentMethod}
        onClose={handleCloseModalPaymentMethod}
        createPaymentMethod={handleCreateSave}
        updatePaymentMethod={handleUpdate}
        deletePaymentMethod={handleDelete}
        activatePaymentMethod={handleActivate}
        paymentMethod={selectPaymentMethod}
        buttons={buttons}
        ></ModalPaymentMethod>}
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default PaymentsMethodsView;