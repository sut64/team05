import React, { useEffect } from "react";
import { Container, createStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography, Dialog, Accordion, AccordionDetails, AccordionSummary, Collapse } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import  Button  from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import  Paper  from "@material-ui/core/Paper";
import moment from "moment";

import { WarranteeInterface } from "../models/IWarrantee";
import NavBar from "./NavBar_employee";

const useStyles = makeStyles((theme:Theme) => createStyles({
    container: {marginTop: theme.spacing(10)},
    table: {minWidth: 650},
    tableSpace: {marginTop: 20},
}));

function Warrantee() {
    const classes = useStyles();
    const [warrantee, setWarrantee] = React.useState<WarranteeInterface[]>([]);

    const apiUrl = "http://localhost:8080";
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    }

    const getWarrantee = async() => {
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

    useEffect(() => {
        getWarrantee();
    }, []);

    return (
        <div>
            <NavBar/>
            <Container className={classes.container} maxWidth="md">
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
                                <TableCell align="center" width="10%">
                                    Code
                                </TableCell>
                                <TableCell align="center" width="10%">
                                    Warrantee Type
                                </TableCell>
                                <TableCell align="center" width="10%">
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {warrantee.map((warrantee:WarranteeInterface) => (
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