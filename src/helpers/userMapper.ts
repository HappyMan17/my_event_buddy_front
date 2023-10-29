import { type User } from '../models';

export const userMapper = (object: Record<string, any | null>): User => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { user_id, user_name, nick_name, profile_image, email } = object

  return {
    user_id,
    user_name,
    nick_name,
    profile_image,
    email,
    password: ''
  }
}
