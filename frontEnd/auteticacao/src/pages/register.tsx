import { FormEvent, useRef } from 'react';

import { api } from '../services/api';

export default function Register() {
  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  async function handleTeste(e: FormEvent) {
    e.preventDefault();

    const user = {
      name: name.current?.value as string,
      email: email.current?.value as string,
      password: password.current?.value as string,
    };

    await api.post('/fauna', { user });
  }

  return (
    <form>
      <input type="text" placeholder="Nome" ref={name} />
      <input type="email" placeholder="E-mail" ref={email} />
      <input type="password" placeholder="Senha" ref={password} />
      <button type="submit" onClick={handleTeste}>
        Cadastrar
      </button>
    </form>
  );
}
