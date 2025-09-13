import React, { useState, useCallback, useEffect, useRef } from 'react';
import {FormControl,FormHelperText,IconButton,Box,Typography,Dialog,DialogTitle,DialogContent,Button,createTheme, SxProps, Theme,} from '@mui/material';
import { Controller } from 'react-hook-form';
import { Delete as DeleteIcon, CloudUpload as UploadIcon } from '@mui/icons-material';
import { ThemeProvider } from '@emotion/react';
import ModalViewImage from '../modal/ModalViewImage';
import {CameraAlt as CameraIcon,Close as CloseIcon} from '@mui/icons-material';
import CustomCamera from './CustomCamera';

interface CustomUploadOrCameraProps {
  name: string;
  control: any;
  label?: string;
  disabled?: boolean;
  defaultValue?: string;
  acceptTypes?: string;
  sx?: SxProps<Theme>;
}

const theme = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '',
        },
      },
    },
  },
});

const CustomUploadOrCamera: React.FC<CustomUploadOrCameraProps> = ({ name, control, label = 'Subir Imagen', disabled = false, defaultValue = null,acceptTypes = 'image/*',sx }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const errorMessage = control._formState.errors[name]?.message as string | undefined;
  useEffect(() => {
    setPreviewImage(defaultValue)??'';
  }, [defaultValue]);

  const handleImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const file = event.target.files?.[0];
    if (file) {
      field.onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      field.onChange(defaultValue ? defaultValue : null);
      setPreviewImage(defaultValue ? defaultValue : null);
    }
  }, [setPreviewImage, defaultValue]);

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, [setOpenModal]);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal]);
  const openCamera = useCallback(() => {
    setShowCamera(true);
  },[])
  const handleCloseCamera = useCallback(() => {
    setShowCamera(false);
  },[])
  const handleRemoveImage = useCallback((field: any) => {
    field.onChange(defaultValue ? defaultValue : null);
    setPreviewImage(defaultValue ? defaultValue : null);
  }, [setPreviewImage, defaultValue]);

  return (
    <ThemeProvider theme={theme}>
      <FormControl fullWidth error={!!control._formState.errors[name]} disabled={disabled}>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Box display="flex" alignItems="center" sx={{...sx}}>
              <input
                id={`image-upload-${name}`}
                type="file"
                accept={acceptTypes}
                style={{ display: 'none' }}
                onChange={(event) => handleImageChange(event, field)}
                disabled={disabled}
              />
              <label htmlFor={`image-upload-${name}`}>
                <IconButton color="primary" component="span" disabled={disabled}>
                  <UploadIcon />
                </IconButton>
              </label>
              {/*<IconButton color="primary" disabled={disabled} onClick={openCamera}>
                  <CameraIcon />
              </IconButton>
              <CustomCamera 
                control={control}
                name={name}
                open={showCamera}
                handleClose={handleCloseCamera}
              ></CustomCamera>*/}
              {previewImage && (
                <Box sx={{ position: 'relative', display: 'inline-block'}}>
                  <Button
                    onClick={handleOpenModal}
                    sx={{
                      width: 100,
                      height: 100,
                      p: 2,
                      border: '2px solid blue',
                      borderRadius: '4px',
                    }}
                  >
                    <img
                      src={previewImage}
                      alt="Vista previa miniatura"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Button>
                  {defaultValue !== previewImage && (
                    <IconButton
                      onClick={() => handleRemoveImage(field)}
                      color="error"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 1)',
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              )}
              {!previewImage && label && (
                <Typography variant="subtitle2" color="textSecondary" sx={{ ml: 1 }}>
                  {label}
                </Typography>
              )}
            </Box>
          )}
        />
        {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
        <ModalViewImage
            open={openModal}
            handleClose={handleCloseModal}
            src={String(previewImage)}
            key={'pre-view'}
        />
      </FormControl>
    </ThemeProvider>
  );
};

export default CustomUploadOrCamera;