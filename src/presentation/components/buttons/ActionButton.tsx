import React from 'react';
import { Button, SxProps, Theme } from '@mui/material';

interface ActionButtonProps {
  type?: 'create' | 'update' | 'deleted' | 'cancel' |'activate'|''; // Agrega 'cancel' al tipo
  onClick: () => void;
  disabled?: boolean;
  labelOverride?: string;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
  label?:string
}

const ActionButton: React.FC<ActionButtonProps> = ({ type, onClick, disabled, labelOverride, icon, sx,label='' }) => {
  //let label: string = '';
  let color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'inherit'| '' |'warning' = 'primary';
  let variant: 'text' | 'outlined' | 'contained' = 'contained';

  switch (type) {
    case 'create':
      label =label?label:'Guardar';
      color = 'primary';
      variant = 'contained';
      break;
    case 'update':
      label = label?label:'Guardar';
      color = 'primary';
      variant = 'contained';
      break;
    case 'deleted':
      label = label?label:'Eliminar';
      color = 'error';
      variant = 'contained';
      break;
    case 'activate':
      label = label?label:'Activar';
      color = 'success';
      variant = 'contained';
      break;
    case 'cancel': // Nuevo caso para 'cancel'
      label = label?label:'Cancelar';
      color = 'primary'; // Hereda el color del texto padre
      variant = 'text'; // Estilo de texto plano
      break;
    default:
      label = label?label:'';
      color = 'primary';
      variant = 'contained';
      break;
  }

  label = labelOverride || label;

  const buttonSx: SxProps<Theme> = {
    ...sx,
    ...(type === 'cancel' && {
      color: 'primary',
      borderColor: 'primary', 
       border: '2px solid',
      '&:hover': {
        backgroundColor: 'rgba(255, 145, 0, 0.08)', 
        borderColor: 'primary',
      },
    }),
  };

  return (
    <Button onClick={onClick} variant={variant}  color={color || undefined} disabled={disabled} startIcon={icon} sx={buttonSx}>
      {label}
    </Button>
  );
};

export default ActionButton;