import * as React from 'react';
import { Modal, Fade, CircularProgress, Box } from '@mui/material';

const modalStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  backdropFilter: 'blur(8px)',
};

const largeImageContainerStyles = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  padding: 50,
};

interface LoadingProps {
  alt?: string;
  width?: string | number;
  height?: string | number;
  time?: number;
  showSkeleton?: boolean;
  onclick?: <T extends unknown[], R = unknown>(...args: T) => R | void;
  onload?: <T extends unknown[], R = unknown>(...args: T) => R | void;
  preventDefaultOnClick?: boolean;
  objectfit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
  objectposition?: string;
  background?: string;
}

export const Loading: React.FC<LoadingProps> = React.memo(({
  alt = '',
  width = 'auto',
  height = 'auto',
  time = 800,
  showSkeleton = true,
  onclick,
  onload,
  preventDefaultOnClick = false,
  objectfit = 'cover',
  objectposition = 'center',
  background = 'transparent',
}) => {
  const [bigImgLoaded, setBigImgLoaded] = React.useState(false); // Changed initial state to false
  const [showBigImage, setShowBigImage] = React.useState(true);
  const LargeImage = (
    <img
      src="https://i.ibb.co/LNkQBx3/taza-loading.png"
      style={{
        width: '10%',
        height: '10%',
        objectFit: 'contain',
      }}
      alt={alt}
      onLoad={() => setBigImgLoaded(true)}
    />
  );
  return (
    <>
      <Modal
        aria-labelledby="KDImage-large-image-modal"
        aria-describedby="Lazy load popover modal image view"
        sx={modalStyles}
        open={showBigImage}
        onClose={() => setShowBigImage(false)}
      >
        <Fade in={showBigImage}>
          <Box sx={largeImageContainerStyles}>
            {bigImgLoaded ? (
              <Fade in={bigImgLoaded}>{LargeImage}</Fade>
            ) : (
              <CircularProgress size="3rem" />
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
});