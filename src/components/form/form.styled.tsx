import styled from 'styled-components';
import AccordionDetails from '@material-ui/core/AccordionDetails';

export const Container = styled.div`
  margin: 20px 0;
`;

export const AccordionStyled = styled(AccordionDetails)`
  display: grid !important;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

export const SliderContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  margin: 10px 0;
`;

export const ActionListContainer = styled.div`
  width: 100%;
`;

export const ActionsFormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 10px;
  
  form {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    grid-gap: 10px;
  }
`;

export const ActionItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  grid-gap: 10px;
  align-items: center;
  
  p {
    margin: 0;
  }
`;
