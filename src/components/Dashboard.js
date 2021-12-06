import Navigation from "./Navigation";
import Grid from '@mui/material/Grid';
import { Container, CssBaseline } from "@mui/material";
import Player from "./Player";

const Dashboard = () => {
    return (
        <>
        <CssBaseline/>
        <Grid container sx={{ minHeight: '100vh' }}>
            <Grid item xs={6} sm={4} md={2}>
                <Navigation/>
            </Grid>
            <Grid item xs={6} sm={8} md={10} sx={{ backgroundColor: 'black' }}>
                <Container sx={{ position: 'fixed', backgroundColor: 'blue' }}>
                    <Player/>
                </Container>
            </Grid>
        </Grid>
        </>
    )
}

export default Dashboard;