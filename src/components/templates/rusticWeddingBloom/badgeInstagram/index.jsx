import { Badge, Text, Flex } from '@chakra-ui/react';
import IconInstagram from '../../../iconInstagram';

export default function BadgeInstagram({ username }) {
  return (
    <Badge
      textTransform="none"
      variant='solid'
      bg='#D9D9D9'
      color="black"
      p="4px 4px"
      borderRadius="8px"
      cursor="pointer"
      onClick={() => window.open(`https://www.instagram.com/${username}/`)}
    >
      <Flex gap="0.6rem" display="flex" alignItems="center">
        <IconInstagram />
        <Text fontFamily="PoppinsRegular">@{username}</Text>
      </Flex>
    </Badge>
  );
}