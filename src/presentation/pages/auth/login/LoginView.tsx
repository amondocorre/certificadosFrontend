import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {Container,Paper,Typography,TextField,Button,Box,Grid,ThemeProvider,createTheme,} from '@mui/material';
import { styled } from '@mui/material/styles';
import { container } from '../../../../di/container';
import { useAuth } from '../../../hooks/useAuth';

const schema = yup.object().shape({
  username: yup.string().required('Please enter username'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .max(20, 'Password must not exceed 20 characters')
    .required('Please enter password'),
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  borderRadius: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));
const Illustration = styled(Box)(({  }) => ({
  background: `url('/path-to-your-illustration.jpg') no-repeat center`,
  backgroundSize: 'contain',
  width: '100%',
  height: '100%',
}));
// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#0A74DA', // Azul principal
      dark: '#084BAA', // Azul oscuro
    },
    secondary: {
      main: '#FF9800', // Naranja para botones secundarios o acentos
    },
    background: {
      default: '#F4F6F8', // Fondo claro
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default function Login() {
  const navigate = useNavigate();
  const loginViewModel = container.resolve('loginViewModel');
  const { authResponse, saveAuthSession } = useAuth();
  useEffect(()=>{
    if(authResponse){
      navigate('/');
    }
  },[authResponse])
  const {register,handleSubmit,formState: { errors },} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmitNew = async (data:any) => {
    try {
      const response = await loginViewModel.login(data?.username, data?.password);
      if ('token' in response) {
        await saveAuthSession(response);
        navigate('/dashboard');
      }
    } catch (err) {
      //console.error(err || 'Something went wrong');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg">
        <Grid container spacing={2} columnSpacing={{ xs: 2, sm: 3, md: 8 }} alignItems="center" justifyContent="center" sx={{ height: '100vh',paddingInline: { xs: '5%', sm: '10%', md: '16%' } }}>
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 5
            }}>
            <StyledPaper elevation={3}>
              <Typography component="h1" variant="h5" align="center" color="primary">
                Inicio de sesión
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmitNew)}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  fullWidth
                  id="username"
                  label="username"
                  autoComplete="username"
                  {...register('username')}
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
                <StyledButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Iniciar sesión
                </StyledButton>
              </Box>
            </StyledPaper>
          </Grid>
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 7
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
              }}
            >
              <Illustration />
              <Typography variant="h6" sx={{ mt: 2 }} color="secondary">
                Welcome to the Universal 
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
