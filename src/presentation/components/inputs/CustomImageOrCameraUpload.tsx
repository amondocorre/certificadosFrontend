import React, { useState, useCallback, useRef, useEffect } from 'react';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';
import {FormControl,FormHelperText,IconButton,Box,Typography,Dialog,DialogTitle,DialogContent,Button,} from '@mui/material';
import { Controller } from 'react-hook-form';
import {CameraAlt as CameraIcon,Delete as DeleteIcon,CloudUpload as UploadIcon,Close as CloseIcon} from '@mui/icons-material';

interface CustomImageOrCameraUploadProps {
  name: string;
  control: any;
  label?: string;
  disabled?: boolean;
  defaultValue?: string;
  acceptTypes?: string;
}

const CustomImageOrCameraUpload: React.FC<CustomImageOrCameraUploadProps> = ({
  name,
  control,
  label = 'Subir o tomar imagen',
  disabled = false,
  defaultValue = null,
  acceptTypes = 'image/*',
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(defaultValue || null);
  const [openModal, setOpenModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openCamera = useCallback(() => {
    setShowCamera(true);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch(() => alert('No se pudo acceder a la cámara'));
  }, []);

  const takePhoto = useCallback((field: any) => {
    const canvas = document.createElement('canvas');
    if (videoRef.current) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setPreviewImage(dataUrl);
        field.onChange(dataUrl);
      }
      const tracks = (videoRef.current.srcObject as MediaStream)?.getTracks();
      tracks?.forEach(track => track.stop());
    }
    setShowCamera(false);
  }, []);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>, field: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        field.onChange(result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleRemoveImage = useCallback((field: any) => {
    field.onChange(defaultValue || null);
    setPreviewImage(defaultValue || null);
    field.onChange(null);
    setPreviewImage(null);
  }, [defaultValue]);

  useEffect(() => {
    if (defaultValue) setPreviewImage(defaultValue);
  }, [defaultValue]);

  return (
    <FormControl fullWidth error={!!control._formState.errors[name]} disabled={disabled}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            {!showCamera && (
              <Box display="flex" gap={1}>
                <label htmlFor={`upload-${name}`}>
                  <input
                    id={`upload-${name}`}
                    type="file"
                    accept={acceptTypes}
                    style={{ display: 'none' }}
                    onChange={(event) => handleImageUpload(event, field)}
                    disabled={disabled}
                  />
                  <IconButton color="primary" component="span" disabled={disabled}>
                    <UploadIcon />
                  </IconButton>
                </label>
                <IconButton color="primary" disabled={disabled} onClick={openCamera}>
                  <CameraIcon />
                </IconButton>
              </Box>
            )}
            {showCamera && (
                <Box sx={{ position: 'relative',width:'90%',height:{xs:'70vh', sm:'70vh',md:'70vh'} }}>
                  <IconButton
                    onClick={() => {
                      setShowCamera(false);
                      const tracks = (videoRef.current?.srcObject as MediaStream)?.getTracks();
                      tracks?.forEach(track => track.stop());
                    }}
                    sx={{position: 'absolute',color:'red',top: 8,right: 8,zIndex: 2,backgroundColor: 'rgba(255, 255, 255, 0.8)','&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },}}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                  <video
                    ref={videoRef}
                    style={{width: '100%',height: '100%',objectFit: 'cover',borderRadius: '8px',border:'1px solid #FAD461'
                    }}
                  />
                  <Box sx={{position: 'absolute',bottom: 5,left: '50%',transform: 'translateX(-50%)',zIndex: 2,}}>
                    <IconButton onClick={() => takePhoto(field)}>
                      <PhotoCameraIcon sx={{fontSize:{xs:'35px', sm:'40px',md:'50px'},color:'white'}} />
                    </IconButton>
                  </Box>
                </Box>
              )}
            {previewImage && (
              <Box sx={{ position: 'relative' }}>
                <Button onClick={() => setOpenModal(true)} sx={{ width: 100, height: 100, border: '2px solid blue' }}>
                  <img src={previewImage} alt="Vista previa" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Button>
                <IconButton
                  onClick={() => handleRemoveImage(field)}
                  color="error"
                  size="small"
                  sx={{ position: 'absolute', top: -10, right: -10, backgroundColor: 'rgba(255,255,255,0.8)' }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
            {!previewImage && label && !showCamera && (
              <Typography variant="subtitle2" color="textSecondary">{label}</Typography>
            )}
          </Box>
        )}
      />
      {control._formState.errors[name]?.message && (
        <FormHelperText>{control._formState.errors[name].message}</FormHelperText>
      )}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{name}</DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
          {previewImage && (
            <img src={previewImage} alt="Vista previa" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
          )}
        </DialogContent>
        <Box sx={{ pr: 2, pb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => setOpenModal(false)} color="primary">Cerrar</Button>
        </Box>
      </Dialog>
    </FormControl>
  );
};

export default CustomImageOrCameraUpload;
