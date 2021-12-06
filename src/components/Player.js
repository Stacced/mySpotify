import { Grid, LinearProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSpotify } from '../hooks/spotify';

const Player = () => {
    const [playerState, setPlayerState] = useState({ is_playing: false, progress_ms: 0, device: { name: 'N/A' } });
    const { callEndpoint } = useSpotify();

    useEffect(() => {
        async function fetchPlayerState() {        
            try {
                const playerState = await callEndpoint({ path: '/me/player' });
                console.log(playerState);
                setPlayerState(playerState);
            } catch (err) {
                console.error(err);
            }
        }

        fetchPlayerState();
    }, []);

    return (
        <>
        { playerState.is_playing && (
        <>  
        <Grid container sx={{ minWidth: '100%' }}>
            <Grid item>
                <img src={playerState.item.album.images[0].url} alt="Track cover" />
                <div>
                    <h3>{playerState.item.name}</h3>
                    <p>{playerState.item.artists.map(a => a.name).join(', ')}</p>
                </div>
                <LinearProgress variant="determinate" value={playerState.progress_ms} />
                <p>{playerState.device.name}</p>
                <p>{playerState.is_playing ? "Playing" : "Not playing" }</p>
            </Grid>
        </Grid>
        </>
        ) }
        </>
    )
}

export default Player;