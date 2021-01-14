import React from 'react';
import { useTranslation } from 'react-i18next';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import { AccordionDetails } from '@material-ui/core';
import { StyledList } from '~/components/intro/intro.styled';
import { intro } from '~/locales/localeKeys';

const Intro: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>{t(intro.howToUse)}</AccordionSummary>
      <AccordionDetails>
        <StyledList>
          <li>{t(intro.rule1)}</li>
          <li>{t(intro.rule2)}</li>
          <li>{t(intro.rule3)}</li>
          <li>{t(intro.rule4)}</li>
          <li>{t(intro.rule5)}</li>
        </StyledList>
      </AccordionDetails>
    </Accordion>
  );
};

export default Intro;
