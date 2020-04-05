import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { $gray600, $gray700 } from '../../styles/variables';

export const useStyles = makeStyles(() => ({
  symptoms: {
    paddingLeft: '2rem',
    paddingRight: '2rem',
  },
  symptomsLabel: {
    color: $gray600,
    marginTop: '3rem',
  },
  symptomsQuestion: {
    fontWeight: 500,
    fontSize: '1.3rem',
    lineHeight: '2rem',
    marginTop: '1rem',
  },
  formControl: {
    color: $gray700,
    marginTop: '2.8rem',
    '& label > span:nth-child(2)': {
      fontWeight: 500,
      fontFamily: "'Prompt', sans-serif",
      textAlign: 'left',
    },
  },
  symptomsBtn: {
    marginTop: '2rem',
  },
}));

export const Container = styled.div`
  margin-top: 88px;
  text-align: left;
`;

export const ButtonOption = styled.button`
  width: 100%;
  border: 0;
  background: transparent;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #bdbdbd;
  margin: 32px auto auto;
  text-align: center;
`;
