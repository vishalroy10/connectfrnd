import React from 'react';
import { FormControl, FormControlProps, Select } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@/components/atoms/typography';
import MenuItem from '@/components/atoms/popup';

interface IDropdown extends FormControlProps {
  labelText?: string;
  listData: any;
  placeholderText?: string;
  background?: boolean;
  value?: any;
  name?: string;
  helperText?: string;
  svgColor?: 'black' | 'grey';
  endAdornment?: any;
  onChange?: (arg: any) => void;
}

const Dropdown = ({
  background = false,
  placeholderText,
  listData,
  labelText,
  svgColor,
  value,
  name,
  onChange,
  endAdornment,
  ...props
}: IDropdown) => {
  return (
    <>
      <FormControl sx={{ minWidth: 120 }} {...props}>
        {labelText && (
          <Typography variant="body2" component="span" marginBottom="8px" fontWeight={500}>
            {labelText}
          </Typography>
        )}
        <Select
          sx={{
            '& .MuiSvgIcon-root': { color: svgColor ? '#1A1A1A' : '#999999' },
            '.MuiOutlinedInput-notchedOutline': {
              border: background ? 0 : '-moz-initial',
            },
          }}
          displayEmpty
          endAdornment={endAdornment}
          // defaultValue={placeholderText}
          // renderValue={value !== '' ? undefined : () => placeholderText}
          renderValue={() => value || placeholderText}
          IconComponent={(props) => <ExpandMoreIcon {...props} />}
          style={{ backgroundColor: background ? '#F0F0F0' : 'inherit' }}
          // value={value}
          MenuProps={{ sx: { '.MuiPaper-root': { borderRadius: 3 } } }}
          onChange={onChange}
          name={name}
        >
          {listData.map((item: any) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default Dropdown;
