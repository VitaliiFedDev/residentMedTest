
'use client';

import UserDataForm from '@/components/userData/userDataForm';
import { Container } from '@mui/material';

export default function Home() {

  return (
    <Container component="main" maxWidth="sm" className="mt-8">
      <UserDataForm />
    </Container>
  );
}
