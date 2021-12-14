import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSpotify } from '../hooks/spotify';

const RecentlyPlayedTracks = () => {
    const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState([]);
    const { callEndpoint } = useSpotify();

    useEffect(() => {
        callEndpoint({ path: '/me/player/recently-played' })
            .then(res => {
                setRecentlyPlayedTracks(res.items);
            });
    }, []);

    const playTrack = trackUri => {
        callEndpoint({ path: '/me/player/play', method: 'PUT', body: { uris: [trackUri], position_ms: 0 } });
    };

    return (
        <>
        <List>
            {
                recentlyPlayedTracks
                .map(p => p.track)
                .map(p => (
                    <ListItem key={p.id + Math.random().toString()} data-id={p.id} onClick={() => { playTrack(p.uri) }}>
                        <ListItemAvatar>
                            <Avatar alt="Track image" src={p.album.images[0].url} />
                        </ListItemAvatar>
                        <ListItemButton>
                            <ListItemText primary={`${p.artists[0].name} - ${p.name}`} />
                        </ListItemButton>
                    </ListItem>
                ))
            }
        </List>
        </>
    )
}

export default RecentlyPlayedTracks;