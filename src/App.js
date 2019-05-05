import React from 'react';
import './App.css';

import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary'

import AddServices from './Components/AddServices/AddServices';
import Footer from './Footer/Footer'

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <AddServices/>
      </ErrorBoundary>
      <Footer/>
    </div>
  );
}

export default App;
