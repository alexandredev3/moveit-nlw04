import styled from "styled-components";

const buttonHover = `
  border: 2px solid var(--blue);
  background: var(--blue);
  border-bottom-right-radius: 2px;
  border-bottom-left-radius: 2px;
  width: 58px;

  transform: rotate(-90deg);
`;

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

export const ButtonContainer = styled.div`
  position: relative;
`;

export const HomeButtonHover = styled.div`
  position: absolute;
  top: 10%;
  left: -208%;

  ${buttonHover}
`;

export const LeaderboardButtonHover = styled.div`
  position: absolute;
  top: 60%;
  left: -208%;

  ${buttonHover}
`;

export const HomeButton = styled.button`
  outline: 1px solid var(--white);

  margin-bottom: 2.8rem;
  border: 0;
  background: transparent;

  font-size: 0;
`;

export const LeaderboardButton = styled.button`
  outline: 1px solid var(--white);

  margin-bottom: 2.8rem;
  border: 0;
  background: transparent;

  font-size: 0;
`;
