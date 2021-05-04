import { useState, useEffect, Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { format } from 'date-fns';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCashCount from './AddCashCount';

  const useStyles = makeStyles((theme) => ({
    pagination: {
        marginTop: theme.spacing(3),
        float: 'right'
    },
    datepicker: {
         marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    button: {
        // marginTop: theme.spacing(4),
         marginBottom: theme.spacing(4),
         float: 'right',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
         overflow: 'auto',
        flexDirection: 'column',
        margin: '5px',
      },
      table: {
        minWidth: 700,
      },
  }));

  

const DailyCashCount = () => {
    const classes = useStyles();

    const [dailyCashCount, setDailyCashCount] = useState ({})

    const cashCountsObj = dailyCashCount.cashCounts

    const [selectedDate, handleDateChange] = useState(new Date())

    const [page, setPage] = useState(0);
  
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    useEffect(() => {
        const getCashCounts = async () => {

          const cashCountsFromServer  = await fetchCashCounts(selectedDate, page, rowsPerPage)
          setDailyCashCount(cashCountsFromServer)
         
        }
        getCashCounts()
      }, [selectedDate, page, rowsPerPage])

    console.log('date -> ', selectedDate)

    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        fetchCashCountsByDate(selectedDate, newPage, rowsPerPage)
        console.log('handleChangePage -> ', newPage)
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, rowsPerPage));
        fetchCashCountsByDate(selectedDate, 0, event.target.value)
        setPage(0);
        console.log('handleChangeRowsPerPage -> ', event.target.value)
    };

    //Fetch CashCounts
    const fetchCashCounts = async (date, page, size) => {
        const formattedDate = format(date, 'yyyy-MM-dd')
        const res = await fetch(`http://localhost:8080/api/system/daily-cash-counts/${formattedDate}?page=${page}&size=${size}`)
        const data = res.json()
        
        return data
    }

    // Add Task
  const addCashCount = async (cashCount) => {
    const res = await fetch(`http://localhost:8080/api/system/cash-counts`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(cashCount)
    })

    const data = await res.json()
    console.log("response: " + data)
  }

    //Fetch CashCountsByDate
    const fetchCashCountsByDate = async (date, page, size) => {
        const cashCountsFromServer  = await fetchCashCounts(date, page, size)
        setDailyCashCount(cashCountsFromServer)
        handleDateChange(date)
    }
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={8}>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Title>Daily Cash Count</Title>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        {/* <DatePicker className={classes.datepicker} />  */}
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Fragment>
                            <KeyboardDatePicker
                                clearable
                                value={selectedDate}
                                placeholder="10/10/2018"
                                onChange={date => fetchCashCountsByDate(date, page, rowsPerPage)}
                                
                                format="MM/dd/yyyy"
                            />
                            </Fragment>
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        
                        {/* <Button variant="contained" color="secondary" className={classes.button}>
                            Add
                        </Button> */}
                        <Fab size="small" color="secondary" aria-label="add" className={classes.button} onClick={handleClickOpen}>
                            <AddIcon />
                        </Fab>
                        {open && <AddCashCount onAdd={addCashCount} handleClose= {handleClose} />}
                        {/* <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                Add Cash Count
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Email Address"
                                type="email"
                                fullWidth
                            />
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleClose} color="primary">
                                Subscribe
                            </Button>
                            </DialogActions>
                        </Dialog> */}
                        
                    </Grid>
                    <Grid item xs={12}>
                        <Table size="small">
                            <TableHead>
                            <TableRow>
                                <TableCell>AR#</TableCell>
                                <TableCell  align="right">AMOUNT</TableCell>
                                <TableCell>CASH</TableCell>
                                <TableCell>MASS INTENTION</TableCell>
                                <TableCell>PARTICULARS</TableCell>
                                <TableCell>REMARKS</TableCell>
                            </TableRow>
                            </TableHead>
                            {cashCountsObj!= null && <TableBody>
                            {cashCountsObj.content.length > 0 ? cashCountsObj.content.map((cashCount, i) => (
                                <TableRow key={cashCount.uuid}>
                                <TableCell>{cashCount.arNumber}</TableCell>
                                <TableCell align="right">{cashCount.amount}</TableCell>
                                <TableCell>{cashCount.inCash ? 'YES' : 'NO'}</TableCell>
                                <TableCell>{cashCount.massIntention ? 'YES' : 'NO'}</TableCell>
                                <TableCell>{cashCount.particulars}</TableCell>
                                <TableCell>{cashCount.remarks}</TableCell>
                                </TableRow>
                            )) : <TableRow><TableCell colSpan={6}>No Data Found</TableCell></TableRow>}
                            </TableBody>}
                        </Table>
                    </Grid>
                    <Grid item xs={12}>
                        <TablePagination
                            component="div"
                            count={cashCountsObj != null ? cashCountsObj.totalElements  : 0}
                            page={page}
                            onChangePage={handleChangePage}
                            rowsPerPageOptions={[5, 10, 25]}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            rowsPerPage={rowsPerPage}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
        <Grid item xs={4}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <TableContainer>
                        <Table  aria-label="caption table">
                            
                            
                            <TableBody>
                            <TableRow>
                                <TableCell>Total Cash (On Hand)</TableCell>
                                <TableCell align="right">{dailyCashCount != null ? dailyCashCount.totalAmountCashOnHand : 0}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Total Cash (Other Options)</TableCell>
                                <TableCell align="right">{dailyCashCount != null ? dailyCashCount.totalAmountCashOnHand : 0}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell align="right">{dailyCashCount != null ? dailyCashCount.totalAmount : 0}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Total With Cash Out</TableCell>
                                <TableCell align="right">{dailyCashCount != null ? dailyCashCount.totalAmount : 0}</TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Title>Daily Cash Out</Title>
                    </Grid>
                    <Grid item xs={6}>
                        {/* <Button variant="contained" color="secondary" className={classes.button}>
                            Add
                        </Button> */}

                        <Fab size="small" color="secondary" aria-label="add" className={classes.button}>
                            <AddIcon />
                        </Fab>
                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer>
                            <Table  aria-label="caption table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Total Cash Out</TableCell>
                                        <TableCell align="right">0</TableCell>
                                    </TableRow>
                                    {/* <TableRow>
                                        <TableCell>Tax</TableCell>
                                        <TableCell align="right">123123123</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Total</TableCell>
                                        <TableCell align="right">123123123</TableCell>
                                    </TableRow> */}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                    
                    
                </Paper>
            </Grid>
        </Grid>

      </Grid>  
      
      
      


      
      
    </div>
  );
}

export default DailyCashCount
