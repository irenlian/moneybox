import styled from 'styled-components';
import { backgroundColor } from '../linearChart/linearChart';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  padding: 20px;
  margin: 20px 0;
  border: 1px solid ${backgroundColor};
  border-radius: 20px;
`;

export const SliderContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  margin: 10px 0;
`;
