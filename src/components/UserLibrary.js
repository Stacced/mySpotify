import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpotify } from '../hooks/spotify';
import { Avatar, Typography, List, ListItem, ListItemText } from '@mui/material';
import Loading from './Loading';

// This only shows playlists
const UserLibrary = () => {
    let navigate = useNavigate();
    const { user, callEndpoint } = useSpotify();
    const [userPlaylists, setUserPlaylists] = useState(null);

    useEffect(() => {
        callEndpoint({ path: '/me/playlists' })
        .then(r => r.json())
        .then(res => {
            setUserPlaylists(res.items);
        })
        .catch(console.error);
    }, []);

    const handlePlaylistClick = e => {
        navigate(`/dashboard/playlist/${e.currentTarget.dataset.id}`);
    }

    return (
        <>
        {
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} >
                <Avatar src={user.images[0]?.url} alt={user.display_name} sx={{ width: '5vw', height: '5vw' }} />
                <Typography variant='h4' sx={{ paddingLeft: '20px' }}>{ user.display_name }</Typography>
            </div>
        }
        {
            userPlaylists ? (
                <>
                <Typography variant='h5' sx={{ paddingTop: '20px' }}>Mes playlists</Typography>
                <List>
                    { userPlaylists.map(playlist => (
                        <ListItem key={playlist.id} data-id={playlist.id} onClick={handlePlaylistClick}>
                            { playlist.hasOwnProperty('images') && <img src={playlist.images[0]?.url} alt="Cover" width="200vw" /> }
                            <ListItemText primary={`${playlist.name} - ${playlist.description}`} secondary={playlist.owner.display_name} sx={{ paddingLeft: '2vw' }} />
                        </ListItem>
                    ))}
                </List>
                </>
            ) : <Loading />
        }
        </>
    )
}

export default UserLibrary;