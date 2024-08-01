import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './box.css';
import SuiTable from './components_library/SUI_TABLE';

const HostsOutput = () => {
  const [hosts, setHosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/hosts_discovered/');
        setHosts(response.data);
      } catch (error) {
        console.error('Error fetching hosts:', error);
      }
    };

    fetchData();
  }, []);

  const tableColumns = [
    { field: 'target_ip', title: 'Host IP' },
    { field: 'os_version', title: 'OS Version' }
  ];

  return (
    <div className='shadow-box'>
      <SuiTable
        tableRows={hosts}
        tableColumns={tableColumns}
      />
    </div>
  );
};

export default HostsOutput;