import { type Activity } from '../models'

export const activityMapper = (object: Record<string, any | null>): Activity => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { activity_id, event_id, description, total_activity_value, is_by_percentage } = object

  return {
    activity_id,
    event_id,
    description,
    total_activity_value,
    is_by_percentage
  }
}
