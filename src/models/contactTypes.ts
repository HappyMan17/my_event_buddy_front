export interface Contact {
  relationId: string
  contactId: string
  hasAssociatedEvent: boolean
  hasPendingRequests: boolean
  contactName?: string
  contactNickname?: string
  contactEmail?: string
  contactProfileImage?: string
}
