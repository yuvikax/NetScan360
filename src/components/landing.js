import React from 'react';
import './landing.css';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const handleNewScan = () => {
    navigate('/new-scan');
  };

  const handleScanHistory = () => {
    navigate('/nmap/scans');
  };

  return (
    <div className="landing-container">
      <button className="landing-button" onClick={handleNewScan}>New Scan</button>
      <button className="landing-button" onClick={handleScanHistory}>Scan History</button>
    </div>
  );
};

export default Landing;