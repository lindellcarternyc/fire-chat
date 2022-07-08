import { initializeApp } from 'firebase/app'
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { signInWithPopup, getAuth, GoogleAuthProvider } from 'firebase/auth'
import { MessageDTO } from '../dtos/message.dtos';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

console.log(firebaseConfig)

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const auth = getAuth()

    const { user } = await signInWithPopup(auth, provider)

    return {
      uid: user.uid,
      displayName: user.displayName
    }
  } catch (err) {
    if ((err as any).code === 'auth/cancelled-popup-request') {
      console.error(err)
    }

    return null
  }
}

const sendMessage = async (
  roomId: string, 
  user: { uid: string, displayName: string | null }, 
  text: string
) => {
  try {
    await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
      uid: user.uid,
      displayName: user.displayName,
      text: text.trim(),
      timestamp: serverTimestamp()
    })
  } catch (err) {
    console.error(err)
  }
}

const getRooms = (callback: (rooms: { id: string, title: string }[]) => void) => {
  return onSnapshot(
    query(
      collection(db, 'chat-rooms'),
      orderBy('title', 'asc')
    ),
    (querySnapshot) => {
      const rooms = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          title: doc.data().title
        }
      })
      return callback(rooms)
    }
  )
}

const getMessages = (
  roomId: string,
  callback: (messages: MessageDTO[]) => void
) => {
  return onSnapshot(
    query(
      collection(db, "chat-rooms", roomId, "messages"),
      orderBy("timestamp", "asc")
    ),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        } as MessageDTO
      })
      return callback(messages)
    }
  );
};

export {
  loginWithGoogle,
  sendMessage,
  getMessages,
  getRooms
}