import { ButtonGroup, Flex, IconButton, useEditableControls } from '@chakra-ui/react';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import IconEdit from '../iconEdit';
import { motion } from 'framer-motion';
import { fade } from '../../utils/animation';

const MotionFlex = motion(Flex);

function EditableControls({right}) {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <MotionFlex {...fade} as="span" position='absolute' right={right || '1rem'}>
    <ButtonGroup as="span" size='xs'>
      <IconButton isRound colorScheme='passPort' opacity='0.7' icon={<FaCheck/>} {...getSubmitButtonProps()} />
      <IconButton isRound colorScheme='passPort' opacity='0.7' icon={<FaXmark />} {...getCancelButtonProps()} />
    </ButtonGroup>
    </MotionFlex>
  ) : (
    <MotionFlex {...fade} as="span" position='absolute' right={right || '1rem'}>
      <IconButton isRound colorScheme='passPort' opacity='0.7' size='xs' icon={<IconEdit />} {...getEditButtonProps()} />
    </MotionFlex>
  );
}

export default EditableControls;