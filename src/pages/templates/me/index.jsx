import { Button, Center, Flex, Image, Text, Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { getListWedding } from '../../../data/wedding';
import useAuthContext from '../../../hooks/useAuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import Loading from '../../../components/loading';
import { pathImageToUrl } from '../../../utils/url';
import { useWeddingStore } from '../../../stores/wedding';
import { useShallow } from 'zustand/react/shallow';

function PageMe() {
  const [isAuthenticated, user] = useAuthContext((auth) => [auth.isAuthenticated, auth.user]);
  const { data: listWedding, isLoading } = useQuery(['listWedding', user.uuid], getListWedding);
  const [setData] = useWeddingStore(
    useShallow((state) => {
      return [state.setData];
    }),
  );
  const navigate = useNavigate();
  console.log(listWedding);

  if (!isAuthenticated) {
    return <Navigate to="/authentication/login" />;
  }

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <Text textAlign={'center'} fontWeight="bold" fontSize="2xl" mt={8} mb={12}>List Daftar Undangan</Text>
      <Flex justifyContent="center" flexWrap="wrap">
        {listWedding.data.map((wedding, index) => (
          <Box key={index} px={4} flexBasis={{ base: '100%', md: 'calc(25% - 4rem)' }}>
            <Center flexDir="column" gap="0.7rem">
              <Text textAlign="center" fontWeight="bold" fontSize="xl">{wedding.nickname_first} & {wedding.nickname_last}</Text>
              <Box
                position="relative"
                width="100%"
                height="40rem"
                maxW="100%"
                objectFit="cover"
                onClick={() => {
                  setData(wedding);
                  // navigate(`/wedding/${wedding.nickname_first}_${wedding.nickname_last}`);
                }}
              >
                <Image
                  src={pathImageToUrl('/uploads/Screenshot_2023_12_10_at_23_22_16_4dd6ed68bb.png')}
                  alt="Wedding"
                  width="100%"
                  height="100%"
                  maxH={'500px'}
                  objectFit="cover"
                />
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  width="100%"
                  height="100%"
                  maxH={'500px'}
                  backgroundColor="gray.100"
                  opacity="0"
                  _hover={{ opacity: '0.8' }}
                >
                  <Center position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
                    <Button bgColor={'black'} color={'white'} _hover={{ bgColor: 'white', color: 'black' }} onClick={() => navigate(`/wedding/${wedding.wedding_url}`)}>Lihat Undangan</Button>
                  </Center>
                </Box>
              </Box>
            </Center>
          </Box>
        ))}
      </Flex>


    </div>
  );
}

export default PageMe;