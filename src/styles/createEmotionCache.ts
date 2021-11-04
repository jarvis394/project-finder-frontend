import createCache from '@emotion/cache'
import { EMOTION_CACHE_KEY } from 'src/config/constants'

const createEmotionCache = () => createCache({ key: EMOTION_CACHE_KEY })

export default createEmotionCache
