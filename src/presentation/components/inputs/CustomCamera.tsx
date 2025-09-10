import React, { useRef, useState, useCallback } from 'react';
import {FormControl,FormHelperText,IconButton,Box,Typography,Dialog,DialogTitle,DialogContent,Button,} from '@mui/material';
import { Controller } from 'react-hook-form';
import { CameraAlt as CameraIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface CustomCameraProps {
  name: string;
  control: any;
  open:boolean;
  handleClose:()=>void
}

const CustomCamera: React.FC<CustomCameraProps> = ({
  name,
  control,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>( null);
  const [openModal, setOpenModal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const errorMessage = control._formState.errors[name]?.message as string | undefined;

  const openCamera = useCallback(() => {
    setShowCamera(true);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch(() => {
        alert('No se pudo acceder a la cámara');
      });
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

  const handleRemoveImage = useCallback((field: any) => {
    field.onChange( null);
    setPreviewImage( null);
  }, []);

  return (
    <FormControl fullWidth error={!!control._formState.errors[name]} >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Box display="flex" alignItems="center" flexDirection="column">
            {!showCamera && (
              <IconButton color="primary" onClick={openCamera}>
                <CameraIcon />
              </IconButton>
            )}
            {showCamera && (
              <Box>
                <video ref={videoRef} style={{ width: '100%', maxHeight: '300px' }} />
                <Button variant="contained" onClick={() => takePhoto(field)} sx={{ mt: 2 }}>
                  Capturar
                </Button>
              </Box>
            )}
            {previewImage && (
              <Box sx={{ position: 'relative', mt: 2 }}>
                <Button
                  onClick={() => setOpenModal(true)}
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
                    alt="Captura"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Button>
                <IconButton
                  onClick={() => handleRemoveImage(field)}
                  color="error"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Box>
        )}
      />
    </FormControl>
  );
};

export default CustomCamera;
