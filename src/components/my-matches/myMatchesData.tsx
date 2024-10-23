'use client';

import { Fragment, useEffect, useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';

interface Match {
  id: string;
  email: string;
  username: string;
}

export default function MyMatchesData() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const storedMatches = localStorage.getItem('matches');
    if (storedMatches) {
      const parsedMatches = JSON.parse(storedMatches);
      const filteredMatches = parsedMatches.filter((match: Match) => match.id !== user.id);
      setMatches(filteredMatches);
    }
  }, []);

  return (
    <Box className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md">
      <Typography component="h1" variant="h4" className="mb-6 text-indigo-600">
        My Matches
      </Typography>
      {matches.length > 0 ? (
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
                      <span className="font-semibold">{match.email}</span>
                    </Typography>
                  }
                />
              </ListItem>
              {index < matches.length - 1 && <Divider variant="inset" component="li" />}
            </Fragment>
          ))}
        </List>
      ) : (
        <Typography variant="body1" className="text-gray-600">
          No matches found.
        </Typography>
      )}
    </Box>
  );
}