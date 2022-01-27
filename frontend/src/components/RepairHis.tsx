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

import { RepairHistoriesInterface } from "../models/IRepairHistory";

import { format } from 'date-fns'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { green } from '@material-ui/core/colors';

import NavBarEmployee from "./NavBar_employee";

const useStyles = makeStyles((theme: Theme) =>

  createStyles({

    container: { marginTop: theme.spacing(2) },

    table: { minWidth: 650 },

    tableSpace: { marginTop: 20 },

  })

);



function RepairHistories() {

  const classes = useStyles();

  const [repairHistories, setRepairHistories] = React.useState<RepairHistoriesInterface[]>([]);

  const [checkSuccess, setcheckSuccess] = React.useState<Boolean | null>(new Boolean());

  const apiUrl = "http://localhost:8080";

  const requestOptions = {

    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },

  };

  
  const getRepairHistories = async () => {
    fetch(`${apiUrl}/repair_histories`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setRepairHistories(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    
    getRepairHistories();

  }, []);



  return (
    <div>
      
      <Container className={classes.container} maxWidth="md">
      <NavBarEmployee />
      <Typography component="div" style={{ height: '13vh' }} />
        <Box display="flex">
          <Box flexGrow={1}>
          
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              รายการประวัติการซ่อมคอมพิวเตอร์
              

            </Typography>
            
          </Box>
          
          <Box>
            <Button
              component={RouterLink}
              
              to="/repair_histories/create"
              variant="contained"
              color="primary"
            >
              สร้างประวัติการซ่อมคอมพิวเตอร์
            </Button>
            </Box>
          
          
          
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="5%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="15%">
                  รายการงานซ่อม
                </TableCell>
                <TableCell align="center" width="20%">
                  ปัญหา
                </TableCell>
                <TableCell align="center" width="20%">
                  การแก้ปัญหา
                </TableCell>
                <TableCell align="center" width="10%">
                  ความสำเร็จ
                </TableCell>
                <TableCell align="center" width="5%">
                  ความยากงานซ่อม
                </TableCell>
                <TableCell align="center" width="10%">
                  ผู้แก้ไข
                </TableCell>
                <TableCell align="center" width="15%">
                  วันที่และเวลา
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {repairHistories.map((item: RepairHistoriesInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center" >{item.ID}</TableCell>
                  <TableCell align="center" >{item.RepairRequest.Device}</TableCell>
                  <TableCell align="center" >{item.Problem}</TableCell>
                  <TableCell align="center" >{item.Solution}</TableCell>
                  <TableCell align="center" >
                    {item.Success? <CheckCircleOutlineIcon style={{ color: green[600] }} />:<HighlightOffIcon color="error"/>}
                    </TableCell>
                  <TableCell align="center" >{item.Difficulty.Name}</TableCell>
                  <TableCell align="center" >{item.Editor.Name}</TableCell>
                  <TableCell align="center" >{format((new Date(item.Timestamp)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default RepairHistories;