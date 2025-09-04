import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, InputAdornment } from '@mui/material';
import { Controller } from 'react-hook-form';

interface CustomSelectProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  control: any;
  icon?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean; 
  onChange?: (data: any,name:string) => void;
}
const CustomSelect: React.FC<CustomSelectProps> = ({control,name,label,options,icon,placeholder,disabled = false,onChange }) => {
  const errorMessage = control._formState.errors[name]?.message as string | undefined;
  return (
    <FormControl fullWidth error={!!control._formState.errors[name]} disabled={disabled}>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            labelId={`${name}-label`}
            id={name}
            label={label}
            size="small"
            variant="outlined"
            startAdornment={icon ? <InputAdornment position="start">{icon}</InputAdornment> : null}
            displayEmpty
            disabled={disabled} 
            onChange={(event) => {
              field.onChange(event); onChange?.(event.target.value, field.name);
            }}
            sx={{
              ...(disabled && {
                '& .MuiSelect-select.Mui-disabled': {
                  WebkitTextFillColor: 'rgba(0, 0, 0, 0.65)', 
                  opacity: 1,
                },
              }),
            }}
          >
            {placeholder && (
              <MenuItem disabled value="">
                <em>{placeholder}</em>
              </MenuItem>
            )}
            {options.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default CustomSelect;