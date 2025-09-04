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
import { Sucursal } from '../../../../../domain/models/SucursalModel';

const validationSchema = yup.object().shape({
  nombre: yup.string().required('El nombre es obligatorio').min(3, 'El nombre no puede tener menos de 3 caracteres'),
  telefono: yup.string().required('El telefono es obligatorio'),
  direccion: yup.string().required('El dirección es obligatorio').min(3, 'El nombre no puede tener menos de 3 caracteres'),
});
interface SucursalFormProps {
  open: boolean;
  onClose: () => void;
  createSucursal: (data: Sucursal) => void;
  updateSucursal: (data: Sucursal,id:number) => void;
  deleteSucursal: (id: string) => void;
  activateSucursal: (id: string) => void;
  sucursal?: Sucursal | null;
  buttons:Button[];
}
const ModalSucursal: React.FC<SucursalFormProps> = ({ open, onClose, createSucursal,updateSucursal,deleteSucursal,activateSucursal,buttons,sucursal}) => {
  const btnUpdate = buttons.filter((button: Button) => button.nombre === 'update' && button.tipo === 'table');
  const stateUpdate = !(btnUpdate?.length===0)
  const { handleSubmit, control, formState: { errors }, reset, setValue, getValues } = useForm<Sucursal>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      nombre:      '',
    telefono:      '',
    direccion:     '',
    }
  });
  useEffect(() => {
    reset();
    if (sucursal) {
      Object.keys(sucursal).forEach((key:any) => {
        setValue(key, (sucursal[key as keyof Sucursal] ?? null));
      });
    }
  }, [sucursal, open]);
  const handleCreate = useCallback(async () => {
      await handleSubmit((data: Sucursal) => {
        createSucursal(data)
      })();
  }, [sucursal]);
  const handleUpdate = useCallback(async () => {
    await handleSubmit((data: Sucursal) =>{  
      updateSucursal(data,Number(sucursal?.id_sucursal))
    })();
  }, [sucursal]);
  const handleDeleted = useCallback(async()=>{
    const id:string = String(getValues('id_sucursal'));
    await deleteSucursal(id)
  },[])
  const handleActivate = useCallback(async()=>{
    const id:string = String(getValues('id_sucursal'));
    await activateSucursal(id)
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
            {'Formulario de Sucursal'}
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
                  disabled={!(stateUpdate || !sucursal)}
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
                  name="telefono" 
                  label="Telefono" 
                  type='number'
                  disabled={!(stateUpdate || !sucursal)}
                  placeholder="Ingrese un telefono" 
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
                  label="Direción " 
                  placeholder="ingrese una direción" 
                  disabled={!(stateUpdate || !sucursal)}
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
            {buttons.filter((button: Button) => (sucursal?.estado === '1' && button.nombre !== 'activate') || 
                                                (sucursal?.estado === '0' && button.nombre !== 'update' && button.nombre !== 'deleted') || 
                                                (sucursal?.estado !== '1' && sucursal?.estado !== '0'))
            .map((button: any,index:number) => {
              if (sucursal?.id_sucursal && button?.tipo === 'table') {
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
              } else if (!sucursal?.id_sucursal && button?.tipo === 'header' && button?.nombre === 'create') {
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

export default ModalSucursal;