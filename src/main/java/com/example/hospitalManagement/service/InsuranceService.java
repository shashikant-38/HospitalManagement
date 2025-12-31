package com.example.hospitalManagement.service;

import com.example.hospitalManagement.Entity.Insurance;
import com.example.hospitalManagement.dto.InsuranceDTO;
import com.example.hospitalManagement.repository.InsuranceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InsuranceService {

    private final InsuranceRepository insuranceRepository;

    public List<InsuranceDTO> getAllInsurances() {
        return insuranceRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public InsuranceDTO getInsuranceById(Long id) {
        Insurance insurance = insuranceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Insurance not found with id: " + id));
        return convertToDTO(insurance);
    }

    public InsuranceDTO createInsurance(InsuranceDTO insuranceDTO) {
        Insurance insurance = convertToEntity(insuranceDTO);
        Insurance savedInsurance = insuranceRepository.save(insurance);
        return convertToDTO(savedInsurance);
    }

    public InsuranceDTO updateInsurance(Long id, InsuranceDTO insuranceDTO) {
        Insurance existingInsurance = insuranceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Insurance not found with id: " + id));
        
        existingInsurance.setPolicyNumber(insuranceDTO.getPolicyNumber());
        existingInsurance.setProvider(insuranceDTO.getProvider());
        existingInsurance.setValidUntil(insuranceDTO.getValidUntil());
        
        Insurance updatedInsurance = insuranceRepository.save(existingInsurance);
        return convertToDTO(updatedInsurance);
    }

    public void deleteInsurance(Long id) {
        if (!insuranceRepository.existsById(id)) {
            throw new RuntimeException("Insurance not found with id: " + id);
        }
        insuranceRepository.deleteById(id);
    }

    private InsuranceDTO convertToDTO(Insurance insurance) {
        return InsuranceDTO.builder()
                .id(insurance.getId())
                .policyNumber(insurance.getPolicyNumber())
                .provider(insurance.getProvider())
                .validUntil(insurance.getValidUntil())
                .createdAt(insurance.getCreatedAt())
                .build();
    }

    private Insurance convertToEntity(InsuranceDTO insuranceDTO) {
        return Insurance.builder()
                .policyNumber(insuranceDTO.getPolicyNumber())
                .provider(insuranceDTO.getProvider())
                .validUntil(insuranceDTO.getValidUntil())
                .build();
    }
}
