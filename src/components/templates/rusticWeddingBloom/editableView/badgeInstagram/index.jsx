import {
  Badge,
  Text,
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightElement,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import IconInstagram from '../../../../iconInstagram';
import IconEdit from '../../../../iconEdit';
import { IoIosClose } from 'react-icons/io';
import { useRef } from 'react';

export default function BadgeInstagram({
  title,
  username,
  isOpen,
  onOpen,
  onClose,
  onChange,
  onClick,
}) {
  const inputIG = useRef();

  return (
    <Flex justifyContent="center">
      <Badge
        opacity={username != '' && username != null ? 1 : 0.2}
        textTransform="none"
        variant="solid"
        bg="#D9D9D9"
        color="black"
        p="4px 4px"
        borderRadius="8px"
        cursor="pointer"
        onClick={() =>
          window.open(`https://www.instagram.com/${username}/`)
        }
      >
        <Flex gap="0.6rem" display="flex" alignItems="center">
          <IconInstagram />
          <Text fontFamily="PoppinsRegular">@{username}</Text>
        </Flex>
      </Badge>
      <IconButton
        right="3rem"
        position="absolute"
        isRound
        colorScheme="passPort"
        opacity="0.7"
        size="xs"
        onClick={onOpen}
        aria-label="Edit instagram"
        icon={<IconEdit />}
      />

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick={false}
        initialFocusRef={inputIG}
      >
        <ModalOverlay />
        <ModalContent mx="3" bg="gray.100" borderRadius="20" height="250px">
          <ModalHeader>
            <Text variant="rusticWeddingBloomText">
              Masukkan username IG mempelai {title}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup size="md">
              <InputLeftAddon
                bg="#8c8c8c"
                color="white"
                fontFamily="PoppinsRegular"
                fontSize="0.8rem"
                borderLeftRadius="20"
              >
                instagram.com/
              </InputLeftAddon>
              <Input
                ref={inputIG}
                value={username}
                onChange={onChange}
                fontFamily="PoppinsRegular"
                placeholder="Username"
                bg="white"
                borderRightRadius="20"
              />
              {username && (
                <InputRightElement>
                  <IconButton
                    aria-label="Clear input"
                    icon={<IoIosClose />}
                    onClick={onClick}
                    variant="ghost"
                    size="sm"
                  />
                </InputRightElement>
              )}
            </InputGroup>

            <Text
              mt="1.5rem"
              fontFamily="PoppinsRegular"
              fontStyle="italic"
              fontSize="0.8rem"
              textAlign="center"
            >
              Kosongkan input untuk tidak menampilkan instagram mempelai.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              mx="0"
              borderRadius="20"
              bg="#6d6d6d"
              color="white"
              mr={3}
              fontFamily="PoppinsRegular"
              fontSize="0.8rem"
              onClick={onClose}
              w="full"
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
