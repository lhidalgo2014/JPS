import { transactAccountMoney } from '../../database'
import './AccountMoney.css'
import React from 'react';
import Button from '@material-ui/core/Button';
// import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


class AccountMoney extends React.Component {
    state = {
        total: 10000,
        value: 100,
        sorteoTypeList: ["chances", "loteria", "lotto"],
        sorteo: "chances",
        snackbarState: false
    }

    handleUserType = (event) => {
        if(event.target.value === "") {
            this.setState({value: 0})
        }
        else this.setState({value: parseInt(event.target.value)})
    }

    handleChange = (event) => {
        this.setState({sorteo: event.target.value})
    }

    updateTotal = () => {
        return this.state.total + parseInt(this.state.value)
    }

    showSnackbar = () => {
        this.setState({snackbarState: true})
    }

    closeSnackbar = () => {
        this.setState({snackbarState: false})
    }

    save = () => {
        if(transactAccountMoney(this.state.sorteo, 'deposit', this.state.total + this.state.value)) {
            this.showSnackbar()
        }
        this.showSnackbar()
    }

    render() {
        return (
            <div className="Account-money">
                <div className="Top-bar Top-bar-content">
                    <h1 className="Text-tittle">Monto total</h1>
                    {/* <IconButton aria-label="delete" className={classes.margin}>
                        <CloseIcon />
                    </IconButton> */}

                    <TextField
                        id="filled-select-currency"
                        style= {{ width: 200, marginRight: 20 }}
                        select
                        value={this.state.sorteo}
                        onChange={this.handleChange}
                        label="Tipo de sorteo"
                        variant="filled"
                        >
                        {this.state.sorteoTypeList.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>

                <h2 className="Text-subtittle">Depositar fondos</h2>
                <TextField
                    id="total-amount"
                    onChange={this.handleUserType}
                    style={{
                        marginTop: 40,
                        marginLeft: 20
                    }}
                    value={this.state.value}
                    label="Monto del depósito"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AttachMoneyIcon style={{ color: "#323232" }} />
                            </InputAdornment>
                        ),
                    }}
                    variant="filled"/>

                <div className="Bottom-section">
                    <span className="Bottom-text">Total</span>
                    <span className="Bottom-text" style={{marginLeft: 50}}>{this.updateTotal()}</span>
                </div>

                <div style={{  }} className="Bottom-container">
                    <Button style={{ margin:"8px", color: "#697288", fontFamily: "Roboto", fontWeight: "400" }}>Cancelar</Button>
                    <Button onClick={this.save}  style={{ margin:"8px", color: "#FFFF", backgroundColor: "#2F80ED", fontFamily: "Roboto", fontWeight: "400" }} variant="contained" color="primary">Depositar</Button>
                </div>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.snackbarState}
                    autoHideDuration={1000}
                    onClose={this.closeSnackbar}
                    message="Depósito realizado correctamente"
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

export default AccountMoney;