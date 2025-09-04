import React, { useCallback, useEffect} from 'react';
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
import { Status } from '../../../../../domain/models/StatusModel';
const validationSchema = yup.object().shape({
  descripcion: yup.string().required('El nombre es obligatorio').min(3, 'El nombre no puede tener menos de 3 caracteres'),
  color: yup.string().required('El color es obligatorio'),
});


interface StatusFormProps {
  open: boolean;
  onClose: () => void;
  createStatus: (data: Status) => void;
  updateStatus: (data: Status,id:number) => void;
  deleteStatus: (id: string) => void;
  activateStatus: (id: string) => void;
  status?: Status | null;
  buttons:Button[];
}
const ModalStatus: React.FC<StatusFormProps> = ({ open, onClose, createStatus,updateStatus,deleteStatus,activateStatus,buttons,status}) => {
  const btnUpdate = buttons.filter((button: Button) => button.nombre === 'update' && button.tipo === 'table');
  const stateUpdate = !(btnUpdate?.length===0)
  const { handleSubmit, control, formState: { errors }, reset, setValue, getValues } = useForm<Status>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      descripcion: '', 
      color: '',
    }
  });
  
  useEffect(() => {
    if (status) {
      Object.keys(status).forEach((key:any) => {
        if(key !== 'vacunas' && key !== 'raza' && key !== 'fecha_alta'){
          setValue(key, (status[key as keyof Status] ?? null));
        }
      });
    }
  }, [status, setValue,open]);
  const handleCreate = useCallback(async () => {
      await handleSubmit((data: Status) => {
        createStatus(data)
      })();
  }, [status]);
  const handleUpdate = useCallback(async () => {
    await handleSubmit((data: Status) =>{  
      updateStatus(data,Number(status?.id_status))
    })();
  }, [status]);
  const handleDeleted = useCallback(async()=>{
    const id:string = String(getValues('id_status'));
    await deleteStatus(id)
  },[])
  const handleActivate = useCallback(async()=>{
    const id:string = String(getValues('id_status'));
    await activateStatus(id)
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
      <ModalContainer sx={{width: { xs: '99%', sm: '80%', md: '60%', lg: '50%', xl: '40%' }}}>
        <ModalHeader>
        <StyledTitle id="modal-modal-description">
            {'Formulario de Mascota'}
          </StyledTitle>
          <CloseButton onClick={handleClose}>
            <MUIcons.Close />
        </CloseButton>
        </ModalHeader>
      <Box sx={{paddingY:2}}>
        <form >
          <ScrollableBox>
            <Grid container spacing={3} paddingX={10}>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="descripcion" 
                  control={control} 
                  label="Descripción" 
                  placeholder="Ingrese Descripción" 
                  disabled={!(stateUpdate || !status)}
                  icon={<MUIcons.Sell />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="color" 
                  control={control} 
                  label="Color" 
                  placeholder="Ingrese un Color" 
                  disabled={!(stateUpdate || !status)}
                  icon={<MUIcons.Sell />} 
                />
              </Grid>
            </Grid>  
          </ScrollableBox>
          <ContainerButtons>
            <ActionButton
              type="cancel"
              onClick={handleClose}
            />
            {buttons.filter((button: Button) => (status?.estado === '1' && button.nombre !== 'activate') || 
                                                (status?.estado === '0' && button.nombre !== 'update' && button.nombre !== 'deleted') || 
                                                (status?.estado !== '1' && status?.estado !== '0'))
            .map((button: any,index:number) => {
              if (status?.id_status && button?.tipo === 'table') {
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
              } else if (!status?.id_status && button?.tipo === 'header' && button?.nombre === 'create') {
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

export default ModalStatus;