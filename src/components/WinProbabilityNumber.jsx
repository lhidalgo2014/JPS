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
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';

const columns = [
    { id: 'number', label: 'Número', minWidth: 100 },
    { id: 'probility', label: 'Probabilidad', minWidth: 100 },
];
  
const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    
    container: {
        maxHeight: 440,
    },
});

const sorteoTypes = [
    {
        value: 'Todos',
        label: 'Todos',
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

const WinProbabilityNumber = (props) => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [sorteoType, setSorteoType] = React.useState('Todos');

    useEffect(() => {
        loadData();
    }, []);

    const createData = (payment) => {
        return {
            sorteoType: payment.sorteoType,
            number: payment.detail.winnerNumber,
        };
    }

    const handleSorteoTypeChange = (event) => {
        setSorteoType(event.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const resetFilters = () => {
        setSorteoType('Todos');
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
    }, [data]);

    const updateRowsData = () => {
        var newRows = {}
        var newData = []
        var totalSorteo = 0
        data.forEach((row) => {
            var add = true

            if(sorteoType !== 'Todos' && sorteoType !== row.sorteoType) {
                add = false
            }
            
            if(add) {
                totalSorteo += 1
                newRows[row.number] = (newRows[row.number]+1) || 1 ;
            }
        })

        Object.entries(newRows).forEach(([key, value]) => {
            newData.push({number: key, probility: value / totalSorteo});
        });

        setRows(newData)
    }

    return (
        <div>
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

export default WinProbabilityNumber;