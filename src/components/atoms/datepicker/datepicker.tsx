import React from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

interface dateProps {
  value: Dayjs;
  name: string;
  error?: boolean;
  onChange: (date: Dayjs | null) => void;
  disableFuture?: boolean;
  maxDate?: Dayjs;
  disabledKeyboardNavigation?: boolean;
  placeholder?: string
}

const DateTimePicker = (props: dateProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem>
        <DatePicker {...props} format="MMMM DD,YYYY" sx={{ background: '#fff', borderRadius: '100px' }} />
      </DemoItem>
    </LocalizationProvider>
  );
};
export default DateTimePicker;
