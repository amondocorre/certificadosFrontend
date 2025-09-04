import * as React from 'react';
import * as Icons from '@mui/icons-material'; // Importa todos los íconos de MUI
import {palette} from '../utils/palette'
const iconStyles: React.CSSProperties = {
  fontSize: '100px',
  color:palette.secondary.main,
  transition: 'transform 1s ease-in-out',
  animation: 'zoomEffect 1s infinite',
};
// Definir la animación en el documento
const zoomEffect = `
  @keyframes zoomEffect {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;
const styleElement = document.createElement('style');
styleElement.innerHTML = zoomEffect;
document.head.appendChild(styleElement);

interface ZoomIconProps {
  iconName: keyof typeof Icons; // Define el nombre del icono como prop
}

export default function EffectZoomIcon({ iconName }: ZoomIconProps) {
  const IconComponent = Icons[iconName]; // Obtiene el componente de ícono dinámicamente

  return IconComponent ? <IconComponent style={iconStyles} /> : <div>Ícono no encontrado</div>;
}
