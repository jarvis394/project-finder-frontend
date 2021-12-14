import React from 'react'
import { Box, styled, Typography, Button } from '@mui/material'
import { CARD_MAX_WIDTH } from 'src/config/constants'
import { Icon16DropdownOutline } from '@vkontakte/icons'

const Topbar = styled(Button)(({ theme }) => ({
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: 0,
  minHeight: 24,
  borderRadius: 0,
  padding: 0,
  width: '100%',
  maxWidth: CARD_MAX_WIDTH,
  zIndex: 10,
}))

const TobbarTitle = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontSize: theme.spacing(1.75),
  fontWeight: 500,
  textAlign: 'center',
}))

const CustomDropDownIcon = styled(Icon16DropdownOutline)(({ theme }) => ({
  color: '#ffffff',
  marginLeft: theme.spacing(1),
}))

type SelectedProjectTopbar = {
  project: string
  onClick: () => void
}

const SelectedProjectTopbar: React.FC<SelectedProjectTopbar> = ({
  project,
  onClick,
}) => {
  return (
    <Topbar onClick={onClick} fullWidth variant="contained" color="secondary">
      <TobbarTitle>Выбранный проект - {project}</TobbarTitle>
      <CustomDropDownIcon />
    </Topbar>
  )
}

export default React.memo(SelectedProjectTopbar)