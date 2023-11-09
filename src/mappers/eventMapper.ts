import { type Event } from '../models'

export const eventMapper = (object: Record<string, any | null>): Event => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { event_id, event_date, user_id, event_name, description, type, logo, has_activity } = object

  return {
    event_id,
    event_date,
    user_id,
    event_name,
    description,
    type,
    logo,
    has_activity
  }
}
