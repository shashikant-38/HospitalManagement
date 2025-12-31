# Frontend Development Guide for Hospital Management System

## 🎨 Frontend Technology Options

### 1. React.js (Recommended)
```bash
# Create React app
npx create-react-app hospital-frontend
cd hospital-frontend

# Install dependencies
npm install axios react-router-dom @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material @mui/x-date-pickers
```

### 2. Vue.js
```bash
# Create Vue app
npm create vue@latest hospital-frontend
cd hospital-frontend
npm install

# Install dependencies
npm install axios vue-router @element-plus/icons-vue
```

### 3. Angular
```bash
# Create Angular app
ng new hospital-frontend
cd hospital-frontend

# Install dependencies
npm install @angular/material @angular/cdk
```

## 📁 Recommended Project Structure

```
hospital-frontend/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Layout.jsx
│   │   ├── patients/
│   │   │   ├── PatientList.jsx
│   │   │   ├── PatientForm.jsx
│   │   │   └── PatientDetails.jsx
│   │   ├── doctors/
│   │   │   ├── DoctorList.jsx
│   │   │   ├── DoctorForm.jsx
│   │   │   └── DoctorDetails.jsx
│   │   ├── appointments/
│   │   │   ├── AppointmentList.jsx
│   │   │   ├── AppointmentForm.jsx
│   │   │   └── AppointmentCalendar.jsx
│   │   └── departments/
│   │       ├── DepartmentList.jsx
│   │       └── DepartmentForm.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── patientService.js
│   │   ├── doctorService.js
│   │   ├── appointmentService.js
│   │   └── departmentService.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Patients.jsx
│   │   ├── Doctors.jsx
│   │   ├── Appointments.jsx
│   │   └── Departments.jsx
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   └── App.jsx
```

## 🔧 API Service Implementation

### Base API Service (api.js)
```javascript
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
    // Add auth token if available
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
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Patient Service (patientService.js)
```javascript
import api from './api';

export const patientService = {
  // Get all patients
  getAllPatients: async () => {
    const response = await api.get('/patients');
    return response.data;
  },

  // Get patient by ID
  getPatientById: async (id) => {
    const response = await api.get(`/patients/${id}`);
    return response.data;
  },

  // Create new patient
  createPatient: async (patientData) => {
    const response = await api.post('/patients', patientData);
    return response.data;
  },

  // Update patient
  updatePatient: async (id, patientData) => {
    const response = await api.put(`/patients/${id}`, patientData);
    return response.data;
  },

  // Delete patient
  deletePatient: async (id) => {
    await api.delete(`/patients/${id}`);
  },

  // Search patients
  searchPatients: async (query) => {
    const response = await api.get(`/patients/search?q=${query}`);
    return response.data;
  }
};
```

## 🎨 UI Component Examples

### Patient List Component
```jsx
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Chip
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { patientService } from '../services/patientService';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await patientService.getAllPatients();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await patientService.deletePatient(id);
        fetchPatients();
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2>Patients</h2>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {/* Navigate to create form */}}
        >
          Add Patient
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>
                  <Chip 
                    label={patient.gender} 
                    color={patient.gender === 'MALE' ? 'primary' : 'secondary'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{patient.phoneNumber}</TableCell>
                <TableCell>
                  <IconButton onClick={() => {/* Edit patient */}}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(patient.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PatientList;
```

### Patient Form Component
```jsx
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { patientService } from '../services/patientService';

const PatientForm = ({ patient, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: patient?.name || '',
    email: patient?.email || '',
    gender: patient?.gender || '',
    phoneNumber: patient?.phoneNumber || '',
    birthDate: patient?.birthDate || null
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.birthDate) newErrors.birthDate = 'Birth date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    try {
      if (patient) {
        await patientService.updatePatient(patient.id, formData);
      } else {
        await patientService.createPatient(formData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={handleChange('name')}
            error={!!errors.name}
            helperText={errors.name}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            error={!!errors.email}
            helperText={errors.email}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.gender}
              onChange={handleChange('gender')}
              error={!!errors.gender}
            >
              <MenuItem value="MALE">Male</MenuItem>
              <MenuItem value="FEMALE">Female</MenuItem>
              <MenuItem value="OTHER">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange('phoneNumber')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label="Birth Date"
            value={formData.birthDate}
            onChange={(date) => setFormData({ ...formData, birthDate: date })}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={!!errors.birthDate}
                helperText={errors.birthDate}
                required
              />
            )}
          />
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
        <Button type="submit" variant="contained">
          {patient ? 'Update' : 'Create'} Patient
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default PatientForm;
```

## 🚀 Getting Started Steps

### 1. Setup Project
```bash
# Choose your framework and create project
npx create-react-app hospital-frontend
cd hospital-frontend

# Install dependencies
npm install axios react-router-dom @mui/material @emotion/react @emotion/styled
```

### 2. Environment Configuration
Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_APP_NAME=Hospital Management System
```

### 3. Create API Services
- Implement base API service with axios
- Create service files for each entity
- Add error handling and interceptors

### 4. Build UI Components
- Create reusable components
- Implement forms with validation
- Add responsive design

### 5. Implement Routing
```jsx
// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/departments" element={<Departments />} />
      </Routes>
    </Router>
  );
}
```

### 6. Add State Management (Optional)
For complex applications, consider using Redux or Zustand:
```bash
npm install @reduxjs/toolkit react-redux
# or
npm install zustand
```

## 🎨 Styling Options

### Material-UI (Recommended)
- Professional look and feel
- Comprehensive component library
- Built-in responsive design
- Theme customization

### Alternative Options
- **Ant Design**: Enterprise-class UI design
- **Chakra UI**: Simple, modular and accessible
- **Tailwind CSS**: Utility-first CSS framework
- **Styled Components**: CSS-in-JS solution

## 📱 Responsive Design

```jsx
// Responsive Grid Example
<Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>
    {/* Content */}
  </Grid>
</Grid>

// Mobile-first approach
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
    },
  },
}));
```

## 🔐 Authentication (Future Enhancement)

```javascript
// authService.js
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
```

## 📊 Dashboard Implementation

```jsx
// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    todayAppointments: 0
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const [patients, doctors, appointments] = await Promise.all([
        patientService.getAllPatients(),
        doctorService.getAllDoctors(),
        appointmentService.getAllAppointments()
      ]);
      
      setStats({
        totalPatients: patients.length,
        totalDoctors: doctors.length,
        totalAppointments: appointments.length,
        todayAppointments: appointments.filter(apt => 
          new Date(apt.appointmentTime).toDateString() === new Date().toDateString()
        ).length
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Patients</Typography>
            <Typography variant="h4">{stats.totalPatients}</Typography>
          </CardContent>
        </Card>
      </Grid>
      {/* More stat cards... */}
    </Grid>
  );
};
```

This guide provides a comprehensive foundation for building a modern, responsive frontend for your Hospital Management System!
