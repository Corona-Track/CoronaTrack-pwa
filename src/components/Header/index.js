import React, { useState } from 'react';
import {
  FiCopy,
  FiX,
  FiUser,
  FiShare2,
  FiMapPin,
  FiClipboard,
  FiLogOut,
  FiArrowDownRight,
  FiMenu,
} from 'react-icons/fi';
import {
  Container,
  H1,
  MenuContainer,
  MenuLeft,
  Items,
  ItemMenu,
  Name,
  HeadMenu,
  Description,
  Version,
} from './styles';
import Share from '../Share';
import { signOut } from '../../actions/AuthActions';
import { Link } from 'react-router-dom';
// Assets
import logo from '../../assets/images/logo2.png';
const greenColor = '#03A39B';

const IconMenu = ({ Component }) => (
  <Component style={{ color: greenColor, fontSize: 20 }} />
);

export default function Header({ title, onClick }) {
  let [openMenu, setMenu] = useState(false);
  let [openShare, setShare] = useState(false);

  function handleShare() {
    setMenu(false);
    setShare(!openShare);
  }
  return (
    <>
      <Container onClick={onClick}>
        <FiMenu
          onClick={() => setMenu(!openMenu)}
          style={{ fontSize: 32, color: greenColor, cursor: 'pointer' }}
        />
        <img src={logo} />
        <div />
      </Container>
      <MenuContainer active={openMenu}>
        <MenuLeft>
          <HeadMenu>
            <FiX
              onClick={() => setMenu(!openMenu)}
              style={{ fontSize: 20, color: greenColor }}
            />
          </HeadMenu>
          <Description>Olá</Description>
          <Name>Bruno Silva</Name>
          <Description>
            Baixo Risco
            <FiArrowDownRight
              style={{ fontSize: 14, color: greenColor, marginBottom: -3 }}
            />
          </Description>
          <Items>
            <ItemMenu as={Link} to="#">
              <IconMenu Component={FiUser} /> MEUS DADOS
            </ItemMenu>
            <ItemMenu as={Link} to="#">
              <IconMenu Component={FiClipboard} /> MEUS SISTEMAS
            </ItemMenu>
            <ItemMenu as={Link} to="#">
              <IconMenu Component={FiMapPin} /> MAPA DE RISCO
            </ItemMenu>
            <ItemMenu onClick={handleShare}>
              <IconMenu Component={FiShare2} /> COMPARTILHE
            </ItemMenu>
          </Items>
          <ItemMenu onClick={() => signOut()}>
            <IconMenu Component={FiLogOut} /> SAIR
          </ItemMenu>
          <Version>Versão 1.0.1</Version>
        </MenuLeft>
      </MenuContainer>
      <Share active={openShare} onClose={handleShare} />
    </>
  );
}
