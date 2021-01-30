import './QueryPrize.css'
import React, { useState } from 'react';
import { db } from '../../firebase'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SearchIcon from '@material-ui/icons/Search';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box p={3}>
                <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));


const LotChanComponent = (props) => {
    const classes = useStyles();
    const [message, setMessage] = useState('Consultando...');
    const [prize, setPrize] = useState(0);
    const [showResult, setResult] = useState(false)
    const [sorteoNumber, setSorteoNumber] = useState();
    const [sorteoSerie, setSorteoSerie] = useState();
    const [winnerNumber, setWinnerNumber] = useState();
    const [billsNumber, setBillsNumber] = useState();

    // 2CllYdh393AKsi3D50Yx
    const query = () => {
        console.log("SEARCHING")
        db.collection("sorteo").doc(sorteoNumber)
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.data()
                if(data !== 'undefined') {
                    hasWon(data)
                } else setResult(false)
            })
    }

    const hasWon = (data) => {
        data.winnerNumber.every((prize, index) => {
            if(prize.number === Number(winnerNumber) && prize.serie === Number(sorteoSerie)) {
                setMessage('Felicidades')
                setPrize(data.prizeList[index] * billsNumber)
                setResult(true)
                return false
            }
            return true
        })
    }

    const updateSorteoNumber = (event) => {
        setSorteoNumber(event.target.value)
    }

    const updateSorteoSerie = (event) => {
        setSorteoSerie(event.target.value)
    }

    const updateWinnerNumber = (event) => {
        setWinnerNumber(event.target.value)
    }

    const updateBillsNumber = (event) => {
        setBillsNumber(event.target.value)
    }

    const close = (event) => {
        const data = {
            sorteoNumber: sorteoNumber,
            sorteoType: props.sorteoType,
            total: prize,
            detail: {
                winnerNumber: Number(winnerNumber),
                sorteoSerie: Number(sorteoSerie),
                billsNumber: Number(billsNumber)
            }
        }
        props.parentCallback(event, data);
        event.preventDefault();
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid container direction="row" justify="flex-start" item xs={12}>
                    <Button onClick={query} startIcon={<SearchIcon />} size="medium" color="primary" className={classes.margin}>
                        Buscar
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <TextField value={sorteoNumber} onChange={updateSorteoNumber} id="filled-basic" label="Número de sorteo" variant="filled" />
                </Grid>
                <Grid item xs={3}>
                    <TextField value={sorteoSerie} onChange={updateSorteoSerie} id="filled-basic" label="Número de serie" variant="filled" />
                </Grid>
                <Grid item xs={3}>
                    <TextField value={winnerNumber} onChange={updateWinnerNumber} id="filled-basic" label="Número ganador" variant="filled" />
                </Grid>
                <Grid item xs={3}>
                    <TextField value={billsNumber} onChange={updateBillsNumber} id="filled-basic" label="Número de billetes" variant="filled" />
                </Grid>

                <Grid item xs={12}>
                    <p className="Text-content">{message} </p>
                </Grid>

                <Grid item xs={4}>
                    <IconButton size="medium">
                        <AttachMoneyIcon style={{ color: '#323232', fontSize: 120 }} />
                    </IconButton>
                </Grid>

                <Grid item xs={6}>
                    {showResult ? <p className="Text-end-content">{prize}</p> : null}
                </Grid>

                <Grid container direction="row" justify="flex-end" item xs={12}>
                    {showResult ? 
                        <Button onClick={close} variant="contained" size="medium" color="primary" className={classes.margin}>
                            Pagar
                        </Button> :
                        null
                    }
                </Grid>
            </Grid>
        </div>
    );
}

