import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { patientService } from '../services/api';

const PatientForm = ({ open, onClose, patient, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    phoneNumber: '',
    birthDate: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name || '',
        email: patient.email || '',
        gender: patient.gender || '',
        phoneNumber: patient.phoneNumber || '',
        birthDate: patient.birthDate ? new Date(patient.birthDate) : null,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        gender: '',
        phoneNumber: '',
        birthDate: null,
      });
    }
  }, [patient]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.birthDate) newErrors.birthDate = 'Birth date is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      console.log('Creating patient with data:', formData);
      if (patient) {
        await patientService.updatePatient(patient.id, formData);
        console.log('Patient updated successfully');
      } else {
        await patientService.createPatient(formData);
        console.log('Patient created successfully');
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving patient:', error);
      alert(`Error: ${error.message || 'Failed to save patient. Check console for details.'}`);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {patient ? 'Edit Patient' : 'Add New Patient'}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange('phoneNumber')}
            />
          </Grid>
          <Grid item xs={12}>
            <DatePicker
              label="Birth Date"
              value={formData.birthDate}
              onChange={(date) => setFormData({ ...formData, birthDate: date })}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.birthDate,
                  helperText: errors.birthDate,
                  required: true,
                },
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {patient ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

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

  const handleAddPatient = () => {
    setSelectedPatient(null);
    setDialogOpen(true);
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setDialogOpen(true);
  };

  const handleDeletePatient = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await patientService.deletePatient(id);
        fetchPatients();
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    }
  };

  const handleSave = () => {
    fetchPatients();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Patients
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddPatient}
        >
          Add Patient
        </Button>
      </Box>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Birth Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : patients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No patients found
                    </TableCell>
                  </TableRow>
                ) : (
                  patients.map((patient) => (
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
                      <TableCell>{patient.phoneNumber || 'N/A'}</TableCell>
                      <TableCell>
                        {patient.birthDate ? new Date(patient.birthDate).toLocaleDateString() : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEditPatient(patient)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeletePatient(patient.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <PatientForm
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        patient={selectedPatient}
        onSave={handleSave}
      />
    </Box>
  );
};

export default Patients;

