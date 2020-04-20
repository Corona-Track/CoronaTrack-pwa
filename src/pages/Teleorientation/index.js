import React from 'react';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useStyles, Container, Image, SubTitle, ImageIcon, Text } from './styles';

// Components
import Button from '../../components/Button';
// Assets
import TeleorientationImage from '../../assets/images/teleorientation.png';
import Cadastrar from '../../assets/images/cadastrar.png';
import Agendamento from '../../assets/images/agendamento.png';
import Info from '../../assets/images/info.png';
import Online from '../../assets/images/online.png';
import History from '../../assets/images/history.png';

export default function Teleorientation() {
    const history = useHistory();
    const Dispatch = useDispatch();

    const classes = useStyles();
    const goToPartner = () => {
        window.open("https://www.aliancamedica.org/");
    };
    const goToMap = () => {
        history.push('/');
    };
    return (
        <Container className={classes.result}>
            <h5 className={classes.resultLabel}>
                <Box textAlign="center">TELEORIENTAÇÃO</Box>
            </h5>
            <Image src={TeleorientationImage} alt="Teleorientação" />
            <Typography component="p" className={classes.resultStatusDescription}>
                Você Será direcionado para o
            </Typography>
            <Typography component="p" className={classes.resultStatusDescription}>
                aplicativo da nossa parceira
            </Typography>
            <Typography component="p" className={classes.resultStatusDescription}>
                Aplicação Médica. Eles farão a
            </Typography>
            <Typography component="p" className={classes.resultStatusDescription}>
                parte de agendamento de
            </Typography>
            <Typography component="p" className={classes.resultStatusDescription}>
                sua teleorientação com um
            </Typography>
            <Typography component="p" className={classes.resultStatusDescription}>
                médico voluntário e avisarão
            </Typography>
            <Typography component="p" className={classes.resultStatusDescription}>
                quando estiver disponível.
            </Typography>
            <ImageIcon src={Cadastrar} alt="Cadastrar" />
            <SubTitle>
                Cadastre-se
            </SubTitle>
            <Text>
                Entre e valide seu cadastro no portal da Aliança Médica.
            </Text>
            <ImageIcon src={Agendamento} alt="Agendamento" />
            <SubTitle>
                Agendamento
            </SubTitle>
            <Text>
                Escolha o melhor horário para o seu atendimento.
            </Text>
            <ImageIcon src={Info} alt="Agendamento" />
            <SubTitle>
                INFORMAÇÕES
            </SubTitle>
            <Text>
                Inclua exames já realizados e outras informações no seu histórico médico digital.
            </Text>
            <ImageIcon src={Online} alt="Agendamento" />
            <SubTitle>
                ATENDIMENTO ONLINE
            </SubTitle>
            <Text>
                Converse por video-atendimento com um médico voluntário.
            </Text>
            <ImageIcon src={History} alt="Agendamento" />
            <SubTitle>
                HISTÓRICO
            </SubTitle>
            <Text>
                Os dados do seu atendimento ficam registrados no histórico.
            </Text>
            <Button
                variant="contained"
                theme="primary"
                onClick={() => goToPartner()}
                className={[classes.resultBtn, classes.btnGroup]}>
                SEGUIR
            </Button>
            <Button
                variant="outlined"
                onClick={() => goToMap()}
                className={classes.resultBtn}>
                VOLTAR
          </Button>
        </Container>
    );
}
