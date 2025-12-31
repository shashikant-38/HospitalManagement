package com.example.hospitalManagement.service;

import com.example.hospitalManagement.Entity.Patient;
import com.example.hospitalManagement.dto.PatientDTO;
import com.example.hospitalManagement.repository.PatientRpository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRpository patientRepository;

    public List<PatientDTO> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PatientDTO getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
        return convertToDTO(patient);
    }

    public PatientDTO createPatient(PatientDTO patientDTO) {
        try {
            System.out.println("Creating patient with DTO: " + patientDTO);
            Patient patient = convertToEntity(patientDTO);
            System.out.println("Converted to entity: " + patient);
            Patient savedPatient = patientRepository.save(patient);
            System.out.println("Saved patient: " + savedPatient);
            PatientDTO result = convertToDTO(savedPatient);
            System.out.println("Converted back to DTO: " + result);
            return result;
        } catch (Exception e) {
            System.err.println("Error in createPatient: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    public PatientDTO updatePatient(Long id, PatientDTO patientDTO) {
        Patient existingPatient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
        
        existingPatient.setName(patientDTO.getName());
        existingPatient.setBirthDate(patientDTO.getBirthDate());
        existingPatient.setEmail(patientDTO.getEmail());
        existingPatient.setGender(patientDTO.getGender());
        existingPatient.setPhoneNumber(patientDTO.getPhoneNumber());
        
        Patient updatedPatient = patientRepository.save(existingPatient);
        return convertToDTO(updatedPatient);
    }

    public void deletePatient(Long id) {
        if (!patientRepository.existsById(id)) {
            throw new RuntimeException("Patient not found with id: " + id);
        }
        patientRepository.deleteById(id);
    }

    private PatientDTO convertToDTO(Patient patient) {
        return PatientDTO.builder()
                .id(patient.getId())
                .name(patient.getName())
                .birthDate(patient.getBirthDate())
                .email(patient.getEmail())
                .gender(patient.getGender())
                .phoneNumber(patient.getPhoneNumber())
                .build();
    }

    private Patient convertToEntity(PatientDTO patientDTO) {
        return Patient.builder()
                .name(patientDTO.getName())
                .birthDate(patientDTO.getBirthDate())
                .email(patientDTO.getEmail())
                .gender(patientDTO.getGender())
                .phoneNumber(patientDTO.getPhoneNumber())
                .insurance(null) // Set insurance to null initially
                .build();
    }
}
