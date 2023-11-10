import { Avatar } from '@mui/material'
import { k } from '../../helpers'
import { deepOrange } from '@mui/material/colors'

interface UserProfileImageProps {
  userImage: string | undefined
  props?: {
    width: string
    height: string
  }
}

const UserProfileImage: React.FC<UserProfileImageProps> = ({ userImage, props = {} }) => {
  const { width = '85px', height = '85px' } = props

  if (!userImage) {
    return (
      <Avatar sx={{ bgcolor: deepOrange[500], padding: 5 }}>{ 'U' }</Avatar>
    )
  }

  const profileImageUrl = `${k.api.BASE_URL}${k.api.USER_PROFILE_IMAGE}${userImage}`

  return (
    <>
      {userImage && userImage !== ''
        ? (
            <Avatar
              sx={{ width, height }}
              alt="Remy Sharp" src={profileImageUrl}
            />
          )
        : (
            <Avatar sx={{ bgcolor: deepOrange[500], padding: 5 }}>{ 'P' }</Avatar>
          )
      }
    </>
  )
}

export default UserProfileImage
