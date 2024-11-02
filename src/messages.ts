export const validateMessages = {
  default: 'यो विवरण मान्य छैन',
  required: 'कृपया ${label} प्रविष्ट गर्नुहोस्',
  whitespace: '${label} खाली हुन सक्दैन',
  types: {
    number: 'यो विवरणमा संख्या हुनु पर्छ',
    date: 'यो विवरणमा मान्य मिति हुनु पर्छ',
    email: 'यो विवरणमा मान्य इमेल हुनु पर्छ',
    url: 'यो विवरणमा मान्य URL हुनु पर्छ',
  },
  number: {
    min: 'यस विवरणमा ${min} भन्दा कम संख्या हुँदैन',
    max: 'यस विवरणमा ${max} भन्दा धेरै संख्या हुँदैन',
    range: 'यस विवरणमा संख्या ${min}-${max} को बीचमा हुनुपर्छ',
  },
  date: {
    format: 'यस विवरणको  मिति ढाँचा मान्य छैन',
    parse: 'यस विवरणको मितिलाई रूपान्तरण गर्न सकिएन',
    invalid: 'यस विवरणको मिति मान्य छैन',
  },
  pattern: {
    mismatch: '${label} यो ढाँचासँग मेल खाँदैन: ${pattern}',
  },
}

/**
 * Displays certain messages.
 * @param field - accepts string value
 */
// TODO: remove getEmptyFieldMessage
export const getEmptyFieldMessage = (field: string) =>
  `कृपया ${field} प्रविष्ट गर्नुहोस्।`
export const addDataSuccessMessage = (field: string) =>
  `${field} सफलतापूर्वक सूचीमा समावेश गरियो।`
export const editDataSuccessMessage = (field: string) =>
  `${field} सम्बन्धित विवरण ईडिट गरियो।`
export const formStatusMessage = (field: string) =>
  `${field} सक्रिय वा निष्क्रिय गर्नुहोस्।`

/** Reusable generic message. */
export const RESPONSE_ERROR =
  'तपाईको प्रयास सफल हुन सकेन। कृपया केहि समय पछि पुन: प्रयास गर्नुहोस्।'
export const PAGE_NOT_FOUND =
  'माफ गर्नुहोस्। तपाईंले भ्रमण गर्नुभएको पृष्ठ अवस्थित छैन।'
export const INVALID_CREDENTIALS =
  'प्रयोगकर्ताको विवरण मेल खाएन। कृपया आफ्नो विवरणहरू जाँच गरी पुन: प्रयास गर्नुहोस्।'
export const TOKEN_EXPIRED =
  'प्रणाली पहुँच गर्ने अधिकतम समय समाप्त भएको छ। कृपया आफ्नो विवरण पुन: प्रविष्ट गर्नुहोस् ।'
export const DATA_NOT_AVAILABLE = 'अहिले कुनै डाटा उपलब्ध छैन।'

/** Messages related to login. */
export const LOGIN_SUCCESS = 'तपाईको लगइन सफल भयो।'
export const LOGIN_FAILED = 'लगइन असफल भयो। कृपया पुन: प्रयास गर्नुहोस्।'
export const LOGOUT_SUCCESS = 'तपाईं प्रणालिबाट लग आउट हुनु भएको छ।'

/** Messages related to forgot/reset password. */
export const FORGOT_PASSWORD_DESCRIPTION =
  'आफ्नो पासवर्ड रिसेट गर्न तलको इनपुट बक्समा आफ्नो इमेल प्रविष्ट गर्नुहोस।'
export const PASSWORD_RESET_SUCCESS =
  'तपाईको पासवर्ड सफलतापूर्वक रिसेट गरिएको छ। कृपया थप प्रक्रियाको लागि आफ्नो इमेल जाँच गर्नुहोस्।'
export const PASSWORD_CHANGE_SUCCESS = 'तपाईको पासवर्ड सफलतापूर्वक परिवर्तन गरिएको छ।'
export const PASSWORD_RESET_FAILED =
  'पासवर्ड रिसेट असफल भयो। कृपया प्रयोग गरिएको पासवर्ड जाँच गरी पुनः प्रयास गर्नुहोस्।'
export const RESET_PASSWORD_ALERT_INFO =
  'सुरक्षित पासवर्ड छनौट गर्नका लागी कम्तिमा 8 अक्षरको पासवर्ड छनोट गर्नुहोस्।'
export const CHANGE_PASSWORD_MODAL_TITLE = 'पासवर्ड परिवर्तन गर्नुहोस्'
export const CURRENT_PASSWORD = 'कृपया हालको पासवर्ड प्रविष्ट गर्नुहोस्'
export const NEW_PASSWORD_TEXT = 'कृपया नयाँ पासवर्ड प्रविष्ट गर्नुहोस्'
export const NEW_PASSWORD_CONFIRM_TEXT = 'कृपया नयाँ पासवर्ड प्रविष्ट गर्नुहोस्'
export const NEW_PASSWORD_CONFIRM_ERROR =
  'तपाईंले प्रविष्ट गर्नुभएको नयाँ पासवर्ड एकअर्कासँग मेल खाँदैन'

/** Messages related to users. */
export const USER_DELETE_SUCCESS = 'प्रयोगकर्ता यस सफ्टवेयरबाट सफलतापूर्वक हटाइयो।'
export const USER_ADD_SUCCESS = 'नयाँ प्रयोगकर्ता यस सफ्टवेयरमा समावेश गरियो।'
export const USER_EDIT_SUCCESS = 'प्रयोगकर्ता सम्बन्धित विवरण ईडिट गरियो ।'

/** Messages related to projects */
export const PROJECT_DELETE_SUCCESS =
  'योजना तथा कार्यक्रम यस सूचीबाट सफलतापूर्वक हटाइयो।'
export const PROJECT_ADD_SUCCESS =
  'नयाँ योजना तथा कार्यक्रम यस सफ्टवेयरमा समावेश गरियो।'
export const PROJECT_EDIT_SUCCESS = 'योजना तथा कार्यक्रम सम्बन्धित विवरण ईडिट गरियो।'

/** Messages related to user profile. */
export const PROFILE_PICTURE_EDIT_SUCCESS = 'प्रयोगकर्ताको फोटो परिवर्तन सफल भयो।'
export const PROFILE_EDIT_NO_CHANGE = 'विवरणमा कुनै परिवर्तन गरिएको छैन।'
export const PROFILE_EDIT_SUCCESS =
  'प्रयोगकर्ता सम्बन्धित विवरण सफलतापूर्वक परिवर्तन गरियो।'

/** Messages related to start-project form */
export const PROJECT_START_SUCCESS =
  '"उपभोक्त समिति गठन", "योजना सम्झौता" र "किस्ता भुक्तानी सम्बन्धी" सफलतापूर्वक सक्षम गरियो।'
export const PROJECT_ALREADY_STARTED =
  'उपभोक्त समिति गठन" र "योजना सम्झौता" पहिले नै सक्षम गरिएको छ'
export const START_PROJECT_CHECKBOX_ERROR =
  'कृपया "उपभोक्ता समिति मार्फत" चयन गर्नुहोस्'
export const START_PROJECT_INPUTBOX = 'कृपया अगाडि बढ्न "confirm" टाइप गर्नुहोस्'
