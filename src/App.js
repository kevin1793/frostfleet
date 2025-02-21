import logo from './images/frostfleet_logo_cropped.jpg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ExpensesPage from './pages/ExpensesPage';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';


function App() {
  return (
    <Router basename="/frostfleet">
      <div className="App">
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        {/* <Route path="/invoices" element={<div>Invoices Page</div>} />
        <Route path="/service-records" element={<div>Service Records Page</div>} /> */}
      </Routes>

      </div>
    </Router>
  );
}

export default App;
