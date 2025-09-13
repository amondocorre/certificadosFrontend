import React from 'react';
import {
  TextField,
  FormControl,
  FormHelperText,
  InputAdornment,
  Theme,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { SxProps } from '@mui/system';

interface CustomTextAreaProps {
  name: string;
  control: any;
  label?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (data: any, name: string) => void;
  height?: string | {};
  sx?: {};
  sxInputLabel?: SxProps<Theme>;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  uppercase?:boolean
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({name,control,label,icon,sx,sxInputLabel,placeholder = '',disabled = false,onChange,height = '',rows = 4,minRows=1,maxRows=4,uppercase=false}) => {
  const errorMessage = control._formState.errors[name]?.message as string | undefined;

  return (
    <FormControl fullWidth error={!!control._formState.errors[name]} disabled={disabled}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            variant="outlined"
            multiline
            minRows={minRows}
            rows={rows}
            maxRows={maxRows}
            size="small"
            placeholder={placeholder}
            value={field.value || ''}
            onChange={(event) => {
              const value = uppercase ? event.target.value.toUpperCase() : event.target.value;
              field.onChange(value);
              onChange?.(value, field.name);
            }}
            InputProps={{
              startAdornment: icon && (
                <InputAdornment
                  position="start"
                  sx={{
                    color: 'action.active',
                    mr: 1,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {icon}
                </InputAdornment>
              ),
              sx: { ...sx, height: height ? height : undefined },
            }}
            InputLabelProps={{
              sx: {
                fontSize: '0.98rem',
                ...sxInputLabel,
              },
            }}
            disabled={disabled}
            sx={{
              ...(disabled && {
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

export default CustomTextArea;
