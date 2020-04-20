import React from 'react';
import { Switch, Router } from 'react-router-dom';

import Route from './route';

// Pages
import Home from '../pages/Home';

import Suspects from '../pages/Diagnosis/Suspects';
import Confirmed from '../pages/Diagnosis/Confirmed';
import Diagnosis from '../pages/Diagnosis';
import Symptoms from '../pages/Symptoms';

import Result from '../pages/Result';

import ChronicDiseases from '../pages/ChronicDiseases';

import Login from '../pages/Login';

import SignUp from '../pages/SingUp';
import SignUpNextStep from '../pages/SingUp/stepTwo';

import Teleorientation from '../pages/Teleorientation';

import Terms from '../pages/Terms';

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
        <Route
          path="/doencas/cronicas"
          exact
          component={ChronicDiseases}
          isPrivate
        />
        <Route path="/sintomas" exact component={Symptoms} isPrivate />
        <Route path="/resultado" exact component={Result} isPrivate />
        <Route path="/teleorientacao" exact component={Teleorientation} isPrivate />
        <Route path="/login" exact component={Login} />
        <Route path="/signUp" exact component={SignUp} />
        <Route path="/termos" exact component={Terms} />
        <Route path="/signUp/nextStep" exact component={SignUpNextStep} />
        <Route path="*" component={Home} />
      </Switch>
      <GlobalStyle />
    </Router>
  );
}
