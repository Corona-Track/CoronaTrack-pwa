import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { $gray600, $gray700, $gray900, $brandColorPrimary, $low, $medium, $high } from '../../styles/variables';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 20px;
`;

export const Low = styled.div`
  font-size: 20px;
  color: ${$low};
  font-weight: 600;
  font-family: 'Prompt', sans-serif;
`

export const Med = styled.div`
  font-size: 20px;
  color: ${$medium};
  font-weight: 600;
  font-family: 'Prompt', sans-serif;
`

export const High = styled.div`
  font-size: 20px;
  color: ${$high};
  font-weight: 600;
  font-family: 'Prompt', sans-serif;
`

export const Text = styled.div`
  color: ${$gray900};
  font-family: 'Prompt', sans-serif;
  font-size: 14px;
  width: 90%;
  text-align: center;
  margin: 40px 0;
`