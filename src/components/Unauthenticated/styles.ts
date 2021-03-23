import styled from "styled-components";

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
