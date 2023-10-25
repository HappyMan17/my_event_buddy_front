import { TextField, Alert, type AlertColor } from '@mui/material'
import { FormLayout } from '../FormLayout'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { type UserUpdate, type Inputs } from '../../models'
import { useState } from 'react'
import { updateUser } from '../../api/service/userService'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../redux'
import { setUser } from '../../redux/slice/userSlice'

interface AlertObject {
  alertType: AlertColor
  message: string
}

export const ModifyProfileForm = () => {
  const { user } = useSelector((state: RootState) => state.user);
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
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const userUpdateData: UserUpdate = {
      // password: data.password,
      user_id: user?.user_id ?? '',
      user_name: data.userName,
      nick_name: data.nickName,
      profile_image: ''
    }
    // console.log({ userUpdateData })
    const response = await updateUser(userUpdateData)
    if (!response) {
      setAlertState({ message: 'User update failed. Please try again.', alertType: 'error' });
    } else {
      dispatch(setUser({ ...user!, ...userUpdateData }))
      setAlertState({ message: 'User updated successfully', alertType: 'success' });
      // navigate('/login')
    }
  }
  return (
    <FormLayout props={{ title: 'Modify Profile', buttonText: 'Save Changes', handleSubmit: handleSubmit(onSubmit) }}>
        <TextField
          error={!!errors.userName}
          margin="normal"
          required
          fullWidth
          id="userName"
          label="Name"
          type="text"
          {...register('userName', { required: 'Field required.' })}
        />
        <TextField
          error={!!errors.nickName}
          margin="normal"
          required
          fullWidth
          id="nickName"
          label="Nick Name"
          type="text"
          {...register('nickName', { required: 'Field required.' })}
        />
        {/* <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
        /> */}
        {alertState && (
          <Alert severity={alertState.alertType}>
            {alertState.message}
          </Alert>
        )}
    </FormLayout>
  );
};
