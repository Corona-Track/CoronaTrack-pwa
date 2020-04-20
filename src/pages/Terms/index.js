import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaFacebookSquare } from 'react-icons/fa';

import Iframe from 'react-iframe';

// Components
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loading from '../../components/Loading';

import HeaderRouter from '../../components/HeaderRouter';

// Actions
import { SignInAction, loginWithFacebook } from '../../actions/AuthActions';

// Assets
import logo from '../../assets/images/logo.svg';

// Styles
import { Container, Image, Content, Error, Line} from './styles';


export default function Terms() {
  const history = useHistory();

  return (
    <Container>
      <Content>
        <HeaderRouter title="Termos e condições" onClick={() => history.goBack()} />
        <Iframe
          src={"https://coronatrack.com.br/politica-de-privacidade-v0"}
          width="100%"
          height="100%"
        />
      </Content>
    </Container>
  );
}
