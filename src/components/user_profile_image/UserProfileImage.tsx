import { Avatar } from '@mui/material'
import { k } from '../../helpers'
import { type User } from '../../models'
import { deepOrange } from '@mui/material/colors'

interface UserProfileImageProps {
  user: User | null
  props?: {
    width: string
    height: string
  }
}

const UserProfileImage: React.FC<UserProfileImageProps> = ({ user, props = {} }) => {
  const { width = '85px', height = '85px' } = props

  if (!user) {
    return (
      <Avatar sx={{ bgcolor: deepOrange[500], padding: 5 }}>{ 'U' }</Avatar>
    )
  }

  const profileImageUrl = `${k.api.BASE_URL}${k.api.USER_PROFILE_IMAGE}${user.profile_image}`

  return (
    <>
      {user.profile_image && user.profile_image !== ''
        ? (
            <Avatar
              sx={{ width, height }}
              alt="Remy Sharp" src={profileImageUrl}
            />
          )
        : (
            <Avatar sx={{ bgcolor: deepOrange[500], padding: 5 }}>{ user.nick_name.at(0) ?? 'P' }</Avatar>
          )
      }
    </>
  )
}

export default UserProfileImage
