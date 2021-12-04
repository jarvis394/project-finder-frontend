import axios from 'axios'
import { API_URL } from 'src/config/constants'

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export * as user from './user'
export * as auth from './auth'
export { default as makeRequest } from './makeRequest'
