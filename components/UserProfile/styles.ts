'use client';

import styled from "styled-components";

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;

  > img {
    width: 5.5rem;
    height: 5.5rem;
    border-radius: 50%;
  }

  div {
    margin-left: 1.5rem;

    strong {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--title);
    }
  }
`;

export const SigninUnauthenticated = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    width: 86%;
    font-weight: 500;
    font-size: 1.3rem;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 0;

    width: 64px;
    height: 64px;

    border: 0;
    border-radius: 5px;

    background: var(--blue);

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
