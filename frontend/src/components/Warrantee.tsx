import React, { useEffect } from "react";
import { Container, createStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography, Snackbar, IconButton } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import  Button  from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import  Paper  from "@material-ui/core/Paper";
import moment from "moment";
import NavBar from "./NavBar";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete"

import { WarranteeInterface } from "../models/IWarrantee";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props}/>
}

const useStyles = makeStyles((theme:Theme) => createStyles({
    container: {marginTop: theme.spacing(10)},
    table: {minWidth: 650},
    tableSpace: {marginTop: 20},
}));

function Warrantee() {
    const classes = useStyles()
    const [warrantee, setWarrantee] = React.useState<WarranteeInterface[]>([]);

    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [hasDelete, setHasDelete] = React.useState(false);

    const handleClose = (event?: React.SyntheticEvent, reson?: string) => {
        if(reson === "clickaway") {
            return;
        }
        setSuccess(false);
        setError(false);
        // window.location.reload();
    }

    const apiUrl = "http://localhost:8080";
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    }

    const getWarrantee = async() => {
        setHasDelete(false);
        fetch(`${apiUrl}/warrantees`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if(res.data) {
                    // console.log(res.data);
                    setWarrantee(res.data);
                    
                }
                else {
                    console.log("cannot get warrantee");
                }
            })
    }

    const deleteWarrantee = (index :number) => {
        let id = warrantee[index].ID;

        console.log(warrantee[index].ID)

        const deleteOptions = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
        };

        fetch(`${apiUrl}/warrantee/${id}`, deleteOptions)
            .then((response) => response.json())
            .then((res) => {
                if(res.data) {
                    setSuccess(true);
                    setErrorMessage("");

                    // set state for re-fetch data
                    setHasDelete(true);
                }
                else {
                    setError(true);
                    setErrorMessage(res.error);
                }
            })
    }

    // useEffect for re-fetch date when delete data
    useEffect(() => {
        if(hasDelete) {
            getWarrantee();
        }
    }, [hasDelete ? warrantee:undefined]);

    // useEffect for first load data 
    useEffect(() => {
        getWarrantee();
    }, [])

    return (
        <div>
            <Container className={classes.container} maxWidth="md">
            <NavBar/>
                <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        ลบข้อมูลสำเร็จ
                    </Alert>
                </Snackbar>
                <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        ลบข้อมูลไม่สำเร็จ: {errorMessage}
                    </Alert>
                </Snackbar>
                <Box display="flex">
                    <Box flexGrow={1}>
                        <Typography
                            component="h2"
                            variant="h6"
                            color="primary"
                            gutterBottom
                        >
                            Warrantee List
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/warrantee/create"
                            variant="contained"
                            color="primary"
                        >
                            Create Warrantee
                        </Button>
                    </Box>
                </Box>
                <TableContainer component={Paper} className={classes.tableSpace}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" width="5%">
                                    ID
                                </TableCell>
                                <TableCell align="center" width="5%">
                                    Code
                                </TableCell>
                                <TableCell align="center" width="15%">
                                    Warrantee Type
                                </TableCell>
                                <TableCell align="center" width="5%">
                                    Maximumn Amount
                                </TableCell>
                                <TableCell align="center" width="10%">
                                    End of Warrantee
                                </TableCell>
                                <TableCell align="center" width="15%">
                                    Guarantor
                                </TableCell>
                                <TableCell align="center" width="20%">
                                    Warranty Parts
                                </TableCell>
                                <TableCell align="center" width="5%">
                                    Delete
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {warrantee.map((warrantee:WarranteeInterface, index) => (
                                <TableRow key={warrantee.ID}>
                                    <TableCell align="center">{warrantee.ID}</TableCell>
                                    <TableCell align="center" size="medium">
                                        {warrantee.ID_Warrantee}
                                    </TableCell>
                                    <TableCell align="center">{warrantee.WarranteeType.Description}</TableCell>
                                    <TableCell align="center">{warrantee.MaximumAmount}</TableCell>
                                    <TableCell align="center">
                                        {moment(warrantee.EndOfWarrantee).format("DD/MM/YYYY")}
                                    </TableCell>
                                    <TableCell align="center">{warrantee.Employee.Name}</TableCell>
                                    <TableCell align="center">{warrantee.WarrantyPart}</TableCell>
                                    <TableCell align="center"> 
                                        <Box>
                                            <IconButton
                                                onClick={() => deleteWarrantee(index)}
                                                aria-label="delete"
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
}

export default Warrantee;