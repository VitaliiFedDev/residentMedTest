'use client';


import RegisterForm from '@/components/auth/RegisterForm';
import { Container, Box } from '@mui/material';

export default function Register() {
  return (
    <Container component="main" maxWidth="xs" className="mt-8">
      <Box className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md">
        <RegisterForm />
      </Box>
    </Container>
  );
}
