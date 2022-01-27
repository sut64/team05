import { Container } from "@material-ui/core"
import { Box } from "@material-ui/core"
import { Typography } from "@material-ui/core"
import { Button } from "@material-ui/core"
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import NavBarEmployee from "./NavBar_employee";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: { marginTop: theme.spacing(2) },
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

export default function PartsPurchase() {
    const classes = useStyles();
    return (
        <div>
            <NavBarEmployee />
            <div className={classes.drawerHeader} />
            <Container className={classes.container} maxWidth="md">
                <Box display="flex">
                    <Box flexGrow={1}>
                        <Typography
                            component="h4"
                            variant="h4"
                            color="primary"
                            gutterBottom
                        >
                            ระบบบันทึกการใช้อะไหล่ในการซ่อมคอมพิวเตอร์
                        </Typography>
                    </Box>
                    <Box>
                        <Button
                            component={RouterLink}
                            to="/PartsPurchase/create"
                            variant="contained"
                            color="primary"
                        >
                            เพิ่มบันทึก
                        </Button>
                    </Box>
                </Box>
                <TableContainer component={Paper} className={classes.tableSpace}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" width="20%">
                                    workrecive
                                </TableCell>
                                <TableCell align="left" width="15%">
                                    part
                                </TableCell>
                                <TableCell align="center" width="10%">
                                    quantity
                                </TableCell>
                                <TableCell align="center" width="10%">
                                    price
                                </TableCell>
                                <TableCell align="center" width="10%">
                                    shop
                                </TableCell>
                                <TableCell align="center" width="15%">
                                    editor
                                </TableCell>
                                <TableCell align="center" width="20%">
                                    purchase Time
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    );
}