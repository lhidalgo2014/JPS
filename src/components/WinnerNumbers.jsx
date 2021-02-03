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
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const columns = [
    { id: 'pos', label: '#', minWidth: 100 },
    { id: 'tipo', label: 'Tipo', minWidth: 100 },
    { id: 'number', label: 'Número', minWidth: 100 },
    { id: 'serie', label: 'Serie', minWidth: 100 }
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

const WinnerNumbers = (props) => {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(0);
    const [sorteoID, setSorteoID] = React.useState();
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const createData = (sorteo) => {
        const data = [];
        var cont = 1;
        sorteo.winnerNumber.forEach((numberSerie) => {
            data.push({pos: cont, tipo: sorteo.type, number: numberSerie.number, serie: numberSerie.serie })
            cont += 1
        })
        return data;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeSorteoID = (event, newPage) => {
        setSorteoID(event.target.value);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    
    const loadData = () => {
        db.collection('sorteo').doc(sorteoID)
            .onSnapshot(querySnapshot => {
                if(querySnapshot.data()) {
                    const data = createData(querySnapshot.data());
                    setRows(data)
                }
            })
    }

    return (
        <div>
            <Typography className={classes.header} variant="h5" component="h2">
                Números ganadores
            </Typography>
            <Grid container>
                <Grid xs={12} container direction="row" justify="flex-start" alignItems="center">
                    <Grid xs={2}>
                        <TextField value={sorteoID} label='Sorteo ID' onChange={handleChangeSorteoID} variant="filled" />
                    </Grid>

                    <Grid xs={2}>
                        <Button onClick={loadData} variant="contained" color="primary">
                            Filtrar
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
            </Grid>
        </div>
        
    )
}

export default WinnerNumbers;