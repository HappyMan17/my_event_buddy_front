import { type AnyAction, type Dispatch } from '@reduxjs/toolkit'
import { resetActivities, resetActivityContact, setActivity, setActivityError, setIsLoading, setActivityContact, updateActivityData } from './activitySlice'
import { createActivity, getActivitiesByEvent, updateActivity as updateActivityApi, getActivityContactsById } from '../../../api'
import { activityMapper } from '../../../mappers/'
import { type ActivityUpdate, type Activity, type ActivityId, type ActivityContact } from '../../../models'

export const getActivities = (eventId: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoading())

    const data = await getActivitiesByEvent(eventId)

    if (!data) {
      dispatch(resetActivities())
      return
    }
    dispatch(resetActivities())
    // eslint-disable-next-line array-callback-return
    void data.activities.map((activity: Activity) => {
      const newActivity = activityMapper(activity)
      dispatch(setActivity(newActivity))
    })
  }
}

export const getActivityContact = (object: ActivityId) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoading())

    const data = await getActivityContactsById(object)

    if (!data) {
      dispatch(resetActivityContact())
      return
    }
    dispatch(resetActivityContact())
    // eslint-disable-next-line array-callback-return
    void data.event.map((eventContact: ActivityContact) => {
      dispatch(setActivityContact(eventContact))
    })
  }
}

export const createNewActivity = (newActivity: Activity) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoading())

    const data = await createActivity(newActivity)

    if (!data) {
      dispatch(setActivityError({ message: 'Activity not created. Please try again.', alertType: 'error' }))
      return
    }
    // console.log({ data, act: data.activity })

    dispatch(setActivity(activityMapper(data.activity)))
    dispatch(setActivityError({ message: 'Activity created.', alertType: 'success' }))
  }
}

export const updateActivity = (updatedData: ActivityUpdate) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoading())

    // Realiza una llamada a la API para actualizar la actividad
    const data = await updateActivityApi(updatedData);

    // Si no se recibe algo inidca un error
    if (!data) {
      dispatch(setActivityError({ message: 'Activity not updated. Please try again.', alertType: 'error' }));
      return;
    }

    dispatch(updateActivityData(data.activity));
    dispatch(setActivityError({ message: 'Activity updated.', alertType: 'success' }));
  }
}
