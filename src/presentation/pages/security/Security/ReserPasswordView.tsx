import React, { memo, useCallback, useEffect,useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import * as MUIcons from '@mui/icons-material';
import {Typography,Grid, Container, Box, Paper, Alert} from '@mui/material';
import {NavigationItem } from '../../../../domain/models/AccesModel';
import { userContainer } from '../../../../di/userContainer';
import { AlertConfirm, AlertError, AlertSave } from '../../../components/alerts';
import HeaderPage from '../../../components/containers/HeaderPage';
import { Loading } from '../../../components/Loading';
import { Button } from '../../../../domain/models/ButtonModel';
import { User } from '../../../../domain/models/User';
import CustomAutocomplete from '../../../components/inputs/CustomAutocomplete';
import { useForm } from 'react-hook-form';
import ActionButton from '../../../components/buttons/ActionButton';
interface LayoutContext {currentMenuItem: NavigationItem | null,getItemMenu:()=>void}

const ResetPasswordView: React.FC = memo(() => {
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const { control, reset,getValues } = useForm()
  const UserViewModel = userContainer.resolve('UserViewModel');
  const [loading, setLoading] = useState(false);
  const [buttons , setButtons] = useState<Button[]>([]);
  const [selectUser, setSelectUser] = useState<User|null>(null);
  const [listUsers, setListUsers] = useState([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(()=>{
      getUsers();
  },[])
  useEffect(()=>{
    if(currentMenuItem){
      getButtuns(currentMenuItem?.id_menu_acceso);
    }
  },[currentMenuItem])
  const handleUpdate = useCallback(async()=>{
    const id_usuario = getValues('id_usuario');
    if(!id_usuario){
      setError('Selecione una usuario.');
      return;
    }
    const result = await AlertConfirm({title:'¿Estas seguro de resetear la contraseña para el usuario: '+selectUser?.nombre+'.?'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await UserViewModel.resetPassword(id_usuario);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        reset();
        AlertSave({ title: '', message: response.message });
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {
    }
    setLoading(false)
  },[currentMenuItem,selectUser])
  const getButtuns = async (idAcces:number) => {
    setLoading(true)
    try {
      const response = await UserViewModel.getButtunsAccess(idAcces);
      if ('buttons' in response) {
        setButtons(response!.buttons);
      }
    } catch (error) {}
    setLoading(false)
  };
  const getUsers = async () => {
    setLoading(true)
    try {
      const response = await UserViewModel.getAllUsers();
      if ('users' in response) {
        setListUsers(response!.users);
      } else {
        setListUsers([])
      }
    } catch (error) {}
    setLoading(false)
  };
  const handleSelectUser =(user:User)=>{
    setError(null);
    setSelectUser(user)
  }
  const actionHandlers:any = {
    handleUpdate: handleUpdate,
  };
  return (
    <div>
      <HeaderPage>
        <Grid size={{xs:6.,sm:17,md:8}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentMenuItem?.title ? currentMenuItem?.title : '...'}
          </Typography>
        </Grid>
        <Grid size={{xs:5.,sm:15,md:4}} container justifyContent="end" alignItems="end" alignSelf={'center'}>
          
        </Grid>
      </HeaderPage>
       <Container component="main" maxWidth="xs" sx={{paddingTop:1}}>
          <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
            <Paper
              elevation={24}
              sx={{ paddingTop: 4,display: 'flex',flexDirection: 'column',alignItems: 'center',width: '100%',border: '4px solid #FAD461', borderRadius: '8px'}}>
              <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
                {'Resetear Contraseña'}
              </Typography>
              <Box sx={{padin: 0,width: '85%',display: 'flex',flexDirection: 'column',alignItems: 'center', marginInline:3, }}>
                <Box sx={{mb:2, width: '85%',display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
                  <Grid container columnSpacing={{ xs: 1, sm: 2, md: 2 }} width={'100%'}>
                    <Grid size={{xs:12,sm:12,md:12}}>
                      <CustomAutocomplete
                        control={control}
                        name='id_usuario'
                        label='seleccione un usuario'
                        labelOption='nombre'
                        valueOption='id_usuario'
                        options={listUsers}
                        handleChange={handleSelectUser}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
                { error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
                <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
                  {buttons.filter((button: Button) => (button.nombre === 'update'))
                  .map((button: any,index:number) => {
                    if (button?.tipo === 'table') {
                      return (
                        <ActionButton
                          key={`header-button-${button.id || index}`}
                          type={button?.nombre}
                          icon={<MUIcons.SaveAs/>}
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
                  <br></br>
                </Box>
          </Paper>

        </Box>
      </Container>
      {loading &&
        <Loading></Loading>
      }
    </div>
  );
}
)
export default ResetPasswordView;