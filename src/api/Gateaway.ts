import axios from 'axios'
import { getFromLocal, k } from '../helpers'

// check jwt users
export const isTokenValid = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const url = `${k.api.BASE_URL}${k.api.GET_USER}`
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${getFromLocal('userToken')}`
      }
    })
    // console.log({ response })
    if (response.status === 401) {
      return false
    }
  } catch (error: any) {
    // console.log({ error, status: error.response.status })
    if (error.response.status === 401) {
      return false
    }
    return false
  }
  return true
}

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

// creates a user
export const post = async (url: string, body: any) => {
  let data = null
  let error = null
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post(url, body, {
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
