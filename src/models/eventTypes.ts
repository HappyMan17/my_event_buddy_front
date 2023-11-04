export interface Event {
  event_id?: string
  event_date: Date
  user_id?: string
  event_name: string
  description: string
  type: string
  logo: string
  has_activity: boolean
}
