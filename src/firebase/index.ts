import { firebaseConfig } from './config'
import { initializeApp } from 'firebase/app'
import {
  getFirestore, collection, getDocs
} from 'firebase/firestore'

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export const topicRef = collection(db, 'topics')