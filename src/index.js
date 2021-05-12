import "./index.css"

import React from "react"
import ReactDOM from "react-dom"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"

import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"

import { App } from "./App"

import { dataReducer } from "./store/dataSlice"
import { errorReducer } from "./store/errorSlice"
import { dashboardReducer } from "./store/dashboardSlice"
import { loginReducer } from "./store/loginSlice"
import {
  authenticationReducer,
  signIn,
  signOut,
} from "./store/authenticationSlice"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebase"

const store = configureStore({
  reducer: {
    data: dataReducer,
    dashboard: dashboardReducer,
    error: errorReducer,
    login: loginReducer,
    authentication: authenticationReducer,
  },
})

onAuthStateChanged(auth, user => {
  if (user) {
    const { uid, email } = user
    store.dispatch(signIn({ uid, email }))
  } else {
    store.dispatch(signOut())
  }
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
