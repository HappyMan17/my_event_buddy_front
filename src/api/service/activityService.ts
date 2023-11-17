import { get, post, put } from '..'
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

export const updateActivity = async (updatedData: any) => {
  const url = `${k.api.BASE_URL}${k.api.UPDATE_ACTIVITIES}`
  // Se realiza una solicitud para actualizar la actividad usando la función `put` (o la que corresponda).
  const { data, error } = await put(url, updatedData)

  // Se verifica si hubo algún error en la solicitud.
  if (error !== null) {
    console.log('error updating activity')
    return null
  }

  // Si no hay errores, se devuelve la data obtenida de la solicitud.
  return data;
}
