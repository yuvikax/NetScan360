import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './box.css';
import SuiTable from './components_library/SUI_TABLE';

const ServicesOutput = () => {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/services_discovered/');
        const servicesData = response.data;

        const grouped = servicesData.reduce((acc, service) => {
          const { host_id, scan, port, state, service: serviceName } = service;
          if (!acc[host_id]) {
            acc[host_id] = { host_id, scan_id: scan, services: [] };
          }
          acc[host_id].services.push({ port, state, service: serviceName });
          return acc;
        }, {});

        const formattedData = Object.values(grouped).map(group => ({
          host_id: group.host_id,
          scan_id: group.scan_id,
          services: group.services.map(service => `Port: ${service.port}, State: ${service.state}, Service: ${service.service}`).join('; ')
        }));

        setServicesData(formattedData);

      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchData();
  }, []);

  const tableColumns = [
    { field: 'host_id', title: 'Host ID' },
    { field: 'scan_id', title: 'Scan ID' },
    { field: 'services', title: 'Services' }
  ];

  return (
    <div className='shadow-box'>
      <SuiTable
        tableRows={servicesData}
        tableColumns={tableColumns}
      />
    </div>
  );
};

export default ServicesOutput;