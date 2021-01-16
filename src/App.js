import './App.css';
import React from 'react';
import { transactAccountMoney, registerSorteo, getSorteos, createSorteo } from './database'
import AccountMoney from './components/accountMoney/AccountMoney';
import RegisterSorteo from './components/registerSorteo/RegisterSorteo';
import CreateSorteo from './components/createSorteo/CreateSorteo';
import Button from '@material-ui/core/Button';
import Search from './components/search/Search';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class App extends React.Component {

  state = {
    openRegisterSorteo: false
  }

  handleOpenDialog = () => {
    this.setState({openRegisterSorteo: true})
  }

  handleCloseDialog = () => {
    this.setState({openRegisterSorteo: false})
  }

  render () {
    return (
      <div className="App">
        <Grid container direction="row" justify="space-between" alignItems="center">
          
          <Grid item xs={2}>
            <img src="https://raw.githubusercontent.com/lhidalgo2014/JPS/6b7e7789d2bd5d4ecd75dba9e0e9a93ab738f03d/src/static/img/jps_logo.svg"/>
          </Grid>

          <Grid item xs={8}>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid item xs={2}>
                <Button variant="contained">Sortear</Button>
              </Grid>
              <Grid item xs={10}>
                <Search/>
              </Grid>
            </Grid>
            
            
          </Grid>

          <Grid item xs={2}>
            <IconButton aria-label="delete">
                <HelpOutlineIcon />
            </IconButton>

            <IconButton aria-label="delete">
                <SettingsOutlinedIcon />
            </IconButton>

            <IconButton aria-label="delete">
                <AccountCircleOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>

        <div className="Container">
          <div className="Container-left">
            a
          </div>

          <div className="Container-right">
            <div className="Top-bar-right">
              <Button>Consultar</Button>
            </div>

            <div>

            </div>
          </div>
        </div>

        <div className="Fab">
          <Fab onClick={this.handleOpenDialog} style={{color: 'white',  backgroundColor: "#009688"}} aria-label="add">
            <AddIcon />
          </Fab>
        </div>

        <Dialog open={this.state.openRegisterSorteo} onClose={this.handleCloseDialog} aria-labelledby="form-dialog-title">
          <RegisterSorteo parentCallback={this.handleCloseDialog} />
        </Dialog>

      </div>
    )
  }
}

export default App;
