'use client';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {Box,Button,TextField,Typography,Container,Paper,Alert,InputAdornment,IconButton, createTheme, ThemeProvider,} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../../hooks/useAuth';
import { container } from '../../../../di/container';
import { Loading } from '../../../components/Loading';
import ModalSelectSucursal from '../../../components/modal/ModalSelectSucursal';
import logoEmpresa from '../../../../assets/1_empresaCM.png'
 const customTheme = createTheme({
    palette: {
      primary: {
        main: '#1a3e72', 
      },
      secondary: {
        main: '#dc004e', 
      },
    },
  });
export default function SignIn() {
  const { authResponse, saveAuthSession, saveMenuSesion,dataConpany,saveDataCompany } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [callbackUrl, setCallbackUrl] = useState('/');
  const loginViewModel = container.resolve('loginViewModel');
  const [loading, setLoading] = useState(false)
  const [modalSucursal, setModalSucursal] = useState(false)
  const [dataResponse, setDataResponse] = useState<any>(null)
  const handleOpenModal = ()=>{
    setModalSucursal(true);
  }
  const handleCloseModal = ()=>{
    setModalSucursal(false);
  }
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (authResponse) {
      navigate(callbackUrl, { replace: true });
    }
  }, [authResponse, navigate, callbackUrl]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const callback = params.get('callbackUrl');
    if (callback) {
      setCallbackUrl(decodeURIComponent(callback));
    }
  }, [location.search]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await loginViewModel.login(formData.username, formData.password);
      if ('token' in response) {
        if ('sucursales' in response.user && response?.user?.sucursales?.length>0) {
          if(response?.user?.sucursales?.length>1){
            setDataResponse(response);
            handleOpenModal();
            return;
          }else response.id_sucursal = Number(response?.user?.sucursales[0].id_sucursal);
        }
        const responseMenu = await loginViewModel.getMenuUser(response.token);
        if ('menu' in responseMenu && Array.isArray(responseMenu.menu)) {
          await saveMenuSesion(responseMenu.menu);
        } else {
          await saveMenuSesion([]);
        }
        if ('dataConpany' in responseMenu && responseMenu.dataConpany) {
          await saveDataCompany(responseMenu.dataConpany);
        }
        await saveAuthSession(response);
      } else {
        setError(response.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error instanceof Error ? error.message : 'Ha ocurrido un error');
    }
  };
  const selectSucursal = async (id_sucursal:number) => {
    setLoading(true);
    try {
      const response = {...dataResponse};
      response.id_sucursal = id_sucursal;
      const responseMenu = await loginViewModel.getMenuUser(response.token);
      if ('menu' in responseMenu && Array.isArray(responseMenu.menu)) {
        await saveMenuSesion(responseMenu.menu);
      } else {
        await saveMenuSesion([]);
      }
      if ('dataConpany' in responseMenu && responseMenu.dataConpany) {
        await saveDataCompany(responseMenu.dataConpany);
      }
      await saveAuthSession(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error instanceof Error ? error.message : 'Ha ocurrido un error');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ mb: 1, justifyContent:'center',background:''}}>
          <Paper
            elevation={20}
            sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width:{xs:'100%', sm:'100%',md:'100%'},
              p:{xs:0, sm:2,md:2} ,border: {xs:'1px solid #1a3e72', sm:'2px solid #1a3e72',md:'2px solid #1a3e72'},borderRadius: '4px',
            }}
          >
            <Box
              component="img"
              src={dataConpany?.logo_empresa || logoEmpresa}
              alt="Centro Médico"
              sx={{
                width: { xs: '70%', sm: '100%', md: '100%' },
                maxWidth: 150,
              }}
            />
          </Paper>
        </Box>
        <Paper
          elevation={24}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Iniciar Sesión
          </Typography>
          {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuario"
              name="username"
              size="small"
              autoFocus
              value={formData.username}
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
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
          </Box>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center"
          >
            Versión 1.0.2
          </Typography>
        </Paper>
      </Box>
      {loading &&<Loading></Loading>}
      </ThemeProvider>
      <ModalSelectSucursal
      onClose={handleCloseModal}
      open={modalSucursal}
      dataResponse={dataResponse}
      selectSucursal={selectSucursal}
      />
    </Container>
  );
}