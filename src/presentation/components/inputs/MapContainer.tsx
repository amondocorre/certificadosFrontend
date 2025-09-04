import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Box, SxProps, Typography } from '@mui/material';
import { LocationOn as LocationOnIcon } from '@mui/icons-material';
import CustomTextField from './CustomTextField';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markeIrcon from '../../../imagenes/marker-icon.png';
import { Theme } from '@emotion/react';
interface MapComponentProps {
  control: any; 
  initialPosition: L.LatLngLiteral;
  onPositionChange: (position: L.LatLngLiteral) => void;
  disabled?: boolean; 
  name?:string 
  label?:string 
  sx?: SxProps<Theme>;
}

const MapComponent: React.FC<MapComponentProps> = ({control,initialPosition,onPositionChange,disabled=false,name='ubicacion_gps',label="Ubicación GPS (Opcional)",sx}) => {
  const [markerPosition, setMarkerPosition] = useState<L.LatLngLiteral>(initialPosition);
  const customIcon = L.icon({
    iconUrl: markeIrcon,
    iconSize: [30, 30], // tamaño del ícono
    iconAnchor: [20, 40], // punto de anclaje (centro inferior)
    popupAnchor: [0, -40], // opcional, si usas popups
  })
  useEffect(() => {
    setMarkerPosition(initialPosition);
  }, [initialPosition]);

  const MapClickHandler = () => {
    const map = useMapEvents({
      click: (e) => {
        if (!disabled) { 
          setMarkerPosition(e.latlng);
          onPositionChange(e.latlng);
        }
      },
    });
    return null;
  };

  return (
    <Box>
      <Controller
        name={name}
        control={control}
        defaultValue={`${initialPosition.lat},${initialPosition.lng}`}
        render={({ field }) => (
          <CustomTextField
            {...field}
            label={label}
            name={name}
            control={control}
            placeholder="Seleccione un ubicacion"
            icon={<LocationOnIcon />}
            disabled={true} 
          />
        )}
      />
      <Typography sx={{color:'black'}} variant="subtitle1">(Haga clic en el mapa para seleccionar)</Typography>
      <Box
        sx={{
          height: 300,
          width: '100%',
          borderRadius: 4,
          overflow: 'hidden',
          opacity: disabled ? 0.6 : 1,
          pointerEvents: disabled ? 'none' : 'auto',
          ...sx, 
        }}
      >
      <MapContainer
        center={markerPosition}
        zoom={13}
        style={{
          height: '100%',
          width: '100%',
          borderRadius: 4,
          overflow: 'hidden',
          opacity: disabled ? 0.6 : 1,
          pointerEvents: disabled ? 'none' : 'auto',
          
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markerPosition && <Marker position={markerPosition} icon={customIcon} />}
        <MapClickHandler />
      </MapContainer>
    </Box>
    </Box>
  );
};

export default MapComponent;