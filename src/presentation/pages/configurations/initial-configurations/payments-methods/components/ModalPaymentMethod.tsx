import React, { useCallback, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ModalHeader from '../../../../../components/containers/ModalHeader';
import {Grid,Box,Modal,} from '@mui/material';
import * as MUIcons from '@mui/icons-material';
import CustomTextField from '../../../../../components/inputs/CustomTextField';
import { StyledTitle } from '../../../../../components/text/StyledTitle';
import { CloseButton } from '../../../../../components/buttons/CloseButton';
import ModalContainer from '../../../../../components/containers/ModalContainer';
import ScrollableBox from '../../../../../components/containers/ScrollableBox';
import ContainerButtons from '../../../../../components/containers/ContainerButtons';
import ActionButton from '../../../../../components/buttons/ActionButton';
import { Button } from '../../../../../../domain/models/ButtonModel';
import { PaymentMethod } from '../../../../../../domain/models/PaymentMethodModel';
const validationSchema = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio').min(3, 'El nombre no puede tener menos de 3 caracteres'),
  //descripcion: yup.string().required('El descripcion es obligatorio'),
});


interface PaymentMethodFormProps {
  open: boolean;
  onClose: () => void;
  createPaymentMethod: (data: PaymentMethod) => void;
  updatePaymentMethod: (data: PaymentMethod,id:number) => void;
  deletePaymentMethod: (id: string) => void;
  activatePaymentMethod: (id: string) => void;
  paymentMethod?: PaymentMethod | null;
  buttons:Button[];
}
const ModalPaymentMethod: React.FC<PaymentMethodFormProps> = ({ open, onClose, createPaymentMethod,updatePaymentMethod,deletePaymentMethod,activatePaymentMethod,buttons,paymentMethod}) => {
  const btnUpdate = buttons.filter((button: Button) => button.nombre === 'update' && button.tipo === 'table');
  const stateUpdate = !(btnUpdate?.length===0)
  const { handleSubmit, control, formState: { errors }, reset, setValue, getValues } = useForm<PaymentMethod>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      nombre: '',
      descripcion: '',
    }
  });
  useEffect(() => {
    if (paymentMethod) {
      Object.keys(paymentMethod).forEach((key:any) => {
        setValue(key, (paymentMethod[key as keyof PaymentMethod] ?? null));
      });
    }
  }, [paymentMethod, setValue,open]);
   
  const handleCreate = useCallback(async () => {
      await handleSubmit((data: PaymentMethod) => {
        createPaymentMethod(data)})()
  }, [paymentMethod]);
  const handleUpdate = useCallback(async () => {
    await handleSubmit((data: PaymentMethod) =>{  
      updatePaymentMethod(data,Number(paymentMethod?.id_forma_pago))
    })();
  }, [paymentMethod]);
  const handleDeleted = useCallback(async()=>{
    const id:string = String(getValues('id_forma_pago'));
    await deletePaymentMethod(id)
  },[])
  const handleActivate = useCallback(async()=>{
    const id:string = String(getValues('id_forma_pago'));
    await activatePaymentMethod(id)
  },[])
  const actionHandlers:any = {
    handleCreate: handleCreate,
    handleUpdate: handleUpdate,
    handleDeleted: handleDeleted,
    handleActivate:handleActivate
  };
  const handleClose = () => {
    reset();
    onClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="PaymentMethod-form-modal-title"
      aria-describedby="PaymentMethod-form-modal-description"
      style={{ zIndex:1300}} 
    >
      <ModalContainer sx={{width: { xs: '99%', sm: '70%', md: '50%', lg: '40%', xl: '30%' }}}>
        <ModalHeader>
        <StyledTitle id="modal-modal-description">
            {'Formulario de Empresa'}
          </StyledTitle>
          <CloseButton onClick={handleClose}>
            <MUIcons.Close />
        </CloseButton>
        </ModalHeader>
      <Box sx={{paddingY:2}}>
        <form >
          <ScrollableBox>
            <Grid container spacing={3}>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="nombre" 
                  control={control} 
                  label="Nombre" 
                  placeholder="Ingrese el nombre" 
                  disabled={!(stateUpdate || !paymentMethod)}
                  icon={<MUIcons.Store />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="descripcion" 
                  control={control} 
                  label="Descripción" 
                  placeholder="Ingrese la descripción" 
                  disabled={!(stateUpdate || !paymentMethod)}
                  icon={<MUIcons.Spa />} 
                />
              </Grid>
            </Grid>
          </ScrollableBox>
          <ContainerButtons>
            <ActionButton
              type="cancel"
              onClick={handleClose}
            />
            {buttons.filter((button: Button) => (paymentMethod?.estado === '1' && button.nombre !== 'activate') || 
                                                (paymentMethod?.estado === '0' && button.nombre !== 'update' && button.nombre !== 'deleted') || 
                                                (paymentMethod?.estado !== '1' && paymentMethod?.estado !== '0'))
            .map((button: any,index:number) => {
              if (paymentMethod?.id_forma_pago && button?.tipo === 'table') {
                return (
                  <ActionButton
                    key={`header-button-${button.id || index}`}
                    type={button?.nombre}
                    onClick={() => {
                      if (button.onclick && typeof actionHandlers[button.onclick] === 'function') {
                        actionHandlers[button.onclick](); 
                      } else if (typeof button.onclick === 'function') {
                        button.onclick();
                      }
                    }}
                    disabled={false} 
                  />
                );
              } else if (!paymentMethod?.id_forma_pago && button?.tipo === 'header' && button?.nombre === 'create') {
                return (
                  <ActionButton
                    key={`table-button-${button.id || index}`}
                    type={button?.nombre}
                    onClick={ () => {
                      if (button.onclick && typeof actionHandlers[button.onclick] === 'function') {
                        actionHandlers[button.onclick](); 
                      } else if (typeof button.onclick === 'function') {
                        button.onclick();
                      }
                    }}
                    disabled={false} 
                  />
                );
              }
              return null; 
            })}
          </ContainerButtons>
        </form>
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default ModalPaymentMethod;