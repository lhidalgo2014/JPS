import { db } from '../firebase'
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


const theme = makeStyles({
    pay: {
        width: 800,
        height: 280,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    
    topBar: {
        width: 800,
        height: 59,
        backgroundColor: '#F1F3F4',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    
    textTittle: {
        marginLeft: 24,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
    
        color: '#697288'
    }
});

const Pay = (props) => {
    const classes = theme()
    const [playerID, setPlayerID] = useState()

    const close = (event) => {
        props.closeComponent(event);
        event.preventDefault();
    }

    const updatePlayerID = (event) => {
        setPlayerID(event.target.value)
    }

    const makePayment = (event) => {
        props.sorteoData.detail.idPlayer = playerID;
        props.sorteoData.date = new Date();
        const data = props.sorteoData
        db.collection("payment").add(data).then(() => { close(event) });
    }

    return (
        <div className={classes.pay}>
            <Grid className={classes.topBar} container direction="row" justify="space-between" alignItems="center">
                <Grid item xs={2}>
                    <Typography className={classes.textTittle} noWrap>
                        Sortear
                    </Typography>
                </Grid>

                <Grid container direction="row" justify="flex-end" alignItems="center" item xs={2}>
                    <IconButton onClick={close} aria-label="delete">
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </Grid>

            <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
            >
                <Grid container style={{marginLeft: 24, marginTop: 24}} justify="flex-start" item xs={12}>
                    <TextField onChange={updatePlayerID} label="Cédula del ganador" variant="filled" />
                </Grid>
            </Grid>

            <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
                style={{marginTop: 24}}
            >

                <Grid item xs={2}>
                    <TextField disabled value="CR" variant="filled" />
                </Grid>

                <Grid item xs={2}>
                    <TextField label='##' variant="filled" />
                </Grid>

                <Grid item xs={6}>
                    <TextField label='0##################' variant="filled" />
                </Grid>

                <Grid container style={{marginRight: 24}} direction="row" justify="flex-end" alignItems="center" item xs={12}>
                    <Button onClick={makePayment} color="primary">PAGAR</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Pay;