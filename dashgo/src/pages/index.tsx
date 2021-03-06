import { SubmitHandler, useForm } from 'react-hook-form';

import { Flex, Button, Stack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Input } from '../components/Form/Input';

type SingInFormData = {
  email: string;
  password: string;
};

const singInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn(): JSX.Element {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(singInFormSchema),
  });

  const { errors } = formState;

  const handleSingIn: SubmitHandler<SingInFormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(values);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSingIn)}
      >
        <Stack spacing="4">
          <Input
            name="email"
            label="E-mail"
            error={errors.email}
            type="email"
            {...register('email')}
          />
          <Input
            name="password"
            label="Senha"
            error={errors.password}
            type="password"
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
