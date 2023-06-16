import { styled } from "styled-components";

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 80px;
  padding: 0 1.8rem;

  background: linear-gradient(90deg, #4953b8 0%, rgba(73, 83, 184, 0.2) 100%);

  border: 0;
  border-radius: 5px;
  outline: 1px solid var(--blue);

  @media (max-width: 720px) {
    height: 70px;
    padding: 0 1.6rem;
  }

  span {
    display: flex;

    color: var(--text-highlight);

    font-size: 1.4rem;
  }
`;