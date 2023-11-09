import { get, post, put } from '..'
import { k } from '../../helpers'
import { type Event } from '../../models'

export const getEventsByUserId = async () => {
  const url = `${k.api.BASE_URL}${k.api.GET_EVENT}`

  const { data, error } = await get(url)
  if (error != null) {
    console.log('error getting event')
    return null
  }
  return data;
}

export const createEvent = async (event: Event): Promise<any | null> => {
  const url = `${k.api.BASE_URL}${k.api.CREATE_EVENT}`
  const { data, error } = await post(url, event)
  if (error != null) {
    console.log('error creating event')
    return null
  }
  return data
}

export const updateEventLogo = async (eventId: string, file: any): Promise<any | null> => {
  const url = `${k.api.BASE_URL}${k.api.EVENT_PROFILE_IMAGE}`

  if (!file.files[0]) {
    return null
  }

  const formData = new FormData();
  // formData.append('files', { ...file.files[0], userid: user.user_id })
  formData.append('eventId', eventId)
  formData.append('files', file.files[0])

  const { data, error } = await put(url, formData, true)

  if (error !== null) {
    console.log('error updating event: ', error)
    return null
  }
  return data
}
