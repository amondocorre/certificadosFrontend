import React, { useState } from 'react';
import { FormControl, FormHelperText, Switch, Typography, Box } from '@mui/material';
import { Icon } from '@mui/material';

interface SwitchSimpleProps {
  id: string;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  defaultChecked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, id_boton: string) => void;
}

const SwitchSimple: React.FC<SwitchSimpleProps> = ({ id, label, icon, disabled = false,defaultChecked=false, onChange }) => {
  const [checked, setChecked] = useState(defaultChecked); 
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChange?.(event, id); 
  };
  return (
    <FormControl fullWidth disabled={disabled} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {label && (
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          {icon && <Icon>{icon}</Icon>}
          <Typography variant="subtitle1" sx={{color:'black'}}>{label}</Typography>
        </Box>
      )}
      <Switch checked={checked} onChange={handleChange} disabled={disabled} />
    </FormControl>
  );
};

export default SwitchSimple;
