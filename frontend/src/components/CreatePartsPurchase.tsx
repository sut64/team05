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

import NavBar from './NavBar';

import { WorkReceiveInterface } from '../models/IWorkReceive';
import { EmployeeInterface } from '../models/IEmployee';
import { PurchasingCompanyInterface } from '../models/IPurchasingCompany';
import { PartsPurchaseInterface } from '../models/IPartsPurchase';

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
    const [WorkReceive, setWorkReceive] = useState<WorkReceiveInterface[]>([]);
    const [Editor, setEditor] = useState<EmployeeInterface>();
    const [PurchasingCompany, setPurchasingCompany] = useState<PurchasingCompanyInterface[]>([]);
    const [PartsPurchase, setPartsPurchase] = useState<Partial<PartsPurchaseInterface>>({});

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
    const handleChange = (
        event: React.ChangeEvent<{ name?: string; value: unknown }>
    ) => {
        const name = event.target.name as keyof typeof PartsPurchase;
        setPartsPurchase({
            ...PartsPurchase,
            [name]: event.target.value,
        });
        console.log(PartsPurchase);
    };

    const apiUrl = "http://localhost:8080";
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    };

    const getWorkReceive = async () => {
        fetch(`${apiUrl}/WorkReceives`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setWorkReceive(res.data);
                } else {
                    console.log("else");
                }
            });
    };

    const getPurchasingCompany = async () => {
        fetch(`${apiUrl}/purchasingCompany`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setPurchasingCompany(res.data);
                } else {
                    console.log("else");
                }
            });
    };

    const getEmployees = async () => {
        let uid = localStorage.getItem("uid");
        fetch(`${apiUrl}/employee/${uid}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                PartsPurchase.EditorID = res.data.ID
                if (res.data) {
                    setEditor(res.data);
                } else {
                    console.log("else");
                }
            });
    };

    useEffect(() => {
        getEmployees();
        getPurchasingCompany();
        getWorkReceive();

    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };
    const convertType2Float = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseFloat(data) : data;
        return val;
    };

    function submit() {
        let data = {
            Parts: PartsPurchase.Parts,
            Quantity: convertType(PartsPurchase.Quantity),
            PartsPrice: convertType2Float(PartsPurchase.PartsPrice),
            PurchaseTime: selectedDate,
            ShoppingID: convertType(PartsPurchase.ShoppingID),
            WorkReceiveID: convertType(PartsPurchase.WorkReceiveID),
            EditorID: convertType(PartsPurchase.EditorID)
        };
        console.log(data)
        const requestOptionsPost = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/partsPurchase`, requestOptionsPost)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setSuccess(true);
                } else {
                    setError(true);
                    console.log(res)
                }
            });
    }

    return (
        <Container className={classes.Container} maxWidth="md">
            <NavBar />
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
                            <TableCell align="left" width="10%">
                                WorkCode
                            </TableCell>
                            <TableCell align="left" width="20%">
                                Device
                            </TableCell>
                            <TableCell align="center" width="30%">
                                Issue
                            </TableCell>
                            <TableCell align="center" width="40%">
                                repairer
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {WorkReceive.map((item: WorkReceiveInterface) => (
                            <TableRow key={item.ID}>
                                <TableCell align="left" >{item.WorkCode}</TableCell>
                                <TableCell align="left" >{item.RepairRequest.Device}</TableCell>
                                <TableCell align="left" >{item.RepairRequest.Issue}</TableCell>
                                <TableCell align="center" >{item.Employee.Name}</TableCell>
                            </TableRow>
                        ))}
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
                                    value={PartsPurchase.EditorID}
                                    inputProps={{
                                        name: 'EditorID',
                                    }}
                                >
                                    <option value={Editor?.ID} key={Editor?.ID}>
                                        {Editor?.Name}
                                    </option>
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
                                    value={PartsPurchase.WorkReceiveID}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'WorkReceiveID',
                                    }}
                                >
                                    <option aria-label="None" value="">
                                        กรุณาเลือกงานที่ทำการซ่อม
                                    </option>
                                    {WorkReceive.map((item: WorkReceiveInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.WorkCode}
                                        </option>
                                    ))}
                                </NativeSelect>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} className={classes.textRight}>
                            <p>ชื่ออะไหล่</p>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    id="Parts"
                                    label="ชื่ออะไหล่"
                                    type="string"
                                    inputProps={{
                                        name: 'Parts',
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} className={classes.textRight}>
                            <p>จำนวน</p>
                        </Grid>
                        <Grid item xs={3} >
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    id="Quantity"
                                    label="จำนวน"
                                    type="number"
                                    variant="outlined"
                                    inputProps={{
                                        name: 'Quantity',
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={2} className={classes.textRight}>
                            <p>ราคา</p>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth variant="outlined">
                                <TextField
                                    id="PartsPrice"
                                    label="ราคา"
                                    type="number"
                                    variant="outlined"
                                    inputProps={{
                                        name: 'PartsPrice',
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} className={classes.textRight}>
                            <h4>ร้านที่ซื้ออะไหล่</h4>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl className={classes.formControl}>
                                <NativeSelect
                                    value={PartsPurchase.ShoppingID}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'ShoppingID',
                                    }}
                                >
                                    <option aria-label="None" value="">
                                        กรุณาเลือกร้านที่ทำการซื้ออะไหล่
                                    </option>
                                    {PurchasingCompany.map((item: PurchasingCompanyInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Name}
                                        </option>
                                    ))}
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
                                        name="PurchaseTime"
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
                    onClick={submit}
                >
                    ตกลง
                </Button>
            </Paper>
            <br />
        </Container>
    );
}