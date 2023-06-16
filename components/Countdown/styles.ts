'use client';

import styled, { css } from "styled-components";

interface Props {
  active: boolean;
  timeLeft?: number;
}

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
    font-family: var(--font-rajdhani);
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

export const CountdownButton = styled.button<Props>`
  outline: 1px solid transparent;

  width: 100%;
  height: 5rem;

  margin-top: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  border: 0;
  border-radius: 5px;

  font-size: 1.25rem;
  font-weight: 600;

  transition: background-color 0.2s;

  ${(props) => props.active && css`
    &::after {
      z-index: 2;

      position: relative;
      top: 26px;

      content: "";

      height: 4px;
      width: ${props.timeLeft}%;

      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;

      background: var(--green);
    }
  `}


  &:disabled {
    background: var(--white);
    color: var(--text);
    cursor: not-allowed;

    &::after {
      position: relative;
      top: 26px;

      content: "";

      height: 4px;
      width: 100%;

      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;

      background: var(--green);
    }

    /* border-bottom: 4px solid var(--green);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0; */
  }

  ${({ active }) =>
    active
      ? css`
          color: var(--title);
          background: var(--white);

          &:hover:not(:disabled) {
            color: var(--white);
            background: var(--red);

            &::after {
              content: '';

              display: none;
            }
          }
        `
      : css`
          color: var(--white);
          background: var(--blue);

          &:hover:not(:disabled) {
            background: var(--blue-dark);
          }
        `}
`;
