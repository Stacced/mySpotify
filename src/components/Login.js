import '../css/Login.css';
import { Navigate } from 'react-router-dom';
import { useSpotify } from '../hooks/spotify';
import { Button } from '@mui/material';

const Login = () => {
    const {
        hasLoggedIn,
        login
    } = useSpotify();

    return (
        <>
        {
            hasLoggedIn ? <Navigate to="/dashboard" /> :
            <header className="App-header">
                <img src="/myspotify_logo_transparent_192.png" className="App-logo" alt="logo" />
                <Button onClick={login}>Login with Spotify</Button>
            </header>
        }
        </>
    )
}

export default Login;