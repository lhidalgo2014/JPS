import { db } from '../firebase'
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';
import Typography from '@material-ui/core/Typography';

const columns = [
    { id: '#', label: '#', minWidth: 170 },
    { id: 'sorteoType', label: 'Sorteo', minWidth: 100 },
    { id: 'idPlayer', label: 'Jugador', minWidth: 100 },
    { id: 'serie', label: 'Serie', minWidth: 100 },
    { id: 'number', label: 'Número', minWidth: 100 },
    { id: 'fecha', label: 'Fecha', minWidth: 100 }
  ];
  
const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    
    container: {
        maxHeight: 440,
    },

    header: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 20,
        letterSpacing: '0.00089285em',
        textTransform: 'uppercase',

        color: '#697288',
    },
});

const sorteoTypes = [
    {
    value: 'No',
    label: 'No',
    },
    {
      value: 'Chances',
      label: 'Chances',
    },
    {
      value: 'Lotería',
      label: 'Lotería',
    },
    {
      value: 'Lotto',
      label: 'Lotto',
    }
  ];

const QueryPaymentHistory = (props) => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [sorteoType, setSorteoType] = React.useState('No');
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [playerID, setPlayerID] = React.useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const createData = (payment) => {
        return { 
            '#': payment.id,
            sorteoType: payment.sorteoType,
            idPlayer: payment.detail.idPlayer,
            serie: payment.detail.sorteoSerie,
            number: payment.detail.winnerNumber,
            fecha: new Date(payment.date.seconds * 1000).toDateString()
        };
    }

    const handleSorteoTypeChange = (event) => {
        setSorteoType(event.target.value);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangePlayerID = (event) => {
        setPlayerID(event.target.value);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const resetFilters = () => {
        setSorteoType('No');
        setStartDate(null);
        setEndDate(null);
        setPlayerID(null);
    }

    // gameType, date, player id, number, serie
    const loadData = () => {
        db.collection("payment")
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => {
                    const tempData = doc.data()
                    tempData.id = doc.id

                    return createData(tempData)
                });
                setData(data)
            })
    }

    useEffect(() => {
        updateRowsData()
    }, [data]); // Only re-subscribe if props.friend.id changes

    const updateRowsData = () => {
        var newRows = []
        data.forEach((row) => {
            var add = true
            if(playerID) {
                if(row.idPlayer !== playerID) add = false
            }

            if(startDate && endDate) {
                const date = new Date(row.fecha);
                const tempStartDate = new Date(startDate)
                const tempEndDate = new Date(endDate)
                if(!(tempStartDate <= date && date <= tempEndDate)) add = false
            }

            if(sorteoType !== 'No') {
                if(row.sorteoType !== sorteoType)  add = false
            }

            if(add) newRows.push(row)
        })
        setRows(newRows)
    }

    return (
        <div>
            <Typography className={classes.header} variant="h5" component="h2">
                Consulta de histórico de pagos
            </Typography>
            <Grid container direction="row" justify="flex-start" alignItems="center">
                <Grid item xs={2}>
                    <TextField
                        id="filled-select-currency"
                        select
                        label="Tipo"
                        value={sorteoType}
                        onChange={handleSorteoTypeChange}
                        variant="filled"
                        >
                        {sorteoTypes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={2}>
                    <TextField value={playerID} label='Ced. Jugador' onChange={handleChangePlayerID} variant="filled" />
                </Grid>

                <Grid item xs={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Fecha inicio"
                            value={startDate}
                            onChange={handleStartDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>

                <Grid item xs={3}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Fecha fin"
                            value={endDate}
                            onChange={handleEndDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </Grid>

                <Grid item xs={1}>
                    <IconButton onClick={resetFilters}>
                        <ReplayIcon />
                    </IconButton>
                </Grid>

                <Grid item xs={1}>
                    <Button onClick={updateRowsData} variant="contained" color="primary">
                        Filtrar
                    </Button>
                </Grid>
                
            </Grid>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
}

export default QueryPaymentHistory;