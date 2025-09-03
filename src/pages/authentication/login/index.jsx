import { Box, Button, FormControl, FormLabel, Input, Heading,Text } from '@chakra-ui/react';
import { formDataToJson } from '../../../utils/object';
import useAuthContext from '../../../hooks/useAuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

function PageLogin() {
  const [login, isAuthenticated] = useAuthContext((s) => [s.login, s.isAuthenticated, s.isLoading]);
  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();
    const form = formDataToJson(new FormData(event.currentTarget));
    login(form, {
      onSuccess: () => navigate('/'),
    });
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <Box p="2rem"> 
      <Heading mb={2}>Login</Heading>

      <form onSubmit={onSubmit}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input placeholder="Email" type="email" name="email" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input placeholder="Password" type="password" name="password" />
        </FormControl>

        <Button type="submit" mt="3">Login</Button>
      </form>
      <Text mt={2}>Dont have an account? <Button variant="link" onClick={() => navigate('/authentication/register')}>Register</Button></Text>
    </Box>
  );
}

export default PageLogin;