import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  background-color: #fff;
  padding: 20px 30px;
  justify-content: space-between;
  text-align: left;
`;

export const H1 = styled.h1`
  margin-left: 16px;
  font-size: 24px;
  text-transform: uppercase;
`;

export const MenuContainer = styled.div`
  text-align: left;
  display: ${props =>
    props.active ? 'block' : 'none'}; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`;
export const MenuLeft = styled.div`
  position: absolute;
  width: 283px;
  height: 100vh;
  background-color: #fff;
  z-index: 1;
  padding: 30px 35px;
`;

export const ItemMenu = styled.div`
  display: flex;
  margin-bottom: 30px;
  align-items: center;
  font-size: 18px;
  color: #000;
  cursor: pointer;
  svg {
    margin-right: 20px;
  }
`;

export const Items = styled.div`
  ${ItemMenu}:first-child {
    margin-top: 78px;
  }
  ${ItemMenu}:last-child {
    margin-bottom: 107px;
  }
`;

export const Name = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 22px;
  text-transform: uppercase;
  margin: 4px 0;
`;

export const HeadMenu = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const Description = styled.p`
  margin: 0;
  font-size: 14px;
`;

export const Version = styled.p`
  margin: 0;
  font-size: 12px;
  color: #bdbdbd;
  margin-top: 43px;
`;

export const Image = styled.img`
  width: 87px;
  height: 40px;
`;
