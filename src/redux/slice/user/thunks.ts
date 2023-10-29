import { type AnyAction, type Dispatch } from 'redux'
import { setIsLoadingUser, setUser } from './userSlice'
import { getUser } from '../../../api'
import { userMapper } from '../../../mappers/userMapper'

export const getUserById = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoadingUser())

    const data = await getUser()

    if (!data) {
      return
    }

    dispatch(setUser(userMapper(data.user)))
  }
}
