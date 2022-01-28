import { useEffect, useState } from "react";

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

import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import Snackbar from "@material-ui/core/Snackbar";

import { MuiPickersUtilsProvider, KeyboardDateTimePicker, } from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

import Select from '@material-ui/core/Select';

import InputLabel from '@material-ui/core/InputLabel';

import FormControlLabel from '@material-ui/core/FormControlLabel';

import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';

import { FormHelperText } from "@material-ui/core";

import { RepairRequestsInterface } from "../models/IRepairRequest";

import { DifficultiesInterface } from "../models/IDifficulty";

import { EmployeeInterface } from "../models/IEmployee";

import { RepairHistoriesInterface } from "../models/IRepairHistory";

import NavBarEmployee from "./NavBar_employee";

import { now } from "moment";

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};


const useStyles = makeStyles((theme: Theme) =>

  createStyles({

    root: { flexGrow: 1 },

    container: { marginTop: theme.spacing(8) },

    paper: { padding: theme.spacing(2), color: theme.palette.text.secondary },

    formControl: {
      margin: theme.spacing(0),
      minWidth: 260,
    },

    buttonControl: {
      margin: theme.spacing(1),
      minWidth: 80,
    },

    selectEmpty: {
      marginTop: theme.spacing(2),
    },

    margin: {
      margin: theme.spacing(1),
      minWidth: 120,
    },

  })

);

