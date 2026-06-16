# Hospital Management System

A Spring Boot REST API for managing hospital operations, including patients, doctors, departments, appointments, and insurance information.

## 🏥 Overview

This project provides a backend solution for hospital management with support for:

* Patient Management
* Doctor Management
* Department Management
* Appointment Scheduling
* Insurance Management

## 🚀 Features

* CRUD operations for all entities
* RESTful API architecture
* Data validation and exception handling
* PostgreSQL database integration
* DTO-based API responses
* Global exception handling
* CORS support for frontend integration

## 🛠️ Tech Stack

* Java 17
* Spring Boot 3.5.6
* Spring Data JPA
* Hibernate
* PostgreSQL
* Maven
* Lombok

## 📚 API Modules

### Patient Management

* Create, update, delete, and retrieve patient records
* Manage patient insurance information

### Doctor Management

* Manage doctor profiles and specializations
* Assign doctors to departments

### Appointment Management

* Schedule appointments
* Track patient-doctor interactions

### Department Management

* Manage hospital departments
* Assign department heads and staff

## 🔧 Setup

### Database

```sql
CREATE DATABASE hospitalDB;
```

Update database credentials in `application.properties`.

### Run Application

```bash
mvn spring-boot:run
```

Application runs at:

```text
http://localhost:8080
```

## 🧪 Testing

Use Postman to test all REST endpoints.

Example:

```http
GET /api/patients
POST /api/doctors
PUT /api/appointments/{id}
DELETE /api/departments/{id}
```

## 🚀 Future Improvements

* JWT Authentication & Authorization
* Role-Based Access Control
* Docker Containerization
* API Documentation with Swagger/OpenAPI
* CI/CD Pipeline
* Microservices Migration

## 👨‍💻 Author

Shashikant Patil
