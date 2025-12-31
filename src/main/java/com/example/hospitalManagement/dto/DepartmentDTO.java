package com.example.hospitalManagement.dto;

import lombok.*;

import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentDTO {
    private Long id;
    private String name;
    private Long headDoctorId;
    private Set<Long> doctorIds;
}
