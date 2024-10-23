'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { register } from '@/services/auth';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });
  const router = useRouter();

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
    const newErrors = { username: '', email: '', password: '' };

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required!';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required!';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid!';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required!';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters!';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await register(formData.email, formData.password, formData.username);
        router.push('/login');
      } catch (error) {
        console.log(error);
        setErrors(prevErrors => ({
          ...prevErrors,
          email: 'Registration failed. Please try again.',
        }));
      }
    }
  };

  return (
    <Paper elevation={3} className="p-8 w-full max-w-md mx-auto rounded-xl shadow-lg">
      <Typography component="h1" variant="h4" className="mb-6 text-center font-bold text-gray-800">
        Create Account
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate className="space-y-4">
        <TextField
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={formData.username}
          onChange={handleChange}
          error={!!errors.username}
          helperText={errors.username}
          variant="outlined"
          InputProps={{
            className: "rounded-lg",
          }}
        />
        <TextField
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
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
          autoComplete="new-password"
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
          className="mt-6 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white py-3 rounded-lg transition duration-300 font-semibold text-lg shadow-md"
        >
          Sign Up
        </Button>
      </Box>
    </Paper>
  );
}
