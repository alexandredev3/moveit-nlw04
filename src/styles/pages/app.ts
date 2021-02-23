import styled from "styled-components";

export const Container = styled.div`
  max-width: 992px;
  height: 100vh;

  margin: 0 auto;
  padding: 2.5rem 2rem;

  display: flex;
  flex-direction: column;
`;

export const Section = styled.section`
  flex: 1;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid: 6.25rem;
  /*
    6.25 * 16 = 100px no desktop.
  */
  align-content: center;
  /**
    align-content: center; faz com que todo o grid fica alinhado ao centro verticalmente.
  */
`;
