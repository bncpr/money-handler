import { initializeApp } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { getDatabase } from "firebase/database"

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
    // .then(userCredential => {
    //   console.log("SignedIn", userCredential.user)
    // })
    // .catch(error => {
    //   const errorCode = error.code
    //   const errorMessage = error.message
    //   console.log(errorCode, errorMessage)
    // })

export const createUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)
    // .then(userCredential => {
    //   const user = userCredential.user
    //   console.log(user)
    // })
    // .catch(error => {
    //   const errorMessage = error.message
    //   console.log(errorMessage, error.code)
    // })

export const db = getDatabase()
