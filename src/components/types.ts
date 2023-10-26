export interface NavItemType {
  buttonName: string
  dropdownButtonsName?: NavItemType[]
  pageLink: string
}

export interface ImageState {
  image: string | ArrayBuffer | null
  hasBeenUploaded: boolean
}
