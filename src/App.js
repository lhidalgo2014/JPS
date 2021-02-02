import './App.css';
import React from 'react';
import { transactAccountMoney, registerSorteo, getSorteos, createSorteo } from './database'
import AccountMoney from './components/accountMoney/AccountMoney';
import RegisterSorteo from './components/registerSorteo/RegisterSorteo';
import CreateSorteo from './components/createSorteo/CreateSorteo';
import QueryPrize from './components/queryPrize/QueryPrize';
import Pay from './components/Pay';
import RewardPlan from './components/RewardPlan';
import RewardPlanDetail from './components/RewardPlanDetail';
import QueryPaymentHistory from './components/QueryPaymentHistory';
import MostPayNumber from './components/MostPayNumber';
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
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

class App extends React.Component {

  state = {
    openRegisterSorteo: false,
    openCreateSorteo: false,
    openQueryPrize: false,
    openAccountMoney: false,
    openPay: false,
    paySorteoData: null,
    plan: [],
    currentSelectedSorteo: {
      type: "tipo",
      date: "fecha",
      prizeList: []
    }
  }

  handleOpenDialogAccountMoney = () => {
    this.setState({openAccountMoney: true})
  }

  handleCloseDialogAccountMoney = () => {
    this.setState({openAccountMoney: false})
  }

  handleOpenDialogRegisterSorteo = () => {
    this.setState({openRegisterSorteo: true})
  }

  handleCloseDialogRegisterSorteo = () => {
    this.setState({openRegisterSorteo: false})
  }

  handleOpenDialogCreateSorteo = () => {
    this.setState({openCreateSorteo: true})
  }

  handleCloseDialogCreateSorteo = () => {
    this.setState({openCreateSorteo: false})
  }

  handleOpenDialogQueryPrize = () => {
    this.setState({openQueryPrize: true})
  }

  handleCloseDialogQueryPrize = () => {
    this.setState({openQueryPrize: false})
  }

  handleOpenDialogPay = () => {
    this.setState({openPay: true})
  }

  handleCloseDialogPay = () => {
    this.setState({openPay: false})
  }

  changeCurrentSorteo = (data) => {
    this.setState({currentSelectedSorteo: data})
  }

  paySorteo = (event, data) => {
    this.setState({paySorteoData: data})
    this.handleCloseDialogQueryPrize()
    this.handleOpenDialogPay()
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
                <Button onClick={this.handleOpenDialogCreateSorteo} variant="contained">Sortear</Button>
              </Grid>
              <Grid item xs={8}>
                <Search parentCallback={this.changeCurrentSorteo}/>
              </Grid>
              <Grid item xs={2}>
                <Button startIcon={<AttachMoneyIcon />} onClick={this.handleOpenDialogAccountMoney} variant="contained">Despositar</Button>
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
              <Button onClick={this.handleOpenDialogQueryPrize}>Consultar</Button>
            </div>
              {/* <RewardPlan plan={this.state.plan}/>
              <br/>
              <RewardPlanDetail />
              <br/> */}
              {/* <QueryPaymentHistory /> */}
              <MostPayNumber />
          </div>
        </div>

        <div className="Fab">
          <Fab onClick={this.handleOpenDialogRegisterSorteo} style={{color: 'white',  backgroundColor: "#009688"}} aria-label="add">
            <AddIcon />
          </Fab>
        </div>

        <Dialog maxWidth='900' open={this.state.openQueryPrize} onClose={this.handleCloseDialogQueryPrize} aria-labelledby="form-dialog-title">
          <QueryPrize closeComponent={this.handleCloseDialogQueryPrize} parentCallback={this.paySorteo} />
        </Dialog>

        <Dialog open={this.state.openRegisterSorteo} onClose={this.handleCloseDialogRegisterSorteo} aria-labelledby="form-dialog-title">
          <RegisterSorteo parentCallback={this.handleCloseDialogRegisterSorteo} />
        </Dialog>

        <Dialog maxWidth='800' open={this.state.openPay} onClose={this.handleCloseDialogPay} aria-labelledby="form-dialog-title">
          <Pay sorteoData={this.state.paySorteoData} closeComponent={this.handleCloseDialogPay} />
        </Dialog>

        <Dialog open={this.state.openCreateSorteo} onClose={this.handleCloseDialogCreateSorteo} aria-labelledby="form-dialog-title">
          <CreateSorteo object={this.state.currentSelectedSorteo} parentCallback={this.handleCloseDialogCreateSorteo}/>
        </Dialog>

        <Dialog open={this.state.openAccountMoney} onClose={this.handleCloseDialogAccountMoney} aria-labelledby="form-dialog-title">
          <AccountMoney parentCallback={this.handleCloseDialogAccountMoney}/>
        </Dialog>
      </div>
    )
  }
}

export default App;
