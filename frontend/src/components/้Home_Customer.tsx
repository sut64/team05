import NavBarCustomer from './NavBar_Customer';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

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
    })
);

export default function HomeCustomer() {
    const classes = useStyles();
    return (
        <div>
            <NavBarCustomer />
            <div className={classes.drawerHeader}/>
            <h1>หน้า Home</h1>
        </div>
    );
}