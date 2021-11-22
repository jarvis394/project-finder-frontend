import { Route, routes } from 'src/config/routes'
import { matchRoutes } from 'react-router-dom'

const useRoute = (): Route | false => {
  const match = matchRoutes(routes, location)
  return match ? (match[0].route as Route) : false
}

export default useRoute
