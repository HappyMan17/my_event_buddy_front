import axios from 'axios'
import { getFromLocal } from '../helpers'

// get users
export const get = async (url: string) => {
  let data = null
  let error = null
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getFromLocal('userToken')}`
      }
    })
    if (response.status === 200) {
      data = response.data
    } else {
      error = new Error(`Request failed with status ${response.status}`)
    }
  } catch (error) {
    throw error
  }
  return {
    data,
    error
  }
}

// creates a user
export const post = async (url: string, body: any) => {
  let data = null
  let error = null
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(url, body)
    if (response.status === 200) {
      data = response.data
    } else {
      error = new Error(`Request failed with status ${response.status}`)
    }
  } catch (error) {
    return {
      data: null,
      error: new Error('Request failed')
    }
  }
  return {
    data,
    error
  }
}

// update a user
export const put = async (url: string, body: any, hasFiles: boolean = false) => {
  let data = null
  let error = null
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.put(url, body, {
      headers: {
        'Content-Type': hasFiles ? 'multipart/form-data' : 'application/json',
        Authorization: `Bearer ${getFromLocal('userToken')}`
      }
    })
    if (response.status === 200) {
      data = response.data
    } else {
      error = new Error(`Request failed with status ${response.status}`)
    }
  } catch (error) {
    return {
      data: null,
      error: new Error('Request failed')
    }
  }
  return {
    data,
    error
  }
}
