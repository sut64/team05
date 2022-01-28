import React from 'react';
import NavBar from './NavBar';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },

      container: {
        marginTop: theme.spacing(2),
      },

    })
);

export default function HomeEmployee() {
    const classes = useStyles();
    return (
        <div>
            <NavBar />
            <div className={classes.drawerHeader}/>

            <Container className={classes.container} maxWidth="md">
            <h1 style={{ textAlign: "center" }}>ระบบบันทึกประวัติการซ่อมคอมพิวเตอร์</h1>
            <h2>Requirements</h2>
                  <p> This is a หน้า Home
          </p>
          </Container>
        </div>
    );
}