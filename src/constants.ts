export const BASE_URL = import.meta.env.VITE_BASE_URL
export const LOGIN_URL = `${BASE_URL}/api/users/login/`
export const LOGOUT_URL = `${BASE_URL}/api/users/logout/`
export const FORGOT_PASSWORD_URL = `${BASE_URL}/api/users/reset-password/`
export const USER_URL = `${BASE_URL}/api/users/`
export const CHANGE_PASSWORD_URL = `${BASE_URL}/api/users/change-password/`
export const WARD_URL = `${BASE_URL}/api/settings/wards/`
export const USER_PROFILE_URL = `${BASE_URL}/api/users/profile/`
export const MASTER_SETTINGS_BASE_URL = `${BASE_URL}/api/settings`
export const PROJECTS_URL = `${BASE_URL}/api/projects`
export const START_PROJECT_URL = (id: number) => `${PROJECTS_URL}/${id}/start-project/`
export const COMMITTEE_DESCRIPTION_URL = (id: number) =>
  `${PROJECTS_URL}/${id}/committee_description/`

export const DEFAULT_PAGE_SIZE = 10
export const DEBOUNCE_MS = 500

/** Step Codes */

export const StepCode = {
  COST_ESTIMATE_STEP_CODE: 100,
  USER_COMMITTEE_STEP_CODE: 200,
  PROJECT_CONTRACT: 300,
  //TODO: Please suggest appropriate name
  PROJECT_CONTRACT_OTHER: 400,
  PROJECT_PAYMENT_FIRST: 500,
  PROJECT_PAYMENT_SECOND: 600,
  PROJECT_PAYMENT_LAST: 700,
  PROJECT_PAYMENT_DETAILS: 800,
  OTHER_DOCUMENTS: 900,
  OTHER_DOCUMENTS_UPLOADED: 1000,
  EXTENDED_TIMELINE: 1100,
} as const

export const HttpStatusCode = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
} as const

/** constant messages */
export const PAGE_TITLE = 'योजना व्यवस्थापन प्रणाली'
export const PAGE_SUBTITLE = 'ललितपुर महानगरपालिकाको कार्यलय'
export const SETTINGS_ALERT_INFO =
  'यसलाई इडिट गर्नाले हरेक सम्बन्धित परियोजनालाई असर गर्नेछ।'

export const PROJECT_STATUS = {
  STARTED: 'started',
  COMPLETED: 'completed',
  METHOD_SET: 'method_set',
  NOT_STARTED: 'not_started',
}
