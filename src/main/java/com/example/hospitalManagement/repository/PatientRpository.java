package com.example.hospitalManagement.repository;

import com.example.hospitalManagement.Entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRpository extends JpaRepository<Patient, Long> {
}
