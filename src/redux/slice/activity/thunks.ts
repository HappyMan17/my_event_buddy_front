import { type AnyAction, type Dispatch } from '@reduxjs/toolkit'
import { resetActivities, setActivity, setActivityError, setIsLoading } from './activitySlice'
import { createActivity, getActivitiesByEvent } from '../../../api'
import { activityMapper } from '../../../mappers/'
import { type Activity } from '../../../models'

export const getActivities = (eventId: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoading())
    console.log({ eventId })
    const data = await getActivitiesByEvent(eventId)

    if (!data) {
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

export const createNewActivity = (newActivity: Activity) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoading())

    const data = await createActivity(newActivity)

    if (!data) {
      dispatch(setActivityError({ message: 'Activity not created. Please try again.', alertType: 'error' }))
      return
    }
    console.log({ data, act: data.activity })

    dispatch(setActivity(activityMapper(data.activity)))
    dispatch(setActivityError({ message: 'Activity created.', alertType: 'success' }))
  }
}