const LottoComponent = (props) => {
    const classes = useStyles();
    const [message, setMessage] = useState('Consultando...');
    const [prize, setPrize] = useState(0);
    const [showResult, setResult] = useState(false)
    const [sorteoNumber, setSorteoNumber] = useState();
    const [numberList, setNumberList] = useState([]);

    const query = () => {
        console.log("SEARCHING")
        db.collection("sorteo").doc(sorteoNumber)
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.data(0, 0, 0, 0, 0)
                if(data !== 'undefined') {
                    hasWon(data)
                } else setResult(false)
            })
    }

    const hasWon = (data) => {
        // data.winnerNumber.every((prize, index) => {
        //     if(prize.number === Number(winnerNumber) && prize.serie === Number(sorteoSerie)) {
        //         setMessage('Felicidades')
        //         setPrize(data.prizeList[index] * billsNumber)
        //         setResult(true)
        //         return false
        //     }
        //     return true
        // })
    }

    const updateSorteoNumber = (event) => {
        setSorteoNumber(event.target.value)
    }

    const updateNumberList = (event, index) => {
        var tempList = numberList
        tempList[index] = event.target.value
        setNumberList(tempList)
    }

    const close = (event) => {
        props.parentCallback(event, sorteoNumber);
        event.preventDefault();
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3} container direction="row" justify="space-between" alignItems="center">
                <Grid container direction="row" justify="flex-start" item xs={12}>
                    <Button onClick={query} startIcon={<SearchIcon />} size="medium" color="primary" className={classes.margin}>
                        Buscar
                    </Button>
                </Grid>
                <Grid container direction="row" justify="flex-start" item xs={12}>
                    <TextField value={sorteoNumber} onChange={updateSorteoNumber} id="filled-basic" label="Número de sorteo" variant="filled" />
                </Grid>
                <Grid item xs={2}>
                    <TextField value={numberList[0]} onChange={(event) => updateNumberList(event, 0)} id="filled-basic" label="Número 1" variant="filled" />
                </Grid>
                <Grid item xs={2}>
                    <TextField value={numberList[1]} onChange={(event) => updateNumberList(event, 1)} id="filled-basic" label="Número 2" variant="filled" />
                </Grid>
                <Grid item xs={2}>
                    <TextField value={numberList[2]} onChange={(event) => updateNumberList(event, 2)} id="filled-basic" label="Número 3" variant="filled" />
                </Grid>
                <Grid item xs={2}>
                    <TextField value={numberList[3]} onChange={(event) => updateNumberList(event, 3)} id="filled-basic" label="Número 4" variant="filled" />
                </Grid>
                <Grid item xs={2}>
                    <TextField value={numberList[4]} onChange={(event) => updateNumberList(event, 4)} id="filled-basic" label="Número 5" variant="filled" />
                </Grid>

                <Grid item xs={12}>
                    <p className="Text-content">{message} </p>
                </Grid>

                <Grid item xs={4}>
                    <IconButton size="medium">
                        <AttachMoneyIcon style={{ color: '#323232', fontSize: 120 }} />
                    </IconButton>
                </Grid>

                <Grid item xs={6}>
                    {showResult ? <p className="Text-end-content">{prize}</p> : null}
                </Grid>

                <Grid container direction="row" justify="flex-end" item xs={12}>
                    <Button onClick={close} variant="contained" size="medium" color="primary" className={classes.margin}>
                        Pagar
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

class QueryPrize extends React.Component {
    state = {
        tabValue: 0,
        sorteoType: 'LoteriaChances'
    }

    handleTabChange = (event, newValue) => {
        console.log("Index: " + newValue);
        if(newValue === 0) this.setState({sorteoType: 'LoteriaChances'})
        else this.setState({sorteoType: 'Lotto'})
        this.setState({tabValue: newValue})
    }

    payLotCha = (event, data) => {
        this.props.parentCallback(event, data);
        event.preventDefault();
    }

    payLotto = (event, data) => {
        this.props.parentCallback(event, data);
        event.preventDefault();
    }

    close = (event, data) => {
        this.props.closeComponent(event, data);
        event.preventDefault();
    }

    render() {
        return (
            <div className="Query-prize">
                <div className="Top-bar">
                    <Grid className="Top-bar" container direction="row" justify="space-between" alignItems="center">
                        <Grid style={{textAlign:"center"}} className="Center" item xs={3}>
                            <Typography className="Text-tittle" noWrap variant="body2" gutterBottom>
                                Consulta de premios
                            </Typography>
                        </Grid>


                        <Grid style={{textAlign:"center"}} className="Center" item xs={6}>
                            <Tabs indicatorColor="primary" textColor="primary" centered value={this.state.tabValue} onChange={this.handleTabChange} aria-label="simple tabs example">
                                <Tab label="Lotería | Chances"/>
                                <Tab label="Lotto"/>
                            </Tabs>
                        </Grid>

                        <Grid style={{textAlign:"center"}} item xs={3}>
                            <IconButton onClick={this.close} aria-label="delete">
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>

                    <TabPanel value={this.state.tabValue} index={0}>
                        <LotChanComponent parentCallback={this.payLotCha} sorteoType={this.state.sorteoType}/>
                    </TabPanel>
                    <TabPanel value={this.state.tabValue} index={1}>
                        <LottoComponent parentCallback={this.payLotto} sorteoType={this.state.sorteoType}/>
                    </TabPanel>
                </div>
            </div>
        )
    }
}

export default QueryPrize;