package com.example.hospitalManagement.Entity;

import jakarta.persistence.*;
import lombok.*;

import javax.print.Doc;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Appointment {

     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long id;

     @Column(nullable = false)
     private LocalDateTime appointmentTime;

     @Column(length = 500)
     private String reason;

     @ManyToOne
     @JoinColumn(name="patient_id" ,nullable=false)
     private Patient patient;

     @ManyToOne
     @JoinColumn(nullable = false)
     private Doctor doctor;
}