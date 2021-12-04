import { Route, routes } from 'src/config/routes'
import { matchRoutes, useLocation } from 'react-router-dom'

const useRoute = (): Route => {
  const location = useLocation()
  const match = matchRoutes(routes, location)
  return match ? (match[0].route as Route) : null
}

export default useRoute
