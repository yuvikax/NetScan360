import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TypeScan from './components/TypeScan';
import Nmap_output from './components/nmap_output';
import Services_output from './components/services_output';
import Recent_output from './components/recent_output';
import Hosts_output from './components/hosts_output';
import Home_output from './components/home';
// import { BaseUI } from './components/components_library/BaseUI';
import Navbar from './components/navbar';
import Nmap_navbar from './components/nmap_navbar';
import Landing from './components/landing';

function App() {
  const navLinks = [
    {name: "Nmap",
    icon: <span className='material-icons'>dashboard </span>, link: "/nmap"}
  ]
  return (
      <div className="App">
      {/* <BaseUI
        navLinks = {navLinks}
        appInfo = {"NetScan360"}
        showTopNavbar = {true}
        topNavbarTitle = {"NetScan360"}
        > */}
        {/* <TypeScan />
        <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home_output />} />
          <Route path="/nmap" element={<Landing />} />
          <Route path="/nmap/output" element={<Nmap_output />} />
          <Route path="/nmap/hosts" element = {<Hosts_output />} />
          <Route path="/nmap/services" element={<Services_output />} />
          <Route path="/nmap/scans" element={<Recent_output />} />
          <Route path="/new-scan" element={<TypeScan />} />
        </Routes>
      {/* </BaseUI> */}
      </div>
  );
}

export default App;