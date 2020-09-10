import styled, { css } from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a{
    display:flex;
    align-items:center;
    text-decoration: none;
    color: #a8a8b3;
    transition: color 0.2s;

    &:hover{
      color: #666;
    }

    svg{
      margin-right:4px;
    }
  }


`;

export const RepositoryInfo = styled.section`
  margin-top: 80px;
  display:flex;
  justify-content: space-between;
  flex-wrap: wrap;
  header{
    display:flex;
    flex: 1 1 32%;
    max-width: 32%;
    flex-direction: column;
    align-items: center;
    background: #fff;
    border-radius: 75px;
    transition: 300ms ease;
    margin-top: 16px;
    padding: 16px;


    box-shadow: -5px -5px 5px rgb(255,255,255,0.4),
          inset 5px 5px 5px rgba(50,50,50,0.2),
                5px 5px 5px rgba(0,0,0,0.2),
          inset -5px -5px 5px rgba(255,255,255,0.2);

    &:hover{
      transform: scale(1.01);
      box-shadow: -10px -10px 10px rgb(255,255,255,0.2),
                  10px 10px 10px rgba(0,0,0,0.2);
    }


    div{
      width: 100%;
      padding: 10px;

      >a{
        text-decoration: none;
        &:hover{
          color: #151515;
        }
      }
      strong{
        font-size: 24px;
        color: #3d3d4d;
      }
      ul{
        list-style:none;
        margin-top: 8px;

        li{
          display:flex;
          align-items:baseline;

          strong{
            display:block;
            font-size: 24px;
            color: #3d3d4d;
          }
          span{
            display:block;
            margin-top: 4px;
            margin-left: 4px;
            color: #6c6c80;
          }
        }
      }
    }
  }
`;

interface LanguageProps {
  language?: string;
}

const switchColor = (lang: string = 'none') => {
  switch (lang.toLowerCase()) {
    case "javascript":
      return css`
        background: #f1e05a;
      `;
    case "java":
      return css`
        background: #b07219;
      `;
    case "html":
      return css`
        background: #e34c26;
        `;
    case "typescript":
      return css`
        background: #2b7489;
      `;
    case "tsql":
      return css`
        background: #cccccc;
      `;
    case "c++":
      return css`
        background: #f34b7d;
      `;
    case "c":
      return css`
        background: #b07219;
      `;
    case "php":
      return css`
        background: #4F5D95;
      `;
    case "css":
      return css`
        background: #563d7c;
      `;
  }
  return;
}

export const Language = styled.span<LanguageProps>`

  padding-bottom: 8px;
  padding-left: 26px;
  position: relative;

  &::before{
    content: '';
    width: 20px;
    height: 20px;
    background: black;
    border-radius: 50%;
    position:absolute;
    left: 0;

    ${props => props.language && switchColor(props.language)}

  }
`;
