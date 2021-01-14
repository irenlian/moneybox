import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '~/components/output/output.styled';
import { output } from '~/locales/localeKeys';

type Props = {
  monthlyRevenue: number;
  deposit: number;
  age: number;
};

const Output: React.FC<Props> = ({ monthlyRevenue, deposit, age }) => {
  const { t } = useTranslation();

  return (
    <Container>
      {t(output.finally)} ${monthlyRevenue} {t(output.atAge)} ${Math.round(deposit / 1000)}
      {t(output.fromDeposit)} {age} {t(output.years)}
    </Container>
  );
};

export default Output;
