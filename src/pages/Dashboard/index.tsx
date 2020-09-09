import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './style';
import { FiChevronRight } from 'react-icons/fi';

interface UserInterface {
  login: string;
  name: string;
  avatar_url: string;
  location: string;
  followers: number;
  following: number;
}

const Dashboard: React.FC = () => {

  const [newUser, setNewUser] = useState('');
  const [inputError, setInputError] = useState('');
  const [users, setUsers] = useState<UserInterface[]>(() => {
    const storagedUsers = localStorage.getItem('@GithubExplorer:users');
    if (storagedUsers) {
      return JSON.parse(storagedUsers);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:users', JSON.stringify(users));
  }, [users]);

  async function handleAddUser(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!newUser) {
      setInputError('Informe um usuário válido do GitHub');
      return;
    }

    try {
      const response = await api.get<UserInterface>(`users/${newUser}`);

      const user = response.data;

      if(users.findIndex(u => u.login === user.login) !== -1){
        setInputError('Usuário ja consta na lista.');
        return;
      }

      setUsers([...users, user]);
      setInputError('');
    } catch (Err) {
      setInputError('Erro na busca por esse usuário.');
    } finally {
      setNewUser('');
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddUser}>
        <input placeholder="Digite um usuário do GitHub" value={newUser} onChange={e => setNewUser(e.target.value)} />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {users.map(user => (
          <Link key={user.login} to={`/repositories/${user.login}`}>
            <img src={user.avatar_url} alt={user.login} />
            <div>
              <strong>{user.name}</strong>
              <p>{`${user.login} - ${user.location}`}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  )
}

export default Dashboard;
