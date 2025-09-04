import React, { memo,useEffect,useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import * as MUIcons from '@mui/icons-material';
import {Typography,Grid, Container, Box, Paper, Alert, TextField, InputAdornment, IconButton, Button} from '@mui/material';
import {NavigationItem } from '../../../../domain/models/AccesModel';
import { userContainer } from '../../../../di/userContainer';
import { AlertConfirm, AlertError, AlertSave } from '../../../components/alerts';
import HeaderPage from '../../../components/containers/HeaderPage';
import { Loading } from '../../../components/Loading';
//import { Button } from '../../../../domain/models/ButtonModel';
import { useAuth } from '../../../hooks/useAuth';
import { DataChangePassword } from '../../../../domain/models/User';
interface LayoutContext {currentMenuItem: NavigationItem | null,getItemMenu:()=>void}

const ChangePasswordView: React.FC = memo(() => {
  const { currentMenuItem } = useOutletContext<LayoutContext>();
  const { authResponse,removeAuthSession} = useAuth();
  const UserViewModel = userContainer.resolve('UserViewModel');
  const [loading, setLoading] = useState(false);
  const [buttons , setButtons] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [stateUpdate, setStateUpdate] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);
  const [formData, setFormData] = useState<DataChangePassword>({
    username: '',
    password: '',
    newPassword:'',
    repeatNewPassword:''
  });
  useEffect(()=>{
      if(authResponse){
        setFormData(prev => ({...prev,username: String(authResponse.user.usuario)}));
      }
  },[authResponse])
  useEffect(()=>{
    if(currentMenuItem){
      getButtuns(currentMenuItem?.id_menu_acceso);
    }
  },[currentMenuItem])
  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if(formData.newPassword!==formData.repeatNewPassword){
      setError('Las contraseñas no coinciden. Por favor, verifique que ambas sean iguales.');
      return;
    }
    if(formData?.newPassword?.length<=6){
      setError('La nueva contraseña debe ser mayor o igual a 6 caracteres.');
      return;
    }
    const result = await AlertConfirm({title:'¿Estas seguro de resetear la contraseña para el usuario.?'});
    if (!result.isConfirmed) return;
    setLoading(true)
    try {
      const response = await UserViewModel.changePassword(formData);
      setLoading(false)
      if ('status' in response && response.status==='success') {
        setFormData(prev => ({...prev,password:'',newPassword:'',repeatNewPassword:''}));
        AlertSave({ title: '', message: response.message });
        removeAuthSession();
      } else {
        AlertError({ title: '', message: response.message })
      }
    } catch (error) {}
    setLoading(false)
  }
  const getButtuns = async (idAcces:number) => {
    setLoading(true)
    try {
      const response = await UserViewModel.getButtunsAccess(idAcces);
      if ('buttons' in response) {
        setButtons(response!.buttons);
        const btnUpdate = response!.buttons?.filter((button: any) => (button.nombre === 'update' && button?.tipo === 'table'))
        if(btnUpdate?.length>0){
          setStateUpdate(true);
        }
      }
    } catch (error) {}
    setLoading(false)
  };
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickShowPassword=()=>{setShowPassword(!showPassword);};
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>)=>{event.preventDefault();};
  const handleClickShowNewPassword=()=>{setShowNewPassword(!showNewPassword);};
  const handleClickShowRepeatNewPassword=()=>{setShowRepeatNewPassword(!showRepeatNewPassword);};


  return (
    <div>
      <HeaderPage>
        <Grid size={{xs: 6.5,sm: 7,md: 8}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {currentMenuItem?.title ? currentMenuItem?.title : '...'}
          </Typography>
        </Grid>
        <Grid container justifyContent="end"alignItems="end"alignSelf={'center'}size={{xs: 5.5,sm: 5,md: 4}}>
          
        </Grid>
      </HeaderPage>
      <Container component="main" maxWidth="xs" sx={{paddingTop:1}}>
         <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
           <Paper
             elevation={24}
             sx={{ paddingTop: 4,display: 'flex',flexDirection: 'column',alignItems: 'center',width: '100%',border: '4px solid #FAD461', borderRadius: '8px'}}>
             <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
               {'Cambiar Contraseña'}
             </Typography>
             <Box sx={{padin: 0,width: '85%',display: 'flex',flexDirection: 'column',alignItems: 'center', marginInline:3, }}>
               { error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
               <Box component="form" onSubmit={handleUpdate}  sx={{ mt: 3, width: '100%' }}>
                 <TextField
                   margin="normal"
                   required
                   fullWidth
                   id="username"
                   label="Usuario"
                   name="username"
                   size="small"
                   disabled={true}
                   autoFocus
                   value={formData.username}
                   InputProps={{
                     startAdornment: (
                       <InputAdornment position="start" sx={{ color: 'action.active ', mr: 1, display: 'flex', alignItems: 'center' }}>
                         {<MUIcons.Person/>}
                       </InputAdornment>
                     ),
                   }}
                   onChange={handleChange}
                 />
                 <TextField
                   margin="normal"
                   required
                   size="small"
                   fullWidth
                   name="password"
                   label="Contraseña"
                   type={showPassword ? 'text' : 'password'}
                   id="password"
                   autoComplete="current-password"
                   value={formData.password}
                   onChange={handleChange}
                   InputProps={{
                     endAdornment: (
                       <InputAdornment position="end">
                         <IconButton
                           aria-label="toggle password visibility"
                           onClick={handleClickShowPassword}
                           onMouseDown={handleMouseDownPassword}
                           edge="end"
                         >
                           {showPassword ? < MUIcons.VisibilityOff /> : <MUIcons.Visibility />}
                         </IconButton>
                       </InputAdornment>
                     ),
                   }}
                 />
                 <TextField
                   margin="normal"
                   required
                   size="small"
                   fullWidth
                   placeholder="Debe ingresar la nueva contraseña" 
                   name="newPassword"
                   label="Nueva Contraseña"
                   type={showNewPassword ? 'text' : 'password'}
                   id="newPassword"
                   autoComplete="current-password"
                   value={formData.newPassword}
                   onChange={handleChange}
                   InputProps={{
                     endAdornment: (
                       <InputAdornment position="end">
                         <IconButton
                           aria-label="toggle password visibility"
                           onClick={handleClickShowNewPassword}
                           onMouseDown={handleMouseDownPassword}
                           edge="end"
                         >
                           {showNewPassword ? < MUIcons.VisibilityOff /> : <MUIcons.Visibility />}
                         </IconButton>
                       </InputAdornment>
                     ),
                   }}
                 />
                 <TextField
                   margin="normal"
                   required
                   size="small"
                   fullWidth
                   name="repeatNewPassword"
                   label="Repetir Nueva Contraseña"
                   placeholder="Debe ingresar la nueva contraseña" 
                   type={showRepeatNewPassword ? 'text' : 'password'}
                   id="repeatNewPassword"
                   autoComplete="current-password"
                   value={formData.repeatNewPassword}
                   onChange={handleChange}
                   InputProps={{
                     endAdornment: (
                       <InputAdornment position="end">
                         <IconButton
                           aria-label="toggle password visibility"
                           onClick={handleClickShowRepeatNewPassword}
                           onMouseDown={handleMouseDownPassword}
                           edge="end"
                         >
                           {showRepeatNewPassword ? < MUIcons.VisibilityOff /> : <MUIcons.Visibility />}
                         </IconButton>
                       </InputAdornment>
                     ),
                   }}
                 />
               <Button
                 type="submit"
                 fullWidth
                 variant="contained"
                 disabled={!stateUpdate}
                 sx={{ mt: 3, mb: 2 }}
               >
                 Guardar
               </Button>
               </Box>
             </Box>
               <Box sx={{display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
                 {/*buttons.filter((button: Button) => (button.nombre === 'update'))
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
                 })*/}  
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
export default ChangePasswordView;