import { Avatar, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSpotify } from '../hooks/spotify';
import { millisToMinutesAndSeconds } from '../utils';

const AlbumView = () => {
    const { id } = useParams();
    const { callEndpoint, playTrack } = useSpotify();
    const [album, setAlbum] = useState(null);

    useEffect(() => {
        callEndpoint({ path: `/albums/${id}?market=FR` })
        .then(album => {
            setAlbum({ ...album, release_date: new Date(album.release_date).toLocaleDateString() });
        })
        .catch(console.error)
    }, [])

    return (
        <>
        { album && (
            <>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} >
                <Avatar src={album.images[0]?.url} alt={album.name} sx={{ width: '5vw', height: '5vw' }} />
                <div>
                    <Typography variant='h4' sx={{ paddingLeft: '20px' }}>{album.name}</Typography>
                    <Typography variant='h6' sx={{ paddingLeft: '20px' }}>{album.artists.map(artist => artist.name).join(", ")}</Typography>
                    <Typography variant='h6' sx={{ paddingLeft: '20px' }}>Sorti le {album.release_date}</Typography>
                </div>
            </div>
            <Box id="album-tracks" sx={{ maxHeight: '70vh', overflow: 'auto' }}>
                <List>
                    { album.tracks.items.map(track => (
                        <ListItem key={track.id} onClick={() => { playTrack(track.uri) }}>
                            { album.hasOwnProperty('images') && <img src={album.images[0]?.url} alt="Cover" width="50vw" /> }
                            <ListItemText primary={`${track.track_number}. ${track.name} - ${millisToMinutesAndSeconds(track.duration_ms)}`} sx={{ paddingLeft: '1vw' }} />
                        </ListItem>
                        )
                    )}
                </List>
            </Box>
            </>
        )}
        </>
    )
}

export default AlbumView;