import styled from "styled-components";

export const ContainerLeaderboard = styled.div`
  display: flex;

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

  > h1 {
    color: var(--title);
  }
`;

export const Header = styled.header``;

export const Main = styled.main`
  font-size: 1rem;

  width: 100%;
  margin-top: 2.5rem;
`;

export const RowsContainer = styled.div`
  text-transform: uppercase;
  color: var(--text);
  font-weight: bold;
  opacity: 0.5;

  #position__row {
    margin-right: 2.2rem;
  }

  #user__row {
    margin-right: 29rem;
  }

  #challenges__row {
    margin-right: 7.4rem;
  }
`;

export const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;

  font-weight: 500;

  strong {
    color: var(--blue);
  }

  #position {
    margin: 0 1.8rem;

    font-size: 1.5rem;
  }

  #user {
    margin-left: 2.8rem;
  }

  #challenges {
    margin-left: 17.2rem;
  }

  #experience {
    margin-left: 4rem;
  }
`;
