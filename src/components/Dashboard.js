import Navigation from "./Navigation";
import Grid from '@mui/material/Grid';
import { CssBaseline } from "@mui/material";
import Search from "./Search";

const Dashboard = () => {
    return (
        <>
        <CssBaseline/>
        <Grid container sx={{ minHeight: '100vh' }}>
            <Grid item xs={6} sm={4} md={2} sx={{ borderRight: '1px solid darkgrey'}}>
                <Navigation/>
            </Grid>
            <Grid item xs={6} sm={8} md={10}>
                <Search/>
            </Grid>
        </Grid>
        </>
    )
}

export default Dashboard;