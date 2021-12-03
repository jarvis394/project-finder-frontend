import React from 'react'
import { Icon28Cards2Outline } from '@vkontakte/icons'
import { Icon28FaceRecognitionOutline } from '@vkontakte/icons'
import { Icon28Profile } from '@vkontakte/icons'
import { Icon28Notifications } from '@vkontakte/icons'
import { Route } from './routes'

export interface BottomNavigationTab {
  label: string
  icon: React.FC
  to: string
  route: Route['alias']
}

const bottomNavigationTabs: BottomNavigationTab[] = [
  {
    label: 'Проекты',
    icon: Icon28Cards2Outline,
    to: '/projects',
    route: 'projects',
  },
  {
    label: 'Специалисты',
    icon: Icon28FaceRecognitionOutline,
    to: '/specialists',
    route: 'specialists',
  },
  {
    label: 'Профиль',
    icon: Icon28Profile,
    to: '/profile',
    route: 'profile'
  },
  {
    label: 'Уведомления',
    icon: Icon28Notifications,
    to: '/notifications',
    route: 'notifications'
  },
]

export default bottomNavigationTabs
