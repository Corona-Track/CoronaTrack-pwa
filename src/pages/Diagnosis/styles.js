import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Content = styled.div`
  padding: 0 25px;

  p.title {
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #bdbdbd;
    margin-bottom: 32px;
  }
  p {
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    text-align: center;
    color: #4f4f4f;
    margin: 40px 0;
  }
`;

export const Image = styled.img``;

export const ButtonOption = styled.button`
  border: 0;
  background: transparent;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  color: #bdbdbd;
  margin: 32px 0;
`;
