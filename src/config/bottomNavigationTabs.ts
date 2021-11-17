import React from 'react'
import { Icon28Cards2Outline } from '@vkontakte/icons'
import { Icon28FaceRecognitionOutline } from '@vkontakte/icons'
import { Icon28Profile } from '@vkontakte/icons'
import { Icon28Notifications } from '@vkontakte/icons'

export interface BottomNavigationTab {
  label: string
  icon: React.FC
}

const bottomNavigationTabs: BottomNavigationTab[] = [
  {
    label: 'Проекты',
    icon: Icon28Cards2Outline,
  },
  {
    label: 'Специалисты',
    icon: Icon28FaceRecognitionOutline,
  },
  {
    label: 'Профиль',
    icon: Icon28Profile,
  },
  {
    label: 'Уведомления',
    icon: Icon28Notifications,
  },
]

export default bottomNavigationTabs