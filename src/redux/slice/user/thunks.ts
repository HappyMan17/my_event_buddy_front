import { type AnyAction, type Dispatch } from 'redux'
import { logout, setIsLoadingUser, setUser } from './userSlice'
import { getUser } from '../../../api'
import { userMapper } from '../../../mappers/userMapper'

export const getUserById = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch(setIsLoadingUser())

      const data = await getUser()

      if (!data) {
        return
      }

      dispatch(setUser(userMapper(data.user)))
    } catch (error) {
      if (error === 'Expired Token') {
        dispatch(logout())
      }
    }
  }
}
