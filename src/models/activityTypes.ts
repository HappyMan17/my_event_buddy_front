export interface Activity {
  activity_id?: string
  event_id: string
  description: string
  total_activity_value: number
  is_by_percentage: boolean
  has_been_done?: boolean
}
