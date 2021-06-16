import { initializeApp } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth"
import {
  get,
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

export const signInUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)

export const createUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)

export const db = getDatabase()

export const getUserEntries = uid =>
  get(ref(db, `users/${uid}`)).then(snapshot =>
    snapshot.exists() ? snapshot.val() : {},
  )

export const removeEntry = (uid, entryId) =>
  remove(ref(db, `users/${uid}/entries/${entryId}`))

export const updateEntry = (uid, entryId, entry) =>
  update(ref(db, `users/${uid}/entries/${entryId}`), entry)

export const updateUserFields = (uid, updates) =>
  update(ref(db, `users/${uid}`), updates)

export const pushNewEntry = uid => push(ref(db, `users/${uid}/entries`))

export const getEntriesObserver = (uid, callback) =>
  onValue(ref(db, `users/${uid}/entries`), callback)
