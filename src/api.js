import axios from "axios";

const API = "http://localhost:5000/api/admin";

export const getStats = () => axios.get(`${API}/stats`);
export const getStudents = () => axios.get(`${API}/students`);
export const getInstitutes = () => axios.get(`${API}/institutes`);
export const getEvents = () => axios.get(`${API}/events`);