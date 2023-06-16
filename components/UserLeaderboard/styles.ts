'use client';

import styled from "styled-components";

export const UserLeaderboardContainer = styled.div`
  display: flex;
  align-items: center;

  > img {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
  }

  div {
    margin-left: 1.5rem;

    strong {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--title);
    }

    p {
      font-size: 1rem;
      margin-top: 0.5rem;

      img {
        margin-right: 0.5rem;
      }
    }
  }
`;
