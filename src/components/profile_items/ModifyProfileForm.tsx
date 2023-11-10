import { TextField, Alert, Button } from '@mui/material'
import { FormLayout } from '../FormLayout'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { type UserUpdate, type Inputs } from '../../models'
import { useState } from 'react'
import { updateUser, updateUserProfileImage } from '../../api/service/userService'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../redux'
import { setUser } from '../../redux/slice/user/userSlice'
import { UserProfileImage } from '..'
import { type AlertObject } from '../types'
import { useTranslation } from 'react-i18next';
// import { type ImageState } from '../types'

const ModifyProfileForm = () => {
  const { user, isLoading } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    defaultValues: {
      userName: user?.user_name,
      nickName: user?.nick_name
    }
  })

  const [alertState, setAlertState] = useState<AlertObject | null>(null);

  const { t } = useTranslation();

  const handleUploadClick = () => {
    // show modal with the image
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const userUpdateData: UserUpdate = {
      user_id: user?.user_id ?? '',
      user_name: data.userName,
      nick_name: data.nickName,
      profile_image: ''
    }
    const files = document.getElementById('profileImage')

    const response = await updateUser(userUpdateData)
    if (!response) {
      setAlertState({ message: (t('update_account_error')), alertType: 'error' });
    } else {
      const imageResponse = await updateUserProfileImage(userUpdateData, files)
      if (!imageResponse) {
        // console.log({ ms: (t('image_error')) })
        dispatch(setUser({ ...user!, ...userUpdateData }))
      } else {
        dispatch(setUser({ ...user!, ...userUpdateData, profile_image: imageResponse.profile_image }))
      }
      setAlertState({ message: (t('update_account_successfully')), alertType: 'success' });
      // navigate('/login')
    }
  }

  return (
    <FormLayout props={{ title: (t('modify_account')), buttonText: (t('button_save')), handleSubmit: handleSubmit(onSubmit), isLoading }}>
      <Button
        variant='contained'
        onClick={handleUploadClick}
        sx={{ width: '80px', height: '80px', borderRadius: 10, backgroundColor: 'transparent', margin: 3 }}
      >
        <UserProfileImage userImage={user?.profile_image} />
      </Button>
      <TextField
        error={!!errors.userName}
        margin="normal"
        required
        fullWidth
        id="userName"
        label={t('name')}
        type="text"
        {...register('userName', { required: (t('field_required')) })}
      />
      <TextField
        error={!!errors.nickName}
        margin="normal"
        required
        fullWidth
        id="nickName"
        label={t('nick_name')}
        type="text"
        {...register('nickName', { required: (t('field_required')) })}
      />
      <TextField
          id="profileImage"
          margin="normal"
          fullWidth
          type="file"
      />
      {alertState && (
        <Alert severity={alertState.alertType}>
          {alertState.message}
        </Alert>
      )}
    </FormLayout>
  );
};

export default ModifyProfileForm;
