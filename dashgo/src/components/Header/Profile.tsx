import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

export function Profile() {
  return (
    <Flex align='center'>
      <Box mr='4' textAlign='right'>
        <Text>Luan Simões</Text>
        <Text color='gray.300' fontSize='small'>luaan.carlos@hotmail.com</Text>
      </Box>

      <Avatar size='md' name='Luan Simões' src='https://avatars.githubusercontent.com/u/85505258?s=96&v=4/' />
    </Flex>
  );
}
