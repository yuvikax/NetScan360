import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './box.css';
import SuiTable from './components_library/SUI_TABLE';
import Navbar from './navbar.js';

const Recent_output = () => {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/scans/');
        setScans(response.data);
      } catch (error) {
        console.error('Error fetching scans:', error);
      }
    };

    fetchScans();
  }, []);
 
  return (
    <div className="shadow-box">
      <Navbar />
      <SuiTable
      tableRows = {scans}/>
    </div>
  );
};

export default Recent_output;