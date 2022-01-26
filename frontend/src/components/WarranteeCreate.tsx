import React from "react";
import { makeStyles, Theme, createStyles, Container, Snackbar, Paper, Box, Typography, Divider, Grid, FormControl, TextField, Button } from "@material-ui/core";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"
import {Link as RouterLink} from "react-router-dom"

import { WarranteeInterface } from "../models/IWarrantee";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props}/>
}

const useStyles = makeStyles((theme:Theme) => createStyles({
    root: {flexGrow: 1},
    container: {marginTop: theme.spacing(12)},
    paper: {padding: theme.spacing(2), 
    color: theme.palette.text.secondary},
}));

function WarranteeCreate() {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
    
    const [warrantee, setWarrantee] = React.useState<Partial<WarranteeInterface>>({});
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    const handleClose = (event?: React.SyntheticEvent, reson?: string) => {
        if(reson === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
    }

    const handleInputChange = (event: React.ChangeEvent<{id?: string; value: any}>) => {
        const id = event.target.id as keyof typeof WarranteeCreate;
        const { value } = event.target;
        setWarrantee({...warrantee, [id]:value})
    }

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    } ;

    function submit() {
        let data = {
            FirstName: warrantee.FirstName ?? "",
            LastName: warrantee.LastName ?? "",
            Email: warrantee.Email ?? "",
            Age: typeof warrantee.Age === "string" ? parseInt(warrantee.Age) : 0,
            BirthDay: selectedDate,
        };

        console.log(data);

        // const apiUrl = "http://localhost:8080/user";
        // const requestOptions = {
        //     method: "POST",
        //     headers: {"Content-Type": "application/json"},
        //     body: JSON.stringify(data),
        // };

        // fetch(apiUrl, requestOptions)
        //     .then((response) => response.json())
        //     .then((res) => {
        //         if(res.data) {
        //             // console.log(res.data);
        //             setSuccess(true);
        //         }
        //         else {
        //             setError(true);
        //         }
        //     })
    }

    return (
        <Container className={classes.container} maxWidth="md">
            <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    บันทึกข้อมูลสำเร็จ
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    บันทึกข้อไม่มูลสำเร็จ
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
                            Create Warrantee
                        </Typography>
                    </Box>
                </Box>

                <Divider/>

                <Grid container spacing={3} className={classes.root}>
                    
                    <Grid item xs={6}>
                        <p>ผู้บันทึกข้อมูล</p>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                id="FirstName"
                                variant="outlined"
                                type="string"
                                size="medium"                            
                                value={warrantee.FirstName || ""}
                                onChange={handleInputChange}
                            />  
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <p>งานที่ซ่อม</p>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                id="LastName"
                                variant="outlined"
                                type="string"
                                size="medium"                            
                                value={warrantee.LastName || ""}
                                onChange={handleInputChange}
                            />
                                
                        </FormControl>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <p>รูปแบบการรับประกัน</p>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                id="Email"
                                variant="outlined"
                                type="string"
                                size="medium"                            
                                value={warrantee.Email || ""}
                                onChange={handleInputChange}
                            />   
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <p>อะไหล่ที่ประกันได้</p>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                id="Age"
                                variant="outlined"
                                type="string"
                                size="medium"                            
                                value={warrantee.Age || ""}
                                onChange={handleInputChange}
                            />  
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <p>วงเงินสูงสุด</p>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                id=""
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <p>วันที่หมดประกัน</p>
                        <FormControl fullWidth variant="outlined">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="BirthDay"
                                    format="yyyy-MM-dd"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date",
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </FormControl>
                    </Grid>

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
            </Paper>
        </Container>
    );
}

export default WarranteeCreate;