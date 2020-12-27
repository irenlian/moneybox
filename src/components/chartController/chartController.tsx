import React, { useMemo, useState } from 'react';
import LinearChart, { FormType, Point } from '~/components/linearChart';
import { Container } from './сhartController.styled';
import CalculationTable from '~/components/calculationTable';
import Form from '~/components/form';

type Props = {};

const INTEREST_RATE = 0.05;
const MONTHS = 12;

const FVstartAmount = (startAmount: number, years: number) =>
  startAmount * Math.pow(1 + INTEREST_RATE / MONTHS, MONTHS * years);
// const FVrefill = (amount: number, years: number) =>
//   (amount * (Math.pow(1 + INTEREST_RATE / MONTHS, MONTHS * years + 1) - 1) * MONTHS) / INTEREST_RATE;
const FVrefill = (amount: number, years: number) => (amount * Math.pow(1 + INTEREST_RATE / MONTHS, MONTHS * years + 1) - amount * (1 + INTEREST_RATE / 12)) * MONTHS / INTEREST_RATE;
// const FVwithdrawal = (amount: number, years: number) => amount * (Math.pow(1 + INTEREST_RATE / MONTHS, MONTHS * years) - 1) * MONTHS / INTEREST_RATE;

const ChartController: React.FC<Props> = ({}) => {
  const [form, setForm] = useState<FormType>({
    age: 32,
    livingAge: 80,
    startInvesting: 32,
    endInvesting: 50,
    startAmount: 24000,
    savingsAmount: 1500,
  });

  const calculateAmount = (i: number, previousAmount: number) => {
    if (i === 0) {
      return form.startAmount;
    }
    if (i + form.age < form.startInvesting || i + form.age > form.endInvesting) {
      return Math.round(previousAmount * (1 + INTEREST_RATE));
    }
    return Math.round((previousAmount + form.savingsAmount) * (1 + INTEREST_RATE));
  }

  const data: Point[] = useMemo(
    () =>
      [...Array(form.livingAge - form.age).keys()].reduce((arr, i) => {
        const date = new Date();
        date.setFullYear(date.getFullYear() + i + 1, 0, 1);
        return [
          ...arr,
          {
            date,
            amount: calculateAmount(i, i && arr[i - 1].amount),
            age: form.age + i,
            id: i,
            a: Math.round(FVstartAmount(form.startAmount, i) + FVrefill(form.savingsAmount, i)),
          },
        ];
      }, [] as Point[]),
    [form],
  );

  return (
    <Container>
      <Form setForm={setForm} />
      <LinearChart data={data} />
      <CalculationTable data={data} />
    </Container>
  );
};

export default ChartController;
