import React, { useState } from "react";
import { FormControl, FormHelperText, Checkbox, Typography, Box, SxProps, Theme } from "@mui/material";
import { Icon } from "@mui/material";

interface CheckboxSimpleProps {
  id: string;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  defaultChecked?: boolean;
  sx?: SxProps<Theme>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, id_boton: string) => void;
}

const CheckboxSimple: React.FC<CheckboxSimpleProps> = ({ id, label, icon, disabled = false, defaultChecked = false, onChange,sx }) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChange?.(event, id);
  };

  return (
    <FormControl fullWidth disabled={disabled}
      sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', // centrado vertical
    }}>
      {label && (
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          {icon && <Icon>{icon}</Icon>}
          <Typography variant="subtitle1">{label}</Typography>
        </Box>
      )}
      <Checkbox checked={checked}sx={{...sx,width: '100%', height: '100%','& .MuiSvgIcon-root': {fontSize: '100%', },}} onChange={handleChange} disabled={disabled} />
    </FormControl>
  );
};

export default CheckboxSimple;
