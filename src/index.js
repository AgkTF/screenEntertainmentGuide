import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.output.css';
import './slick.css';
import './slick-theme.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import ErrorBoundary from './components/Error/Error';

ReactDOM.render(
  // <ErrorBoundary>
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  // {/* </ErrorBoundary>, */}
  document.getElementById('root')
);
