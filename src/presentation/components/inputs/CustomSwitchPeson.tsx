import React from 'react';
import { FormControl, FormHelperText, Typography, Box, Icon, Switch } from '@mui/material';
import { Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { Opacity } from '@mui/icons-material';

const LabeledSwitch = styled(Switch)(({ theme }) => ({
  width: 80,
  height: 40,
  padding: 0,
  fontSize: 17,
  '& .MuiSwitch-switchBase': {
    padding: 2,
    transition: 'transform 0.4s',
    '&.Mui-checked': {
      transform: 'translateX(40px)',
      color: '#1976d2',
      '& + .MuiSwitch-track': {
        backgroundColor: '#c1d4e7ff',
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 36,
    height: 36,
    boxShadow: 'none',
    transition: 'transform 0.4s, background-color 0.4s',
    backgroundColor: '#fff',
    display: 'flex', 
    alignItems: 'center',
    justifyContent: 'center',
    '&::before': {
      content: '"No"',
      fontSize: 12,
      color: 'black',
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    opacity: 1,
    position: 'relative',
    transition: 'background-color 0.4s',
    '&::before': {
      content: '"Sí"',
      position: 'absolute',
      right: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: 12,
      color: '#8a8585ff',
      transition: 'color 0.4s',
      Opacity:0.9
    },
    '&::after': {
      content: '"No"',
      position: 'absolute',
      left: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: 12,
      color: '#888484ff',
      transition: 'color 0.4s',
      Opacity:0.9
    },
  },
  '&.Mui-checked + .MuiSwitch-track': {
    '&::before': {
      color: '#fff',
    },
    '&::after': {
      color: '#555',
    },
  },
  '& .Mui-checked .MuiSwitch-thumb': {
    backgroundColor: '#1976d2',
    '&::before': {
        content: '"Sí"',
        color: '#fff', 
    }
  }
}));

interface CustomSwitchProps {
  name: string;
  control: any;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  flexDirection?:'column'|'row';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, id_boton: string) => void;
}

const CustomSwitchPerson: React.FC<CustomSwitchProps> = ({ name, control, label, icon, disabled = false, onChange,flexDirection='column' }) => {
  const errorMessage = control._formState.errors[name]?.message as string | undefined;

  return (
    <FormControl fullWidth error={!!control._formState.errors[name]} disabled={disabled} sx={{ display: 'flex', alignItems: 'center' }}>
      <div style={{display: 'flex',flexDirection: flexDirection}}>
        {label && (
          <Box display="flex" alignItems="center" gap={1} m={0} sx={{ m: '0 !important',pr:flexDirection==='row'?'5px':undefined}}>
            {icon && <Icon>{icon}</Icon>}
            <Typography variant="subtitle1">{label}</Typography>
          </Box>
        )}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <LabeledSwitch
              {...field}
              checked={field.value == 1}
              //checked={field.value ?? false}
              onChange={(event) => {
                const value = event.target.checked ? 1 : 0;
                field.onChange(value);
                onChange?.(event, name);
              }}
              disabled={disabled}
            />
          )}
        />
      </div>
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSwitchPerson;