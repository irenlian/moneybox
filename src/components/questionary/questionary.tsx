import React, { useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AccordionDetails } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Action, FormType } from '~/components/linearChart';
import { Container, SliderContainer, VerticalBlock } from './questionary.styled';
import ActionList from '~/components/form/actionList';
import { settings } from '~/locales/localeKeys';

type Props = {
  form: FormType;
  setForm: (form: FormType) => void;
};

const Questionary: React.FC<Props> = ({ form, setForm }) => {
  const { t } = useTranslation();

  const handleChange = (accessor: string | string[]) => (event: any, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setForm({
        ...form,
        [accessor as string]: newValue,
      });
    } else {
      setForm({
        ...form,
        [accessor[0]]: newValue,
      });
    }
  };

  // const handleActionChange = (setValue: (value: Action[]) => void) => (newValue: Action[]) => {
  //   setValue(newValue);
  // };
  //
  // useEffect(() => {
  //   setForm({
  //     age: (living as number[])[0],
  //     livingAge: (living as number[])[1],
  //     startInvesting: (savings as number[])[0],
  //     endInvesting: (savings as number[])[1],
  //     startAmount: startAmount as number,
  //     savingsAmount: monthlySavingAmount as number,
  //     startWithdrawing: startWithdrawing as number,
  //     withdrawingAmount: withdrawingAmount as number,
  //     growingInterestRate: growingInterestRate as number,
  //     savingInterestRate: savingInterestRate as number,
  //     corrections,
  //   });
  // }, [
  //   living,
  //   savings,
  //   startAmount,
  //   monthlySavingAmount,
  //   startWithdrawing,
  //   withdrawingAmount,
  //   growingInterestRate,
  //   savingInterestRate,
  //   corrections,
  // ]);

  return (
    <Container>
      <VerticalBlock>{t(settings.firstQuestion)}</VerticalBlock>
      <VerticalBlock>
        <SliderContainer>
          {t(settings.livingAge)}
          <Slider
            value={[form.age, form.livingAge]}
            onChange={handleChange(['age', 'livingAge'])}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
        </SliderContainer>
      </VerticalBlock>
      {/*<SliderContainer>*/}
      {/*  {t(settings.savingAge)}*/}
      {/*  <Slider*/}
      {/*    value={savings}*/}
      {/*    onChange={handleChange(setSavings)}*/}
      {/*    valueLabelDisplay="on"*/}
      {/*    aria-labelledby="range-slider"*/}
      {/*  />*/}
      {/*</SliderContainer>*/}
      {/*<SliderContainerWide>*/}
      {/*  {t(settings.startAmount)}*/}
      {/*  <Slider*/}
      {/*    aria-labelledby="discrete-slider-always"*/}
      {/*    step={1000}*/}
      {/*    valueLabelDisplay="on"*/}
      {/*    value={startAmount}*/}
      {/*    onChange={handleChange(setStartAmount)}*/}
      {/*    min={0}*/}
      {/*    max={1000000}*/}
      {/*    valueLabelFormat={x => (x > 1000 ? `${Math.floor(x / 1000)}k` : x)}*/}
      {/*  />*/}
      {/*</SliderContainerWide>*/}
      {/*<SliderContainerWide>*/}
      {/*  {t(settings.savingAmount)}*/}
      {/*  <Slider*/}
      {/*    aria-labelledby="discrete-slider-always"*/}
      {/*    step={50}*/}
      {/*    valueLabelDisplay="on"*/}
      {/*    value={monthlySavingAmount}*/}
      {/*    onChange={handleChange(setMonthlySavingAmount)}*/}
      {/*    min={0}*/}
      {/*    max={10000}*/}
      {/*  />*/}
      {/*</SliderContainerWide>*/}
      {/*<SliderContainer>*/}
      {/*  {t(settings.withdrawingAge)}*/}
      {/*  <Slider*/}
      {/*    aria-labelledby="discrete-slider-always"*/}
      {/*    valueLabelDisplay="on"*/}
      {/*    value={startWithdrawing}*/}
      {/*    onChange={handleChange(setStartWithdrawing)}*/}
      {/*  />*/}
      {/*</SliderContainer>*/}
      {/*<SliderContainer>*/}
      {/*  {t(settings.withdrawingAmount)}*/}
      {/*  <Slider*/}
      {/*    aria-labelledby="discrete-slider-always"*/}
      {/*    valueLabelDisplay="on"*/}
      {/*    value={withdrawingAmount}*/}
      {/*    onChange={handleChange(setWithdrawingAmount)}*/}
      {/*    step={50}*/}
      {/*    min={500}*/}
      {/*    max={10000}*/}
      {/*  />*/}
      {/*</SliderContainer>*/}
      {/*<SliderContainer>*/}
      {/*  {t(settings.interestActive)}*/}
      {/*  <Slider*/}
      {/*    aria-labelledby="discrete-slider-always"*/}
      {/*    valueLabelDisplay="on"*/}
      {/*    value={growingInterestRate}*/}
      {/*    onChange={handleChange(setGrowingInterestRate)}*/}
      {/*  />*/}
      {/*</SliderContainer>*/}
      {/*<SliderContainer>*/}
      {/*  {t(settings.interestPassive)}*/}
      {/*  <Slider*/}
      {/*    aria-labelledby="discrete-slider-always"*/}
      {/*    valueLabelDisplay="on"*/}
      {/*    value={savingInterestRate}*/}
      {/*    onChange={handleChange(setSavingInterestRate)}*/}
      {/*  />*/}
      {/*</SliderContainer>*/}
    </Container>
  );
};

export default Questionary;
