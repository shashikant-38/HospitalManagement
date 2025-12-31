import React from 'react';
import { Box, Typography, Container, Grid, Link } from '@mui/material';
import { LocalHospital, Phone, Email, LocationOn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.dark',
        color: 'white',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocalHospital sx={{ mr: 1, fontSize: 32 }} />
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                Vivekanand Hospital
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Providing exceptional healthcare services with compassion and excellence.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/patients" color="inherit" underline="hover">
                Patients
              </Link>
              <Link href="/doctors" color="inherit" underline="hover">
                Doctors
              </Link>
              <Link href="/appointments" color="inherit" underline="hover">
                Appointments
              </Link>
              <Link href="/departments" color="inherit" underline="hover">
                Departments
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ mr: 1, fontSize: 16 }} />
                <Typography variant="body2">+91 9876543210</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ mr: 1, fontSize: 16 }} />
                <Typography variant="body2">info@vivekanandhospital.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ mr: 1, fontSize: 16 }} />
                <Typography variant="body2">123 Medical Street, Health City</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 3, pt: 2 }}>
          <Typography variant="body2" align="center">
            © 2024 Vivekanand Hospital. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

