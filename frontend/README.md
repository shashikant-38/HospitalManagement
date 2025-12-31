# Vivekanand Hospital - Frontend

A professional, minimalist React frontend for the Hospital Management System.

## 🎨 Features

- **Professional Design**: Clean, minimalist interface with medical theme
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Complete CRUD Operations**: Manage patients, doctors, appointments, and departments
- **Material-UI Components**: Professional UI components
- **Real-time Data**: Live updates from backend API

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Backend API running on `http://localhost:8080`

### Installation & Setup

1. **Navigate to frontend directory:**
   ```bash
   cd hospitalManagement/frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Layout.js          # Main layout with sidebar
│   │   ├── Header.js          # Top header component
│   │   └── Footer.js          # Footer component
│   ├── pages/
│   │   ├── Dashboard.js       # Dashboard with stats
│   │   ├── Patients.js        # Patient management
│   │   ├── Doctors.js         # Doctor management
│   │   ├── Appointments.js     # Appointment scheduling
│   │   └── Departments.js     # Department management
│   ├── services/
│   │   └── api.js             # API service layer
│   ├── App.js                 # Main app component
│   └── index.js               # Entry point
├── package.json
└── README.md
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Professional Blue (#1976d2)
- **Secondary**: Medical Red (#dc004e)
- **Background**: Light Gray (#f5f5f5)
- **Text**: Dark Gray (#212121)

### Components
- **Responsive Sidebar**: Collapsible navigation
- **Data Tables**: Sortable, searchable tables
- **Forms**: Validation with error handling
- **Cards**: Clean information display
- **Dialogs**: Modal forms for CRUD operations

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔗 API Integration

The frontend connects to the Spring Boot backend:
- **Base URL**: `http://localhost:8080/api`
- **CORS**: Enabled for cross-origin requests
- **Authentication**: Ready for future auth implementation

## 🎯 Key Features

### Dashboard
- Real-time statistics
- Quick action cards
- Visual data representation

### Patient Management
- Add/Edit/Delete patients
- Form validation
- Data table with actions

### Doctor Management
- Doctor profiles
- Specialization tracking
- Contact information

### Appointment Scheduling
- Date/time picker
- Patient-Doctor assignment
- Reason tracking

### Department Management
- Department creation
- Head doctor assignment
- Organizational structure

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
- Upload `build/` folder to your hosting service
- Configure environment variables
- Set up API proxy if needed

## 🔧 Environment Configuration

Create `.env` file for custom configuration:
```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_APP_NAME=Vivekanand Hospital
```

## 📞 Support

For technical support or questions:
- Check the backend API documentation
- Review the console for error messages
- Ensure backend is running on port 8080

## 🎨 Customization

### Theme Colors
Edit `src/index.js` to customize colors:
```javascript
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    // ... other colors
  },
});
```

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.js`
3. Add navigation item in `src/components/Layout.js`

---

**Vivekanand Hospital** - Professional Healthcare Management System

