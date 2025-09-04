import React, { useCallback, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ModalHeader from '../../../../components/containers/ModalHeader';
import {Grid,Box,Modal,} from '@mui/material';
import * as MUIcons from '@mui/icons-material';
import {AccountCircle as AccountCircleIcon,Close as CloseIcon,} from '@mui/icons-material';
import CustomTextField from '../../../../components/inputs/CustomTextField';
import { StyledHeader, StyledHeaderSecondary } from '../../../../components/text/StyledHeader';
import { CloseButton } from '../../../../components/buttons/CloseButton';
import ModalContainer from '../../../../components/containers/ModalContainer';
import ScrollableBox from '../../../../components/containers/ScrollableBox';
import ContainerButtons from '../../../../components/containers/ContainerButtons';
import {MenuItem } from '../../../../../domain/models/AccesModel';
import ActionButton from '../../../../components/buttons/ActionButton';
import { Button } from '../../../../../domain/models/ButtonModel';
import SwitchSimple from '../../../../components/inputs/SwitchSimple';

const validationSchema = yup.object().shape({
  nombre: yup.string()
  .required('El nombre es obligatorio')
  .min(5, 'El nombre no puede tener menos de 5 caracteres'),
  link: yup.string().required('El link es obligatorio'),
  icono: yup.string().required('El icono es obligatorio'),
});

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  createMenuAcces: (data: MenuItem) => void;
  updateMenuAcces: (data: MenuItem) => void;
  deleteMenuAcces: (id: number) => void;
  activateMenuAcces: (id: number) => void;
  menuAcces?: MenuItem | null;
  nivelSuperior?: MenuItem | null;
  buttons:Button[];
  buttonsActive:Button[];
}
const ModalMenuAcces: React.FC<UserFormProps> = ({ open, onClose, createMenuAcces,updateMenuAcces,deleteMenuAcces,activateMenuAcces,buttons,menuAcces,nivelSuperior,buttonsActive}) => {
  const btnUpdate = buttons.filter((button: Button) => button.nombre === 'update' && button.tipo === 'table');
  const stateUpdate = !(btnUpdate?.length===0)
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const { handleSubmit, control, formState: { errors }, reset, setValue,getValues } = useForm<MenuItem>({
    resolver: yupResolver(validationSchema),
    defaultValues: {...{
      id_menu_acceso: '',
      nombre: '',
      link:'',
      icono:'',
      //numero_orden:'0',
      id_botones:[]
    },
  }
  });
  useEffect(() => {
    reset();
    if (menuAcces) {
        Object.keys(menuAcces).forEach((key:any) => {
            if (key !== 'subMenu' && key !== 'id_botones' && key!=='nivel') {
                //setValue(key, menuAcces[key] ?? null);
                setValue(key, (menuAcces[key as keyof MenuItem] ?? null));
            }
        });
        if (Array.isArray(menuAcces.id_botones)) {
            setSelectedButtons(menuAcces.id_botones);
        }
    } else { 
        setSelectedButtons([]);
    }
}, [menuAcces, setValue, setSelectedButtons]);

  useEffect(() => {
   setValue('id_botones', selectedButtons);
}, [selectedButtons, setValue]);

const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>, buttonId: string) => {
  if (event.target.checked) {
      setSelectedButtons([...selectedButtons, buttonId]);
  } else {
      setSelectedButtons(selectedButtons.filter((id) => id !== buttonId));
  }
};
  const handleCreate = useCallback(async () => {
      await handleSubmit((data: MenuItem) => {
        data.nivel_superior = String(nivelSuperior?nivelSuperior.id_menu_acceso??0:0);
        createMenuAcces(data)
      })();
  }, [nivelSuperior]);
  const handleUpdate = useCallback(async () => {
    await handleSubmit((data: MenuItem) =>{
      updateMenuAcces(data)})();
  }, []);
  const handleDeleted = useCallback(async()=>{
    const id:number = Number(getValues('id_menu_acceso'));
    await deleteMenuAcces(id)
  },[])
  const handleActivate= useCallback(async()=>{
    const id:number = Number(getValues('id_menu_acceso'));
    await activateMenuAcces(id)
  },[])
  const actionHandlers:any = {
    handleCreate: handleCreate,
    handleUpdate: handleUpdate,
    handleDeleted: handleDeleted,
    handleActivate: handleActivate,
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
        <StyledHeader id="modal-modal-description">
            {'Formulario de acceso'}
          </StyledHeader>
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
                      name="nombre"
                      control={control}
                      label="Nombre completo"
                      placeholder="Ingrese el nombre del menú"
                      disabled={!(stateUpdate || !menuAcces)}
                      icon={<AccountCircleIcon />}
                  />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                  <CustomTextField
                      name="link"
                      control={control}
                      label="Link"
                      placeholder="Ingrese el link del menú"
                      disabled={!(stateUpdate || !menuAcces)}
                      icon={<MUIcons.Link />}
                  />
              </Grid>
              <Grid
                size={{
                  xs: 12,
                  sm: 12
                }}>
                  <CustomTextField
                      name="icono"
                      control={control}
                      label="Icono"
                      placeholder="Ingrese el icono del menú"
                      disabled={!(stateUpdate || !menuAcces)}
                      icon={<MUIcons.Image />}
                  />
              </Grid>
              <Grid
                sx={{ width: '100%' }}
                size={{
                  xs: 12,
                  sm: 12
                }}>
              {/*<StyledHeader sx={{ mb: 1 }}>
                Botones
              </StyledHeader>*/}
              <Grid container >
                <Grid
                  sx={{ border: '1px solid #1976d2', borderRadius: '8px', padding: 0, }}
                  size={{
                    xs: 12,
                    sm: 6
                  }}>
                  <StyledHeaderSecondary sx={{ mb: 1 }}>
                    Botones de reportes
                  </StyledHeaderSecondary>
                  <Grid container >
                    {buttonsActive.filter((button: Button) => button.nombre.toLowerCase().includes('report'))
                      .map((button: Button) => (
                        <Grid
                          sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                          size={{
                            xs: 6,
                            sm: 6
                          }}>
                          <SwitchSimple
                            id={String(button.id_boton)}
                            label={button.descripcion}
                            icon={React.createElement(MUIcons[button.icono as keyof typeof MUIcons] || MUIcons.Label)}
                            onChange={handleSwitchChange}
                            defaultChecked ={selectedButtons.includes(String(button.id_boton))}
                          />
                        </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid
                  sx={{ border: '1px solid #1976d2', borderRadius: '8px', }}
                  size={{
                    xs: 12,
                    sm: 6
                  }}>
                  <StyledHeaderSecondary sx={{ mb: 1}}>
                    Botones de gestión
                  </StyledHeaderSecondary>
                  <Grid container >
                    {buttonsActive.filter((button: Button) => !button.nombre.toLowerCase().includes('report'))
                      .map((button: Button) => (
                        <Grid
                          sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                          size={{
                            xs: 6,
                            sm: 6
                          }}>
                          <SwitchSimple
                            id={String(button.id_boton)}
                            label={button.descripcion}
                            icon={React.createElement(MUIcons[button.icono as keyof typeof MUIcons] || MUIcons.Label)}
                            onChange={handleSwitchChange}
                            defaultChecked ={selectedButtons.includes(String(button.id_boton))}
                          />
                        </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
          </ScrollableBox>
          <ContainerButtons>
            <ActionButton
              type="cancel"
              onClick={handleClose}
            />
            {buttons.filter((button: Button) => (menuAcces?.estado === '1' && button.nombre !== 'activate') || 
                                                (menuAcces?.estado === '0' && button.nombre !== 'update' && button.nombre !== 'deleted') || 
                                                (menuAcces?.estado !== '1' && menuAcces?.estado !== '0'))
            .map((button: any,index:number) => {
              if (menuAcces?.id_menu_acceso && button?.tipo === 'table') {
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
              } else if (!menuAcces?.id_menu_acceso && button?.tipo === 'header' && button?.nombre === 'create') {
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

export default ModalMenuAcces;