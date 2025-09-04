import React from 'react';
import { createTheme, FormControl, FormHelperText, InputAdornment, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers';
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

interface CustomTimePickerProps {
  control: any;
  name: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean; 
   minTime?: dayjs.Dayjs; 
  maxTime?: dayjs.Dayjs;
  minutesStep?:number; 
}

const CustomTimePicker: React.FC<CustomTimePickerProps> = ({ control, name, label, icon = null, disabled = false ,minTime, maxTime,minutesStep=5 }) => {
  const errorMessage = control._formState.errors[name]?.message as string | undefined;
  return (
    <FormControl fullWidth error={!!control._formState.errors[name]} disabled={disabled}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
              <TimePicker
                {...field}
                label={label}
                value={field.value ? dayjs(field.value) : null} 
                format="HH:mm"
                disabled={disabled} 
                minTime={minTime} 
                maxTime={maxTime} 
                //minutesStep={minutesStep}
                slotProps={{
                  textField: {
                    variant: 'outlined',
                    size: 'small',
                    InputProps: {
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

export default CustomTimePicker;