import React, { useCallback, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ModalHeader from '../../../components/containers/ModalHeader';
import {Grid,Box,Modal,} from '@mui/material';
import {AccountCircle as AccountCircleIcon,Close as CloseIcon,} from '@mui/icons-material';
import CustomTextField from '../../../components/inputs/CustomTextField';
import { StyledTitle } from '../../../components/text/StyledTitle';
import { CloseButton } from '../../../components/buttons/CloseButton';
import ModalContainer from '../../../components/containers/ModalContainer';
import ScrollableBox from '../../../components/containers/ScrollableBox';
import ContainerButtons from '../../../components/containers/ContainerButtons';
import { Perfil } from '../../../../domain/models/PerfilModel';
import ActionButton from '../../../components/buttons/ActionButton';
import { Button } from '../../../../domain/models/ButtonModel';

const validationSchema = yup.object().shape({
  id: yup.string().required('El Codigo es obligatorio'),
  nombre: yup.string()
  .required('El nombre es obligatorio')
  .min(5, 'El nombre no puede tener menos de 5 caracteres'),
});

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  createProfile: (data: Perfil) => void;
  updateProfile: (data: Perfil) => void;
  deleteProfile: (id: string) => void;
  activateProfile: (id: string) => void;
  profile?: Perfil | null;
  buttons:Button[];
}
const ModalProfile: React.FC<UserFormProps> = ({ open, onClose, createProfile,updateProfile,deleteProfile,activateProfile,buttons, profile}) => {
  const btnUpdate = buttons.filter((button: Button) => button.nombre === 'update' && button.tipo === 'table');
  const stateUpdate = !(btnUpdate?.length===0)
  const { handleSubmit, control, formState: { errors }, reset, setValue,getValues } = useForm<Perfil>({
    resolver: yupResolver(validationSchema),
    defaultValues: {...{
      id: '',
      nombre: '',
    },
  }
  });
  useEffect(() => {
    if (profile) {
      Object.keys(profile).forEach((key:any) => {
        setValue(key, (profile[key as keyof Perfil] ?? null));
      });
    }
  }, [profile, setValue]);

  const handleCreate = useCallback(async () => {
      await handleSubmit((data: Perfil) => {createProfile(data)})();
  }, []);
  const handleUpdate = useCallback(async () => {
    await handleSubmit((data: Perfil) =>{updateProfile(data)})();
  }, []);
  const handleDeleted = useCallback(async()=>{
    const id:string = String(getValues('id'));
    await deleteProfile(id)
  },[])
  const handleActivate = useCallback(async()=>{
    const id:string = String(getValues('id'));
    await activateProfile(id)
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
            {'Formulario de Perfil'}
          </StyledTitle>
          <CloseButton onClick={handleClose}>
            <CloseIcon />
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
                  name="id" 
                  control={control} 
                  label="Codigo perfil" 
                  placeholder="Ingrese un codigo perfil" 
                  disabled={!(!profile)}
                  icon={<AccountCircleIcon />} 
                />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                <CustomTextField 
                  name="nombre" 
                  control={control} 
                  label="Nombre completo" 
                  placeholder="Ingrese su nombre" 
                  disabled={!(stateUpdate || !profile)}
                  icon={<AccountCircleIcon />} 
                />
              </Grid>
            </Grid>
          </ScrollableBox>
          <ContainerButtons>
            <ActionButton
              type="cancel"
              onClick={handleClose}
            />
            {buttons.filter((button: Button) => (profile?.estado === '1' && button.nombre !== 'activate') || 
                                                (profile?.estado === '0' && button.nombre !== 'update' && button.nombre !== 'deleted') || 
                                                (profile?.estado !== '1' && profile?.estado !== '0'))
            .map((button: any,index:number) => {
              if (profile?.id && button?.tipo === 'table') {
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
              } else if (!profile?.id && button?.tipo === 'header' && button?.nombre === 'create') {
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

export default ModalProfile;