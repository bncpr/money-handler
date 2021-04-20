import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit'
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { dataReducer } from './store/dataSlice'
import { errorReducer } from './store/errorSlice';
import { dashboardReducer } from './store/dashboardSlice';


const store = configureStore({
  reducer: {
    data: dataReducer,
    dashboard: dashboardReducer,
    error: errorReducer
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
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
