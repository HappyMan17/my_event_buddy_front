import { type AnyAction, type Dispatch } from 'redux'
import { logout, setIsLoadingUser, setUser } from './userSlice'
import { getUser, isTokenValid } from '../../../api'
import { userMapper } from '../../../mappers/userMapper'

export const getUserById = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(setIsLoadingUser())

    const data = await getUser()

    if (!data) {
      checkUserToken()
      return
    }

    dispatch(setUser(userMapper(data.user)))
  }
}

export const checkUserToken = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    console.log({ bool: await isTokenValid() })
    if (!(await isTokenValid())) {
      dispatch(logout())
    }
  }
}
