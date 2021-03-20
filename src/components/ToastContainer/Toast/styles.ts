import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  outline: 1px solid rgba(242, 243, 245, 0.8);
  border: 0;
  background: none;

  text-align: left;

  cursor: pointer;

  padding: 18px;

  margin-bottom: 1px;

  background: rgba(242, 243, 245, 0.8);

  min-width: 386px;
  width: 100%;

  border: 2px solid var(--gray-line);
  border-radius: 8px;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Infos = styled.div`
  margin-left: 0.8rem;
  color: var(--blue);

  > h3 {
    font-size: 1.2rem;
  }

  > p {
    font-size: 1rem;
  }
`;