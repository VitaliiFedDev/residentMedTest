'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Login from '@/app/login/page';
import Register from '@/app/register/page';
import { Box, Button, Container } from '@mui/material';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return (
      <Container component="main" maxWidth="xs" className="mt-8">
        <Box className="flex flex-col items-center">
          {showLogin ? <Login /> : <Register />}
          <Button
            onClick={() => setShowLogin(!showLogin)}
            variant="text"
            className="mt-4 text-blue-600 hover:text-blue-800"
            sx={{ textTransform: 'none' }}
          >
            {showLogin ? 'Need to register?' : 'Already have an account?'}
          </Button>
        </Box>
      </Container>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
