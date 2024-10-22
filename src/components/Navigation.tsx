'use client';

import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const Navigation = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.reload();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Test App
        </Typography>
        <Button color="inherit" onClick={() => router.push('/')}>
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
