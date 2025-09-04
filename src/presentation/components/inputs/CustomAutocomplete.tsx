import React from 'react';
import { Autocomplete, TextField, FormControl, InputAdornment } from '@mui/material';
import { Controller } from 'react-hook-form';

interface CustomAutocompleteProps {
  name: string;
  label: string;
  labelOption: string;
  valueOption: string;
  options: any[];
  control: any;
  icon?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  handleChange?: (data: any) => void;
}

const CustomAutocomplete: React.FC<CustomAutocompleteProps> = ({
  control,
  name,
  label,
  options,
  icon,
  labelOption,
  valueOption,
  placeholder,
  disabled = false,
  handleChange,
}) => {
  const errorMessage = control._formState?.errors[name]?.message as string | undefined;

  return (
    <FormControl fullWidth error={!!errorMessage} disabled={disabled}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedOption = options.find((option) => option?.[valueOption] === field.value) || null; 
          return (
            <Autocomplete
              {...field}
              onChange={(_, newValue) => {
                field.onChange(newValue?.[valueOption] ?? null);
                if (handleChange) {
                  handleChange(newValue ?? null);
                }
              }}
              value={selectedOption}
              options={options}
              getOptionLabel={(option) => String(option?.[labelOption]) || ''}
              isOptionEqualToValue={(option, value) => {
                if (!option || !value) {
                  return option === value;
                }
                return option[valueOption] === value[valueOption];
              }}
              disabled={disabled}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  placeholder={placeholder}
                  variant="outlined"
                  size="small"
                  error={!!errorMessage}
                  helperText={errorMessage}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: icon ? <InputAdornment position="start">{icon}</InputAdornment> : null,
                  }}
                  sx={{ 
                     '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: 'black !important', 
                      color: 'black !important',
                    },
                    '& .MuiInputLabel-root.Mui-disabled': {
                      color: 'rgba(0, 0, 0, 0.6) !important', // O el color que desees para el label
                    },
                  }}
                />
              )}
            />
          );
        }}
      />
    </FormControl>
  );
};

export default CustomAutocomplete;