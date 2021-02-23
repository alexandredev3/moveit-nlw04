import styled from "styled-components";

export const CountdownContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: Rajdhani;
  font-weight: 600;
  color: var(--title);

  > div {
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: space-evenly;

    background: var(--white);
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    font-size: 8.5rem;
    text-align: center;
  }

  > div span {
    flex: 1;
  }

  > div span:first-child {
    border-right: 1px solid #f0f1f5;
  }

  > div span:last-child {
    border-left: 1px solid #f0f1f5;
  }

  > span {
    font-size: 6.25rem;
    margin: 0 0.5rem;
  }
`;

export const StopCountdownButton = styled.button`
  width: 100%;
  height: 5rem;

  margin-top: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  border-radius: 5px;

  color: var(--text);

  font-size: 1.25rem;
  font-weight: 600;

  transition: background-color 0.2s;

  &:hover {
    color: var(--white);
    background: var(--red);
  }
`;

export const StartCountdownButton = styled.button`
  width: 100%;
  height: 5rem;

  margin-top: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  border-radius: 5px;

  color: var(--white);
  background: var(--blue);

  font-size: 1.25rem;
  font-weight: 600;

  transition: background-color 0.2s;

  &:hover {
    background: var(--blue-dark);
  }
`;
