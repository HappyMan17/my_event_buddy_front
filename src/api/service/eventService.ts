import { get, post } from '..'
import { k } from '../../helpers'
import { type Event } from '../../models'

export const getEventsByUserId = async () => {
  const url = `${k.api.BASE_URL}${k.api.GET_EVENT}`

  const { data, error } = await get(url)
  if (error != null) {
    console.log('error getting users')
    return null
  }
  return data;
}

export const createEvent = async (event: Event): Promise<any | null> => {
  const url = `${k.api.BASE_URL}${k.api.CREATE_EVENT}`
  const { data, error } = await post(url, event)
  if (error != null) {
    console.log('error creating user')
    return null
  }
  return data
}
