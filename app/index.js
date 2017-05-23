import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './components/App.js';
import { BrowserRouter as Router } from 'react-router-dom';
import { browserHistory, Route } from 'react-router';

render(
  <Router history={ browserHistory } >
    <App />
  </Router>,
  document.getElementById('main'),
);
