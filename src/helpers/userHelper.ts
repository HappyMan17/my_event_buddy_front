import { k } from '.'
import { get, post } from '../api'
import { type LoginUser, type User } from './types'

export const getAllUsers = async () => {
  const url = `${k.api.BASE_URL}/api/auth/all`
  const { data, error } = await get(url)
  if (error != null) {
    console.log('error getting users')
    return null
  }
  return data;
}

export const createUser = async (user: User): Promise<any | null> => {
  const url = `${k.api.BASE_URL}${k.api.REGISTER}`
  const { data, error } = await post(url, user)
  if (error != null) {
    console.log('error creating user')
    return null
  }
  return data
}

export const loginUser = async (user: LoginUser): Promise<any | null> => {
  const url = `${k.api.BASE_URL}${k.api.LOGIN}`
  const { data, error } = await post(url, user)
  if (error != null) {
    console.log('error login user')
    return null
  }
  return data
}
