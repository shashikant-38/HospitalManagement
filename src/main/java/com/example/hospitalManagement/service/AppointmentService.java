package com.example.hospitalManagement.service;

import com.example.hospitalManagement.Entity.Appointment;
import com.example.hospitalManagement.dto.AppointmentDTO;
import com.example.hospitalManagement.repository.AppointmentRepository;
import com.example.hospitalManagement.repository.DoctorRepository;
import com.example.hospitalManagement.repository.PatientRpository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRpository patientRepository;
    private final DoctorRepository doctorRepository;

    public List<AppointmentDTO> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AppointmentDTO getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
        return convertToDTO(appointment);
    }

    public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) {
        Appointment appointment = convertToEntity(appointmentDTO);
        Appointment savedAppointment = appointmentRepository.save(appointment);
        return convertToDTO(savedAppointment);
    }

    public AppointmentDTO updateAppointment(Long id, AppointmentDTO appointmentDTO) {
        Appointment existingAppointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
        
        existingAppointment.setAppointmentTime(appointmentDTO.getAppointmentTime());
        existingAppointment.setReason(appointmentDTO.getReason());
        
        if (appointmentDTO.getPatientId() != null) {
            existingAppointment.setPatient(patientRepository.findById(appointmentDTO.getPatientId())
                    .orElseThrow(() -> new RuntimeException("Patient not found with id: " + appointmentDTO.getPatientId())));
        }
        
        if (appointmentDTO.getDoctorId() != null) {
            existingAppointment.setDoctor(doctorRepository.findById(appointmentDTO.getDoctorId())
                    .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + appointmentDTO.getDoctorId())));
        }
        
        Appointment updatedAppointment = appointmentRepository.save(existingAppointment);
        return convertToDTO(updatedAppointment);
    }

    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new RuntimeException("Appointment not found with id: " + id);
        }
        appointmentRepository.deleteById(id);
    }

    private AppointmentDTO convertToDTO(Appointment appointment) {
        return AppointmentDTO.builder()
                .id(appointment.getId())
                .appointmentTime(appointment.getAppointmentTime())
                .reason(appointment.getReason())
                .patientId(appointment.getPatient() != null ? appointment.getPatient().getId() : null)
                .doctorId(appointment.getDoctor() != null ? appointment.getDoctor().getId() : null)
                .patientName(appointment.getPatient() != null ? appointment.getPatient().getName() : null)
                .doctorName(appointment.getDoctor() != null ? appointment.getDoctor().getName() : null)
                .build();
    }

    private Appointment convertToEntity(AppointmentDTO appointmentDTO) {
        Appointment appointment = Appointment.builder()
                .appointmentTime(appointmentDTO.getAppointmentTime())
                .reason(appointmentDTO.getReason())
                .build();
        
        if (appointmentDTO.getPatientId() != null) {
            appointment.setPatient(patientRepository.findById(appointmentDTO.getPatientId())
                    .orElseThrow(() -> new RuntimeException("Patient not found with id: " + appointmentDTO.getPatientId())));
        }
        
        if (appointmentDTO.getDoctorId() != null) {
            appointment.setDoctor(doctorRepository.findById(appointmentDTO.getDoctorId())
                    .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + appointmentDTO.getDoctorId())));
        }
        
        return appointment;
    }
}
