import React from 'react'
import { styled, Typography, Button, Box } from '@mui/material'
import { CARD_MAX_WIDTH, TOP_CARD_MARGIN } from 'src/config/constants'
import { Icon16DropdownOutline } from '@vkontakte/icons'

const Topbar = styled(Button)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  minHeight: TOP_CARD_MARGIN,
  borderRadius: 0,
  padding: 0,
  width: '100%',
  zIndex: 10,
}))

const TopBarocntent = styled(Box)({
  width: '100%',
  maxWidth: CARD_MAX_WIDTH,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

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
      <TopBarocntent>
        <TobbarTitle>Выбранный проект - {project}</TobbarTitle>
        <CustomDropDownIcon />
      </TopBarocntent>
    </Topbar>
  )
}

export default React.memo(SelectedProjectTopbar)
