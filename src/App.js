import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Configuration } from './components/Configuration';
import { Status } from './components/Status';
import { Action } from './components/Action';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mx-auto p-4">
        <ToastContainer />
          <Routes>
            <Route path="/" element={<Configuration />} />
            <Route path="/status" element={<Status />} />
            <Route path="/action" element={<Action />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;