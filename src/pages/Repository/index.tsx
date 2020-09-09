import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Header, RepositoryInfo } from './styles';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';


interface RepositoryParams {
  repository: string;
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  }
}

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
  // const {params} = useRouteMatch<RepositoryParams>();

  // useEffect(()=>{
  //   api.get(`repos/${params.repository}`).then(response=>{
  //     setRepository(response.data)
  //   })
  //   api.get(`repos/${params.repository}/issues`).then(response=>{
  //     setIssues(response.data)
  //   })
  // },[params.repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="GithubExplorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
        Voltar
      </Link>
      </Header>

      {repositories && repositories.map(repository => (
        <RepositoryInfo key={repository.name}>
          <header>
            {/* <img src={repository.owner.avatar_url} alt={repository.owner.login} /> */}
            <span>
              <strong>{repository.language}</strong>
            </span>
            <div>
              <strong>{repository.name}</strong>
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

        </RepositoryInfo>
      ))}
    </>
  );
}

export default Repository;
