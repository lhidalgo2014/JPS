import { registerSorteo } from '../../database'
import React from 'react';
import './RegisterSorteo.css'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import Snackbar from '@material-ui/core/Snackbar';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';


class RegisterSorteo extends React.Component {
    state = {
        sorteoTypeList: ["Chances", "Lotería", "Lotto"],
        sorteo: "Chances",
        prizeList: [],
        date: null,
        ticketAmount: 5,
        tickectCost: 1000,
        snackbarState: false,
        snackbarMessage: ""
    }

    handleChangeTicketAmount = (event) => {
        this.setState({ticketAmount: event.target.value})
    }

    handleChangeTickectCost = (event) => {
        this.setState({tickectCost: event.target.value})
    }

    handleChangeSorteo = (event) => {
        this.setState({sorteo: event.target.value})
    }

    selectDate = (selectedDate) => {
        this.setState({date: selectedDate})
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.target.value !== "") {
            this.setState({prizeList: [...this.state.prizeList, event.target.value]})
            event.target.value = "";
        }
    }

    removePrize = (number) => {
        this.setState({prizeList: this.state.prizeList.filter(item => item !== number)})
    }

    showSnackbar = (message) => {
        this.setState({snackbarState: true})
        this.setState({snackbarMessage: message})
    }

    closeSnackbar = () => {
        this.setState({snackbarState: false})
    }

    save = (event) => {
        if(this.state.date !== null && this.state.prizeList.length > 0) {
            if(registerSorteo(this.state.sorteo, this.state.prizeList.map(x=>+x), this.state.date, this.state.ticketAmount, this.state.tickectCost)) {
                this.setState({prizeList: []})
                this.showSnackbar("Sorteo registrado correctamente")
                this.close(event)
            } else this.showSnackbar("Error al registrar sorteo")
        }
        else this.showSnackbar('Datos incompletos')
    }

    close = (event) => {
        this.props.parentCallback();
        event.preventDefault();
    }

    render() {
        return (
            <div className="Account-money">
                <div className="Top-bar Top-bar-content">
                    <h1 className="Text-tittle">Nuevo sorteo</h1>

                    <IconButton onClick={this.close} style={{marginRight:10}} aria-label="delete">
                        <CloseIcon />
                    </IconButton>
                </div>

                <Grid container justify="space-between" direction="row">
                    <Grid>
                        <TextField
                            id="filled-select-currency"
                            style= {{ marginTop: 20, marginLeft: 20, width: 200, marginRight: 20 }}
                            select
                            value={this.state.sorteo}
                            onChange={this.handleChangeSorteo}
                            label="Tipo de sorteo"
                            variant="filled">
                            {this.state.sorteoTypeList.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker  style= {{ marginTop: 20, marginLeft: 20, width: 200, marginRight: 20 }}
                                margin="normal"
                                id="date-picker-dialog"
                                label="Fecha"
                                format="MM/dd/yyyy"
                                value={this.state.date}
                                onChange={this.selectDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
                <br/>
                <Grid container justify="space-evenly">
                    <Grid item xs={4}>
                        <TextField onChange={this.handleChangeTicketAmount} value={this.state.ticketAmount} size="small" label="Cantidad billetes" variant="filled" />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField onChange={this.handleChangeTickectCost} value={this.state.tickectCost} size="small" label="Costo billete" variant="filled" />
                    </Grid>
                </Grid>

                <Grid className="Autoscroll" style={{marginTop: 40, height: 240}} >
                    {
                        this.state.prizeList.map((number, index) => (
                            <Grid style={{marginTop: 10}} item xs={12} container justify="space-around" direction="row">
                                <p>{index + 1}</p>
                                <div className="Input-box">{number}</div>
                                <IconButton onClick={() => this.removePrize(number)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        ))
                    }
                </Grid>

                <Grid container direction="row" justify="space-evenly" alignItems="center">
                    <Grid style={{textAlign:'center'}} item xs={8}>
                        <TextField onKeyDown={this.handleKeyDown} size="small" label="Monto" variant="filled" />
                    </Grid>

                    <Grid style={{textAlign:'center'}} item xs={4}>
                        <Button style={{width:'100px'}} onClick={this.save}>Guardar</Button>
                    </Grid>
                </Grid>

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

export default RegisterSorteo;