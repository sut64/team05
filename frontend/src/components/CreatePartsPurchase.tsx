import React, { Component, useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Box } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import { FormControl } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { NativeSelect } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from "@date-io/date-fns";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import NavBarEmployee from './NavBar_employee';

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            '& > *': {
                margin: theme.spacing(1),
                width: '30ch',
            },
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 240,
        },
        Container: {
            marginTop: theme.spacing(2),
        },
        paper: {
            padding: theme.spacing(2), color: theme.palette.text.secondary
        },
        button: {
            margin: theme.spacing(1),
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
        textRight: {
            textAlign: 'right',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 400,
        },
    }),
);

export default function CreatePartsPurchase() {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    
    const handleDateChange = (date: Date | null) => {
        console.log(date);
        setSelectedDate(date);
    };
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
          return;
        }
        setSuccess(false);
        setError(false);
      };

    return (
        <Container className={classes.Container} maxWidth="md">
            <NavBarEmployee />
            <div className={classes.drawerHeader} />
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
            <TableContainer component={Paper} className={classes.tableSpace}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" width="20%">
                                No. workreceive 
                            </TableCell>
                            <TableCell align="center" width="40%">
                                workreceive name
                            </TableCell>
                            <TableCell align="center" width="40%">
                                repairer
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    </TableBody>
                </Table>
            </TableContainer><br />
            <Paper className={classes.paper}>
                <Box p={2}>
                    <Typography variant="h4">
                        ระบบบันทึกการใช้อะไหล่ในการซ่อมคอมพิวเตอร์
                    </Typography>

                    <Grid container spacing={3} >
                        <Grid item xs={3} className={classes.textRight}>
                            <h4>ผู้ทำการบันทึก</h4>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl className={classes.formControl} disabled>
                                <NativeSelect
                                    //value={clubs.AdderID}
                                    //onChange={handleChange}
                                    inputProps={{
                                        name: 'AdderID',
                                        id: 'Adder-native-disabled',
                                    }}
                                >
                                    {/* {studentCouncils.map((item: StudentCouncilInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Name}
                                        </option>
                                    ))} */}
                                    <option value={1}>ปริณ สามัญ</option>
                                </NativeSelect>
                                <FormHelperText>Disabled</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} className={classes.textRight}>
                            <h4>งานที่ทำการซ่อม</h4>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl className={classes.formControl}>
                                <NativeSelect
                                    //value={clubs.AdderID}
                                    //onChange={handleChange}
                                    inputProps={{
                                        name: 'AdderID',
                                        id: 'Adder-native-disabled',
                                    }}
                                >
                                    {/* {studentCouncils.map((item: StudentCouncilInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Name}
                                        </option>
                                    ))} */}
                                    <option value={1}>display</option>
                                    <option value={2}>asd</option>
                                </NativeSelect>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} className={classes.textRight}>
                            <p>ชื่ออะไหล่</p>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    id="Name-Club-Text"
                                    label="ชื่ออะไหล่"
                                    type="string"
                                    //value= {nameClub}
                                    variant="outlined"
                                //onChange = {handleInputChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} className={classes.textRight}>
                            <p>จำนวน</p>
                        </Grid>
                        <Grid item xs={3} >
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    id="Name-Club-Text"
                                    label="จำนวน"
                                    type="int"
                                    //value= {nameClub}
                                    variant="outlined"
                                //onChange = {handleInputChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={2} className={classes.textRight}>
                            <p>ราคา</p>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    id="Name-Club-Text"
                                    label="ราคา"
                                    type="float"
                                    //value= {nameClub}
                                    variant="outlined"
                                //onChange = {handleInputChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} className={classes.textRight}>
                            <h4>ร้านที่ซื้ออะไหล่</h4>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl className={classes.formControl}>
                                <NativeSelect
                                    //value={clubs.AdderID}
                                    //onChange={handleChange}
                                    inputProps={{
                                        name: 'AdderID',
                                        id: 'Adder-native-disabled',
                                    }}
                                >
                                    {/* {studentCouncils.map((item: StudentCouncilInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Name}
                                        </option>
                                    ))} */}
                                    <option value={1}>Advice</option>
                                    <option value={2}>banana</option>
                                </NativeSelect>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} className={classes.textRight}>
                            <h4>ร้านที่ซื้ออะไหล่</h4>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl fullWidth variant="outlined">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDateTimePicker
                                        name="WatchedTime"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        label="กรุณาเลือกวันที่และเวลา"
                                        minDate={new Date("2018-01-01T00:00")}
                                        format="yyyy/MM/dd hh:mm a"
                                    />
                                </MuiPickersUtilsProvider>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                <br />
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    component={RouterLink} to="/PartsPurchase"
                >
                    ยกเลิก
                </Button>
                <Button
                    variant="contained"
                    className={classes.button}
                // onClick={submit}
                >
                    ตกลง
                </Button>
            </Paper>
            <br />
        </Container>
    );
}