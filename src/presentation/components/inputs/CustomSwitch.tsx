import React from 'react';
import { FormControl, FormHelperText, Switch, Typography, Box } from '@mui/material';
import { Controller } from 'react-hook-form';
import { Icon } from '@mui/material';

interface CustomSwitchProps {
  name: string;
  control: any;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>,id_boton:string) => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ name, control, label, icon, disabled = false, onChange }) => {
  const errorMessage = control._formState.errors[name]?.message as string | undefined;

  return (
    <FormControl fullWidth error={!!control._formState.errors[name]} disabled={disabled} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {label && (
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          {icon && <Icon>{icon}</Icon>}
          <Typography variant="subtitle1">{label}</Typography>
        </Box>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Switch
            {...field}
            checked={field.value ?? false}
            onChange={(event) => {
              field.onChange(event);
              onChange?.(event,name); // Se ejecuta solo si `onChange` está definido
            }}
            disabled={disabled}
          />
        )}
      />
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSwitch;
