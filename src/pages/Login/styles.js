import styled from 'styled-components';
import { $colorDanger } from '../../styles/variables';

export const Container = styled.div`
  width: 100%;
  margin-top: 88px;
  text-align: center;
`;

export const Content = styled.div`
  padding: 0 25px;
`;
export const Image = styled.img`
  margin-bottom: 40px;
`;

export const Error = styled.p`
  color: ${$colorDanger};
  font-size: 14px;
  margin-bottom: 16px;
`;

export const Line = styled.div`
  font-size: 30px;
  display: flex;
  align-items: center;
  margin: 16px 0 32px 0;
  hr {
    width: 100%;
    height: 2px;
    background: #e0e0e0;
  }
  p {
    font-weight: normal;
    font-size: 15px;
    line-height: 17px;
    text-align: center;
    color: #bdbdbd;
    margin: 0 10px;
    text-transform: uppercase;
  }
`;
