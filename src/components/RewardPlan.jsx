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
import Typography from '@material-ui/core/Typography';

const columns = [
    { id: '#', label: '#', minWidth: 170 },
    { id: 'tipo', label: 'Tipo', minWidth: 100 },
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

const RewardPlan = (props) => {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        loadData();
    }, []);

    const createData = (sorteo) => {
        return { '#': sorteo.id, tipo: sorteo.type, fecha: new Date(sorteo.date.seconds * 1000).toDateString() };
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    
    const loadData = () => {
        db.collection("sorteo").where("state", "==", "sorteado")
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => {
                    const tempData = doc.data()
                    tempData.id = doc.id

                    return createData(tempData)
                });
                setRows(data)
                console.log(data);
            })
    }

    return (
        <div>
            <Typography className={classes.header} variant="h5" component="h2">
                Plan de premios
            </Typography>
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
                                        console.log('id: ' + column.id)
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

export default RewardPlan;