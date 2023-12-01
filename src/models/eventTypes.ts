export interface Event {
  event_id?: string
  event_date: Date
  user_id?: string
  event_name: string
  description: string
  type: string
  logo: string
  has_activity: boolean
  has_been_done?: boolean
}

export interface EventTypeRequest {
  event_id: string
  contact_id: string
}

export interface EventId {
  event_id: string
}

export interface EventContact {
  event_contacts_id?: string
  event_id: string
  contact_id: string
}
