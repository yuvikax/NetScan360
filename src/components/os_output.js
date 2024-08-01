import React, { useState, useEffect } from 'react';
import { fetchOsOutput } from './api';

const OsOutput = () => {
  const [osVersions, setOsVersions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchOsOutput();
        setOsVersions(response);
      } catch (error) {
        console.error('Error fetching OS versions:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>OS Versions</h2>
      <ul>
        {osVersions.map(os => (
          <li key={os.id}>
            <strong>OS Version:</strong> <pre>{os.os_version}</pre><br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OsOutput;
