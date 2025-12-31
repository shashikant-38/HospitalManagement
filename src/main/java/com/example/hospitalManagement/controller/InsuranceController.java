package com.example.hospitalManagement.controller;

import com.example.hospitalManagement.dto.InsuranceDTO;
import com.example.hospitalManagement.service.InsuranceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insurances")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class InsuranceController {

    private final InsuranceService insuranceService;

    @GetMapping
    public ResponseEntity<List<InsuranceDTO>> getAllInsurances() {
        List<InsuranceDTO> insurances = insuranceService.getAllInsurances();
        return ResponseEntity.ok(insurances);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InsuranceDTO> getInsuranceById(@PathVariable Long id) {
        try {
            InsuranceDTO insurance = insuranceService.getInsuranceById(id);
            return ResponseEntity.ok(insurance);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<InsuranceDTO> createInsurance(@RequestBody InsuranceDTO insuranceDTO) {
        try {
            InsuranceDTO createdInsurance = insuranceService.createInsurance(insuranceDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdInsurance);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<InsuranceDTO> updateInsurance(@PathVariable Long id, @RequestBody InsuranceDTO insuranceDTO) {
        try {
            InsuranceDTO updatedInsurance = insuranceService.updateInsurance(id, insuranceDTO);
            return ResponseEntity.ok(updatedInsurance);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInsurance(@PathVariable Long id) {
        try {
            insuranceService.deleteInsurance(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
