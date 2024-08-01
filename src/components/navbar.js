//navbar.js
import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

// code using link and redirecting to another page

const Hosts = () => {
  return (
    <div className="hosts-container">
      <div className="box-with-shadow">
        <nav className="navbar navbar-expand-lg navbar-custom">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/nmap/output">Nmap output</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nmap/hosts">Hosts discovered</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nmap/os">OS version</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nmap/scans">Recent Scans</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Hosts;