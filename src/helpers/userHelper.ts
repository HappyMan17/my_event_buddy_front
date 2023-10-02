import { k } from '.'
import { get, put } from '../api'
import { type User } from './types'

export const getAllUsers = async () => {
  const url = `${k.api.BASE_URL}/api/auth/all`
  const { data, error } = await get(url)
  return {
    data,
    error
  }
}

export const createUser = async (user: User) => {
  const url = `${k.api.BASE_URL}${k.api.REGISTER}`
  const { data, error } = await put(url, user)
  if (error != null) {
    console.log('error creating user')
    return null
  }
  return data
}
