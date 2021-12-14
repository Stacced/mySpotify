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

    return (
        <>
        <List>
            {
                recentlyPlayedTracks
                .map(p => p.track)
                .map(p => (
                    <ListItem>
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