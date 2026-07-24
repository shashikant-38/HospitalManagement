# 🏥 Hospital Management System

A scalable backend application built with **Spring Boot** that streamlines hospital operations by managing patients, doctors, departments, appointments, and insurance records through RESTful APIs.

## 🚀 Features

- 👤 Patient Management
  - Register, update, delete, and retrieve patient records
  - Manage patient insurance details

- 👨‍⚕️ Doctor Management
  - Add and manage doctor profiles
  - Assign doctors to departments and specializations

- 🏥 Department Management
  - Create and manage hospital departments
  - Assign department heads

- 📅 Appointment Management
  - Schedule, update, and cancel appointments
  - Track patient-doctor interactions

- 🛡️ Insurance Management
  - Store and manage patient insurance information

## 🛠️ Tech Stack

- Java 17
- Spring Boot 3.5.6
- Spring Data JPA
- Hibernate
- PostgreSQL
- Maven
- Lombok
- Jakarta Validation

## 🏗️ Architecture

- RESTful API Design
- Layered Architecture (Controller → Service → Repository)
- DTO-based Request & Response
- Global Exception Handling
- Bean Validation
- CORS Configuration

## 📚 REST API

### Patient APIs
- Create Patient
- Get Patient by ID
- Get All Patients
- Update Patient
- Delete Patient

### Doctor APIs
- Create Doctor
- Get Doctor Details
- Update Doctor
- Delete Doctor

### Department APIs
- Create Department
- Get Department Details
- Update Department
- Delete Department

### Appointment APIs
- Schedule Appointment
- Update Appointment
- Cancel Appointment
- View Appointment Details

### Insurance APIs
- Add Insurance
- Update Insurance
- Delete Insurance
- Retrieve Insurance Details

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/<your-username>/Hospital-Management-System.git
cd Hospital-Management-System
```

### 2. Create Database

```sql
CREATE DATABASE hospitaldb;
```

### 3. Configure Database

Update `application.properties`

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/hospitaldb
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 4. Run Application

```bash
mvn spring-boot:run
```

Application starts at:

```
http://localhost:8080
```

## 🧪 API Testing

Test APIs using **Postman** or any REST client.

Example endpoints:

```http
GET    /api/patients
POST   /api/patients
PUT    /api/patients/{id}
DELETE /api/patients/{id}

GET    /api/doctors
POST   /api/doctors

GET    /api/departments
POST   /api/departments

GET    /api/appointments
POST   /api/appointments
```

## 📂 Project Structure

```
src
 ├── controller
 ├── service
 ├── repository
 ├── entity
 ├── dto
 ├── exception
 ├── config
 └── HospitalManagementApplication.java
```

## 🚀 Future Enhancements

- JWT Authentication & Authorization
- Role-Based Access Control (RBAC)
- Swagger/OpenAPI Documentation
- Docker Support
- Unit & Integration Testing
- CI/CD Pipeline
- Email Notifications
- Appointment Reminder System
- Microservices Architecture
- Redis Caching

## 👨‍💻 Author

**Shashikant Patil**

- GitHub: https://github.com/shashikant-38
- LinkedIn: *(Add your LinkedIn profile)*
