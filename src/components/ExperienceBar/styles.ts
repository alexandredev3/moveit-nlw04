import styled from "styled-components";

interface ProgressBarProps {
  xpCount: number;
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
  width: ${({ xpCount }) => xpCount}%;
  height: 4px;
  border-radius: 4px;
  background: var(--green);
`;

export const CurrentExperience = styled.div<ProgressBarProps>`
  position: absolute;
  top: 12px;
  left: ${({ xpCount }) => xpCount}%;

  /**
    como o nosso left for 50%, entao se for colocado -50% no translateX tirando esse 50% do left,
    o elemento vai ficar no centro.
  */
  transform: ${({ xpCount }) => `translateX(-${xpCount}%)`};
`;
