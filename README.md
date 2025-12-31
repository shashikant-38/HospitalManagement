# Hospital Management System

A comprehensive Spring Boot REST API for managing hospital operations including patients, doctors, departments, appointments, and insurance information.

## 🏥 Project Overview

This Hospital Management System provides a complete backend solution for managing:
- **Patients** with personal information and insurance details
- **Doctors** with specializations and department assignments
- **Departments** with head doctors and staff
- **Appointments** scheduling between patients and doctors
- **Insurance** policies and coverage information

## 🚀 Features

- ✅ Complete CRUD operations for all entities
- ✅ RESTful API design with proper HTTP status codes
- ✅ Data validation with comprehensive error handling
- ✅ CORS enabled for frontend integration
- ✅ PostgreSQL database integration
- ✅ Lombok for clean code
- ✅ DTO pattern for API responses
- ✅ Global exception handling

## 🛠️ Technology Stack

- **Backend**: Spring Boot 3.5.6
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA with Hibernate
- **Validation**: Bean Validation (Jakarta)
- **Build Tool**: Maven
- **Java Version**: 17




### 1. Database Setup

Create a PostgreSQL database:
```sql
CREATE DATABASE hospitalDB;
```

Update `application.properties` with your database credentials:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/hospitalDB
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 2. Run the Application

```bash
# Navigate to project directory
cd hospitalManagement

# Run the application
./mvnw spring-boot:run
```

The application will start on `http://localhost:8080`

## 📚 API Endpoints

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/{id}` - Get patient by ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/{id}` - Update patient
- `DELETE /api/patients/{id}` - Delete patient

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/{id}` - Get doctor by ID
- `POST /api/doctors` - Create new doctor
- `PUT /api/doctors/{id}` - Update doctor
- `DELETE /api/doctors/{id}` - Delete doctor

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/{id}` - Get department by ID
- `POST /api/departments` - Create new department
- `PUT /api/departments/{id}` - Update department
- `DELETE /api/departments/{id}` - Delete department

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/{id}` - Get appointment by ID
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/{id}` - Update appointment
- `DELETE /api/appointments/{id}` - Delete appointment

### Insurance
- `GET /api/insurances` - Get all insurance policies
- `GET /api/insurances/{id}` - Get insurance by ID
- `POST /api/insurances` - Create new insurance
- `PUT /api/insurances/{id}` - Update insurance
- `DELETE /api/insurances/{id}` - Delete insurance

## 🎨 Frontend Development Guide

### Recommended Frontend Technologies

#### Option 1: React.js
```bash
# Create React app
npx create-react-app hospital-frontend
cd hospital-frontend

# Install additional dependencies
npm install axios react-router-dom @mui/material @emotion/react @emotion/styled
```

#### Option 2: Vue.js
```bash
# Create Vue app
npm create vue@latest hospital-frontend
cd hospital-frontend
npm install

# Install additional dependencies
npm install axios vue-router @element-plus/icons-vue
```

#### Option 3: Angular
```bash
# Create Angular app
ng new hospital-frontend
cd hospital-frontend

# Install additional dependencies
npm install @angular/material @angular/cdk
```

### Frontend Integration Steps

1. **Install HTTP Client Library** (axios for React/Vue, HttpClient for Angular)
2. **Create API Service Layer** to handle HTTP requests
3. **Implement CRUD Operations** for each entity
4. **Add Form Validation** matching backend validation rules
5. **Create Responsive UI Components** for data display and forms
6. **Implement Routing** for navigation between pages
7. **Add Error Handling** for API responses

### Sample API Service (React/JavaScript)

```javascript
// api/patientService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const patientService = {
  getAllPatients: () => axios.get(`${API_BASE_URL}/patients`),
  getPatientById: (id) => axios.get(`${API_BASE_URL}/patients/${id}`),
  createPatient: (patient) => axios.post(`${API_BASE_URL}/patients`, patient),
  updatePatient: (id, patient) => axios.put(`${API_BASE_URL}/patients/${id}`, patient),
  deletePatient: (id) => axios.delete(`${API_BASE_URL}/patients/${id}`)
};
```

## 🧪 Testing with Postman

### Import Postman Collection

1. Open Postman
2. Click "Import" button
3. Import the provided collection JSON file
4. Set environment variables:
   - `baseUrl`: `http://localhost:8080`

### Sample API Requests

#### Create Patient
```json
POST {{baseUrl}}/api/patients
Content-Type: application/json

{
  "name": "John Doe",
  "birthDate": "1990-05-15",
  "email": "john.doe@email.com",
  "gender": "MALE",
  "phoneNumber": "+1234567890"
}
```

#### Create Doctor
```json
POST {{baseUrl}}/api/doctors
Content-Type: application/json

{
  "name": "Dr. Jane Smith",
  "specialization": "Cardiology",
  "email": "jane.smith@hospital.com"
}
```

#### Create Appointment
```json
POST {{baseUrl}}/api/appointments
Content-Type: application/json

{
  "appointmentTime": "2024-02-15T10:30:00",
  "reason": "Regular checkup",
  "patientId": 1,
  "doctorId": 1
}
```

## 🔧 Configuration

### Database Configuration
The application uses PostgreSQL with the following default settings:
- Database: `hospitalDB`
- Username: `postgres`
- Password: `123`
- Port: `5432`

### CORS Configuration
CORS is enabled for all origins (`*`) to allow frontend integration.

## 📝 Data Models

### Patient
- ID, Name, Birth Date, Email, Gender, Phone Number
- One-to-One relationship with Insurance
- One-to-Many relationship with Appointments

### Doctor
- ID, Name, Specialization, Email
- Many-to-Many relationship with Departments

### Department
- ID, Name, Head Doctor
- Many-to-Many relationship with Doctors

### Appointment
- ID, Appointment Time, Reason
- Many-to-One relationship with Patient and Doctor

### Insurance
- ID, Policy Number, Provider, Valid Until, Created At
- One-to-One relationship with Patient

## 🚀 Deployment

### Docker Deployment
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/hospitalManagement-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### Production Configuration
Update `application.properties` for production:
```properties
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
logging.level.org.springframework.web=INFO
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please create an issue in the repository or contact the development team.
