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
        sorteoTypeList: ["chances", "loteria", "lotto"],
        sorteo: "chances",
        prizeList: [],
        date: null,
        snackbarState: false,
        snackbarMessage: ""
    }

    handleChangeSorteo = (event) => {
        this.setState({sorteo: event.target.value})
    }

    selectDate = (date) => {
        this.setState({date: date})
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

    save = () => {
        if(registerSorteo(this.state.sorteo, this.state.prizeList, this.state.date)) {
            this.setState({prizeList: []})
            this.showSnackbar("Sorteo registrado correctamente")
        } else this.showSnackbar("Error al registrar sorteo")
    }

    render() {
        return (
            <div className="Account-money">
                <div className="Top-bar Top-bar-content">
                    <h1 className="Text-tittle">Nuevo sorteo</h1>

                    <IconButton style={{marginRight:10}} aria-label="delete">
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

                <Grid className="Autoscroll" style={{marginTop: 40, height: 240}} >
                    {
                        this.state.prizeList.map((number, index) => (
                            <Grid style={{marginTop: 10}} item xs={12} container justify="space-around" direction="row">
                                <p>{index + 1}</p>
                                <div className="Input-box">{number}</div>
                                <IconButton>
                                    <DeleteIcon onClick={() => this.removePrize(number)}/>
                                </IconButton>
                            </Grid>
                        ))
                    }
                </Grid>
                <div className="Bottom-container">
                    <TextField onKeyDown={this.handleKeyDown} style={{width: 190, marginRight: 20}} size="small" label="Monto" variant="filled" />
                    <Button className="Button" onClick={this.save}  variant="contained">Guardar</Button>
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

export default RegisterSorteo;