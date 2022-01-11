import { Avatar, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSpotify } from '../hooks/spotify';
import { millisToMinutesAndSeconds } from '../utils';
import Loading from './Loading';

const PlaylistView = () => {
    const { id } = useParams();
    const { callEndpoint, playTrack } = useSpotify();
    const [playlist, setPlaylist] = useState(null);

    useEffect(() => {
        callEndpoint({ path: `/playlists/${id}` })
        .then(r => r.json())
        .then(playlist => {
            setPlaylist(playlist);
            console.log(playlist);
        }).catch(console.error);
    }, []);

    return playlist ? (
        <>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} >
            <Avatar src={playlist.images[0]?.url} alt={playlist.name} sx={{ width: '5vw', height: '5vw' }} />
            <div>
                <Typography variant='h4' sx={{ paddingLeft: '20px' }}>{playlist.name}</Typography>
                <Typography variant='h4' sx={{ paddingLeft: '20px' }}>Créée par {playlist.owner.display_name}</Typography>
                <Typography variant='h6' sx={{ paddingLeft: '20px' }}>{playlist.collaborative && "Collaborative 🫂"}</Typography>
                <Typography variant='h6' sx={{ paddingLeft: '20px' }}>{playlist.description}</Typography>
            </div>
        </div>
        <Box id="playlist-tracks" sx={{ maxHeight: '70vh', overflow: 'auto' }}>
            <List>
                { playlist.tracks.items
                .map(track => track.track)
                .map(track => (
                    <ListItem key={track.id} onClick={() => { playTrack(track.uri) }}>
                        { track.album.hasOwnProperty('images') && <img src={track.album.images[0]?.url} alt="Cover" width="50vw" /> }
                        <ListItemText primary={`${track.name} - ${millisToMinutesAndSeconds(track.duration_ms)}`} sx={{ paddingLeft: '1vw' }} />
                    </ListItem>
                    )
                )}
            </List>
        </Box>
        </>
    ) : (
        <Loading />
    )
}

export default PlaylistView;