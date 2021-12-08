import {
  TextField as MUITextField,
  TextFieldProps,
  styled,
  alpha,
} from '@mui/material'
import React from 'react'

const StyledTextField = styled(MUITextField)(({ theme }) => ({
  borderRadius: '12px',
  '& .MuiOutlinedInput-notchedOutline': {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 'inherit',
    borderColor: alpha(theme.palette.text.primary, 0.05),
  },
  '& .MuiOutlinedInput-root.MuiInputBase-root': {
    borderRadius: '12px',
  },
  '& .MuiInputBase-root:hover:not(.Mui-error) > .MuiOutlinedInput-notchedOutline':
    {
      borderColor: alpha(theme.palette.text.primary, 0.12),
    },
  '& .MuiInputBase-input': {
    padding: '12.5px 16px',
    fontSize: 16,
    borderRadius: '12px',
  },
  '& .MuiInputBase-inputMultiline': {
    padding: '0',
    borderRadius: 0,
  },
  '& .Mui-focused > .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main + ' !important',
  },
}))

const TextField: React.FC<TextFieldProps> = React.forwardRef(
  ({ ...props }, ref) => {
    return <StyledTextField fullWidth inputRef={ref} {...props} />
  }
)

export default React.memo(TextField)
