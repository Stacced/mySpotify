import { Navigate, Routes, Route } from 'react-router-dom';
import SpotifyAuthRedirect from './components/SpotifyAuthRedirect';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useSpotify } from './hooks/spotify';

const App = () => {
    const {
        hasLoggedIn,
        hasRedirectedFromValidSpotifyAuth,
        isLoading,
    } = useSpotify();

    return (
        <>
            { isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                <Routes>
                    <Route path="/" element={ <Login /> } />
                    <Route path="/callback" element={
                        hasLoggedIn ? (
                            <Navigate to="/dashboard" />
                        ) : hasRedirectedFromValidSpotifyAuth ? (
                            <SpotifyAuthRedirect />
                        ) : (
                            <Navigate to="/" />
                        )
                    } />
                    <Route path="/dashboard" element={ hasLoggedIn ? <Dashboard /> : <Navigate to="/" /> } />
                </Routes>
                </>
            )}
        </>
    )
}

export default App;