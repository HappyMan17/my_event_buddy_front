/* eslint-disable @typescript-eslint/naming-convention */
import { type Contact } from '../models';

export const contactMapper = (object: Record<string, any | null>): Contact | null => {
  try {
    const {
      friend_id,
      has_associated_event,
      has_pending_request,
      contact_id,
      user_name,
      nick_name,
      email,
      profile_image
    } = object;

    return {
      relationId: contact_id,
      contactId: friend_id,
      hasAssociatedEvent: has_associated_event,
      hasPendingRequests: has_pending_request,
      contactName: user_name,
      contactNickname: nick_name,
      contactEmail: email,
      contactProfileImage: profile_image
    }
  } catch (error) {
    console.log('Error mapping contact object')
    return null
  }
}
