import React from 'react'
import { Navigate } from 'react-router-dom'
import StepLoginForm from 'src/pages/Login/index'
import Notifications from 'src/pages/Notifications'
import Profile from 'src/pages/Profile'
import Projects from 'src/pages/Projects'
import Specialists from 'src/pages/Specialists'

export interface Route {
  path: string
  element: React.ReactElement
  title?: string
  shouldHideInterface?: boolean
  alias: string
}

export const routes: Route[] = [
  {
    path: '/projects',
    element: <Projects />,
    title: 'Проекты',
    shouldHideInterface: false,
    alias: 'projects',
  },
  {
    path: '/specialists',
    element: <Specialists />,
    title: 'Специалисты',
    shouldHideInterface: false,
    alias: 'specialists',
  },
  {
    path: '/profile',
    element: <Profile />,
    title: 'Профиль',
    shouldHideInterface: false,
    alias: 'profile',
  },
  {
    path: '/notifications',
    element: <Notifications />,
    title: 'Уведомления',
    shouldHideInterface: false,
    alias: 'notifications',
  },
  {
    path: '/login',
    element: <StepLoginForm step="login" />,
    title: 'Авторизация',
    shouldHideInterface: true,
    alias: 'loginEmail',
  },
  {
    path: '/login/password',
    element: <StepLoginForm step="password" />,
    title: 'Авторизация',
    shouldHideInterface: true,
    alias: 'loginPassword',
  },
  {
    path: '/',
    element: <Navigate replace to="/projects" />,
    shouldHideInterface: false,
    alias: 'root'
  }
]