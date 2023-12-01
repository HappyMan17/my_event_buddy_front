export interface Activity {
  activity_id?: string
  event_id: string
  description: string
  total_activity_value: number
  is_by_percentage: boolean
  has_been_done?: boolean
}

export interface ActivityUpdate {
  activity_id: string
  event_id: string
  description: string
  total_activity_value: number
  is_by_percentage: boolean
  has_been_done: boolean
}

export interface ActivityId {
  activitiy_id: string
}

export interface ActivityContact {
  activity_contacts_id?: string
  activity_id: string
  user_id: string
}

export interface ActivityTypeRequest {
  activity_id: string
  user_id: string
}
