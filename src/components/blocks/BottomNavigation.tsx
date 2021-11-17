import {
  Paper,
  BottomNavigation as BottomNavigationMaterialUnstyled,
  BottomNavigationAction as BottomNavigationMaterialActionUnstyled,
} from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import React, { useState } from 'react'
import bottomNavigationTabs from 'src/config/bottomNavigationTabs'
import { BOTTOM_BAR_HEIGHT } from 'src/config/constants'

const Offset = styled('div')({ height: BOTTOM_BAR_HEIGHT })
const BottomNavigationPaper = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  zIndex: theme.zIndex.appBar,
  width: '100%',
  willChange: 'transform',
  boxShadow: '0 1px 12px 0 ' + alpha('#000000', 0.05),
}))
const BottomNavigationMaterial = styled(BottomNavigationMaterialUnstyled)(
  ({ theme }) => ({
    background: theme.palette.background.paper,
    height: BOTTOM_BAR_HEIGHT,
    paddingBottom: 'env(safe-area-inset-bottom, 0)',
  })
)
const BottomNavigationMaterialAction = styled(
  BottomNavigationMaterialActionUnstyled
)(({ theme }) => ({
  fontWeight: 500,
  padding: '4px 12px 3px !important',
  color: alpha(theme.palette.text.primary, 0.39),
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
  '&.Mui-selected > .label': {
    fontSize: '12px !important',
  },
}))
const BottomNavigationActionRoot = styled('div')({
  width: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  marginBottom: 3,
})
const BottomNavigationActionBackdrop = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: 50,
  height: 32,
  backgroundColor: theme.palette.primary.main,
  borderRadius: 8,
  opacity: 0,
  transform: 'scale(0.8) translateY(3px)',
  transitionDuration: '0.2s',
  transitionTimingFunction: 'cubic-bezier(0, 0.88, 0.21, 1)',
  '&.selected': {
    transform: 'scale(1)',
    opacity: 0.17,
  },
}))

const BottomNavigationActionIconUnmemoized: React.FC<{
  icon: React.FC
  selected: boolean
}> = ({ icon: Icon, selected }) => {
  return (
    <BottomNavigationActionRoot>
      <Icon />
      <BottomNavigationActionBackdrop className={selected ? 'selected' : ''} />
    </BottomNavigationActionRoot>
  )
}
const BottomNavigationActionIcon = React.memo(
  BottomNavigationActionIconUnmemoized
)

const BottomNavigation = () => {
  const [value, setValue] = useState<number>(0)
  const handleChange = (
    _event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setValue(newValue)
  }

  return (
    <>
      <BottomNavigationPaper>
        <BottomNavigationMaterial
          value={value}
          onChange={handleChange}
          showLabels
        >
          {bottomNavigationTabs.map((e, i) => (
            <BottomNavigationMaterialAction
              key={i}
              classes={{ label: 'label' }}
              label={e.label}
              icon={
                <BottomNavigationActionIcon
                  selected={i === value}
                  icon={e.icon}
                />
              }
              sx={{
                fontFamily: 'Google Sans',
                fontSize: 12,
              }}
              // onClick={() => go(e)}
            />
          ))}
        </BottomNavigationMaterial>
      </BottomNavigationPaper>
      <Offset />
    </>
  )
}

export default React.memo(BottomNavigation)
