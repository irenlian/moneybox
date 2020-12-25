import React, { useEffect, useMemo, useState } from 'react';
import LinearChart, { Point } from '~/components/linearChart';

type Props = {};

const ChartController: React.FC<Props> = ({}) => {
  const [form, setForm] = useState({
    age: 25,
    livingLength: 80,
    startAmount: 1000,
    income: 1500,
    savings: 0.1,
  });

  const data: Point[] = useMemo(() => [...Array(form.livingLength - form.age).keys()].map(i => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + i + 1, 0, 1);
    return {
      date,
      amount: form.income * form.savings * (Math.pow(1 + 0.05 / 12, 12 * i) - 1) * 12 / 0.05,
    }
  }), [form]);

  return <LinearChart data={data} />;
};

export default ChartController;
