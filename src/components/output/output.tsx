import React from 'react';
import { Container } from '~/components/output/output.styled';

type Props = {
  monthlyRevenue: number;
  deposit: number;
  age: number;
};

const Output: React.FC<Props> = ({ monthlyRevenue, deposit, age }) => (
  <Container>
    Finally you can get ${monthlyRevenue} monthly from the deposit ${Math.round(deposit / 1000)}
    k at age of {age} years
  </Container>
);

export default Output;
