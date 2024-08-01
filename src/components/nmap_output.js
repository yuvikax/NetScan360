import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './box.css';
import SuiTable from './components_library/SUI_TABLE';

const NmapOutput = () => {
  const [nmapResults, setNmapResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/nmap_output/');
        setNmapResults(response.data);
      } catch (error) {
        console.error('Error fetching Nmap results:', error);
      }
    };

    fetchData();
  }, []);
  console.log({nmapResults})

  return (
    <div className='shadow-box'>
      <SuiTable
      tableRows = {nmapResults} />
    </div>
  );
};

export default NmapOutput;