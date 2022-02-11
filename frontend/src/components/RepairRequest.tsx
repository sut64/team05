import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { CustomersInterface } from "../models/ICustomer";
import { RepairRequestsInterface } from "../models/IRepairRequest";
import { RepairTypesInterface } from "../models/IRepairType";
import { UrgenciesInterface } from '../models/IUrgency';
import { Button, Divider, Snackbar, TextField} from '@material-ui/core';
import NavBar from './NavBar';

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    container: {
      marginTop: theme.spacing(2),
    },
  }),
);
  
export default function NativeSelects() {
  const classes = useStyles();
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [customers, setCustomers] = useState<CustomersInterface>();
  const [repairtypes, setRepairTypes] = useState<RepairTypesInterface[]>([]);
  const [urgencys, setUrgencys] = useState<UrgenciesInterface[]>([]);
  const [repairrequest, setRepairRequests] = useState<Partial<RepairRequestsInterface>>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
     "Content-Type": "application/json",
 },
  };
  console.log(localStorage);
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
const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof repairrequest;
    const { value } = event.target;
    setRepairRequests({ ...repairrequest, [id]: value });
  };
const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const name = event.target.name as keyof typeof repairrequest;
    setRepairRequests({
      ...repairrequest,
      [name]: event.target.value,
    });
    console.log(repairrequest)
  };
  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  }
  const getCustomers = async () => {
    let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/customer/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        repairrequest.CustomerID = res.data.ID
        if (res.data) {
          setCustomers(res.data);
          console.log(repairrequest.Customer);
          console.log(repairrequest.CustomerID);
        } else {
          console.log("else");
        }
      });
  };

  const getRepairTypes = async () => {
    fetch(`${apiUrl}/repair_types`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setRepairTypes(res.data);
        } else {
          console.log("else");
        }
      });
  };
  
  const getUrgencys = async () => {
    fetch(`${apiUrl}/urgencies`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setUrgencys(res.data);
        } else {
          console.log("else");
        }
      });
  };
  useEffect(() => {
    getCustomers();
    getRepairTypes();
    getUrgencys();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      CustomerID: convertType(repairrequest.CustomerID),
      RepairTypeID: convertType(repairrequest.RepairTypeID),
      UrgencyID: convertType(repairrequest.UrgencyID),
      Device: repairrequest.Device,
      Lifetime: convertType(repairrequest.Lifetime),
      Issue: repairrequest.Issue,
      RequestDate: selectedDate,
    };
  console.log(data)

    const requestOptionsPost = {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", },
      body: JSON.stringify(data),
    };
    console.log(data.UrgencyID)
    fetch(`${apiUrl}/repair_requests`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          setErrorMessage("");
        } else {
          console.log(res)
          setError(true);
          setErrorMessage(res.error);
        }
      });
  }
  
  console.log(repairrequest)
  return (
    <Container className={classes.container} maxWidth="md">
      <NavBar />
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกการขอเเจ้งซ่อมคอมพิวเตอร์สำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกการขอเเจ้งซ่อมคอมพิวเตอร์ไม่สำเร็จ : {errorMessage}
        </Alert>
      </Snackbar>
      <Paper className={classes.paper}>
      <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ขอเเจ้งซ่อมคอมพิวเตอร์
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <p>ชื่อคุณลุกค้า</p>
              <Select
                native
                value={repairrequest.CustomerID}
                onChange={handleChange}
                disabled={false}
                inputProps={{
                  name: "CustomerID",
                }}
              >
        
              <option value={customers?.ID} key={customers?.ID}>
                  {customers?.Name}
                </option>
              </Select>
              </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ชื่อประเภทการขอเเจ้งซ่อม</p>
              <Select
                native
                value={repairrequest.RepairTypeID}
                onChange={handleChange}
                inputProps={{
                 name: "RepairTypeID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกประเภทการขอแจ้งซ่อม
                </option>
                {repairtypes.map((item: RepairTypesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ความเร่งด่วน</p>
              <Select
                native
                value={repairrequest.UrgencyID}
                onChange={handleChange}
                inputProps={{
                  name: "UrgencyID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกความเร่งด่วน
                </option>
                {urgencys.map((item: UrgenciesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <p>ชื่ออุปกรณ์</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Device"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกข้อมูลชื่ออุปกรณ์"
                value={repairrequest.Device}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <p>อายุการใช้งาน(เดือน)</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Lifetime"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกอายุการใช้งาน"
                value={repairrequest.Lifetime}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <p>ปัญหาที่เกิดขึ้น</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Issue"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกปัญหา"
                value={repairrequest.Issue}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลา</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  name="Datetime"
                  value={selectedDate}
                  onChange={handleDateChange}
                  //ปรับ fals เพื่อใช้ testing
                  disabled={false}
                  label="กรุณาเลือกวันที่และเวลา"
                  minDate={new Date("2018-01-01T00:00")}
                  format="yyyy/MM/dd hh:mm a"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
          <Button
              component={RouterLink}
              to="/RepairRequestTable"
              variant="contained"
            >
              ย้อนกลับ
            </Button>
            <Button
              style={{ float: "right" }}
              variant="contained"
              onClick={submit}
              color="primary">
              เเจ้งซ่อม
            </Button>
          </Grid>
      </Grid>
      </Paper>
    </Container>
  );
}