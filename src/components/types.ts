import { type AlertColor } from '@mui/material/Alert'

export interface NavItemType {
  buttonName: string
  dropdownButtonsName?: NavItemType[]
  pageLink: string
}

export interface ImageState {
  image: string | ArrayBuffer | null
  hasBeenUploaded: boolean
}

export interface AlertObject {
  alertType: AlertColor
  message: string
}
