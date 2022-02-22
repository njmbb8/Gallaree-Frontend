import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from "react-redux"
import store, { persistor } from "./Store"
import { PersistGate } from 'redux-persist/integration/react'
import { TailSpin } from 'react-loader-spinner';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate 
      loading={<TailSpin color="#00BFFF" height={80} width={80} />} 
      persistor = {persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
