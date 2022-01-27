import React, { useEffect ,useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Tooltip from '@material-ui/core/Tooltip';
import Container from "@material-ui/core/Container";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import HomeIcon from '@material-ui/icons/Home';
import BuildIcon from '@material-ui/icons/Build';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles ({


    root: {
      display: 'flex',
    },
    navlink: { color: "white", textDecoration: "none" },

    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 3000,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },

    center: {
      display: "flex",
      justifyContent: "center",
      alignItems: 'center',
  
    },

    iconcenter: {
      justifyContent: "center",
      alignItems: 'center',
      margin: theme.spacing(2)
    },

    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
      margin: theme.spacing(2)
    },

    container: { margin: theme.spacing(1) },

    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    a: {
      textDecoration: "none",
      color: "inherit",
    },
  }),
);

export default function NavBar_Employee() {

const [employeeName, setEmployeeName] = React.useState<String>("");
const [token, setToken] = React.useState<String>("");

  
  const menu = [
    { name: "หน้าแรก", icon: <HomeIcon />, path: "/" },
    { name: "ระบบที่ 1", icon: <LabelImportantIcon />, path: "/" },
    { name: "ระบบที่ 2", icon: <LabelImportantIcon />, path: "/PartsPurchase" },
    { name: "ระบบที่ 3", icon: <LabelImportantIcon />, path: "/" },
    { name: "ระบบที่ 4", icon: <LabelImportantIcon />, path: "/" },
    { name: "ระบบบันทึกประวัติซ่อม", icon: <SaveRoundedIcon />, path: "/repair_histories" },
  ];


  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");
    const employeeName = localStorage.getItem("name");
    if (token && employeeName) {
      setToken(token);
      setEmployeeName(employeeName);
    //  {console.log(localStorage.getItem("name"));
    // console.log(employeeName);}
    }
  
  
  }, []);

  
  
  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  
  

  return (
    <div className={classes.root}>

      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap  style={{ flexGrow: 1 }} >
            ระบบแจ้งซ่อมคอมพิวเตอร์
          </Typography>

          <Tooltip arrow
                     
          
            className={classes.tooltip} interactive

            title={
              <Container>

                <Grid className={classes.center}>
                  

                  <Avatar className={classes.large} > {employeeName.substring(0, 1)} </Avatar>
                </Grid>

                <Grid className={classes.center}>
                  <Typography variant="subtitle2" gutterBottom> Login as: พนักงานร้าน</Typography>
                </Grid>

                <Grid className={classes.center}>
                  <Typography variant="subtitle1" gutterBottom
                  > 
                  {employeeName}
                  </Typography>
                </Grid>


                <Grid className={classes.center}>
                  <Button className={classes.container}
                    variant="contained"
                    color="default"
                    size="medium"
                    onClick={signout}>
                    
                    Logout</Button>
                </Grid>

              </Container>

            }
          >

            <Avatar className={classes.container} > {employeeName.substring(0, 1)} </Avatar>
            
          </Tooltip>
          
        </Toolbar>
      </AppBar>
      
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <BuildIcon className={classes.iconcenter} /> พนักงานร้านซ่อมคอมพิวเตอร์
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menu.map((item) => (
            <Link to={item.path} key={item.name} className={classes.a}>
              <ListItem button key={item.name}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </div>
  );
}