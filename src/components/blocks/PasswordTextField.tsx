import { VisibilityRounded, VisibilityOffRounded } from '@mui/icons-material'
import { IconButton, TextFieldProps } from '@mui/material'
import { alpha } from '@mui/system'
import React from 'react'
import TextField from './TextField'
import ToggleButton from 'material-ui-toggle-icon'

const PasswordTextField: React.FC<TextFieldProps> = React.forwardRef(
  ({ InputProps, inputRef, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const handleShowPasswordClick = () => setShowPassword((prev) => !prev)

    return (
      <TextField
        inputRef={inputRef || ref}
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          ...InputProps,
          endAdornment: (
            <IconButton
              sx={{ color: (theme) => alpha(theme.palette.text.primary, 0.39) }}
              onClick={handleShowPasswordClick}
            >
              <ToggleButton
                on={showPassword}
                onIcon={<VisibilityRounded />}
                offIcon={<VisibilityOffRounded />}
              />
            </IconButton>
          ),
        }}
        {...props}
      />
    )
  }
)

export default PasswordTextField
