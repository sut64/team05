import React from "react";

import { Link as RouterLink } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";

import Container from "@material-ui/core/Container";
import { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";

import Box from "@material-ui/core/Box";

import Table from "@material-ui/core/Table";

import TableBody from "@material-ui/core/TableBody";

import TableCell from "@material-ui/core/TableCell";

import TableContainer from "@material-ui/core/TableContainer";

import TableHead from "@material-ui/core/TableHead";

import TableRow from "@material-ui/core/TableRow";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import moment from 'moment';

import { EmployeeInterface } from "../models/IEmployee"
import { RecieptHistorysInterface } from "../models/IRecieptHistory"
import NavBar from "./NavBar";
import { format } from 'date-fns'
import { setDefaultResultOrder } from "dns/promises";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme: Theme) =>

  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },

    container: { marginTop: theme.spacing(2) },

    table: { minWidth: 650 },

    tableSpace: { marginTop: 20 },

  })

);



function History() {

  const classes = useStyles();

  const [RecieptHistories, setRecieptHistories] = React.useState<RecieptHistorysInterface[]>([]);
  
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hasDelete, setHasDelete] = React.useState(false);

  const apiUrl = "http://localhost:8080";

  const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const requestOptions = {

    method: "GET",
    headers: {  
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json", },

  };

  const DeleteRecieptHistory = (index :number) =>{
    let id = RecieptHistories[index].ID;
  
  const requestOptionofdelete = {

    method: "DELETE",
    headers: {  
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json", },

  };

  fetch(`${apiUrl}/reciept_history/${id}`, requestOptionofdelete)
    .then((response) => response.json())
    .then((res) => {
        if(res.data) {
          setSuccess(true);
          setHasDelete(true);
        }
        else {
          setError(true);
          setErrorMessage(res.error);
        }
    })
  }
  
  const getRecieptHistories = async () => {
    setHasDelete(false);
    fetch(`${apiUrl}/reciept_histories`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setRecieptHistories(res.data);
          
          
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    if(hasDelete) {
      getRecieptHistories();
    }
}, [hasDelete ? getRecieptHistories:undefined]);


  useEffect(() => {
    
    
    getRecieptHistories();

  }, []);

  
  console.log(RecieptHistories)

  return (
    <div>
      <NavBar />

      <Typography component="div" style={{ height: '12vh' }} />

      <Container className={classes.container} maxWidth="md">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          ลบข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          ลบข้อมูลไม่สำเร็จ {errorMessage}
        </Alert>
      </Snackbar>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              รายการประวัติใบเสร็จรับเงิน
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/reciept_histories/create"
              variant="contained"
              color="primary"
            >
              สร้างประวัติใบเสร็จรับเงิน
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="5%">
                  Order
                </TableCell>
                <TableCell align="center" width="25%">
                  Employee
                </TableCell>
                <TableCell align="center" width="10%">
                  CodeWork
                </TableCell>
                <TableCell align="center" width="10%">
                  Payment
                </TableCell>
                <TableCell align="center" width="10%">
                  Price
                </TableCell>
                <TableCell align="center" width="15%">
                  ReciptCode
                </TableCell>
                <TableCell align="center" width="20%">
                  Time
                </TableCell>
                <TableCell align="center" width="5%">
                  Delete
                </TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {RecieptHistories.map((item: RecieptHistorysInterface, index) => (
                <TableRow key={item.ID}>
                  <TableCell align="center" width="5%">{item.ID}</TableCell>
                  <TableCell align="center" width="25%">{item.Employee.Name}</TableCell>
                  <TableCell align="center" width="10%">{item.WorkReceive.WorkCode}</TableCell>
                  <TableCell align="center" width="10%">{item.PaidBy.Name}</TableCell>
                  <TableCell align="center">{item.RecieptPrice}</TableCell>
                  <TableCell align="center">{item.RecieptCode}</TableCell>
                  <TableCell align="center" width="20%">{format((new Date(item.RecieptDate)), 'dd MMMM yyyy hh:mm a')}</TableCell> 
                  <TableCell align="center"><IconButton aria-label="delete"  
                                                onClick={() => DeleteRecieptHistory(index)}> 
                                                <DeleteIcon />
                                            </IconButton>
                  </TableCell>
                </TableRow>
                
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default History;