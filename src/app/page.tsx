'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Container, Typography, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
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
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data:', formData);
    router.push('/my-matches');
  };

  return (
    <Container component="main" maxWidth="sm" className="mt-8">
      <Box
        className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md"
      >
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
            className="mb-4"
          />
          <FormControl fullWidth margin="normal" className="mb-4">
            <InputLabel id="yearOfStudy-label">Year of Study</InputLabel>
            <Select
              labelId="yearOfStudy-label"
              id="yearOfStudy"
              name="yearOfStudy"
              value={formData.yearOfStudy}
              label="Year of Study"
              onChange={handleChange}
            >
              <MenuItem value={1}>1st Year</MenuItem>
              <MenuItem value={2}>2nd Year</MenuItem>
              <MenuItem value={3}>3rd Year</MenuItem>
              <MenuItem value={4}>4th Year</MenuItem>
              <MenuItem value={5}>5th Year</MenuItem>
            </Select>
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
    </Container>
  );
}
