import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface ProfileProps {
  isWideVersion?: boolean;
}

export function Profile({ isWideVersion }: ProfileProps) {
  return (
    <Flex align="center">
      {isWideVersion && (
        <Box mr="4" textAlign="right">
          <Text>Luan Simões</Text>
          <Text color="gray.300" fontSize="small">
            luaan.carlos@hotmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Luan Simões"
        src="https://avatars.githubusercontent.com/u/85505258?s=96&v=4/"
      />
    </Flex>
  );
}
