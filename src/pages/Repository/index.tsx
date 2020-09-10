import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiCircle } from 'react-icons/fi';
import { Header, RepositoryInfo, Language } from './styles';
import api from '../../services/api';

import { Doughnut, Line } from 'react-chartjs-2';

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

  const languages: string[] = [];
  repositories.forEach(el => {
    if (!languages.includes(el.language)) {
      languages.push(el.language);
    }
  });

  const getData = (l: string) => {
    let count = 0;
    repositories.forEach(r => {
      if (l === r.language) {
        count++;
      }
    })
    return count;
  }

  const switchColor = (lang: string = 'none') => {
    if (lang == null) {
      return '#c2c2c2';
    }
    switch (lang.toLowerCase()) {
      case "javascript":
        return "#f1e05a";
      case "java":
        return "#b07219";
      case "html":
        return "#e34c26";
      case "typescript":
        return "#2b7489";
      case "tsql":
        return "#cccccc";
      case "c++":
        return "#f34b7d";
      case "c":
        return "#b07219";
      case "php":
        return "#4F5D95";
      case "css":
        return "#563d7c";
    }
    return '#c2c2c2';
  }

  const data = {
    labels: languages,
    datasets: [{
      data: languages.map(e => getData(e)),
      backgroundColor: languages.map(e => switchColor(e)),

    }]
  };

  // const data = {
  //   labels: languages,
  //   datasets: [
  //     {
  //       label: 'Quantidade',
  //       fill: false,
  //       lineTension: 0.1,
  //       backgroundColor: 'rgba(75,192,192,0.4)',
  //       borderColor: 'rgba(75,192,192,1)',
  //       borderCapStyle: 'butt',
  //       borderDash: [],
  //       borderDashOffset: 0.0,
  //       borderJoinStyle: 'miter',
  //       pointBorderColor: 'rgba(75,192,192,1)',
  //       pointBackgroundColor: '#fff',
  //       pointBorderWidth: 1,
  //       pointHoverRadius: 5,
  //       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  //       pointHoverBorderColor: 'rgba(220,220,220,1)',
  //       pointHoverBorderWidth: 2,
  //       pointRadius: 1,
  //       pointHitRadius: 10,
  //       data: languages.map(e => getData(e)),
  //     }
  //   ]
  // };

  return (
    <>
      <Header>
        <img src={logoImg} alt="GithubExplorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
        Voltar
      </Link>
      </Header>
      <Doughnut data={data}/>
      {/* <Line data={data} /> */}

      <RepositoryInfo >
        {repositories && repositories.map(repository => (
          <header key={repository.name}>
            <Language language={repository.language}>
              {repository.language}
            </Language>
            <div>
              <a href={repository.html_url} target="_blank"><strong>{repository.name}</strong></a>
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
