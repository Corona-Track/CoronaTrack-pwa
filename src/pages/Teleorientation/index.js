import React from 'react';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useStyles, Container, Image } from './styles';

// Components
import Button from '../../components/Button';
// Assets
import TeleorientationImage from '../../assets/images/teleorientation.png';

export default function Teleorientation() {
    const history = useHistory();
    const Dispatch = useDispatch();

    const classes = useStyles();
    const goToPartner = () => {
        window.location.replace("https://www.aliancamedica.org/");
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
            <Button
                variant="contained"
                theme="primary"
                onClick={() => goToPartner()}
                className={[classes.resultBtn, classes.btnGroup]}>
                AGENDAR TELEORIENTAÇÃO
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
