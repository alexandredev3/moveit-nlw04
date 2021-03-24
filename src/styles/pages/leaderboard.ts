import styled from "styled-components";

export const ContainerLeaderboard = styled.div`
  display: flex;

  .aside {
    position: fixed;
  }

  .leaderboard__button {
    path {
      stroke: var(--blue);
    }
  }

  .leaderboard__selected {
    border: 2px solid var(--blue);
  }
`;

export const Container = styled.div`
  max-width: 992px;
  width: 100%;
  height: 100vh;

  margin: 0 auto;
  padding: 2.5rem 2rem;

  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  > h1 {
    color: var(--title);
    margin-left: -0.6rem;
  }
`;

export const Main = styled.main`
  font-size: 1rem;

  width: 100%;
  margin-top: 2.5rem;
  margin-left: -1.4rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  margin-bottom: 4rem;

  thead {
    text-align: left;
    text-transform: uppercase;
    color: var(--text);
    font-weight: bold;
    opacity: 0.5;

    .position__head {
      text-align: center;
    }
  }

  tbody {
    font-weight: 500;

    tr td > strong {
      color: var(--blue);
    }

    .position__body {
      text-align: center;

      font-weight: 500;
      font-size: 1.5rem;
    }

    &:before {
      content: "";
      display: block;
      margin-top: 2.5rem;
    }
  }
`;

export const PaginateContainer = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 2.4rem;

  span {
    font-size: 1.2rem;
    color: var(--blue);
  }

  button {
    display: flex;
    align-items: center;

    border: 0;
    background: none;

    outline: 1px solid var(--white);

    &:disabled {
      cursor: not-allowed;
      
      span {
        color: var(--disabled);
      }
      path {
        stroke: var(--disabled);
      }
    }
  }
`;

export const PrevPageButton = styled.button`
  span {
    margin-left: 1rem;
  }
`;

export const NextPageButton = styled.button`
  span {
    margin-right: 1rem;
  }
`;
