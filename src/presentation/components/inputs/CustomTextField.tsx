import React from 'react';
import { TextField, FormControl, FormHelperText, InputAdornment, Theme } from '@mui/material';
import { Controller } from 'react-hook-form';
import { height, SxProps } from '@mui/system';

interface CustomTextFieldProps {
  name: string;
  control: any;
  label?: string;
  icon?: React.ReactNode;
  type?: 'text' | 'number' | 'password' | 'email' | 'date' | 'datetime-local';
  placeholder?: string;
  disabled?: boolean;
  onChange?: (data: any,name:string) => void;
  height?: string|{};
  sx?:{},
  sxInputLabel?: SxProps<Theme>;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({name,control,label,icon,sx,sxInputLabel,type = 'text',placeholder = '',disabled = false,onChange,height=''}) => {
  const inputProps = type === 'number' ? { min: '0' } : {};
  const errorMessage = control._formState.errors[name]?.message as string | undefined;
  return (
    <FormControl fullWidth error={!!control._formState.errors[name]} disabled={disabled} >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            variant="outlined"
            type={type}
            size={'small'}
            placeholder={placeholder}
            value={field.value || ''}
            onChange={(event) => {
              field.onChange(event); onChange?.(event.target.value, field.name);
            }}
            InputProps={{
              startAdornment: icon && (
                <InputAdornment position="start" sx={{ color: 'action.active ', mr: 1, display: 'flex', alignItems: 'center' }}>
                  {icon}
                </InputAdornment>
              ),
              sx: {...sx, height: height?height:undefined},
              inputProps: inputProps,
            }}
            InputLabelProps={{
              shrink: type === 'date' || type === 'datetime-local' ? true : undefined,
              sx: { 
                fontSize: '0.98rem',
                ...sxInputLabel},
            }}
            disabled={disabled}
            sx={{...(disabled && { 
                '& .MuiInputBase-input.Mui-disabled': { 
                  WebkitTextFillColor: 'rgba(0, 0, 0, 0.65)',
                  opacity: 1, 
                },
              }),
            }}
          />
        )}
      />
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default CustomTextField;