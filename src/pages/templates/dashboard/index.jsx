import { useQuery } from '@tanstack/react-query';
import { Templates } from '../../../constants/templates';
import { findTemplates } from '../../../data/templates';
import { Box, Button, Center, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getImageWithFormat } from '../../../utils/url';
import Loading from '../../../components/loading';
import useAuthContext from '../../../hooks/useAuthContext';
import { removeWeddingCreateLocalStorage } from '../../../utils/localStorage';

function PageDashboard() {
  const { data, isLoading } = useQuery(['templates-find', Templates.map((template) => template.uuid)], findTemplates);
  const [isAuthenticated, user] = useAuthContext((auth) => [auth.isAuthenticated, auth.user]);
  const navigate = useNavigate();

  const ListTemplate = () => {
    if (isLoading) {
      return (
        <Loading />
      );
    }

    return data.data.map((template, index) => {
      const Template = Templates.find(({ uuid }) => uuid === template.uuid);
      return (
        <Center key={index}>
          <Flex flexDir="column" gap="0.7rem">
            <Text textAlign="center" fontWeight="bold" fontSize="xl">{template.name}</Text>
            <Image src={getImageWithFormat(template.images[0], 'small')} h="40rem" objectFit="cover" />
            <Button onClick={() => navigate(Template.path)}>Preview Undangan</Button>
            {isAuthenticated && (
              <Button
                onClick={() => {
                  removeWeddingCreateLocalStorage();
                  navigate(`${Template.path}/create`);
                }}
              >
                Buat Undangan
              </Button>
            )}
          </Flex>
        </Center>
      );
    });
  };

  return (
    <Box>
    {isAuthenticated ? (
       <Center mt="2rem" mb="1rem">
         <Flex flexDir="column">
           <Text align="center">{user.username}</Text>
           <Button onClick={() => navigate('/templates/me')}>List Undangan Kamu</Button>
           <Button mt="2" onClick={() => navigate('/authentication/logout')}>Logout</Button>
         </Flex>
       </Center>
    ) : (
      <Center mt="2rem" mb="1rem">
         <Flex flexDir="column">
           <Button onClick={() => navigate('/authentication/login')}>Login</Button>
         </Flex>
       </Center>
       
    )}
    <SimpleGrid minChildWidth="21rem" spacing="1rem" justifyItems="center">
       <ListTemplate />
    </SimpleGrid>
   </Box>
  );
}

export default PageDashboard;
