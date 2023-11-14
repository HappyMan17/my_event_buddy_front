const constants = {
  api: {
    BASE_URL: 'http://localhost:3000',
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    GET_USER: '/api/user/',
    GET_USER_BY_EMAIL: '/api/user/email/',
    UPDATE: '/api/user/update',
    UPDATE_USER_PROFILE_IMAGE: '/api/user/upload',
    USER_PROFILE_IMAGE: '/images/profile_images/',
    EVENT_LOGO: '/images/event_logos/',
    // events
    CREATE_EVENT: '/api/event/create',
    GET_EVENT: '/api/event',
    EVENT_PROFILE_IMAGE: '/api/event/upload',
    // activities
    GET_ACTIVITIES: '/api/activity/',
    CREATE_ACTIVITY: '/api/activity/create',
    UPDATE_ACTIVITIES: '/api/activity/update',
    // contacts
    USER_CONTACTS: '/api/contact/',
    CREATE_CONTACT: '/api/contact/create'
  }
}

export default constants
