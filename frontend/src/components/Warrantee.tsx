import React, { useEffect } from "react";
import { Container, createStyles, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Theme, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import  Button  from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import  Paper  from "@material-ui/core/Paper";
import moment from "moment";

import { WarranteeInterface } from "../models/IWarrantee";

const useStyles = makeStyles((theme:Theme) => createStyles({
    container: {marginTop: theme.spacing(10)},
    table: {minWidth: 650},
    tableSpace: {marginTop: 20},
}));

function Warrantee() {
    const classes = useStyles();
    const [users, setUsers] = React.useState<WarranteeInterface[]>([]);

    // const getUsers = async() => {
    //     const apiUrl = "http://localhost:8080/users";
    //     const requestOptions = {
    //         method: "GET",
    //         headers: { "Content-Type": "application/json"},
    //     };

    //     fetch(apiUrl, requestOptions)
    //         .then((response) => response.json())
    //         .then((res) => {
    //             if(res.data) {
    //                 // console.log(res.data);
    //                 setUsers(res.data);
    //                 // console.log(users.map);
    //             }
    //             else {
    //                 console.log("can not get data");
    //             }
    //         });
    // };

    // useEffect(() => {
    //     getUsers();
    // }, []);

    return (
        <div>
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
                                <TableCell align="center" width="25%">
                                    Code
                                </TableCell>
                                <TableCell align="center" width="25%">
                                    Maximumn Amount
                                </TableCell>
                                <TableCell align="center" width="25%">
                                    End of Warrantee
                                </TableCell>
                                <TableCell align="center" width="20%">
                                    ใส่ปุ่ม
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user:WarranteeInterface) => (
                                <TableRow key={user.ID}>
                                    <TableCell align="right">{user.ID}</TableCell>
                                    <TableCell align="left" size="medium">
                                        {user.FirstName}
                                    </TableCell>
                                    <TableCell align="left">{user.LastName}</TableCell>
                                    <TableCell align="left">{user.Age}</TableCell>
                                    <TableCell align="left">{user.Email}</TableCell>
                                    <TableCell align="center">
                                        {moment(user.BirthDay).format("DD/MM/YYYY")}
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