'use client';
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { createUserData } from '@/services/userData';

export default function UserDataForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    specialization: '',
    yearOfStudy: '',
    state: '',
    city: '',
    radius: '',
  });
  const [errors, setErrors] = useState({
    specialization: '',
    yearOfStudy: '',
    state: '',
    city: '',
    radius: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: unknown } }) => {
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
    const newErrors = { ...errors };

    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData]) {
        newErrors[key as keyof typeof errors] = 'This field is required';
        isValid = false;
      }
    });

    if (formData.radius && isNaN(Number(formData.radius))) {
      newErrors.radius = 'Radius must be a number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
    try {
      const userId = JSON.parse(localStorage.getItem('user')!).id;
      
      if (!userId) {
        console.error('User ID not found');
        return;
      }

      const response = await createUserData(
        formData.yearOfStudy,
        formData.specialization,
        formData.state,
        formData.city,
        Number(formData.radius),
        userId
      );

      localStorage.setItem('matches', JSON.stringify(response.userData));
      console.log('Matches founded:', response);
      router.push('/my-matches');
    } catch (error) {
      console.error('Matches error:', error);
    }
} 
  };

  return (
    <Box className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md">
      <Typography component="h1" variant="h4" className="mb-6 text-purple-600">
        Find Your Match
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate className="w-full">
        <TextField
          margin="normal"
          required
          fullWidth
          id="specialization"
          label="Specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          error={!!errors.specialization}
          helperText={errors.specialization}
          className="mb-4"
        />
        <FormControl fullWidth margin="normal" className="mb-4" error={!!errors.yearOfStudy}>
          <InputLabel id="yearOfStudy-label">Year of Study *</InputLabel>
          <Select
            labelId="yearOfStudy-label"
            id="yearOfStudy"
            name="yearOfStudy"
            value={formData.yearOfStudy}
            label="Year of Study *"
            onChange={handleChange}
            required
          >
            <MenuItem value="1">1st Year</MenuItem>
            <MenuItem value="2">2nd Year</MenuItem>
            <MenuItem value="3">3rd Year</MenuItem>
            <MenuItem value="4">4th Year</MenuItem>
            <MenuItem value="5">5th Year</MenuItem>
          </Select>
          {errors.yearOfStudy && <Typography color="error" variant="caption">{errors.yearOfStudy}</Typography>}
        </FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          id="state"
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          error={!!errors.state}
          helperText={errors.state}
          className="mb-4"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="city"
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          error={!!errors.city}
          helperText={errors.city}
          className="mb-4"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="radius"
          label="Radius (km)"
          name="radius"
          type="number"
          value={formData.radius}
          onChange={handleChange}
          error={!!errors.radius}
          helperText={errors.radius}
          className="mb-6"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-full transition duration-300"
        >
          Find Matches
        </Button>
      </Box>
    </Box>
  );
}