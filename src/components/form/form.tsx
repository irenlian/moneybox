import React, { useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AccordionDetails } from '@material-ui/core';
import { Action, FormType } from '~/components/linearChart';
import { Container, SliderContainer, AccordionStyled, SliderContainerWide } from '~/components/form/form.styled';
import ActionList from '~/components/form/actionList';

type Props = {
  form: FormType;
  setForm: (form: FormType) => void;
};

const Form: React.FC<Props> = ({ form, setForm }) => {
  const [living, setLiving] = React.useState<number | number[]>([form.age, form.livingAge]);
  const [savings, setSavings] = React.useState<number | number[]>([form.startInvesting, form.endInvesting]);
  const [startAmount, setStartAmount] = React.useState<number | number[]>(form.startAmount);
  const [monthlySavingAmount, setMonthlySavingAmount] = React.useState<number | number[]>(form.savingsAmount);
  const [startWithdrawing, setStartWithdrawing] = React.useState<number | number[]>(form.startWithdrawing);
  const [withdrawingAmount, setWithdrawingAmount] = React.useState<number | number[]>(form.withdrawingAmount);
  const [growingInterestRate, setGrowingInterestRate] = React.useState<number | number[]>(form.growingInterestRate);
  const [savingInterestRate, setSavingInterestRate] = React.useState<number | number[]>(form.savingInterestRate);
  const [corrections, setCorrections] = React.useState<Action[]>(form.corrections);

  const handleChange = (setValue: (value: number | number[]) => void) => (event: any, newValue: number | number[]) => {
    setValue(newValue);
  };

  const handleActionChange = (setValue: (value: Action[]) => void) => (newValue: Action[]) => {
    setValue(newValue);
  };

  useEffect(() => {
    setForm({
      age: (living as number[])[0],
      livingAge: (living as number[])[1],
      startInvesting: (savings as number[])[0],
      endInvesting: (savings as number[])[1],
      startAmount: startAmount as number,
      savingsAmount: monthlySavingAmount as number,
      startWithdrawing: startWithdrawing as number,
      withdrawingAmount: withdrawingAmount as number,
      growingInterestRate: growingInterestRate as number,
      savingInterestRate: savingInterestRate as number,
      corrections,
    });
  }, [
    living,
    savings,
    startAmount,
    monthlySavingAmount,
    startWithdrawing,
    withdrawingAmount,
    growingInterestRate,
    savingInterestRate,
    corrections,
  ]);

  return (
    <Container>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Basic settings</AccordionSummary>
        <AccordionStyled>
          <SliderContainer>
            Current age and age of living
            <Slider
              value={living}
              onChange={handleChange(setLiving)}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
            />
          </SliderContainer>
          <SliderContainer>
            Start saving and stop saving
            <Slider
              value={savings}
              onChange={handleChange(setSavings)}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
            />
          </SliderContainer>
          <SliderContainerWide>
            Start amount in $
            <Slider
              aria-labelledby="discrete-slider-always"
              step={1000}
              valueLabelDisplay="on"
              value={startAmount}
              onChange={handleChange(setStartAmount)}
              min={0}
              max={1000000}
              valueLabelFormat={x => (x > 1000 ? `${Math.floor(x / 1000)}k` : x)}
            />
          </SliderContainerWide>
          <SliderContainerWide>
            Monthly savings in $
            <Slider
              aria-labelledby="discrete-slider-always"
              step={50}
              valueLabelDisplay="on"
              value={monthlySavingAmount}
              onChange={handleChange(setMonthlySavingAmount)}
              min={0}
              max={10000}
            />
          </SliderContainerWide>
          <SliderContainer>
            Start withdrawing
            <Slider
              aria-labelledby="discrete-slider-always"
              valueLabelDisplay="on"
              value={startWithdrawing}
              onChange={handleChange(setStartWithdrawing)}
            />
          </SliderContainer>
          <SliderContainer>
            Monthly withdraw amount $
            <Slider
              aria-labelledby="discrete-slider-always"
              valueLabelDisplay="on"
              value={withdrawingAmount}
              onChange={handleChange(setWithdrawingAmount)}
              step={50}
              min={500}
              max={10000}
            />
          </SliderContainer>
          <SliderContainer>
            Interest rate during active investing period, %
            <Slider
              aria-labelledby="discrete-slider-always"
              valueLabelDisplay="on"
              value={growingInterestRate}
              onChange={handleChange(setGrowingInterestRate)}
            />
          </SliderContainer>
          <SliderContainer>
            Interest rate after active investing period, %
            <Slider
              aria-labelledby="discrete-slider-always"
              valueLabelDisplay="on"
              value={savingInterestRate}
              onChange={handleChange(setSavingInterestRate)}
            />
          </SliderContainer>
        </AccordionStyled>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>One time actions</AccordionSummary>
        <AccordionDetails>
          <ActionList values={corrections} onChange={handleActionChange(setCorrections)} />
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default Form;
