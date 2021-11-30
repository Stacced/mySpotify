import { Link } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const PageNotFound = () => {
    return (
        <Grid container justify="center" alignItems="center" sx={{ height: '100vh' }}>
            <Grid item xs={12}>
                <Typography sx={{ textAlign: "center" }} variant="h1" color="textPrimary">
                    ☹️ 404 - Page not found
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography sx={{ textAlign: "center" }} variant="h2">
                    <Link href="/">Go back home</Link>
                </Typography>
            </Grid>
        </Grid>
    )
}

export default PageNotFound;