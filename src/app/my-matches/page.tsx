'use client';

import { Fragment, useEffect, useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';

interface Match {
  id: string;
  username: string;
  specialization: string;
  yearOfStudy: string;
  location: string;
}

export default function MyMatches() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    // Here you would typically fetch matches from your backend
    // For demonstration, we'll use mock data
    const mockMatches: Match[] = [
      { id: '1', username: 'user1', specialization: 'Computer Science', yearOfStudy: '3', location: 'New York, NY' },
      { id: '2', username: 'user2', specialization: 'Biology', yearOfStudy: '2', location: 'Los Angeles, CA' },
      { id: '3', username: 'user3', specialization: 'Physics', yearOfStudy: '4', location: 'Chicago, IL' },
    ];
    setMatches(mockMatches);
  }, []);

  return (
    <Container component="main" maxWidth="md" className="mt-8">
      <Box
        className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md"
      >
        <Typography component="h1" variant="h4" className="mb-6 text-indigo-600">
          My Matches
        </Typography>
        <List className="w-full bg-gray-50 rounded-md">
          {matches.map((match, index) => (
            <Fragment key={match.id}>
              <ListItem alignItems="flex-start" className="hover:bg-gray-100 transition duration-300">
                <ListItemText
                  primary={
                    <Typography variant="h6" className="text-indigo-700">
                      {match.username}
                    </Typography>
                  }
                  secondary={
                    <Typography component="span" variant="body2" className="text-gray-600">
                      <span className="font-semibold">{match.specialization}</span>
                      {` — Year of Study: ${match.yearOfStudy}, Location: ${match.location}`}
                    </Typography>
                  }
                />
              </ListItem>
              {index < matches.length - 1 && <Divider variant="inset" component="li" />}
            </Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
}
