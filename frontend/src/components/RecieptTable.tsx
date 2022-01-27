import React, { useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";

import Container from "@material-ui/core/Container";

import Paper from "@material-ui/core/Paper";

import Box from "@material-ui/core/Box";

import Table from "@material-ui/core/Table";

import TableBody from "@material-ui/core/TableBody";

import TableCell from "@material-ui/core/TableCell";

import TableContainer from "@material-ui/core/TableContainer";

import TableHead from "@material-ui/core/TableHead";

import TableRow from "@material-ui/core/TableRow";

import moment from 'moment';

import { EmployeesInterface } from "../models/IEmployee"
import { PaidBiesInterface } from "../models/IPaidBy"
import { RecieptHistorysInterface } from "../models/IRecieptHistory"
import { WorkReceivesInterface } from "../models/IWorkReceive"
import { format } from 'date-fns'

const useStyles = makeStyles((theme: Theme) =>

  createStyles({

    container: { marginTop: theme.spacing(2) },

    table: { minWidth: 650 },

    tableSpace: { marginTop: 20 },

  })

);



function History() {

  const classes = useStyles();

  const [RecieptHistories, setRecieptHistories] = React.useState<RecieptHistorysInterface[]>([]);

  const [CheckPaidby, setCheckPaidby] = React.useState<EmployeesInterface>();

  const apiUrl = "http://localhost:8080";

  const requestOptions = {

    method: "GET",
    headers: {  
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json", },

  };

  
  const getRecieptHistories = async () => {
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
    
    getRecieptHistories();

  }, []);

  
  console.log(RecieptHistories)

  return (
    <div>
      
      <Typography component="div" style={{ height: '12vh' }} />

      <Container className={classes.container} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              รายการประวัติใบแจ้งชำระเงิน
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/reciept_histories/create"
              variant="contained"
              color="primary"
            >
              สร้างประวัติใบแจ้งชำระเงิน
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
                <TableCell align="center" width="15%">
                  Employee
                </TableCell>
                <TableCell align="center" width="15%">
                  CodeWork
                </TableCell>
                <TableCell align="center" width="15%">
                  Payment
                </TableCell>
                <TableCell align="center" width="10%">
                  Price
                </TableCell>
                <TableCell align="center" width="15%">
                  ReciptCode
                </TableCell>
                <TableCell align="center" width="15%">
                  Time
                </TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {RecieptHistories.map((item: RecieptHistorysInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center" width="10%">{item.ID}</TableCell>
                  <TableCell align="center" width="10%">{item.Employee.Name}</TableCell>
                  <TableCell align="center" width="10%">{item.WorkReceive.WorkCode}</TableCell>
                  <TableCell align="center" width="15%">{item.PaidBy.Name}</TableCell>
                  <TableCell align="center">{item.RecieptPrice}</TableCell>
                  <TableCell align="center">{item.RecieptCode}</TableCell>
                  <TableCell align="center">{format((new Date(item.RecieptDate)), 'dd MMMM yyyy hh:mm a')}</TableCell> 
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