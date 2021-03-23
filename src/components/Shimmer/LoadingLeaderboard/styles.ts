import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

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

    .position__body {
      font-weight: 500;
      font-size: 1.5rem;

      .position__skeleton {
        margin: 0 auto;
        width: 2.2rem;
        height: 1.5rem;
      }
    }

    .challengesCompleted__skeleton {
      width: 5.7rem;
      height: 1rem;
    }

    .currentExperience__skeleton {
      width: 8rem;
      height: 1rem;
    }

    &:before {
      content: "";
      display: block;
      margin-top: 2.5rem;
    }
  }
`;

export const UserLeaderboard = styled.div`
  display: flex;
  align-items: center;

  .name__skeleton {
    width: 10rem;
    height: 1rem;
  }

  .level__skeleton {
    width: 5rem;
    height: 0.8rem;

    margin-top: 0.5rem;
  }
`;

export const AvatarContainer = styled.div`
  .avatar__skeleton {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;

    margin-right: 0.5rem;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
