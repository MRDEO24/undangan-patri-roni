// import React from "react";
import { Flex, Heading, Text } from '@chakra-ui/react';

const NotFoundPage = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      h="100vh"
      bg="gray.100"
      flexDirection="column"
      textAlign="center"
    >
      <Heading size="2xl" color="red.500">
        404
      </Heading>
      <Text fontSize="xl" mt={4}>
        Undangan Tidak Ditemukan
      </Text>
    </Flex>
  );
};

export default NotFoundPage;