import React, { useCallback, useEffect, useState} from 'react';
import ModalHeader from '../../../../components/containers/ModalHeader';
import {Grid,Box,Modal,} from '@mui/material';
import * as MUIcons from '@mui/icons-material';
import {Close as CloseIcon,} from '@mui/icons-material';
import { StyledHeader, StyledHeaderSecondary } from '../../../../components/text/StyledHeader';
import { CloseButton } from '../../../../components/buttons/CloseButton';
import ModalContainer from '../../../../components/containers/ModalContainer';
import ScrollableBox from '../../../../components/containers/ScrollableBox';
import ContainerButtons from '../../../../components/containers/ContainerButtons';
import {AccesUser } from '../../../../../domain/models/AccesModel';
import ActionButton from '../../../../components/buttons/ActionButton';
import { Button } from '../../../../../domain/models/ButtonModel';
import SwitchSimple from '../../../../components/inputs/SwitchSimple';
import { User } from '../../../../../domain/models/User';

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  updateAccesUser: (idAcces:number,idUser:number,estado:number,buttons:string[]) => void;
  accesUser?: AccesUser | null;
  user?: User | null;
  buttons:Button[];
  buttonsActive:Button[];
}
const ModalAccesUser: React.FC<UserFormProps> = ({ open, onClose,updateAccesUser,buttons,accesUser,user,buttonsActive}) => {
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const [accesButtons, setAccesButtons] = useState<string[]>([]);
  const [stateAcces, setStateAcces] = useState(false)
  useEffect(() => {
    if (accesUser) {
      setStateAcces(accesUser.acceso==='1');
      if (Array.isArray(accesUser.botones)) {
          setSelectedButtons(accesUser.botones);
      }
      if (Array.isArray(accesUser.id_botones)) {
        setAccesButtons(accesUser.id_botones);
    }
    } else { 
        setSelectedButtons([]);
    }
  }, [accesUser]);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>, buttonId: string) => {
    if (event.target.checked) {
        setSelectedButtons([...selectedButtons, buttonId]);
    } else {
        setSelectedButtons(selectedButtons.filter((id) => id !== buttonId));
    }
  };
  const handleStateAcces = (event: React.ChangeEvent<HTMLInputElement>, buttonId: string) => {
    setStateAcces(event.target.checked)
  };
  const handleUpdate = useCallback(async () => {
    await updateAccesUser(Number(accesUser?.id_menu_acceso),Number(user?.id_usuario),stateAcces?1:0,selectedButtons);
  }, [accesUser,user,selectedButtons,stateAcces]);

  const actionHandlers:any = {
    handleUpdate: handleUpdate,
  };

  const handleClose = () => {
    setSelectedButtons([]);
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
      <ModalContainer sx={{width: { xs: '99%', sm: '70%', md: '50%', lg: '40%', xl: '25%' }}}>
        <ModalHeader>
        <StyledHeader id="modal-modal-description">
            {'Permisos de usuario'}
          </StyledHeader>
          <CloseButton onClick={handleClose}>
            <CloseIcon />
        </CloseButton>
        </ModalHeader>
      <Box sx={{paddingY:2}}>
        <form >
          <ScrollableBox>
            <Grid container spacing={3}>
              <Grid size={{xs: 12,sm: 12}}>
              <SwitchSimple
                  id={'acces'}
                  label={'Acceso'}
                  icon={React.createElement(MUIcons[accesUser?.icono as keyof typeof MUIcons] || MUIcons.Label)}
                  onChange={handleStateAcces}
                  defaultChecked ={stateAcces}
                />
              </Grid>
              <Grid sx={{ width: '100%' }}size={{xs: 12,sm: 12}}>
              {/*<StyledHeader sx={{ mb: 1 }}>
                Botones
              </StyledHeader>*/}
              <Grid container >
                <Grid
                  sx={{ border: '1px solid #1976d2', borderRadius: '8px', }}
                  size={{xs: 12,sm: 12}}>
                  <StyledHeaderSecondary sx={{ mb: 1}}>
                    Botones de gestión
                  </StyledHeaderSecondary>
                  <Grid container >
                    {buttonsActive.filter((button: Button) => (!button.nombre.toLowerCase().includes('report') && accesButtons.includes(String(button?.id_boton)) ))
                      .map((button: Button) => ( 
                        <Grid
                          sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                          size={{xs: 6,sm: 6}}>
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
                  sx={{ border: '1px solid #1976d2', borderRadius: '8px', padding: 0, }}
                  size={{
                    xs: 12,
                    sm: 12}}>
                  <StyledHeaderSecondary sx={{ mb: 1 }}>
                    Botones de reportes
                  </StyledHeaderSecondary>
                  <Grid container >
                    {buttonsActive.filter((button: Button) => (button.nombre.toLowerCase().includes('report') && accesButtons.includes(String(button?.id_boton)) ))
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
            {buttons.filter((button: Button) => (button.nombre === 'update'))
            .map((button: any,index:number) => {
              if (accesUser?.id_menu_acceso && button?.tipo === 'table') {
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

export default ModalAccesUser;