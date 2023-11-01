import { get, post } from '..'
import { k } from '../../helpers'
import { type Activity } from '../../models'

export const getActivitiesByEvent = async (eventId: string) => {
  const url = `${k.api.BASE_URL}${k.api.GET_ACTIVITIES}${eventId}`

  const { data, error } = await get(url)
  if (error !== null) {
    console.log('error getting activities')
    return null
  }
  return data;
}

export const createActivity = async (activity: Activity): Promise<any | null> => {
  const url = `${k.api.BASE_URL}${k.api.CREATE_ACTIVITY}`
  const { data, error } = await post(url, activity)
  if (error !== null) {
    console.log('error creating activity')
    return null
  }
  return data
}
