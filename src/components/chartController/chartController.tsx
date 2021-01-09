import React, { useMemo, useState } from 'react';
import LinearChart, { FormType, Point } from '~/components/linearChart';
import { Container } from './сhartController.styled';
import CalculationTable from '~/components/calculationTable';
import Form from '~/components/form';
import Output from '~/components/output';
import { getAmount } from '~/components/linearChart/chartUtils';

type Props = {};

const INTEREST_RATE = 0.05;
const MONTHS = 12;

const FVstartAmount = (startAmount: number, years: number) =>
  startAmount * Math.pow(1 + INTEREST_RATE / MONTHS, MONTHS * years);
// const FVrefill = (amount: number, years: number) =>
//   (amount * (Math.pow(1 + INTEREST_RATE / MONTHS, MONTHS * years + 1) - 1) * MONTHS) / INTEREST_RATE;
const FVrefill = (amount: number, years: number) =>
  ((amount * Math.pow(1 + INTEREST_RATE / MONTHS, MONTHS * years + 1) - amount * (1 + INTEREST_RATE / 12)) * MONTHS) /
  INTEREST_RATE;
// const FVwithdrawal = (amount: number, years: number) => amount * (Math.pow(1 + INTEREST_RATE / MONTHS, MONTHS * years) - 1) * MONTHS / INTEREST_RATE;

const ChartController: React.FC<Props> = () => {
  const [form, setForm] = useState<FormType>(() => {
    const storedForm = localStorage.getItem('moneybox');
    if (storedForm) {
      return JSON.parse(storedForm);
    }
    return {
      age: 32,
      livingAge: 80,
      startInvesting: 32,
      endInvesting: 50,
      startAmount: 24000,
      savingsAmount: 1500,
      startWithdrawing: 60,
      withdrawingAmount: 1000,
      corrections: [],
    };
  });

  const calculateAmount = (i: number, previousAmount: number) => {
    if (i === 0) {
      return form.startAmount;
    }

    const currentYear = new Date().getFullYear() + i;
    const withdrawAfterRetirement = i + form.age > form.startWithdrawing ? form.withdrawingAmount * 12 : 0;
    const correct = form.corrections.reduce((sum, e) => (e.year === currentYear ? sum + (e.amount || 0) : sum), 0);
    const corrections = correct - withdrawAfterRetirement;

    if (i + form.age < form.startInvesting || i + form.age > form.endInvesting) {
      return Math.round(previousAmount * (1 + INTEREST_RATE)) + corrections;
    }
    return Math.round((previousAmount + form.savingsAmount) * (1 + INTEREST_RATE)) + corrections;
  };

  const data: Point[] = useMemo(
    () =>
      [...Array(form.livingAge - form.age + 1).keys()].reduce((arr, i) => {
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

  const stopPoint = data.find(e => e.age === form.startWithdrawing);
  const deposit = stopPoint && getAmount(stopPoint);
  const monthlyRevenue = stopPoint && Math.round((getAmount(stopPoint) * INTEREST_RATE) / 12);

  return (
    <Container>
      <Form
        setForm={async (changedForm: FormType) => {
          await setForm(changedForm);
          localStorage.setItem('moneybox', JSON.stringify(changedForm));
        }}
        form={form}
      />
      <LinearChart data={data} />
      <Output monthlyRevenue={monthlyRevenue || 0} deposit={deposit || 0} age={form.startWithdrawing} />
      <CalculationTable data={data} />
    </Container>
  );
};

export default ChartController;
