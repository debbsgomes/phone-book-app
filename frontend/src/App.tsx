import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhoneBook from './containers/PhoneBook';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000/api/v1";

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhoneBook />} />
      </Routes>
    </Router>
  );
}

export default App;

