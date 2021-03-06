import { SkillTagNames } from 'project-finder-backend-types'

export const API_URL = 'https://pf.stuvars.com/api/'

export const EMOTION_CACHE_KEY = 'pf'

/** App localStorage keys */
export const APP_KEYS_PREFIX = 'pf_'
export const NEEDS_UPDATE_KEY = APP_KEYS_PREFIX + 'needsUpdate'
export const ACCESS_TOKEN_KEY = APP_KEYS_PREFIX + 'accessToken'
export const REFRESH_TOKEN_KEY = APP_KEYS_PREFIX + 'refreshToken'
export const TOKEN_EXPIRE_KEY = APP_KEYS_PREFIX + 'tokenExpire'

export const BOTTOM_BAR_HEIGHT = 56
export const CHROME_ADDRESS_BAR_HEIGHT = 56
export const TOP_CARD_MARGIN = 24
export const CARD_MAX_WIDTH = 512
export const APP_MAX_WIDTH = 1000
export const BUTTON_MAX_WIDTH = 328
export const COVER_MAX_HEIGHT = 172

export const MAX_INFORMATION_LENGTH = 400
export const MIN_PASSWORD_LENGTH = 7
export const PASSWORD_SPECIAL_SYMBOLS =
  '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~0123456789'.split('')
export const LOGIN_REMOVE_SYMBOLS_REGEXP = /[^0-9A-Za-z_\-\s]+/gi

export const MAX_SKILL_TAGS_DISPLAYED = 5
export const MIN_SWIPE_WIDTH = 128
export const CIRCLE_WIDTH = 96
export const CIRCLE_ANIMATION_SCALE = 1.3

export const SKILL_TAGS: SkillTagNames[] = [
  'ReactJS',
  'Django',
  'FastAPI',
  'Express',
]
