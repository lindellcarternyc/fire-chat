import { Timestamp } from 'firebase/firestore'

export interface MessageDTO {
  id: string
  text: string
  timestamp: Timestamp
  uid: string
  displayName: string
}