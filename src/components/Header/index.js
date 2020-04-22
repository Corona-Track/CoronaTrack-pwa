import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  FiX,
  // FiUser,
  FiShare2,
  FiMapPin,
  FiClipboard,
  FiLogOut,
  FiArrowDownRight,
  FiMenu,
  FiMonitor
} from 'react-icons/fi';

import {
  Container,
  MenuContainer,
  MenuLeft,
  Items,
  ItemMenu,
  Name,
  HeadMenu,
  Description,
  Version,
  Image,
} from './styles';

import Share from '../Share';

import { signOut } from '../../actions/AuthActions';
import { getInfos } from '../../actions/DegreeRiskActions';

// Assets
import logo from '../../assets/images/logo2.png';

const greenColor = '#03A39B';

const IconMenu = ({ Component }) => (
  <Component style={{ color: greenColor, fontSize: 20 }} />
);

export default function Header({ title, onClick }) {
  const history = useHistory();
  const Dispatch = useDispatch();

  const [openMenu, setMenu] = useState(false);
  const [openShare, setShare] = useState(false);
  const [infos, setInfos] = useState({ name: '', grauDeRisco: '' });

  function setSignOute() {
    Dispatch(signOut()).then(() => {
      history.push('/login');
    });
  }

  function handleShare() {
    setMenu(false);
    setShare(!openShare);
  }

  const colorRisk = () => {
    if (infos.grauDeRisco === 'Alto') {
      return '#EB5757';
    }
    if (infos.grauDeRisco === 'Médio') {
      return '#F2C94C';
    }
    if (infos.grauDeRisco === 'Baixo') {
      return '#27AE60';
    }
  };

  const tranformRisk = () => {
    if (infos.grauDeRisco === 'Alto') {
      return `rotate(-90deg)`;
    }
    if (infos.grauDeRisco === 'Médio') {
      return `rotate(-45deg)`;
    }
    if (infos.grauDeRisco === 'Baixo') {
      return `rotate(0)`;
    }
  };

  useEffect(() => {
    const uid = localStorage.getItem('Uid');
    const Signed = localStorage.getItem('Signed') || null;
    if (Signed) {
      Dispatch(getInfos(uid)).then(res => {
        setInfos(res);
      });
    }
  }, [Dispatch]);

  return (
    <>
      <Container onClick={onClick}>
        <FiMenu
          onClick={() => setMenu(!openMenu)}
          style={{ fontSize: 32, color: greenColor, cursor: 'pointer' }}
        />
        <Image src={logo} alt="logo" />
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
          <Name>{infos.name}</Name>
          <Description as={Link} to="/risk" onClick={() => setMenu(false)}>
            {infos.grauDeRisco} Risco
            <FiArrowDownRight
              style={{
                fontSize: 14,
                color: colorRisk(),
                transform: tranformRisk(),
                marginBottom: -3,
              }}
            />
          </Description>
          <Items>
            <ItemMenu as={Link} to="#">
              {/* <IconMenu Component={FiUser} /> MEUS DADOS */}
            </ItemMenu>
            <ItemMenu as={Link} to="/sintomas">
              <IconMenu Component={FiClipboard} /> REPORTAR SINTOMAS
            </ItemMenu>
            <ItemMenu as={Link} to="/" onClick={() => setMenu(false)}>
              <IconMenu Component={FiMapPin} /> MAPA DE RISCO
            </ItemMenu>
            <ItemMenu onClick={handleShare}>
              <IconMenu Component={FiShare2} /> COMPARTILHE
            </ItemMenu>
            <ItemMenu as={Link} to="/teleorientacao" onClick={() => setMenu(false)}>
              <IconMenu Component={FiMonitor} /> TELEORIENTAÇÃO
            </ItemMenu>
          </Items>
          <ItemMenu onClick={() => setSignOute()}>
            <IconMenu Component={FiLogOut} /> SAIR
          </ItemMenu>
          <Version>Versão 1.0.1</Version>
        </MenuLeft>
      </MenuContainer>
      <Share active={openShare} onClose={handleShare} />
    </>
  );
}
