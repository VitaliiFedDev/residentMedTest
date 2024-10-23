'use client';

import MyMatchesData from "@/components/my-matches/myMatchesData";
import { Container } from "@mui/material";


export default function MyMatches() {

  return (
    <Container component="main" maxWidth="md" className="mt-8">
      <MyMatchesData />
    </Container>
  );
}
