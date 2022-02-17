import React, { useEffect } from "react";
import { makeStyles, Theme, createStyles, Container, Snackbar, Paper, Box, Typography, Divider, Grid, FormControl, TextField, Button, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from "@material-ui/core";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"
import { Link as RouterLink } from "react-router-dom"

import { WarranteeInterface } from "../models/IWarrantee";
import { WorkReceiveInterface } from "../models/IWorkReceive";
import { WarranteeTypeInterface } from "../models/IWarranteeType";
import { EmployeeInterface } from "../models/IEmployee";
import NavBar from "./NavBar";
import moment from "moment";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props}/>
}

const useStyles = makeStyles((theme:Theme) => createStyles({
    root: {flexGrow: 1},
    container: {marginTop: theme.spacing(10)},
    paper: {
        padding: theme.spacing(2), 
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(3),
    },
    table: {minWidth: 650},
    tableSpace: {marginTop: 0},
}));

function WarranteeCreate() {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
    
    const [warrantee, setWarrantee] = React.useState<Partial<WarranteeInterface>>({});
    const [workReceive, setWorkReceive] = React.useState<WorkReceiveInterface[]>([]);
    const [warranteeType, setWarranteeType] = React.useState<WarranteeTypeInterface[]>([]);
    const [employee, setEmployee] = React.useState<Partial<EmployeeInterface>>({});

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [workReceiveChange, setWorkReceiveChange] = React.useState(false);
    const [warranteeTypeChange, setWarranteeTypeChange] = React.useState(false);
    const [employeeChange, setEmployeeChange] = React.useState(false);

    const [disable, setDisable] = React.useState(false);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClose = (event?: React.SyntheticEvent, reson?: string) => {
        if(reson === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    }

    const handleInputChange = (event: React.ChangeEvent<{name?: string; value: any}>) => {
        
        const name = event.target.name as keyof typeof warrantee;
        const { value } = event.target;
        setWarrantee({...warrantee, [name]: value});
    }

    // this handle for in case of select wage insurance 
    const handleSelectChange = (event: React.ChangeEvent<{name?: string; value: any}>) => {
        
        const name = event.target.name as keyof typeof warrantee;
        const { value } = event.target;
        setWarrantee({...warrantee, [name]: value});

        if(value == "2") {
            setDisable(true);
        }
        else {
            setDisable(false);
        }
    }

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const apiUrl = "http://localhost:8080";

    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    const getEmployee = async() => {
        setEmployeeChange(false);
        const uid = localStorage.getItem("uid")
        fetch(`${apiUrl}/employee/${uid}`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
              setEmployee(res.data);
            }
            else {
              console.log("cannot get employee");
            }
          });
    };
    
    const getWorkReceive= async() => {
        setWorkReceiveChange(false);   
        fetch(`${apiUrl}/work_receives`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
              setWorkReceive(res.data);
            }
            else {
              console.log("cannot get work receive");
            }
          });
     };

    const getWarranteeType = async() => {
        setWarranteeTypeChange(false);
        fetch(`${apiUrl}/warrantee_types`, requestOptions)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
              setWarranteeType(res.data);
            }
            else {
              console.log("cannot get warrantee type");
            }
          });
     }; 

    // useEffect for re-fetch date when submit data
    useEffect(() => {
        if(employeeChange) {
            getEmployee();
        }
        if(workReceiveChange) {
            getWorkReceive();
        }
        if(warranteeTypeChange) {
            getWarranteeType();
        }
    }, [
        employeeChange ? employee:undefined,
        workReceiveChange ? workReceive:undefined,
        warranteeTypeChange ? warranteeType:undefined,
    ]);

    // useEffect for first load data 
    useEffect(() => {
         getEmployee();
         getWorkReceive();
         getWarranteeType();
    }, []);

    const convertTypeInt = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    }
    

    function submit() {

        // select first item in combobox
        if (warrantee.WarranteeTypeID === undefined) {
            warrantee.WarranteeTypeID = warranteeType[0].ID;
        }
        if (warrantee.EmployeeID === undefined) {
            warrantee.EmployeeID = employee.ID;
        }

        // handle of work recive data, in case have no any data after fetch data
        if (warrantee.WorkReceiveID === undefined && workReceive.length !== 0) {
            warrantee.WorkReceiveID = workReceive[0].ID;
        }
        // handle of warranty part data, in case select wage insurance
        if ((warrantee.WarrantyPart === undefined && disable) || disable) {
            warrantee.WarrantyPart = "ไม่มี";
        }
        
        let data = {
            ID_Warrantee: warrantee.ID_Warrantee = "",
            EndOfWarrantee: selectedDate,
            WarrantyPart: warrantee.WarrantyPart,
            MaximumAmount: typeof warrantee.MaximumAmount === "string" ? parseFloat(warrantee.MaximumAmount) : undefined,
            
            WorkReceiveID: convertTypeInt(warrantee.WorkReceiveID),
            EmployeeID: convertTypeInt(warrantee.EmployeeID = employee.ID),
            WarranteeTypeID: convertTypeInt(warrantee.WarranteeTypeID),
        };

        const requestOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
              },
            body: JSON.stringify(data),
        };
        // console.log(JSON.stringify(data));

        fetch(`${apiUrl}/warrantee`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if(res.data) {
                    setSuccess(true);
                    setErrorMessage("");

                    // set state for re-fetch data
                    setEmployeeChange(true);
                    setWorkReceiveChange(true);
                    setWarranteeTypeChange(true);

                    // reset textfield when submit
                    setWarrantee({WarrantyPart: "", MaximumAmount: 0});
                    // reset date picker when submit
                    setSelectedDate(new Date());
                }
                else {
                    setError(true);
                    setErrorMessage(res.error);
                }
            })
    }
    
    return (
        <Container className={classes.container} maxWidth="md">
            <NavBar/>
            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    บันทึกข้อมูลสำเร็จ
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    บันทึกข้อมูลไม่สำเร็จ: {errorMessage}
                </Alert>
            </Snackbar>

            <TableContainer component={Paper} className={classes.tableSpace} style={{maxHeight: 269}}>
                <Table className={classes.table} stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" width="15%">
                                Work Code
                            </TableCell>
                            <TableCell align="center" width="20%">
                                Device
                            </TableCell>
                            <TableCell align="center" width="25%">
                                Issue
                            </TableCell>
                            <TableCell align="center" width="15%">
                                Finish Date
                            </TableCell>
                            <TableCell align="center" width="25%">
                                Repairer
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workReceive.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((workReceive:WorkReceiveInterface) => (
                            <TableRow key={workReceive.ID}>
                                <TableCell align="center" size="medium">
                                    {workReceive.WorkCode}
                                </TableCell>
                                <TableCell align="center">{workReceive.RepairRequest.Device}</TableCell>
                                <TableCell align="center">{workReceive.RepairRequest.Issue}</TableCell>
                                <TableCell align="center">
                                    {moment(workReceive.FinishedDate).format("DD/MM/YYYY")}
                                </TableCell>
                                <TableCell align="center">{workReceive.Employee.Name}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[2, 4, 8]}
                component="div"
                count={workReceive.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Paper className={classes.paper}>
                <Box display="flex">
                    <Box flexGrow={1}>
                        <Typography
                            component="h2"
                            variant="h6"
                            color="primary"
                            gutterBottom
                        >
                            Create Warrantee
                        </Typography>
                    </Box>
                </Box>

                <Divider/>
    
                <Box paddingTop="3%">
                    <Grid container spacing={3} className={classes.root} alignItems="center">
                        <Grid item xs={6}>
                            <Typography
                            component="h2"
                            variant="h6"
                            color="primary"
                            gutterBottom
                            align="center"
                            >
                            ผู้บันทึกข้อมูล
                            </Typography>
                        </Grid>

                        <Grid item xs={5}>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    native
                                    name="Name"
                                    variant="outlined"
                                    value={employee.Name}
                                    onChange={handleInputChange}
                                    disabled
                                >
                                    <option value={employee.ID} key={employee.ID}>
                                        {employee.Name}
                                    </option>
                                
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid> 


                    <Grid container spacing={3} className={classes.root} alignItems="center">
                        <Grid item xs={6}>
                            <Typography
                                component="h2"
                                variant="h6"
                                color="primary"
                                gutterBottom
                                align="center"
                            >
                                งานที่ซ่อม
                            </Typography>
                        </Grid>

                        <Grid item xs={5}>
                            <FormControl fullWidth variant="outlined">
                                <Select
                                    native
                                    name="WorkReceiveID"
                                    variant="outlined"                            
                                    value={warrantee.WorkReceiveID}
                                    onChange={handleInputChange}
                                    disabled={workReceive.length === 0 ? true:false}
                                >
                                    {workReceive.length === 0 ? (
                                        <option aria-label="None" value="">
                                            No Work Available
                                        </option>): <br/>}

                                    {workReceive.map((item: WorkReceiveInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.WorkCode}
                                        </option>
                                    ))}

                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
          
                    <Grid container spacing={3} className={classes.root} alignItems="center">
                        <Grid item xs={6}>
                            <Typography
                            component="h2"
                            variant="h6"
                            color="primary"
                            gutterBottom
                            align="center"
                            >
                            รูปแบบการรับประกัน
                            </Typography>
                        </Grid>

                        <Grid item xs={5}>
                            <FormControl fullWidth variant="outlined">

                                <Select
                                    native
                                    name="WarranteeTypeID"
                                    variant="outlined"                            
                                    value={warrantee.WarranteeTypeID}
                                    onChange={handleSelectChange}
                                >
                                    {warranteeType.map((item: WarranteeTypeInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Description}
                                        </option>
                                    ))}
                                </Select>
                            
                            </FormControl>
                        </Grid>
                    </Grid>  
            
                    <Grid container spacing={3} className={classes.root} alignItems="center">
                        <Grid item xs={6}>
                            <Typography
                                component="h2"
                                variant="h6"
                                color="primary"
                                gutterBottom
                                align="center"
                            >
                                อะไหล่ที่ประกันได้
                            </Typography>
                        </Grid>

                        <Grid item xs={5}>
                            <FormControl fullWidth variant="outlined">

                                {disable ? (
                                    <TextField
                                        name="WarrantyPart"
                                        variant="outlined"
                                        type="string"
                                        size="medium" 
                                        multiline
                                        maxRows={2}                           
                                        value="ไม่มี"
                                        disabled={disable}
                                    />
                                    ):(
                                        <TextField
                                            name="WarrantyPart"
                                            variant="outlined"
                                            type="string"
                                            size="medium" 
                                            multiline
                                            maxRows={2}
                                            value={warrantee.WarrantyPart || ""}
                                            onChange={handleInputChange}
                                    />
                                    )
                                }
                            </FormControl>
                        </Grid>
                    </Grid>  


                    <Grid container spacing={3} className={classes.root} alignItems="center">
                        <Grid item xs={6}>
                            <Typography
                            component="h2"
                            variant="h6"
                            color="primary"
                            gutterBottom
                            align="center"
                            >
                            วงเงินสูงสุด
                            </Typography>
                        </Grid>

                        <Grid item xs={5}>
                            <FormControl fullWidth variant="outlined">

                                <TextField
                                    name="MaximumAmount"
                                    variant="outlined"
                                    type="number"
                                    size="medium"
                                    value={warrantee.MaximumAmount || ""}
                                    onChange={handleInputChange}
                                />
                            
                            </FormControl>
                        </Grid>
                    </Grid>  


                    <Grid container spacing={3} className={classes.root} alignItems="center">
                        <Grid item xs={6} >
                            <Typography
                            component="h2"
                            variant="h6"
                            color="primary"
                            gutterBottom
                            align="center"
                            >
                                วันที่หมดประกัน
                            </Typography>
                        </Grid>

                        <Grid item xs={5}>
                            <Box paddingLeft="6%" paddingRight="6%">
                            <FormControl fullWidth variant="outlined">

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    name="EndOfWarrantee"
                                    format="yyyy-MM-dd"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date",
                                    }}
                                />
                            </MuiPickersUtilsProvider>

                            </FormControl>
                            </Box>
                        </Grid>    
                    </Grid>   

                    <Grid container spacing={3} className={classes.root}>
                        <Grid item xs={12}>
                            <Button component={RouterLink} to="/warrantee" variant="contained">
                                Back
                            </Button>
                            <Button
                                style={{float: "right"}}
                                onClick={submit}
                                variant="contained"
                                color="primary"
                            >
                                Submit
                            </Button>         
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}

export default WarranteeCreate;