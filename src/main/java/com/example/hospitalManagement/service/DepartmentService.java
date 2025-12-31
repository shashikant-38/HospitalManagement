package com.example.hospitalManagement.service;

import com.example.hospitalManagement.Entity.Department;
import com.example.hospitalManagement.dto.DepartmentDTO;
import com.example.hospitalManagement.repository.DepartmentRepository;
import com.example.hospitalManagement.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final DoctorRepository doctorRepository;

    public List<DepartmentDTO> getAllDepartments() {
        return departmentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public DepartmentDTO getDepartmentById(Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));
        return convertToDTO(department);
    }

    public DepartmentDTO createDepartment(DepartmentDTO departmentDTO) {
        Department department = convertToEntity(departmentDTO);
        Department savedDepartment = departmentRepository.save(department);
        return convertToDTO(savedDepartment);
    }

    public DepartmentDTO updateDepartment(Long id, DepartmentDTO departmentDTO) {
        Department existingDepartment = departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));
        
        existingDepartment.setName(departmentDTO.getName());
        
        if (departmentDTO.getHeadDoctorId() != null) {
            existingDepartment.setHeadDoctor(doctorRepository.findById(departmentDTO.getHeadDoctorId())
                    .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + departmentDTO.getHeadDoctorId())));
        }
        
        Department updatedDepartment = departmentRepository.save(existingDepartment);
        return convertToDTO(updatedDepartment);
    }

    public void deleteDepartment(Long id) {
        if (!departmentRepository.existsById(id)) {
            throw new RuntimeException("Department not found with id: " + id);
        }
        departmentRepository.deleteById(id);
    }

    private DepartmentDTO convertToDTO(Department department) {
        return DepartmentDTO.builder()
                .id(department.getId())
                .name(department.getName())
                .headDoctorId(department.getHeadDoctor() != null ? department.getHeadDoctor().getId() : null)
                .build();
    }

    private Department convertToEntity(DepartmentDTO departmentDTO) {
        Department department = Department.builder()
                .name(departmentDTO.getName())
                .build();
        
        if (departmentDTO.getHeadDoctorId() != null) {
            department.setHeadDoctor(doctorRepository.findById(departmentDTO.getHeadDoctorId())
                    .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + departmentDTO.getHeadDoctorId())));
        }
        
        return department;
    }
}
