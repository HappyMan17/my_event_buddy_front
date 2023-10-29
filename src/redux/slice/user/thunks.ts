import { type AnyAction, type Dispatch } from 'redux'
import { setIsLoadingUser } from './userSlice'

export const getUserById = () => {
  return async (dispatch: Dispatch<AnyAction>, getState) => {
    dispatch(setIsLoadingUser())
    // todo http request
    // dispatch(setUser(data))
  }
}
