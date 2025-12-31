package com.example.hospitalManagement.service;

import com.example.hospitalManagement.Entity.Doctor;
import com.example.hospitalManagement.dto.DoctorDTO;
import com.example.hospitalManagement.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public List<DoctorDTO> getAllDoctors() {
        return doctorRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public DoctorDTO getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
        return convertToDTO(doctor);
    }

    public DoctorDTO createDoctor(DoctorDTO doctorDTO) {
        Doctor doctor = convertToEntity(doctorDTO);
        Doctor savedDoctor = doctorRepository.save(doctor);
        return convertToDTO(savedDoctor);
    }

    public DoctorDTO updateDoctor(Long id, DoctorDTO doctorDTO) {
        Doctor existingDoctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
        
        existingDoctor.setName(doctorDTO.getName());
        existingDoctor.setSpecialization(doctorDTO.getSpecialization());
        existingDoctor.setEmail(doctorDTO.getEmail());
        
        Doctor updatedDoctor = doctorRepository.save(existingDoctor);
        return convertToDTO(updatedDoctor);
    }

    public void deleteDoctor(Long id) {
        if (!doctorRepository.existsById(id)) {
            throw new RuntimeException("Doctor not found with id: " + id);
        }
        doctorRepository.deleteById(id);
    }

    private DoctorDTO convertToDTO(Doctor doctor) {
        return DoctorDTO.builder()
                .id(doctor.getId())
                .name(doctor.getName())
                .specialization(doctor.getSpecialization())
                .email(doctor.getEmail())
                .build();
    }

    private Doctor convertToEntity(DoctorDTO doctorDTO) {
        return Doctor.builder()
                .name(doctorDTO.getName())
                .specialization(doctorDTO.getSpecialization())
                .email(doctorDTO.getEmail())
                .build();
    }
}
