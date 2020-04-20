import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { $gray600, $gray700, $gray900, $brandColorPrimary } from '../../styles/variables';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Image = styled.img`
  max-width: 200px;
  margin-top: 40px;
  margin-bottom: 40px;
`;

export const ImageIcon = styled.img`
  width: 50px;
  height: auto;
  margin-top: 52px;
  margin-bottom: 28px;
`

export const SubTitle = styled.div`
  color: ${$brandColorPrimary};
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Prompt', sans-serif;
`

export const Text = styled.div`
  color: ${$gray900};
  font-size: 14px;
  font-family: 'Prompt', sans-serif;
  letter-spacing: -0.03em;
  margin-top: 16px;
  width: 70%;
  align-self: center;
`

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
