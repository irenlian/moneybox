import React from 'react';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import { AccordionDetails } from '@material-ui/core';
import { StyledList } from '~/components/intro/intro.styled';

const Intro: React.FC = () => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>How to use?</AccordionSummary>
    <AccordionDetails>
      <StyledList>
        <li>Pick the age of investing and sums. If you need, you may correct the interest rates.</li>
        <li>Select withdrawing to use your deposit after retirement.</li>
        <li>You'll see the calculated amount below the chart which you might want to compare with the desirable sum to use.</li>
        <li>After finishing the settings, the table can be downloaded with the export button.</li>
        <li>All parameters will be saved in your browser.</li>
      </StyledList>
    </AccordionDetails>
  </Accordion>
);

export default Intro;
