import React, { useState, useEffect } from 'react';
import './TypeScan.css';
import Target from './target';
import Command from './command';
import { createScan, fetchScanStatus } from './api';

const TypeScan = () => {
  const [selectedOption, setSelectedOption] = useState('Profile');
  const [tgt, setTgt] = useState('');
  const [error, setError] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [customCommand, setCustomCommand] = useState('');
  const [loading, setLoading] = useState(false);
  const [scanId, setScanId] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  const options = ['Intense scan', 'Intense scan plus UDP', 'Quick scan', 'Ping scan', 'Custom scan'];

  const handleScan = async () => {
    if (!tgt) {
      setError('Target is required.');
      return;
    }
    try {
      if (!selectedOption) {
        setError('Please select a scan type.');
        return;
      }
      setLoading(true);
      const command = selectedOption === 'Custom scan' ? customCommand : 'nmap';
      const response = await createScan({ typescan: selectedOption, command, target: tgt });
      setScanId(response.id);
      setError('');
      pollScanStatus(response.id);
    } catch (error) {
      console.error('Error initiating scan:', error);
      setLoading(false);
    }
  };

  const pollScanStatus = (id) => {
    const interval = setInterval(async () => {
      const statusResponse = await fetchScanStatus(id);
      if (statusResponse.status !== 'running') {
        clearInterval(interval);
        setLoading(false);
      }
    }, 3000);
  };

  return (
    <div className="type-scan-container" style={{ justifyContent: 'center' }}>
      <div className="d-flex flex-column align-items-center">
        <div className="dropdown mb-2">
          <button
            className="btn btn-success dropdown-toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {selectedOption} <span className="caret"></span>
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu show">
              {options.map((option, index) => (
                <li key={index}>
                  <button
                    className="dropdown-item"
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {selectedOption !== 'Profile' && selectedOption !== 'Custom scan' && (
          <div className="command-caption mt-1">
            <p>
              Command: {selectedOption === 'Intense scan' && '-T4 -A -v'}
              {selectedOption === 'Intense scan plus UDP' && '-sS -sU -T4 -A -v'}
              {selectedOption === 'Quick scan' && '-T4 -F'}
              {selectedOption === 'Ping scan' && '-sn'}
            </p>
          </div>
        )}
      </div>
      <Target setTgt={setTgt} />
      {error && <div className="error-message">{error}</div>}
      <Command
        selectedScanType={selectedOption}
        tgt={tgt}
        handleScan={handleScan}
        customCommand={customCommand}
        setCustomCommand={setCustomCommand}
        loading={loading}
      />
    </div>
  );
};

export default TypeScan;