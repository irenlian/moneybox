import React, { useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import { FormType, Point } from '~/components/linearChart';
import { Container, SliderContainer } from '~/components/form/form.styled';

type Props = {
  // data: Point[];
  setForm: (form: FormType) => void;
};

const Form: React.FC<Props> = ({ setForm }) => {
  const [living, setLiving] = React.useState<number | number[]>([27, 80]);
  const [savings, setSavings] = React.useState<number | number[]>([27, 80]);
  const [startAmount, setStartAmount] = React.useState<number | number[]>(25000);
  const [monthlySavingAmount, setMonthlySavingAmount] = React.useState<number | number[]>(1500);

  const handleChange = (setValue: (value: number | number[]) => void) => (
    event: any,
    newValue: number | number[],
  ) => {
    setValue(newValue);
  };

  useEffect(() => setForm({
    age: (living as number[])[0],
    livingAge: (living as number[])[1],
    startInvesting: (savings as number[])[0],
    endInvesting: (savings as number[])[1],
    startAmount: startAmount as number,
    savingsAmount: monthlySavingAmount as number,
  }), [living, savings, startAmount, monthlySavingAmount]);

  return (
    <Container>
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
      <SliderContainer>
        Start amount in $
        <Slider
          aria-labelledby="discrete-slider-always"
          step={1000}
          valueLabelDisplay="on"
          value={startAmount}
          onChange={handleChange(setStartAmount)}
          min={0}
          max={1000000}
        />
      </SliderContainer>
      <SliderContainer>
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
      </SliderContainer>
    </Container>
  );
};

export default Form;
