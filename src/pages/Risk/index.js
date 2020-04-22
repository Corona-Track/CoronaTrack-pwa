import React from 'react';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Low, Med, High, Text } from './styles';

// Components
import Button from '../../components/Button';
import HeaderRouter from '../../components/HeaderRouter';
// Assets


export default function Risk() {
    const history = useHistory();
    const Dispatch = useDispatch();

    const goToPartner = () => {
        window.open("https://www.aliancamedica.org/");
    };
    const goToMap = () => {
        history.push('/');
    };
    return (
        <Container>
            <Low>
              BAIXO
            </Low>
            <Text>
              Você aparentemente tem baixa chance de ter contraído o coronavírus. Mesmo assim, baseados nas orientações do Ministério da Saúde, recomendamos que pratique isolamento social, tente acessar apenas serviços essenciais e, se possível, trabalhe de casa. Caso não seja possível trabalhar em casa, redobre seus cuidados com higiene e proteção.
            </Text>
            <Med>
              MÉDIO
            </Med>
            <Text>
              Você aparentemente tem chance de ter contraído o coronavírus. Baseados nas orientações do Ministério da Saúde, recomendamos que pratique isolamento social, tente acessar apenas serviços essenciais e, se possível, trabalhe de casa. Caso trabalhe com serviços essenciais, verifique com seu empregador a possibilidade de ficar em afastamento por 14 dias.
            </Text>
            <High>
              ALTO
            </High>
            <Text>
              Você aparentemente tem grandes chances de ter contraído o coronavírus. Baseados nas orientações do Ministério da Saúde, não recomendamos que saia de casa para nada e nem que tenha contato com pessoas que não morem com você devido à alta probabilidade de contágio. Se necessário, peça a parentes e amigos que não morem com você para entregar alimentos e medicamentos na porta de sua casa, e mantenha este isolamento rigoroso até 7 dias após o desaparecimento dos sintomas.
            </Text>
            <Button
                variant="outlined"
                onClick={() => goToMap()}
                >
                VOLTAR
          </Button>
        </Container>
    );
}
