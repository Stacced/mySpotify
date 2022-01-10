import { Avatar, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSpotify } from '../hooks/spotify';
import { millisToMinutesAndSeconds } from '../utils';

const ArtistView = () => {
    const { id } = useParams();
    const { callEndpoint, playTrack } = useSpotify();
    const [artist, setArtist] = useState(null);

    useEffect(() => {
        callEndpoint({ path: `/artists/${id}` })
        .then(artist => {
            setArtist(artist);
            callEndpoint({ path: `/artists/${id}/top-tracks?market=FR` })
            .then(res => {
                setArtist({ ...artist, toptracks: res.tracks });
            })
            .catch(console.error);
        })
        .catch(err => {
            console.error(err);
        })
    }, [id]);

    return (
        <>
        { artist && (
            <>
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} >
                <Avatar src={artist.images[0]?.url} alt={artist.name} sx={{ width: '5vw', height: '5vw' }} />
                <Typography variant='h4' sx={{ paddingLeft: '20px' }}>{ artist.name }</Typography>
            </div>
            <Typography variant='h6'>{ artist.genres.join(", ") }</Typography>
            { artist.toptracks && (
                <Box id="artist-top-tracks" sx={{ maxHeight: '70vh', overflow: 'auto' }}>
                    <List>
                        { artist.toptracks.map(track => (
                            <ListItem key={track.id} onClick={() => { playTrack(track.uri) }}>
                                { track.album.hasOwnProperty('images') && <img src={track.album.images[0]?.url} alt="Cover" width="50vw" /> }
                                <ListItemText primary={`${track.name} - ${millisToMinutesAndSeconds(track.duration_ms)}`} secondary={track.artists.map(artist => artist.name).join(", ")} sx={{ paddingLeft: '1vw' }} />
                            </ListItem>
                            )
                        )}
                    </List>
                </Box>
            )}
            </>
        )}
        </>
    )
}

export default ArtistView;