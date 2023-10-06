import { k } from '.'
import { get, put } from '../api'
import { type User } from './types'

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
  const { data, error } = await put(url, user)
  if (error != null) {
    console.log('error creating user')
    return null
  }
  return data
}
