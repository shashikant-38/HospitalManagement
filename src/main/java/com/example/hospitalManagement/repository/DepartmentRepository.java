package com.example.hospitalManagement.repository;

import com.example.hospitalManagement.Entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}