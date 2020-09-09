import styled from 'styled-components';

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

  & + section{
    margin-top: 80px;
  }
`;

export const RepositoryInfo = styled.section`
  margin-top: 16px;
  background: linear-gradient(45deg,rgb(0 0 0 / 9%), transparent);
  border-radius: 35px;




  header{
    display:flex;
    align-items:center;

    /* img{
      width: 60px;
      height: 60px;
      border-radius: 50%;
    } */
    > span{
      width: 100px;
      padding-left: 18px;
    }
    div{
      margin-left: 24px;

      strong{
        font-size: 24px;
        color: #3d3d4d;
      }
      ul{
        display:flex;
        list-style:none;
        margin-top: 8px;

        li{
          display:flex;
          align-items:baseline;
          & + li{
            margin-left: 80px;
          }
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
