import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu" 
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {flexGlow: 1},
    menuButton: {marginRight: theme.spacing(2)},
    title: {flexGrow: 1},
    navlink: {color: "white", textDecoration: "none"}
}));

function Navbar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon/>
                    </IconButton>

                    <Link className={classes.navlink} to="/">
                        <Typography variant="h6" className={classes.title}>
                            ระบบแจ้งซ่อมคอมพิวเตอร์
                        </Typography>
                    </Link>
                    
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navbar;