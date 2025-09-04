import React, { useCallback, useEffect,} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ModalHeader from '../../../../components/containers/ModalHeader';
import {Grid,Box,Modal,} from '@mui/material';
import * as MUIcons from '@mui/icons-material';
import CustomTextField from '../../../../components/inputs/CustomTextField';
import { StyledTitle } from '../../../../components/text/StyledTitle';
import { CloseButton } from '../../../../components/buttons/CloseButton';
import ModalContainer from '../../../../components/containers/ModalContainer';
import ScrollableBox from '../../../../components/containers/ScrollableBox';
import ContainerButtons from '../../../../components/containers/ContainerButtons';
import ActionButton from '../../../../components/buttons/ActionButton';
import { Button } from '../../../../../domain/models/ButtonModel';
import { Supplier } from '../../../../../domain/models/SupplierModel';

const validationSchema = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio').min(3, 'El nombre no puede tener menos de 3 caracteres'),
  telefono: yup.string().required('El telefono es obligatorio'),
  direccion: yup.string().required('El dirección es obligatorio'),
  nit: yup.string().required('El nit es obligatorio'),
});
interface SupplierFormProps {
  open: boolean;
  onClose: () => void;
  createSupplier: (data: Supplier) => void;
  updateSupplier: (data: Supplier,id:number) => void;
  deleteSupplier: (id: number) => void;
  activateSupplier: (id: number) => void;
  supplier?: Supplier | null;
  buttons:Button[];
}
const ModalSupplier: React.FC<SupplierFormProps> = ({ open, onClose, createSupplier,updateSupplier,deleteSupplier,activateSupplier,buttons,supplier}) => {
  const btnUpdate = buttons.filter((button: Button) => button.nombre === 'update' && button.tipo === 'table');
  const stateUpdate = !(btnUpdate?.length===0)
  const { handleSubmit, control, formState: { errors }, reset, setValue, getValues } = useForm<Supplier>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      nombre:      '',
    telefono:      '',
    direccion:     '',
    }
  });
  useEffect(() => {
    reset();
    if (supplier) {
      Object.keys(supplier).forEach((key:any) => {
        setValue(key, (supplier[key as keyof Supplier] ?? null));
      });
    }
  }, [supplier, setValue,open]);
  const handleCreate = useCallback(async () => {
      await handleSubmit((data: Supplier) => {
        createSupplier(data)
      })();
  }, [supplier]);
  const handleUpdate = useCallback(async () => {
    await handleSubmit((data: Supplier) =>{  
      updateSupplier(data,Number(supplier?.id_proveedor))
    })();
  }, [supplier]);
  const handleDeleted = useCallback(async()=>{
    const id:number = Number(getValues('id_proveedor'));
    await deleteSupplier(id)
  },[])
  const handleActivate = useCallback(async()=>{
    const id:number = Number(getValues('id_proveedor'));
    await activateSupplier(id)
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
      aria-labelledby="user-form-modal-title"
      aria-describedby="user-form-modal-description"
      style={{ zIndex:1300}} 
    >
      <ModalContainer sx={{width: { xs: '99%', sm: '70%', md: '50%', lg: '40%', xl: '30%' }}}>
        <ModalHeader>
        <StyledTitle id="modal-modal-description">
            {'Formulario de Proveedor'}
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
                  disabled={!(stateUpdate || !supplier)}
                  icon={<MUIcons.Sell />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  control={control} 
                  name="nit" 
                  label="Nit" 
                  type='number'
                  disabled={!(stateUpdate || !supplier)}
                  placeholder="Ingrese el nit" 
                  icon={<MUIcons.Spa />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="telefono" 
                  control={control} 
                  label="Teléfono" 
                  placeholder="ingrese el teléfono" 
                  disabled={!(stateUpdate || !supplier)}
                  icon={<MUIcons.Call />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="direccion" 
                  control={control} 
                  label="Dirección" 
                  placeholder="ingrese una dirección" 
                  disabled={!(stateUpdate || !supplier)}
                  icon={<MUIcons.NearMe />} 
                />
              </Grid>
            </Grid>
          </ScrollableBox>
          <ContainerButtons>
            <ActionButton
              type="cancel"
              onClick={handleClose}
            />
            {buttons.filter((button: Button) => (supplier?.estado === '1' && button.nombre !== 'activate') || 
                                                (supplier?.estado === '0' && button.nombre !== 'update' && button.nombre !== 'deleted') || 
                                                (supplier?.estado !== '1' && supplier?.estado !== '0'))
            .map((button: any,index:number) => {
              if (supplier?.id_proveedor && button?.tipo === 'table') {
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
              } else if (!supplier?.id_proveedor && button?.tipo === 'header' && button?.nombre === 'create') {
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

export default ModalSupplier;