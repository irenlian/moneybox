export const MILLION = 1000000;
export const HUNDRED_THOUSAND = 100000;
export const THOUSAND = 1000;

export type Point = {
  id: number;
  amount: number;
  date: Date;
  age: number;
};

export type Action = {
  year?: number;
  amount?: number;
};

export type FormType = {
  age: number;
  livingAge: number;
  startInvesting: number;
  endInvesting: number;
  startAmount: number;
  savingsAmount: number;
  startWithdrawing: number;
  withdrawingAmount: number;
  growingInterestRate: number;
  savingInterestRate: number;
  corrections: Action[];
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
