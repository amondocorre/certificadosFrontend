import React from 'react';
import { createTheme, FormControl, FormHelperText, InputAdornment, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '',
        },
      },
    },
  },
});

interface CustomDatePickerProps {
  control: any;
  name: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean; // Prop para habilitar/deshabilitar
   minDate?: dayjs.Dayjs;
  maxDate?: dayjs.Dayjs; 
  sx?:{};
  onChange?: (date: dayjs.Dayjs | null) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ control, name,sx, label, icon = null, disabled = false,minDate,maxDate,onChange}) => {
  const errorMessage = control._formState.errors[name]?.message as string | undefined;
  return (
    <FormControl fullWidth error={!!control._formState.errors[name]} disabled={disabled}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <DesktopDatePicker
                {...field} 
                label={label}
                value={field.value ? dayjs(field.value) : null}
                format="DD/MM/YYYY"
                disabled={disabled}
                minDate={minDate}
                maxDate={maxDate}
                onChange={(date) => {
                  field.onChange(date); 
                  if (onChange) {
                    onChange(date);
                  }
                }}
                slotProps={{
                  textField: {
                    variant: 'outlined',
                    size: 'small',
                    error: !!control._formState.errors[name],
                    InputProps: {
                      sx:{...sx},
                      startAdornment: icon && (
                        <InputAdornment
                          position="start"
                          sx={{ color: 'action.active !important', mr: 1, display: 'flex', alignItems: 'center' }}
                        >
                          {icon}
                        </InputAdornment>
                      ),
                    },
                    InputLabelProps: {
                      shrink: true,
                    },
                    sx: {
                      ...(disabled && {
                        '& .MuiInputBase-input.Mui-disabled': {
                          WebkitTextFillColor: 'rgba(0, 0, 0, 0.65)',
                          opacity: 1,
                        },
                      }),
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </ThemeProvider>
        )}
      />
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default CustomDatePicker;