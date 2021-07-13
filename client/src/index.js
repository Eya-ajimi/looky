import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss'
import {Provider} from 'react-redux'
import Store from './redux/Store'

ReactDOM.render(
  <Provider store ={Store}>
    <App />
  </Provider>,

  document.getElementById('root')
);

//reportWebVitals();