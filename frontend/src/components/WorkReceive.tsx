import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { WorkReceiveInterface } from "../models/IWorkReceive";
import NavBarEmployee from "./NavBar_employee";

import moment from 'moment';
 
 
const useStyles = makeStyles((theme: Theme) =>
 createStyles({
   container: {marginTop: theme.spacing(2)},
   table: { minWidth: 650},
   tableSpace: {marginTop: 20},
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
 
function WorkReceive() {
 const classes = useStyles();
 const [workreceives, setWorkReceive] = React.useState<WorkReceiveInterface[]>([]);
 const requestOptions = {

  method: "GET",
  headers: {  
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json", },

};
 const getData = async () => {
   const apiUrl = "http://localhost:8080/WorkReceives";
 
   fetch(apiUrl, requestOptions)
     .then((response) => response.json())
     .then((res) => {
       console.log(res.data);
       if (res.data) {
        setWorkReceive(res.data);
       } else {
         console.log("else");
       }
     });
 };
 
 useEffect(() => {
  getData();
 }, []);
 
 return (
   <div>
     <div className={classes.drawerHeader}/>
     <Container className={classes.container} maxWidth="md">
     <NavBarEmployee />
       <Box display="flex" pt={1}>
         <Box flexGrow={1}>
           <Typography
             component="h3"
             variant="h4"
             color="textPrimary"
             gutterBottom
           >
             ระบบรับงานซ่อม
           </Typography>
         </Box>
         <Box pt={2}>
           <Button
             component={RouterLink}
             to="/WorkReceive_C"
             variant="contained"
             color="primary"
           >
             เลือกรับงาน  
           </Button>
         </Box>
       </Box>
       <TableContainer component={Paper} className={classes.tableSpace}>
         <Table className={classes.table} aria-label="simple table">
           <TableHead>
             <TableRow>
               <TableCell align="right" width="5%">
                 ลำดับ
               </TableCell>
               <TableCell align="center" width="15%">
                 รหัสงานซ่อม
               </TableCell>
               <TableCell align="center" width="20%">
                 งานที่ซ่อม
               </TableCell>
               <TableCell align="center" width="20%">
                 ช่างที่ซ่อม
               </TableCell>
               <TableCell align="center" width="20%">
                 วันที่จะเสร็จ
               </TableCell>
               <TableCell align="center" width="10%">
                 ค่าแรงของการซ่อม
               </TableCell>
               <TableCell align="center" width="10%">
                ลักษณะการซ่อม
               </TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {workreceives.map((work: WorkReceiveInterface) => (
               <TableRow key={work.ID}>
                 <TableCell align="left">{work.ID}</TableCell>
                 <TableCell align="center" size="medium">
                   {work.WorkCode}
                 </TableCell>
                 <TableCell align="center">{work.RepairRequest.Device}</TableCell>
                 <TableCell align="center">{work.Employee.Name}</TableCell>
                 <TableCell align="center">{moment(work.FinishedDate).format("DD/MM/YYYY")}</TableCell>
                 <TableCell align="center">{work.Wages}</TableCell>
                 <TableCell align="center">{work.WorkPlace.Name}</TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
     </Container>
   </div>
 );
}
 
export default WorkReceive;
