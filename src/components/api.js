import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const createScan = async (scanData) => {
  try {
    const response = await axios.post(`${API_URL}scans/`, scanData);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchScanStatus = async (id) => {
  try {
    const response = await axios.get(`${API_URL}scans/${id}/`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchNmapOutput = async () => {
  try {
    const response = await axios.get(`${API_URL}nmap_output/`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchHostsOutput = async () => {
  try {
    const response = await axios.get(`${API_URL}hosts_discovered/`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchOsOutput = async () => {
  try {
    const response = await axios.get(`${API_URL}os_output/`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { createScan, fetchScanStatus, fetchNmapOutput, fetchHostsOutput, fetchOsOutput };