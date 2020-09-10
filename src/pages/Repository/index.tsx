import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiCircle } from 'react-icons/fi';
import { Header, RepositoryInfo,Language } from './styles';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';



interface ParamsProps {
  login: string;
}

interface Repository {
  name: string;
  private: boolean;
  html_url: string;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
  }
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
}

const Repository: React.FC = () => {

  const [repositories, setRepositories] = useState<Repository[]>([]);

  const { login } = useRouteMatch<ParamsProps>().params;

  useEffect(() => {
    const getRepos = async () => {
      try {
        const response = await api.get<Repository[]>(`users/${login}/repos`);
        setRepositories(response.data);
      }
      catch (err) {
        console.error(err)
      }
    }

    getRepos();
  }, []);

  return (
    <>
      <Header>
        <img src={logoImg} alt="GithubExplorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
        Voltar
      </Link>
      </Header>

      <RepositoryInfo >
        {repositories && repositories.map(repository => (
          <header key={repository.name}>
            <Language language={repository.language}>
              {repository.language}
            </Language>
            <div>
              <Link to={repository.html_url}><strong>{repository.name}</strong></Link>
              <ul>
                <li>
                  <strong>{repository.stargazers_count}</strong>
                  <span>Stars</span>
                </li>
                <li>
                  <strong>{repository.forks_count}</strong>
                  <span>Forks</span>
                </li>
                <li>
                  <strong>{repository.open_issues_count}</strong>
                  <span>Issues abertas</span>
                </li>
              </ul>
            </div>
          </header>

        ))}
      </RepositoryInfo>
    </>
  );
}

export default Repository;
