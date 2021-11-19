import { Route, routes } from 'src/config/routes'
import { matchRoutes } from 'react-router-dom'

const useRoute = () => {
  const match = matchRoutes(routes, location)
  return match[0].route as Route
}

export default useRoute
