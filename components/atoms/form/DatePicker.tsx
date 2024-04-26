import React, {FC} from 'react';
import {Box, FormHelperText, TextField} from '@mui/material';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {styled, css} from '@mui/material/styles';

import 'moment/locale/vi';
import moment from 'moment';
import {FormikContextType, useField, useFormikContext} from 'formik';

moment.updateLocale('vi', {
  months: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthsShort: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
});
const SelectInput = styled(TextField)(
  ({theme}) => css`
    height: 32.52px;
    overflow: hidden;
    svg {
      color: #3699ff;
    }
    .MuiInputBase-root {
      color: ${theme.palette.text.primary};
      color: #3699ff;
      background-color: #e1f0ff;
      border-color: transparent;
      height: 100%;
      fieldset {
        border: 0;
      }
      input {
        height: 100%;
        font-size: 0.925rem;
        font-weight: 600;
        &:before {
          display: none;
        }
      }
    }
    &.error {
      svg {
        color: red;
      }
    }
    @media (max-width: 1023px) {
      .MuiInputBase-root {
        input {
          font-size: 12px;
        }
      }
    }
  `,
);

interface Props {
  name: string;
  onChange?: any;
  error?: boolean;
  helperText?: any;
  minDate?: any;
  maxDate?: any;
  format?: string;
  views?: Array<'day' | 'month' | 'year'>;
  openTo?: 'day' | 'month' | 'year';
  isMoment?: boolean;
  maxWidth?: string;
}

const DatePickerAtoms = ({...props}: Props) => {
  const {setFieldValue, errors, touched}: FormikContextType<any> =
    useFormikContext();
  const [field] = useField(props);
  const err = errors[field.name]
  return (
<Box>
      <LocalizationProvider
        dateAdapter={AdapterMoment}
        adapterLocale="vi">
        <DatePicker
          inputFormat={props.format ?? "MM/DD/YYYY"}
          views={props.views}
          openTo={props.openTo}
          value={field.value}
          onChange={(val:any) => {
            setFieldValue(props.name, val);
          }}
          renderInput={(params:any) => <SelectInput sx={{
            width: "100%",
          }} 
          {...params} 
          className={`hidden ${errors[field.name] ? 'error' : ''}`} />
        }
          minDate={props.minDate}
          maxDate={props.maxDate}
        />
      </LocalizationProvider>
      {errors[field.name] && touched[field.name] ? 
        <FormHelperText>{err?.toString()}</FormHelperText>
        :
        <></>
      }
    </Box>

  );
};

export default DatePickerAtoms;
