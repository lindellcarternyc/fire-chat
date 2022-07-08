import { useEffect, useState } from 'react'
import { getRooms } from '../services/firebase.service'

const useRooms = () => {
  const [rooms, setRooms] = useState<{ id: string, title: string}[]>([])

  useEffect(() => {
    const unsubscribe = getRooms(setRooms)

    return unsubscribe
  }, [])

  return rooms
}

export { useRooms}