import React, { useState } from 'react';
import './TypeScan.css';
import { createScan } from './api';

const Command = ({ selectedScanType, tgt, customCommand, setCustomCommand, loading }) => {
  const [commandError, setCommandError] = useState('');
  const [commandTouched, setCommandTouched] = useState(false);

  const commands = {
    'Intense scan': '-T4 -A -v',
    'Intense scan plus UDP': '-sS -sU -T4 -A -v',
    'Quick scan': '-T4 -F',
    'Ping scan': '-sn',
    'Custom scan': customCommand
  };

  const validateCommand = (command) => {
    const nmapCommandRegex = /^nmap(\s+-\w+)*(\s+\d{1,3}(\.\d{1,3}){3})?$/;
    return nmapCommandRegex.test(command);
  };

  const handleCommandChange = (e) => {
    const value = e.target.value;
    setCustomCommand(value);
    setCommandTouched(true);
    if (value === '') {
      setCommandError('This field is required.');
    } else if (validateCommand(value)) {
      setCommandError('');
    } else {
      setCommandError('Please give a valid command.');
    }
  };

  const sendCommandToBackend = async () => {
    if (selectedScanType === 'Custom scan') {
      if (!customCommand) {
        setCommandError('This field is required.');
        setCommandTouched(true);
        return;
      }
      if (!validateCommand(customCommand)) {
        setCommandError('Please give a valid command.');
        setCommandTouched(true);
        return;
      }
    }

    const selectedOption = selectedScanType;
    const command = commands[selectedOption];
    try {
      if (!tgt) {
        console.error('Target is required.');
        return;
      }
      const response = await createScan({ typescan: selectedOption, command, target: tgt });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="target-container d-flex flex-column">
      {selectedScanType === 'Custom scan' && (
        <>
          <div className="form-floating mb-1 d-flex align-items-center">
            <input
              type="text"
              className={`form-control ${commandError && commandTouched ? 'is-invalid' : ''}`}
              id="floatingCustomCommand"
              placeholder="Enter custom command"
              value={customCommand}
              onChange={handleCommandChange}
              onBlur={() => setCommandTouched(true)}
              style={{ flex: 1, marginBottom: '1px' }}
            />
            <label htmlFor="floatingCustomCommand" className="ms-2">Custom Command</label>
            <button className="btn btn-primary ms-2" onClick={sendCommandToBackend} disabled={loading}>
              {loading ? 'Scanning...' : 'Scan'}
            </button>
          </div>
          {commandError && commandTouched && <div className="invalid-feedback d-block mt-1" style={{ marginTop: '2px' }}>{commandError}</div>}
        </>
      )}
      {selectedScanType !== 'Custom scan' && (
        <div className="d-flex">
          <button className="btn btn-app-color" onClick={sendCommandToBackend} disabled={loading}>
            {loading ? 'Scanning...' : 'Scan'}
          </button>
          {loading && <div className="loader"></div>}
        </div>
      )}
    </div>
  );
};

export default Command;