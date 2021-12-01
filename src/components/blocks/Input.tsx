import { InputBase, InputBaseProps, styled, alpha } from '@mui/material'
import React from 'react'
import { BUTTON_MAX_WIDTH } from 'src/config/constants'

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  maxWidth: BUTTON_MAX_WIDTH,
  display: 'flex',
  alignItems: 'center',
  borderRadius: 12,
  boxShadow: '0 0 0 1px inset ' + alpha(theme.palette.text.primary, 0.05),
  padding: '8px 16px',
  fontSize: 16,
  '&.Mui-focused': {
    boxShadow: '0 0 0 2px inset ' + theme.palette.primary.main,
  },
}))

const Input: React.FC<InputBaseProps> = React.forwardRef(
  ({ ...props }, ref) => {
    return (
      <StyledInputBase
        autoFocus
        fullWidth
        inputRef={ref}
        inputProps={{ 'aria-label': 'search' }}
        {...props}
      />
    )
  }
)

export default React.memo(Input)
