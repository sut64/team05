import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function SignIn() {
    const classes = useStyles();
    return (
        <div>
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <CssBaseline />
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                *username:chanwit@gmail.com, password:123456*
            </div>
        </Container>
        </div>
    );
}
