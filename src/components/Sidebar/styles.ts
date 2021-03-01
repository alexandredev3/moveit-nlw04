import styled from "styled-components";

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 2rem;
  height: 100vh;

  background: linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);

  position: relative;

  > img {
    width: 48px;
  }
`;

export const Footer = styled.footer`
  position: absolute;
  top: 50%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 32px;
  height: 32px;
`;

export const HomeButton = styled.button`
  outline: 1px solid var(--white);

  margin-bottom: 2.8rem;
  border: 0;
  background: transparent;

  font-size: 0;

  .home__selected {
    position: relative;
    top: 50%;
    left: -208%;

    background: var(--blue);
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
    width: 58px;

    transform: rotate(-90deg);
  }
`;

export const LeaderboardButton = styled.button`
  outline: 1px solid var(--white);

  margin-bottom: 2.8rem;
  border: 0;
  background: transparent;

  font-size: 0;

  .leaderboard__selected {
    position: relative;
    top: 50%;
    left: -208%;

    background: var(--blue);
    border-bottom-right-radius: 2px;
    border-bottom-left-radius: 2px;
    width: 58px;

    transform: rotate(-90deg);
  }
`;
