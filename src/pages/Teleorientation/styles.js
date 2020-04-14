import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { $gray600, $gray700 } from '../../styles/variables';

export const Container = styled.div`
`;

export const Image = styled.img`
  max-width: 200px;
  margin-top: 40px;
  margin-bottom: 40px;
`;

export const useStyles = makeStyles(() => ({
  result: {
    paddingLeft: '2rem',
    paddingRight: '2rem',
    fontSize: '1rem',
    textAlign: "center",
    letterSpacing: "0.1em"
  },
  resultLabel: {
    color: $gray600,
    marginTop: '3rem',
    fontFamily: "Prompt",
    fontWeight: "normal"
  },
  resultBtn: {
    fontFamily: "Prompt",
    marginTop: '0.2rem',
  },
  resultFooter: {
    fontSize: '12px',
    lineHeight: '17px',
    textAlign: 'center',
    marginBottom: '30px',
    color: $gray700,
  },
  resultStatus: {
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  resultStatusTitle: {
    margin: '-0.5rem',
    '& div': {
      fontWeight: 500,
      fontFamily: "'Prompt', sans-serif",
    },
  },
  resultStatusCalculated: {
    textTransform: 'uppercase',
    fontSize: '3rem',
    '& h3 > div': {
      lineHeight: '3rem',
    },
  },
  resultStatusDescription: {
    textAlign: 'center',
    color: $gray700,
    fontFamily: "'Prompt', sans-serif",
  },
  resultStatusDescriptionFinalStatus: {
    '& div': {
      display: 'inline-block',
    },
  },
  btnGroup: {
    marginTop: '3rem',
  }
}));
