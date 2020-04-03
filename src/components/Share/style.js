import styled from 'styled-components';

export const Wrapper = styled.div`
  display: ${props => (props.active ? 'flex' : 'none')}; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  align-items: center;
`;
export const Modal = styled.div`
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  width: 319px;
  height: 300px;
  border-radius: 8px;
  padding: 30px 16px;
`;

export const Head = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const Title = styled.h2`
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  text-align: center;
  text-transform: uppercase;
  margin: 0;
`;

export const Description = styled.p`
  width: 100%;
  margin-top: 4px;
  margin-bottom: 12px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  color: #828282;
`;

export const FieldCopy = styled.div`
  width: 100%;
  height: 56px;
  background: #f2f2f2;
  border-radius: 4px;
  padding: 17px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #4f4f4f;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const ContainerSocialMedia = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 130px;
  height: 40px;
  margin: 0 auto;
`;

export const ContentSocialMedia = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    color: ${props => (props.color ? props.color : '#ddd')};
    font-size: 40px;
  }
`;
