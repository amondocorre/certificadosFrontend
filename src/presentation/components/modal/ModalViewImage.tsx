import React from 'react';
import { CloseButton } from '../buttons/CloseButton';
import {Close as CloseIcon} from '@mui/icons-material';
import { Box, ImageList, ImageListItem, Modal, SxProps } from '@mui/material';
import { Theme } from '@emotion/react';

interface ModalViewImageProps {
  open: boolean;
  handleClose: any;
  src?: string;
  sx?: SxProps<Theme>;
}
const ModalViewImage: React.FC<ModalViewImageProps> = ({ open,handleClose,src}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="user-form-modal-title"
      aria-describedby="user-form-modal-description"
      style={{ zIndex:1300}} 
    >
        <Box sx={{ p:0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '95%'}}>
          <ImageList sx={{ p:1,width: '100%', height: '100%',overflow: 'hidden',display: 'flex',justifyContent: 'center',alignItems: 'center',backgroundColor: 'rgba(0, 0, 0, 0.5)'}} variant="woven" cols={1}>
            <ImageListItem sx={{ width: '100%', height: '100%',display: 'flex',justifyContent: 'center',alignItems: 'center',}} >
              <img
                srcSet={src}
                src={src} 
                alt={'img'}
                loading="lazy"
                style={{ maxWidth: '100%', maxHeight: '100%',objectFit: 'contain',}}
              />
              <CloseButton onClick={handleClose} sx={{background:'red',position:'absolute',top:'0',right:'0'}}>
                <CloseIcon />
              </CloseButton>
            </ImageListItem>
          </ImageList>
        </Box>
    </Modal>
  );
};

export default ModalViewImage;