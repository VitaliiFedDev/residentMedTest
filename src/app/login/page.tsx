'use client';


import LoginForm from '@/components/auth/LoginForm';
import { Container, Box } from '@mui/material';

export default function Login() {
  return (
    <Container component="main" maxWidth="xs" className="mt-8">
      <Box className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md">
        <LoginForm />
      </Box>
    </Container>
  );
}
