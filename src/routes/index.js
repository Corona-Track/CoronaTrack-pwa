import React from 'react';
import { Switch, Router } from 'react-router-dom';

import Route from './route';

// Pages
import Home from '../pages/Home';

import Suspects from '../pages/Diagnosis/Suspects';
import Confirmed from '../pages/Diagnosis/Confirmed';
import Diagnosis from '../pages/Diagnosis';

import Login from '../pages/Login';

import SignUp from '../pages/SingUp';
import SignUpNextStep from '../pages/SingUp/stepTwo';

// Services
import history from '../services/history';

import GlobalStyle from '../styles/global';

export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} isPrivate />
        <Route path="/diagnostico" exact component={Diagnosis} isPrivate />
        <Route
          path="/diagnostico/suspeitos"
          exact
          component={Suspects}
          isPrivate
        />
        <Route
          path="/diagnostico/confirmados"
          exact
          component={Confirmed}
          isPrivate
        />

        <Route path="/login" exact component={Login} />
        <Route path="/signUp" exact component={SignUp} />
        <Route path="/signUp/nextStep" exact component={SignUpNextStep} />
        <Route path="*" component={Home} />
      </Switch>
      <GlobalStyle />
    </Router>
  );
}
