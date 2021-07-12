import { initializeApp } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth"
import {
  DataSnapshot,
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  update,
} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAGtYJN9x3SesBvFrYejifUoS5XsFda0LY",
  authDomain: "money-handler-ddef2.firebaseapp.com",
  databaseURL:
    "https://money-handler-ddef2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "money-handler-ddef2",
  storageBucket: "money-handler-ddef2.appspot.com",
  messagingSenderId: "97752835208",
  appId: "1:97752835208:web:ea020310af0e29c5372b3d",
  measurementId: "G-509ZKWDS6E",
}

initializeApp(firebaseConfig)

export const auth = getAuth()

export const signInUser = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)

export const createUser = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password)

export const db = getDatabase()

export const removeEntry = (uid: string, entryId: string) =>
  remove(ref(db, `users/${uid}/entries/${entryId}`))

export const updateUserFields = (uid: string, updates: object) =>
  update(ref(db, `users/${uid}`), updates)

export const pushNewEntry = (uid: string) =>
  push(ref(db, `users/${uid}/entries`))

export const getEntriesObserver = (
  uid: string | null,
  callback: (x: DataSnapshot) => void,
) => onValue(ref(db, `users/${uid}/entries`), callback)
