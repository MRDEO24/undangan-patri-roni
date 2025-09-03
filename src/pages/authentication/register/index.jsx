import { Box, Button, FormControl, FormLabel, Input, Heading, Text } from '@chakra-ui/react';
import { formDataToJson } from '../../../utils/object';
import useAuthContext from '../../../hooks/useAuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

function PageRegister() {
  const [register, isAuthenticated] = useAuthContext((s) => [s.register, s.isAuthenticated, s.isLoading]);
  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = formDataToJson(new FormData(event.target));
    register(form, {
      onSuccess: () => navigate('/authentication/login'),
    });
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Box p="2rem">
      <Heading mb={2}>Register</Heading>
      

      <form onSubmit={onSubmit}>
        <FormControl isRequired>
          <FormLabel>Nama</FormLabel>
          <Input placeholder="Nama" name="name" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email" type="email" name="email" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input placeholder="Password" type="password" name="password" />
        </FormControl>

        <Button type="submit" mt="3">Submit</Button>
        
      </form>
      <Text mt={2}>Already have an account? <Button variant="link" onClick={() => navigate('/authentication/login')}>Login</Button></Text>
    </Box>
  );
}

export default PageRegister;