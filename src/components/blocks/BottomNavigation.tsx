import {
  Paper,
  BottomNavigation as BottomNavigationMaterialUnstyled,
  BottomNavigationAction as BottomNavigationMaterialActionUnstyled,
} from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import React, { useEffect, useMemo, useState } from 'react'
import bottomNavigationTabs from 'src/config/bottomNavigationTabs'
import { BOTTOM_BAR_HEIGHT } from 'src/config/constants'
import { Link } from 'react-router-dom'
import { useRoute } from 'src/hooks'
import { Route } from 'src/config/routes'

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
  transitionDuration: '0.2s !important',
  transitionDelay: '0.05s',
  transitionProperty: 'all',
  '&.Mui-selected': {
    transitionDelay: '0s',
    color: theme.palette.primary.main,
  },
  '&.Mui-selected:active': {
    color: alpha(theme.palette.primary.main, 0.7),
  },
  '&.Mui-selected > .label': {
    fontSize: '12px !important',
  },
  '& .label': {
    fontFamily: 'Google Sans !important',
  },
  '&:active': {
    color: alpha(theme.palette.text.primary, 0.26),
    transform: 'scale(0.9)',
  },
}))
const BottomNavigationActionRoot = styled('div')({
  width: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  marginBottom: 2,
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
const matchRoute = (route: Route) => {
  return route
    ? bottomNavigationTabs.findIndex((e) => e.route === route.alias)
    : -1
}

const BottomNavigation = () => {
  const route = useRoute()
  const value = useMemo(() => matchRoute(route), [route])
  const shouldHide = useMemo(
    () => !route || route?.shouldHideInterface || value < 0,
    [route, value]
  )

  if (shouldHide) return null

  return (
    <>
      <BottomNavigationPaper>
        <BottomNavigationMaterial value={value} showLabels>
          {bottomNavigationTabs.map((e, i) => (
            <BottomNavigationMaterialAction
              key={i}
              disableRipple
              classes={{ label: 'label' }}
              label={e.label}
              LinkComponent={Link}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              to={e.to}
              icon={
                <BottomNavigationActionIcon
                  selected={i === value}
                  icon={e.icon}
                />
              }
            />
          ))}
        </BottomNavigationMaterial>
      </BottomNavigationPaper>
      <Offset />
    </>
  )
}

export default React.memo(BottomNavigation)
