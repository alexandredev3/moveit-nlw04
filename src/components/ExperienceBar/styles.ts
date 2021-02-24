import styled from "styled-components";

interface ProgressBarProps {
  percentToNextLevel: number;
}

export const Header = styled.header`
  display: flex;
  align-items: center;

  span {
    font-size: 1rem;
  }
`;

export const ProgressBarContainer = styled.div`
  flex: 1;
  height: 4px;
  border-radius: 4px;
  background: var(--gray-line);
  margin: 0 1.5rem;
  position: relative;
`;

export const ProgressBar = styled.div<ProgressBarProps>`
  width: ${({ percentToNextLevel }) => percentToNextLevel}%;
  height: 4px;
  border-radius: 4px;
  background: var(--green);
`;

export const CurrentExperience = styled.div<ProgressBarProps>`
  position: absolute;
  top: 12px;

  left: ${({ percentToNextLevel }) => percentToNextLevel}%;

  /**
    como o nosso left for 50%, entao se for colocado -50% no translateX tirando esse 50% do left,
    o elemento vai ficar no centro.
  */
  transform: ${({ percentToNextLevel }) =>
    `translateX(-${percentToNextLevel}%)`};
`;
