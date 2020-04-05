import styled from 'styled-components';
import { $colorDanger } from '../../styles/variables';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 88px;
`;

export const Content = styled.div`
  padding: 0 25px;
  text-align: left;

  p.description {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #828282;
    margin: 40px 0 18px 0;
  }
`;

export const Error = styled.p`
  color: ${$colorDanger};
  font-size: 14px;
  margin-bottom: 16px;
`;

export const Line = styled.div`
  color: red;
  font-size: 30px;
  display: flex;
  align-items: center;
  margin: 16px 0 32px 0;
  hr {
    width: 100%;
    height: 2px;
    background: #e0e0e0;
  }
`;
