import Navigation from "./Navigation";
import Player from './Player';
import Grid from '@mui/material/Grid';
import { CssBaseline } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
    let location = useLocation();

    return (
        <>
        <CssBaseline/>
        <Grid container sx={{ minHeight: '100vh' }}>
            <Grid item xs={6} sm={4} md={2} sx={{ borderRight: '1px solid darkgrey'}}>
                <Navigation/>
            </Grid>
            <Grid item xs={6} sm={8} md={10} sx={{ paddingLeft: '2vw' }}>
                <h1>Welcome to mySpotify !</h1>
                {
                    location.pathname === '/dashboard' ? (
                        <Player />
                    ) : <Outlet /> 
                }
            </Grid>
        </Grid>
        </>
    )
}

export default Dashboard;