import React from 'react';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@material-ui/core';
import { Add, Delete } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import uniqueId from 'lodash/uniqueId';
import { ActionListContainer, ActionsFormContainer, ActionItem } from '~/components/form/form.styled';
import { Action } from '~/components/linearChart';
import { settings } from '~/locales/localeKeys';

type Props = {
  values: Action[];
  onChange: (newValue: Action[]) => void;
};

const ActionList: React.FC<Props> = ({ values, onChange }) => {
  const { t } = useTranslation();

  const handleAdd = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (typeof formData.get('year') === 'string' && typeof formData.get('amount') === 'string') {
      const year = parseInt(formData.get('year') as string, 10);
      const amount = parseInt(formData.get('amount') as string, 10);
      if (year && amount) {
        onChange([...values, { year, amount }]);
      }
    }
  };

  const handleChange = (type: string, i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (newValue) {
      const copy = [...values];
      (copy[i] as any)[type] = newValue;
      onChange(copy);
    }
  };

  const handleDelete = (i: number) => () => {
    onChange([...values.slice(0, i), ...values.slice(i + 1)]);
  };

  return (
    <ActionListContainer>
      <ActionsFormContainer>
        <p>{t(settings.inputTransaction)}</p>
        <form onSubmit={handleAdd}>
          <TextField
            label="Year"
            name="year"
            id="year"
            defaultValue={new Date().getFullYear()}
            placeholder={t(settings.year)}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor="amount">{t(settings.amount)}</InputLabel>
            <Input
              id="amount"
              name="amount"
              defaultValue={1000}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>
          <IconButton type="submit">
            <Add />
          </IconButton>
        </form>
      </ActionsFormContainer>
      {values.map((action, i) => (
        <ActionItem key={uniqueId()}>
          <p>{i + 1}.</p>
          <TextField name="year" value={action.year} onChange={handleChange('year', i)} />
          <Input
            value={action.amount}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            onChange={handleChange('amount', i)}
          />
          <IconButton onClick={handleDelete(i)}>
            <Delete />
          </IconButton>
        </ActionItem>
      ))}
    </ActionListContainer>
  );
};

export default ActionList;
