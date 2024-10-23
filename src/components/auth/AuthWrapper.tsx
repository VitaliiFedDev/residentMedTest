'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Box, Button, Container } from '@mui/material';
import Navigation from '@/components/home/Navigation';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      const isAuth = !!user;
      setIsAuthenticated(isAuth);

      if (isAuth && (pathname === '/login' || pathname === '/register')) {
        router.push('/dashboard');
      } else if (!isAuth && pathname === '/dashboard') {
        router.push('/login');
      }
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, [router, pathname]);

  if (!isAuthenticated && (pathname === '/login' || pathname === '/register')) {
    return (
      <Container component="main" maxWidth="xs" className="mt-10">
        <Box className="flex flex-col items-center">
          {pathname === '/login' ? <LoginForm /> : <RegisterForm />}
          <Button
            onClick={() => router.push(pathname === '/login' ? '/register' : '/login')}
            variant="text"
            className="mt-4 text-blue-600 hover:text-blue-800"
            sx={{ textTransform: 'none' }}
          >
            {pathname === '/login' ? 'Need to register?' : 'Already have an account?'}
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <>
      <Navigation isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      {children}
    </>
  );
};

export default AuthWrapper;
