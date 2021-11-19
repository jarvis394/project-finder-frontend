import React from 'react'
import { Icon28Cards2Outline } from '@vkontakte/icons'
import { Icon28FaceRecognitionOutline } from '@vkontakte/icons'
import { Icon28Profile } from '@vkontakte/icons'
import { Icon28Notifications } from '@vkontakte/icons'

export interface BottomNavigationTab {
  label: string
  icon: React.FC
  to: string
}

const bottomNavigationTabs: BottomNavigationTab[] = [
  {
    label: 'Проекты',
    icon: Icon28Cards2Outline,
    to: '/projects',
  },
  {
    label: 'Специалисты',
    icon: Icon28FaceRecognitionOutline,
    to: '/specialists',
  },
  {
    label: 'Профиль',
    icon: Icon28Profile,
    to: '/profile',
  },
  {
    label: 'Уведомления',
    icon: Icon28Notifications,
    to: '/notifications',
  },
]

export default bottomNavigationTabs
