import { createSorteo } from '../../database'
import React from 'react';
import './CreateSorteo.css'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';


class CreateSorteo extends React.Component {
    state = {
        prizeObject: {
            id: "",
            type: "tipo",
            date: "fecha",
            prizeList: []
        },
        snackbarState: false,
        snackbarMessage: ""
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    componentDidMount() {
        this.setState({prizeObject: this.props.object})
    }

    showSnackbar = (message) => {
        this.setState({snackbarState: true})
        this.setState({snackbarMessage: message})
    }

    closeSnackbar = () => {
        this.setState({snackbarState: false})
    }

    close = (event) => {
        this.props.parentCallback();
        event.preventDefault();
    }

    getLotChancesWinnerNumbers = (event) => {
        return [
            {
                number: this.getRandomInt(100),
                serie: this.getRandomInt(1000)
            },
            {
                number: this.getRandomInt(100),
                serie: this.getRandomInt(1000)
            },
            {
                number: this.getRandomInt(100),
                serie: this.getRandomInt(1000)
            }
        ]
    }

    getLottoWinnerNumbers = (event) => {
        return [
            {number: this.getRandomInt(40)},
            {number: this.getRandomInt(40)},
            {number: this.getRandomInt(40)},
            {number: this.getRandomInt(40)},
            {number: this.getRandomInt(40)}
        ]
    }

    save = (event) => {
        var winnerNumber = []
        if(this.state.prizeObject.type === 'Lotto') {
            winnerNumber = this.getLottoWinnerNumbers()
        } else {
            winnerNumber = this.getLotChancesWinnerNumbers()
        }

        console.log("Winner number")
        console.log(winnerNumber)
        if(createSorteo(this.state.prizeObject.id, winnerNumber)) {
            this.showSnackbar("Sorteo creado correctamente")
            this.close(event)
        } else this.showSnackbar("Error al crear sorteo")
    }

    getFormattedDate(date) {
        return new Date(date.seconds * 1000).toDateString();
    }

    getTotal() {
        return this.state.prizeObject.prizeList.reduce((a, b) => Number(a) + Number(b), 0)
    }

    render() {
        return (
            <div className="Create-sorteo">
                <div className="Top-bar">
                    <Grid className="Top-bar" container direction="row" justify="space-between" alignItems="center">
                        <Grid style={{textAlign:"center"}} className="Center" item xs={2}>
                            <Typography className="Text-tittle" noWrap variant="body2" gutterBottom>
                                <b>Sortear</b>
                            </Typography>
                        </Grid>


                        <Grid style={{textAlign:"center"}} className="Center" item xs={8}>
                            <Typography className="Text-date" noWrap variant="body2" gutterBottom>
                                { this.getFormattedDate(this.state.prizeObject.date) }
                            </Typography>
                        </Grid>

                        <Grid style={{textAlign:"center"}} item xs={2}>
                            <IconButton onClick={this.close} aria-label="delete">
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </div>

                <Typography style={{marginLeft:30, marginTop:50}} className="Text-subtittle" noWrap variant="body2" gutterBottom>
                    Confirmar el siguiente sorteo de <b>{this.state.prizeObject.type}</b>
                </Typography>

                <Grid container direction="row" justify="center" alignItems="center" className="Autoscroll" style={{marginTop: 40, height: 190}} >
                    {
                        this.state.prizeObject.prizeList.map((number, index) => (
                            <Grid key={index} style={{marginTop: 10}} item xs={12} container justify="space-around" direction="row">
                                <p>{index + 1}</p>
                                <div className="Input-box">
                                    <IconButton>
                                        <AttachMoneyIcon />
                                    </IconButton>
                                    <Typography className="Text-date" noWrap variant="body2" gutterBottom>
                                        {number}
                                    </Typography>
                                </div>
                            </Grid>
                        ))
                    }
                </Grid>

                <Grid style={{marginTop:30}} container direction="row" justify="flex-start" alignItems="center">
                    <Grid style={{textAlign:"center"}} className="Center" item xs={4}>
                        <Typography className="Text-total" noWrap variant="body2" >
                            <b>Total</b>
                        </Typography>
                    </Grid>
                    
                    <Grid style={{textAlign:"center"}} className="Center" item xs={4}>
                        <Typography className="Text-total" noWrap variant="body2" >
                            <b>{this.getTotal()}</b>
                        </Typography>
                    </Grid>
                </Grid>

                <div className="Bottom-container">
                    <Button style={{marginRight:10}} onClick={this.close}>Cancelar</Button>
                    <Button onClick={this.save}>Confirmar</Button>
                </div>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.snackbarState}
                    autoHideDuration={1000}
                    onClose={this.closeSnackbar}
                    message={this.state.snackbarMessage}
                    action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={this.closeSnackbar}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                    }
                />
            </div>
        )
    }

}

export default CreateSorteo;