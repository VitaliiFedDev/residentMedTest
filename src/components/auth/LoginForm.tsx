'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { login } from '@/services/auth';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    if (message === 'registration_success') {
      setSuccessMessage('Registration successful! Please log in.');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await login(formData.email, formData.password);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('authToken', 'dummy_token');
        window.dispatchEvent(new Event('storage'));
        router.push('/dashboard');
      } catch (error) {
        console.log(error);
        setErrors(prevErrors => ({
          ...prevErrors,
          email: 'Invalid email or password',
          password: 'Invalid email or password'
        }));
      }
    }
  };

  return (
    <Paper elevation={3} className="p-8 w-full max-w-md mx-auto rounded-xl shadow-lg">
      <Typography component="h1" variant="h4" className="mb-6 text-center font-bold text-gray-800">
        Welcome Back
      </Typography>
      {successMessage && (
        <Typography className="mb-4 text-center text-green-600">
          {successMessage}
        </Typography>
      )}
      <Box component="form" onSubmit={handleSubmit} noValidate className="space-y-4">
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          variant="outlined"
          InputProps={{
            className: "rounded-lg",
          }}
        />
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          variant="outlined"
          InputProps={{
            className: "rounded-lg",
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="mt-6 bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white py-3 rounded-lg transition duration-300 font-semibold text-lg shadow-md"
        >
          Sign In
        </Button>
      </Box>
    </Paper>
  );
}
