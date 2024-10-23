'use client';

import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

interface NavigationProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const Navigation = ({ isAuthenticated, setIsAuthenticated }: NavigationProps) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('matches');
    setIsAuthenticated(false);
    router.push('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Test App
        </Typography>
        <Button color="inherit" onClick={() => router.push('/dashboard')}>
          Home
        </Button>
        <Button color="inherit" onClick={() => router.push('/my-matches')}>
          My Matches
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
