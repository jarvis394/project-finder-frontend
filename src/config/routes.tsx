import React from 'react'
import { Navigate } from 'react-router-dom'
import LoginSequence from 'src/pages/LoginSequence/index'
import Notifications from 'src/pages/Notifications'
import Profile from 'src/pages/Profile'
import Projects from 'src/pages/Projects'
import Specialists from 'src/pages/Specialists'
import Offline from 'src/pages/Offline'
import RegisterSequence from 'src/pages/RegisterSequence/index'
import ProfileEdit from 'src/pages/ProfileEdit'
import Home from 'src/pages/Home/index'

export interface Route {
  path: string
  element: React.ReactElement
  title?: string
  shouldHideInterface?: boolean
  needsAuthorization?: boolean
  alias: string
}

export const routes: Route[] = [
  {
    path: '/projects',
    element: <Projects />,
    title: 'Проекты',
    shouldHideInterface: false,
    needsAuthorization: true,
    alias: 'projects',
  },
  {
    path: '/specialists',
    element: <Specialists />,
    title: 'Специалисты',
    shouldHideInterface: false,
    needsAuthorization: true,
    alias: 'specialists',
  },
  {
    path: '/profile',
    element: <Profile />,
    title: 'Профиль',
    shouldHideInterface: false,
    needsAuthorization: true,
    alias: 'profile',
  },
  {
    path: '/notifications',
    element: <Notifications />,
    title: 'Уведомления',
    shouldHideInterface: false,
    needsAuthorization: true,
    alias: 'notifications',
  },
  {
    path: '/register',
    element: <RegisterSequence />,
    title: 'Авторизация',
    shouldHideInterface: true,
    alias: 'loginEmail',
  },
  {
    path: '/login',
    element: <LoginSequence />,
    title: 'Авторизация',
    shouldHideInterface: true,
    alias: 'login',
  },
  {
    path: '/profile/edit',
    element: <ProfileEdit />,
    title: 'Редактирование профиля',
    shouldHideInterface: true,
    needsAuthorization: true,
    alias: 'profileEdit',
  },
  {
    path: '/offline',
    element: <Offline />,
    shouldHideInterface: true,
    alias: 'offline',
  },
  {
    path: '/',
    element: <Home />,
    shouldHideInterface: true,
    alias: 'root',
  },
]
