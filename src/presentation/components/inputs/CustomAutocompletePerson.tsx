import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, FormControl, InputAdornment } from '@mui/material';
import { Controller } from 'react-hook-form';

interface CustomAutocompleteProps {
  name: string;
  label: string;
  labelOption: string;
  valueOption: string;
  getOptions:(value:string,name:string)=>Promise<any>;
  control: any;
  icon?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  handleChange?: (data: any) => void;
}

const CustomAutocompletePerson: React.FC<CustomAutocompleteProps> = ({control,name,label,getOptions,icon,labelOption,valueOption,placeholder,disabled = false,handleChange,}) => {
  const errorMessage = control._formState?.errors[name]?.message as string | undefined;
  const [inputValue, setInputValue] = useState('');
  const [setstatFocus, setSetstatFocus] = useState(false);
  const [dynamicOptions, setDynamicOptions] = useState<any[]>([]);
  useEffect(() => {
    const fetchOptions = async () => {
      if (inputValue.length < 3) return;
      try { 
        const res = await getOptions(inputValue,name);     
        setDynamicOptions(res);
      } catch (error) {
        setDynamicOptions([]);
      }
    };
    const timeout = setTimeout(fetchOptions, 500); // debounce
    return () => clearTimeout(timeout);
  }, [inputValue,name]);

  return (
    <FormControl fullWidth error={!!errorMessage} disabled={disabled}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          //const selectedOption = options.find((option) => option?.[valueOption] === field.value) || null; 
          return (
            <Autocomplete
              {...field}
              freeSolo
              disableClearable
              blurOnSelect
              openOnFocus={false}
              inputValue={inputValue}
              onInputChange={(_, newInput) => {
                setInputValue(newInput);
                field.onChange(newInput); // Actualiza el valor con texto libre
                handleChange?.(newInput);
              }}
              onChange={(_, newValue) => {
                const valueToSet = typeof newValue === 'string'
                  ? newValue
                  : newValue?.[valueOption] ?? '';
                field.onChange(valueToSet);
                handleChange?.(newValue);
              }}
              value={field.value??''}
              options={dynamicOptions}
              getOptionLabel={(option) => {
                if (typeof option === 'string') return option;
                return String(option?.[labelOption]) || '';
              }}
              isOptionEqualToValue={(option, value) => {
                if (typeof value === 'string') return option?.[valueOption] === value;
                return option?.[valueOption] === value?.[valueOption];
              }}
              disabled={disabled}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={label}
                  placeholder={placeholder}
                  onFocus={() => {
                    console.log('Autocomplete recibió el foco');
                  }}
                  variant="outlined"
                  size="small"
                  error={!!errorMessage}
                  helperText={errorMessage}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: icon ? (
                      <InputAdornment position="start">{icon}</InputAdornment>
                    ) : null,
                  }}
                  sx={{
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: 'black !important',
                      color: 'black !important',
                    },
                    '& .MuiInputLabel-root.Mui-disabled': {
                      color: 'rgba(0, 0, 0, 0.6) !important',
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

export default CustomAutocompletePerson;