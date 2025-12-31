import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Patient Service
export const patientService = {
  getAllPatients: async () => {
    try {
      const response = await api.get('/patients');
      return response.data;
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw new Error(`Failed to fetch patients: ${error.message}`);
    }
  },
  getPatientById: async (id) => {
    try {
      const response = await api.get(`/patients/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching patient:', error);
      throw new Error(`Failed to fetch patient: ${error.message}`);
    }
  },
  createPatient: async (patientData) => {
    try {
      console.log('Sending patient data to API:', patientData);
      const response = await api.post('/patients', patientData);
      console.log('API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating patient:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
      throw new Error(`Failed to create patient: ${error.message}`);
    }
  },
  updatePatient: async (id, patientData) => {
    try {
      const response = await api.put(`/patients/${id}`, patientData);
      return response.data;
    } catch (error) {
      console.error('Error updating patient:', error);
      throw new Error(`Failed to update patient: ${error.message}`);
    }
  },
  deletePatient: async (id) => {
    try {
      await api.delete(`/patients/${id}`);
    } catch (error) {
      console.error('Error deleting patient:', error);
      throw new Error(`Failed to delete patient: ${error.message}`);
    }
  },
};

// Doctor Service
export const doctorService = {
  getAllDoctors: async () => {
    const response = await api.get('/doctors');
    return response.data;
  },
  getDoctorById: async (id) => {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  },
  createDoctor: async (doctorData) => {
    const response = await api.post('/doctors', doctorData);
    return response.data;
  },
  updateDoctor: async (id, doctorData) => {
    const response = await api.put(`/doctors/${id}`, doctorData);
    return response.data;
  },
  deleteDoctor: async (id) => {
    await api.delete(`/doctors/${id}`);
  },
};

// Appointment Service
export const appointmentService = {
  getAllAppointments: async () => {
    const response = await api.get('/appointments');
    return response.data;
  },
  getAppointmentById: async (id) => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },
  createAppointment: async (appointmentData) => {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  },
  updateAppointment: async (id, appointmentData) => {
    const response = await api.put(`/appointments/${id}`, appointmentData);
    return response.data;
  },
  deleteAppointment: async (id) => {
    await api.delete(`/appointments/${id}`);
  },
};

// Department Service
export const departmentService = {
  getAllDepartments: async () => {
    const response = await api.get('/departments');
    return response.data;
  },
  getDepartmentById: async (id) => {
    const response = await api.get(`/departments/${id}`);
    return response.data;
  },
  createDepartment: async (departmentData) => {
    const response = await api.post('/departments', departmentData);
    return response.data;
  },
  updateDepartment: async (id, departmentData) => {
    const response = await api.put(`/departments/${id}`, departmentData);
    return response.data;
  },
  deleteDepartment: async (id) => {
    await api.delete(`/departments/${id}`);
  },
};

// Insurance Service
export const insuranceService = {
  getAllInsurances: async () => {
    const response = await api.get('/insurances');
    return response.data;
  },
  getInsuranceById: async (id) => {
    const response = await api.get(`/insurances/${id}`);
    return response.data;
  },
  createInsurance: async (insuranceData) => {
    const response = await api.post('/insurances', insuranceData);
    return response.data;
  },
  updateInsurance: async (id, insuranceData) => {
    const response = await api.put(`/insurances/${id}`, insuranceData);
    return response.data;
  },
  deleteInsurance: async (id) => {
    await api.delete(`/insurances/${id}`);
  },
};

export default api;