function RepairHistoryCreate() {

  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [Employees, setEmployees] = useState<EmployeeInterface>();
  const [Difficulties, setDifficulties] = useState<DifficultiesInterface[]>([]);
  const [RepairRequests, setRepairRequests] = useState<RepairRequestsInterface[]>([]);
  const [RepairHistories, setRepairHistories] = useState<Partial<RepairHistoriesInterface>>(
    {}
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const apiUrl = "http://localhost:8080";

  const [state, setState] = useState({
    Success: true,
  });

  
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
      
    },
  };

  
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof RepairHistories;
    setRepairHistories({
      ...RepairHistories,
      [name]: event.target.value,
    });
    
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

    //here
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof typeof RepairHistories;  
    setState({ ...state, [name]: event.target.checked });

    setRepairHistories({
      ...RepairHistories,
      [name]: event.target.checked,
    });
  };
  

  const getEmployees = async () => {
    let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/employee/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        RepairHistories.EditorID = res.data.ID
        if (res.data) {
          setEmployees(res.data);
          console.log(RepairHistories.Editor);
          console.log(RepairHistories.EditorID);
        } else {
          console.log("else");
        }
      });
  };

  const getDifficulties = async () => {
    fetch(`${apiUrl}/difficulties`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setDifficulties(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getRepairRequests = async () => {
    fetch(`${apiUrl}/repair_requests`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setRepairRequests(res.data);
        } else {
          console.log("else");
        }
      });
  };

  
  useEffect(() => {
    getEmployees();
    getDifficulties();
    getRepairRequests();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      RepairRequestID: convertType(RepairHistories.RepairRequestID),
      Problem: RepairHistories.Problem,
      Solution: RepairHistories.Solution,
      Success: RepairHistories.Success,
      DifficultyID: convertType(RepairHistories.DifficultyID),
      EditorID: convertType(RepairHistories.EditorID),
      Timestamp: selectedDate,
    };

    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/repair_histories`, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้")
          setSuccess(true);
        } else {
          console.log("บันทึกไม่ได้")
          setError(true);
        }
      });
  }

  console.log(RepairHistories);

  return (

    <Container className={classes.container} maxWidth="sm">
      <NavBarEmployee />
      <Typography component="div" style={{ height: '3vh' }} />
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

      <Paper className={classes.paper}>

        <Box display="flex">

          <Box flexGrow={1}>

            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              บันทึกประวัติการซ่อมคอมพิวเตอร์
            </Typography>

          </Box>
        </Box>

        <Divider />
        <Typography component="div" style={{ height: '4vh' }} />
        <Grid container spacing={2} className={classes.root}>

          <Grid item xs={5}>

            <p>รายการแจ้งซ่อม</p>
          </Grid>
          <Grid item xs={7}>

            <FormControl variant="outlined" fullWidth>
              <Select
                native
                value={RepairHistories.RepairRequestID}
                onChange={handleChange}
                inputProps={{
                  name: "RepairRequestID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกรายการแจ้งซ่อม
                </option>
                {RepairRequests.map((item: RepairRequestsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Device}
                  </option>
                ))}
              </Select>

            </FormControl>

          </Grid>

          <Grid item xs={5}>
            <p>ปัญหา</p>
          </Grid>

          <Grid item xs={7}>
            <FormControl fullWidth variant="outlined">

              <TextField
                id="Problem"
                variant="outlined"

                type="string"

                size="medium"

                inputProps={{
                  name: 'Problem',
                }}
                 InputLabelProps={{
                   shrink: true,
                 }}

                onChange={handleChange}

              />

            </FormControl>
          </Grid>

          <Grid item xs={5}>
            <p>การแก้ปัญหา</p>
          </Grid>

          <Grid item xs={7}>
            <FormControl fullWidth variant="outlined">

              <TextField
                id="Solution"
                variant="outlined"

                type="string"

                size="medium"

                inputProps={{
                  name: 'Solution',
                }}
                 InputLabelProps={{
                   shrink: true,
                 }}

                onChange={handleChange}

              />

            </FormControl>
          </Grid>


            {/*LOOK HERE*/}
          <Grid item xs={5}>
            <p>ความสำเร็จงานซ่อม</p>
          </Grid>
          <Grid item xs={7}>
          <FormControlLabel
              control={<Checkbox checked={state.Success} 
              id="Success"
              onChange={handleCheckboxChange            
              }
              
              inputProps={{ 
              name : 'Success'}}
              
              name="Success" />}
              label="คลิกถูกหากงานซ่อมสำเร็จ"/>

          </Grid>
            {/*LOOK HERE*/}


          <Grid item xs={5}>
            <p>ระดับความยากของงานซ่อม</p>
          </Grid>
          <Grid item xs={7}>
            <FormControl fullWidth variant="outlined">

              <Select
                native
                value={RepairHistories.DifficultyID}
                onChange={handleChange}
                inputProps={{
                  name: "DifficultyID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกระดับความยากงานซ่อม
                </option>
                {Difficulties.map((item: DifficultiesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))}
              </Select>

            </FormControl>
          </Grid>

          <Grid item xs={5}>
            <p>ผู้แก้ไข</p>
          </Grid>
          <Grid item xs={7}>
            <FormControl variant="outlined" className={classes.formControl} fullWidth disabled>

              <InputLabel htmlFor="outlined-edited-native-simple"></InputLabel>
              <Select
                native
                value={RepairHistories.EditorID}
                
                inputProps={{
                  name: "EditorID",
                }}
              >
                {/*edit around here*/}
                
                <option value={Employees?.ID} key={Employees?.ID}>
                  {Employees?.Name}
                </option>

                {/* {Employees.map((item: EmployeesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Name}
                  </option>
                ))} */}

              </Select>

              <FormHelperText>* disabled </FormHelperText>
            </FormControl>

          </Grid>

          <Grid item xs={5}>
            <p>เวลาที่บันทึก</p>
          </Grid>
          <Grid item xs={7}>
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

            <Button className={classes.buttonControl}
              component={RouterLink} to="/repair_histories"
              variant="contained" size="large"
              style={{ float: "left" }}>
              Back
            </Button>

            <Button className={classes.buttonControl}
              style={{ float: "right" }}
              variant="contained"
              color="primary"
              size="large"
              onClick={submit}
            >

              บันทึกประวัติการซ่อมคอมพิวเตอร์

            </Button>

          </Grid>

        </Grid>

      </Paper>

      <Typography component="div" style={{ height: '15vh' }} />

    </Container>
  );

}
export default RepairHistoryCreate;