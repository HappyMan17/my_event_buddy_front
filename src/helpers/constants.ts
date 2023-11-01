const constants = {
  api: {
    BASE_URL: 'http://localhost:3000',
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    GET_USER: '/api/user/',
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
    CREATE_ACTIVITY: '/api/activity/create'
  }
}

export default constants
