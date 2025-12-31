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
  IconButton as MuiIconButton,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { appointmentService, patientService, doctorService } from '../services/api';

const AppointmentForm = ({ open, onClose, appointment, onSave }) => {
  const [formData, setFormData] = useState({
    appointmentTime: null,
    reason: '',
    patientId: '',
    doctorId: '',
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (appointment) {
      setFormData({
        appointmentTime: appointment.appointmentTime ? new Date(appointment.appointmentTime) : null,
        reason: appointment.reason || '',
        patientId: appointment.patientId || '',
        doctorId: appointment.doctorId || '',
      });
    } else {
      setFormData({
        appointmentTime: null,
        reason: '',
        patientId: '',
        doctorId: '',
      });
    }
  }, [appointment]);

  useEffect(() => {
    fetchPatientsAndDoctors();
  }, []);

  const fetchPatientsAndDoctors = async () => {
    try {
      const [patientsData, doctorsData] = await Promise.all([
        patientService.getAllPatients(),
        doctorService.getAllDoctors(),
      ]);
      setPatients(patientsData);
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
    if (!formData.appointmentTime) newErrors.appointmentTime = 'Appointment time is required';
    if (!formData.patientId) newErrors.patientId = 'Patient is required';
    if (!formData.doctorId) newErrors.doctorId = 'Doctor is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      if (appointment) {
        await appointmentService.updateAppointment(appointment.id, formData);
      } else {
        await appointmentService.createAppointment(formData);
      }
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {appointment ? 'Edit Appointment' : 'Add New Appointment'}
        <MuiIconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </MuiIconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <DateTimePicker
              label="Appointment Time"
              value={formData.appointmentTime}
              onChange={(date) => setFormData({ ...formData, appointmentTime: date })}
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: !!errors.appointmentTime,
                  helperText: errors.appointmentTime,
                  required: true,
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Reason"
              multiline
              rows={3}
              value={formData.reason}
              onChange={handleChange('reason')}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Patient</InputLabel>
              <Select
                value={formData.patientId}
                onChange={handleChange('patientId')}
                error={!!errors.patientId}
              >
                {patients.map((patient) => (
                  <MenuItem key={patient.id} value={patient.id}>
                    {patient.name} ({patient.email})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Doctor</InputLabel>
              <Select
                value={formData.doctorId}
                onChange={handleChange('doctorId')}
                error={!!errors.doctorId}
              >
                {doctors.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    {doctor.name} ({doctor.specialization || 'General'})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {appointment ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await appointmentService.getAllAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAppointment = () => {
    setSelectedAppointment(null);
    setDialogOpen(true);
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setDialogOpen(true);
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await appointmentService.deleteAppointment(id);
        fetchAppointments();
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    }
  };

  const handleSave = () => {
    fetchAppointments();
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Appointments
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddAppointment}
        >
          Schedule Appointment
        </Button>
      </Box>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Patient</TableCell>
                  <TableCell>Doctor</TableCell>
                  <TableCell>Date & Time</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : appointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No appointments found
                    </TableCell>
                  </TableRow>
                ) : (
                  appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.patientName || 'N/A'}</TableCell>
                      <TableCell>{appointment.doctorName || 'N/A'}</TableCell>
                      <TableCell>
                        <Chip
                          label={formatDateTime(appointment.appointmentTime)}
                          color="primary"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{appointment.reason || 'N/A'}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEditAppointment(appointment)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteAppointment(appointment.id)}>
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

      <AppointmentForm
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        appointment={selectedAppointment}
        onSave={handleSave}
      />
    </Box>
  );
};

export default Appointments;

