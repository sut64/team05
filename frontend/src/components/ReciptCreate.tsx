import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import DateFnsUtils from "@date-io/date-fns";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker, } from "@material-ui/pickers";
import { useEffect, useState } from "react";


import { EmployeesInterface } from "../models/IEmployee"
import { PaidBiesInterface } from "../models/IPaidBy"
import { ReciptHistorysInterface } from "../models/IReciptHistory"
import { WorkRecivesInterface } from "../models/IWorkRecive"
import { SignInsInterface } from "../models/ISignIn";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};


const useStyles = makeStyles((theme: Theme) =>

  createStyles({
    margin: { 
      marginLeft: theme.spacing(0),
    },

    root: {
      flexGrow: 1
    },

    container: { marginTop: theme.spacing(2) },

    paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },

  })

);


function ReciptHistory() {
 
  const classes = useStyles();
  const loginUser = localStorage.getItem("uid");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [Employees, setEmployees] = useState<EmployeesInterface>();
  const [Workrecives, setWorkrecives] = useState<WorkRecivesInterface[]>([]);
  const [PaidBies, setPaidBies] = useState<PaidBiesInterface[]>([]);
  const [RecieptHistory, setRecieptHistory] = useState<Partial<ReciptHistorysInterface>>(
    {}
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json", },
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof RecieptHistory;
    setRecieptHistory({
      ...RecieptHistory,
      [name]: event.target.value,
    });
  };



  const getEmployees = async () => {
    fetch(`${apiUrl}/emplayoee/${loginUser}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        RecieptHistory.EmployeeID = res.data.ID
        if (res.data) {
          setEmployees(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getWorkrecives = async () => {
    fetch(`${apiUrl}/workrecives/employees/${Employees?.ID}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setWorkrecives(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getPaidbies = async () => {
    fetch(`${apiUrl}/paidbies`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setPaidBies(res.data);
        } else {
          console.log("else");
        }
      });
  }

  useEffect(() => { 
    getEmployees();
    getWorkrecives();
    getPaidbies();

  }, []);


  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      EmployeeID: RecieptHistory.EmployeeID  ,
      WorkreciveID: RecieptHistory.WorkReciveID,
      PaidByID: RecieptHistory.PaidByID,
      RecipetCode: RecieptHistory.RecipetCode ,
      RecieptPrice: convertType(RecieptHistory.RecieptPrice),
      RecieptDate: selectedDate,
    };

    const requestOptionsPost = {
      method: "POST",
      headers: {  
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/recipt_histories`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data)
        if (res.data) {
          setSuccess(true);
        } else {
          setError(true);
        }
      });
  }

  console.log(RecieptHistory)



  return (

    <Container className={classes.container} maxWidth="md"> 
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
        </Alert>
      </Snackbar>
         
      
      <Typography component="div" style={{ height: '13vh' }} />
      <Paper className={classes.paper}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ระบบบันทึกใบแจ้งชำระเงิน
            </Typography>
          </Box>
        </Box>
        <Divider />

        <Grid container spacing={5} className={classes.root}>

        <Grid item xs={6}>
            <Typography component="div" style={{ height: '7vh' }} />
            <FormControl fullWidth variant="outlined">
              <Select
              defaultValue = {0} disabled  //set value = 0 
              >
                 <MenuItem value={0} > {"Employee : "}{Employees?.Name } </MenuItem>
                  ) 
                  </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
           <Typography component="div" style={{ height: '7vh' }} />
            <FormControl fullWidth variant="outlined">
            <InputLabel id="WorkreciveID">CodeWork</InputLabel>
              <Select
                labelId="WorkreciveID"
                id="WorkreciveID"
                value={RecieptHistory.WorkReciveID}
                onChange={handleChange}
                label="WorkreciveID"
                onOpen={getWorkrecives}//เมื่อไหร่ combobox เปิดทำงาน
                inputProps={{
                  name: 'WorkreciveID',
                }}
              >
                <MenuItem  aria-label="None" value="">
                  None
                </MenuItem >
                {Workrecives.map((item: WorkRecivesInterface) => (
                  <MenuItem  value={item.ID} key={item.ID}>
                    {item.WorkCode}
                  </MenuItem >
                ))}

              </Select>
            </FormControl>
          </Grid>

          
        <Grid item xs={6}>

        <FormControl fullWidth variant="outlined">
        <InputLabel id="PaidByID">Payment</InputLabel>
        <Select
          
          labelId="PaidByID"
          id="PaidByID"
          value={RecieptHistory.PaidByID}
          onChange={handleChange}
          label="PaidByID"
          inputProps={{
            name: 'PaidByID',
          }}
        >
          <MenuItem aria-label="None" value="">
                None
                </MenuItem>
                {PaidBies.map((item: PaidBiesInterface) => (
                  <MenuItem value={item.ID} key={item.ID}>
                    {item.Name}
                  </MenuItem>
                   ))}
        </Select>
      </FormControl>
      </Grid>

          <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">
             <TextField id="RecieptPrice" 
              label="Price" 
              variant="outlined"
              size="medium"
              inputProps={{
                name: 'RecieptPrice',
              }}
              onChange={handleChange} 
             />
           </FormControl>
         </Grid>

         <Grid item xs={6}>
           <FormControl fullWidth variant="outlined">
             <TextField id="RecipetCode" 
              label="RecipetCode" 
              variant="outlined"
              size="medium"
              inputProps={{
                name: 'RecipetCode',
              }}
              onChange={handleChange} 
              />   
           </FormControl>
         </Grid>

         <Grid item xs={6}>
          <p>Time</p> 
            <FormControl variant="outlined" fullWidth >

            <MuiPickersUtilsProvider utils={DateFnsUtils}>

              <KeyboardDateTimePicker 
                  name="Timestamp"
                  value={selectedDate}
                  onChange={handleDateChange} 
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
              to="/recipt_histories"
              variant="contained"
            >
              กลับ
            </Button>

            <Button

              style={{ float: "right" }}

              variant="contained"
              onClick={submit}
              color="primary"
            >
              บันทึกข้อมูล
            </Button>
          </Grid>
          </Grid>
      </Paper>
    </Container>
  );
}



export default ReciptHistory;
