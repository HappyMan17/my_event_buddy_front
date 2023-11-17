import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type Activity } from '../../../models'
import { type AlertObject } from '../../../components/types'

interface ActivityState {
  activities: Activity[]
  isLoading: boolean
  errorMessage: AlertObject | null
}

const initialState: ActivityState = {
  activities: [],
  isLoading: false,
  errorMessage: null
}

export const activitySlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    setIsLoading: (state) => {
      state.isLoading = true
    },
    setActivityError: (state, action: PayloadAction<AlertObject>) => {
      state.isLoading = false
      state.errorMessage = action.payload
    },
    setActivity: (state, action: PayloadAction<Activity>) => {
      state.isLoading = false
      state.errorMessage = null
      const newActivityData = action.payload
      state.activities.push(newActivityData)
    },
    resetActivities: (state) => {
      state.isLoading = false
      state.activities = []
    },
    updateActivityData:(state, action: PayloadAction<Activity>) => {
      state.isLoading = false
      state.errorMessage = null

      const updatedActivityData = action.payload

      // Busca la actividad existente en el estado por su ID
      const existingActivity = state.activities.findIndex(activity => activity.activity_id === updatedActivityData.activity_id)

      // Si la actividad existe, se actualiza la información
      if (existingActivity!== -1) {
      state.activities[existingActivity] = updatedActivityData
      }
    },
  }
})

export const { setIsLoading, setActivity, setActivityError, resetActivities, updateActivityData} = activitySlice.actions

export default activitySlice.reducer
