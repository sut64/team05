import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  DatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { EmployeeInterface } from "../models/IEmployee";
import { RepairRequestsInterface } from "../models/IRepairRequest";

import { WorkplaceInterface } from "../models/IWorkplace";
import { WorkReceiveInterface } from "../models/IWorkReceive";
import 'date-fns'
import NavBar from './NavBar';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};




 
const useStyles = makeStyles((theme: Theme) =>

 createStyles({ 
   
  root: {
    flexGrow: 1,
  },
   container: {marginTop: theme.spacing(2)},

   paper: {padding: theme.spacing(2),color: theme.palette.text.secondary},
   formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: { minWidth: 650 },
  tableSpace: { marginTop: 20 },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
 })

);
function WorkReceiveCreate() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());


  const [Employees, setEmployee] = useState<EmployeeInterface>();

  const [repairRequest, setRepairRequest] = useState<RepairRequestsInterface[]>([]);
  const [workPlace, setWorkplaces] = useState<WorkplaceInterface[]>([]);
  const [workReceives, setWorkReceives] = useState<Partial<WorkReceiveInterface>>(
    {}
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg,setErrorMsg] = useState("")
  const apiUrl = "http://localhost:8080";
  const loginEmp = localStorage.getItem("uid");


  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
    },
}
console.log(requestOptions);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown|Number }>
  ) => {
    console.log(event.target.value)
    if(event.target.name === "Wages"){
     
    }
    const name = event.target.name as keyof typeof workReceives;
    setWorkReceives({
      ...workReceives,
      [name]: event.target.value,
    });

  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const getRepairRequest = async () => {
    fetch(`${apiUrl}/RepairRequestsNotInWorkReceive`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setRepairRequest(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const getWorkplace = async () => {
    fetch(`${apiUrl}/WorkPlaces`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setWorkplaces(res.data);
        } else {
          console.log("else");
        }
      });
  };
  const getEmployee = async () => {
    fetch(`${apiUrl}/employee/${loginEmp}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            console.log(res.data)
            setEmployee(res.data);
        } else {
          console.log("else");
        }
      });
  };
  useEffect(() => {
    getEmployee();
    getWorkplace();
    getRepairRequest();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
  const convertfloat = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseFloat(data) : data;
    return val;
  };


  function submit() {
    
  let data = {
    FinishedDate: selectedDate,
    Wages: convertfloat(workReceives.Wages),
    WorkCode: workReceives.WorkCode,

    EmployeeID: 1,
    WorkPlaceID: convertType(workReceives.WorkPlaceID),
    RepairRequestID: convertType(workReceives.RepairRequestID),
  };
  console.log(data);
    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  };

    fetch(`${apiUrl}/WorkReceives`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setSuccess(true);
          getRepairRequest();
        } else {
          setError(true);
          setErrorMsg(res.error);
        }
      });
  }
return (
    <div>
        <div className={classes.drawerHeader}/>
    
    <Container className={classes.container} maxWidth="md">
    <NavBar/>
             <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ: {errorMsg}
        </Alert>
      </Snackbar>
        <h1>ระบบรับงานซ่อม</h1>
        <TableContainer component={Paper} className={classes.tableSpace}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            <TableCell align="left" width="30%">
                                Device
                            </TableCell>
                            <TableCell align="left" width="35%">
                                Issue
                            </TableCell>
                            <TableCell align="left" width="10%">
                                Customer
                            </TableCell>
                            <TableCell align="center" width="15%">
                            Urgency
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {repairRequest.map((item: RepairRequestsInterface) => (
                            <TableRow key={item.ID}>
                                <TableCell align="left" >{item.Device}</TableCell>
                                <TableCell align="left" >{item.Issue}</TableCell>
                                <TableCell align="left" >{item.Customer.Name}</TableCell>
                                <TableCell align="center" >{item.Urgency.Name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
        <Paper elevation={3}>
        <Divider />
        <Grid container spacing={3} className={classes.root}>
        <Grid item xs={2} alignItems="center">
          <Box display="flex"  color="text.primary">
            <Box flexGrow={2} pt={3} pl={5} >
          <Typography
            component="h2"
            variant="body2"
            color="inherit"
            gutterBottom
          >
        เลือกงานที่ต้องการรับ
          </Typography>
            </Box >
            </Box>
          </Grid>
           <Grid item xs={4}  alignItems="flex-start" >
          <Box flexGrow={2}  pt={1.5}>
          <FormControl className={classes.formControl}>
         <Select
                 native
         variant="outlined"
                value={workReceives.RepairRequestID}
                onChange={handleChange}
                inputProps={{
                  name: "RepairRequestID",
                }}
            
           > 
                             <option value= {0} key= {0}>

                  </option>
                {repairRequest.map((item: RepairRequestsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Device}
                  </option>
                ))}

               
        </Select> 
      </FormControl>           
      </Box>
          </Grid>
          <Grid item xs={2}>
          <Box display="flex"  color="text.primary">
            <Box flexGrow={2} pt={3} pl={5}>
          <Typography
            component="h2"
            variant="body2"
            color="inherit"
            gutterBottom>
          ลักษณะการซ่อม
          </Typography>
            </Box >
            </Box>
          </Grid>
          <Grid item xs={4} >
          <Box flexGrow={2}  pt={1.5}>
          <FormControl className={classes.formControl}>
        <Select
        native
        variant="outlined"
          value={workReceives.WorkPlace}
          onChange={handleChange}
        //   onOpen={getActivities}
          inputProps={{
            name: "WorkPlaceID",
          }}
        >
                             <option value= {0} key= {0}>

                  </option>
                {workPlace.map((item: WorkplaceInterface) => (

                  <option value={item.ID}>
                  {item.Name}
                    </option>
                )
                )}
        </Select>
      </FormControl>         </Box>
          </Grid>
          <Grid item xs={2}>
          <Box display="flex"  color="text.primary">
            <Box flexGrow={2}  pt={3} pl={5}>
          <Typography
            component="h2"
            variant="body2"
            color="inherit"
            gutterBottom
          >
          พนักงาน
          </Typography>
         </Box >
         </Box>
          </Grid> 
          <Grid item xs={4}>
          <Box flexGrow={2}  pt={1.5}>
          <FormControl className={classes.formControl} disabled>
        <Select
                native
                variant="outlined"
                value={workReceives.EmployeeID}
                onChange={handleChange}
                inputProps={{
                  name: "EmployeeID",
                }}>
 <option value={Employees?.ID}>{Employees?.Name}</option>
        </Select>
      </FormControl>
      </Box>
          </Grid>

          <Grid item xs={2}>
          <Box display="flex"  color="text.primary">
            <Box flexGrow={2}  pt={3} pl={5}>
          <Typography
            component="h2"
            variant="body2"
            color="inherit"
            gutterBottom
          >
          ค่าแรง
          </Typography>
         </Box >
         </Box>
          </Grid> 
          <Grid item xs={4}>
          <Box flexGrow={2}  pt={1.5}>
          <FormControl className={classes.formControl} disabled>
       <TextField
        variant="outlined"
        fullWidth
        value = {workReceives.Wages} onChange={handleChange} inputProps={{
            name: "Wages",
          }}
       />
       </FormControl>         </Box>
          </Grid>
          
          <Grid item xs={2}>
          <Box display="flex"  color="text.primary">
            <Box flexGrow={2}  pt={3} pl={5}>
          <Typography
            component="h2"
            variant="body2"
            color="inherit"
            gutterBottom
          >
          รหัสงานซ่อม
          </Typography>
         </Box >
         </Box>
          </Grid> 
          <Grid item xs={4}>
          <Box flexGrow={2}  pt={1.5}>
          <FormControl className={classes.formControl} disabled>
       <TextField
        variant="outlined"
        fullWidth
        value = {workReceives.WorkCode} onChange={handleChange} inputProps={{
                  name: "WorkCode",
                }}
       />
       </FormControl>         </Box>
          </Grid>
         
          <Grid item xs={2} >
              <Box pl={5}  alignItems="center">
              <Typography
            component="h2"
            variant="body2"
            color="inherit"
            gutterBottom
          >
          วันที่งานจะเสร็จ
          </Typography>
              </Box>
          </Grid>

          <Grid item xs={4} alignItems="flex-start">

           <Box pt={3}>
            <FormControl  variant="outlined"> 
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker value={selectedDate} onChange={handleDateChange}  format="dd/MM/yyyy"/>
              </MuiPickersUtilsProvider>
            </FormControl>
            </Box>
 
          </Grid> 

          <Grid item xs={3}>
          <Box padding={2}>
          <Button
              component={RouterLink}
              to="/WorkReceive"
              variant="contained"
                fullWidth
            >
              กลับ
            </Button>
            </Box>
 
          </Grid>
          <Grid item xs={3}/>
          <Grid item xs={6}>
            <Box pr={2} pt={2}>
            <Button
 
               onClick={submit}
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
            >
                         ยืนยันการรับงาน              
            </Button>
            </Box>
 
          </Grid>
 
        </Grid>


        </Paper>
    </Container>  
    </div>
  );
 
 }
 
 
 export default WorkReceiveCreate;