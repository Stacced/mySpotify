import { Navigate, Routes, Route } from 'react-router-dom';
import SpotifyAuthRedirect from './components/SpotifyAuthRedirect';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ArtistView from './components/ArtistView';
import AlbumView from './components/AlbumView';
import PlaylistView from './components/PlaylistView';
import Search from './components/Search';
import UserLibrary from './components/UserLibrary';
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
                    <Route path="/dashboard" element={ hasLoggedIn ? <Dashboard /> : <Navigate to="/" /> }>
                        <Route path="/dashboard/search" element={ <Search /> } />
                        <Route path="/dashboard/library" element={ <UserLibrary /> } />
                        <Route path="/dashboard/artist/:id" element={ <ArtistView /> } />
                        <Route path="/dashboard/album/:id" element={ <AlbumView /> } />
                        <Route path="/dashboard/playlist/:id" element={ <PlaylistView /> } />
                    </Route>
                </Routes>
                </>
            )}
        </>
    )
}

export default App;