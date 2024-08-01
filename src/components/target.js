import React, { useState } from 'react';
import './TypeScan.css';

const Target = (props) => {
  const { setTgt } = props;
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const validateIP = (ip) => {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setTouched(true);
    if (value === '') {
      setError('This field is required.');
    } else if (validateIP(value)) {
      setError('');
      setTgt(value);
    } else {
      setError('Enter a valid IP address.');
    }
  };

  return (
    <div className="target-container d-flex flex-column">
      <div className="form-floating mb-3">
        <input
          type="text"
          className={`form-control ${error && touched ? 'is-invalid' : ''}`}
          id="floatingTargetInput"
          placeholder="Enter target here"
          value={inputValue}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
        />
        <label htmlFor="floatingTargetInput">Target</label>
        {error && touched && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default Target;