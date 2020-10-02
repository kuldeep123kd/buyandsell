import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import "react-app-polyfill/stable";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
import './App.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

const app = (
  <BrowserRouter basename="/" >
      <App />
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
