export type Point = {
  id: number;
  amount: number;
  a: number;
  date: Date;
  age: number;
};

export type FormType = {
  age: number;
  livingAge: number;
  startInvesting: number;
  endInvesting: number;
  startAmount: number;
  savingsAmount: number;
};

export type MarginType = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export type ChartSizeType = {
  width: number;
  height: number;
  innerWidth: number;
  innerHeight: number;
};
