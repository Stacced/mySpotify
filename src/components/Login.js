import '../css/Login.css';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const [authToken, setAuthToken] = useState('');

    useEffect(() => {
        let hashParams = {};
        let e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
        while ((e = r.exec(q))) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }

        if (hashParams.access_token) {
            setAuthToken(hashParams.access_token);
        }
    }, []);

    return (
        <>
        { authToken ? <Navigate to="/dashboard" /> : 
        <header className="App-header">
            <img src="/myspotify_logo_transparent_192.png" className="App-logo" alt="logo" />
            <a href={`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REACT_APP_SPOTIFY_REDIRECT_URI)}&scope=${encodeURIComponent(process.env.REACT_APP_SPOTIFY_SCOPES)}&response_type=token&show_dialog=true`}>
                Login with Spotify
            </a>
        </header>
        }
        </>
    )
}

export default Login;