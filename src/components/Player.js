import { useState, useEffect } from 'react';
import { Typography, Avatar } from '@mui/material';
import { useSpotify } from '../hooks/spotify';
import Loading from './Loading';

const Player = () => {
    const { callEndpoint, setDeviceId } = useSpotify();
    const [player, setPlayer] = useState(null);
    const [playerDevices, setPlayerDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState('');

    useEffect(() => {
        callEndpoint({ path: '/me/player?market=FR' })
        .then(playerRes => {
            if (playerRes.status === 204) {
                setPlayer({ is_playing: false }); // Playback not active
            } else {
                playerRes.json().then(p => {
                    setPlayer(p);
                    setSelectedDeviceId(p.device.id);
                    setDeviceId(p.device.id);
                });
            }
        })
        .catch(console.error);

        callEndpoint({ path: '/me/player/devices' })
        .then(r => r.json())
        .then(res => {
            setPlayerDevices(res.devices);
        })
        .catch(console.error);
    }, []);

    const handleDeviceIdChange = e => {
        console.log(e.target.value);
        setSelectedDeviceId(e.target.value);
        setDeviceId(e.target.value);
    }

    return player ? (
        <div>
            {
                player.is_playing ? (
                    <>
                    <Typography variant='h4'>A l'écoute:</Typography>
                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} >
                        <Avatar src={player.item.album.images[0]?.url} alt={player.item.name} sx={{ width: '5vw', height: '5vw' }} />
                        <div>
                            <Typography variant='h6' sx={{ paddingLeft: '20px' }}>{ player.item.name }</Typography>
                            <Typography variant='h8' sx={{ paddingLeft: '20px' }}>{ player.item.artists.map(a => a.name).join(", ") }</Typography>
                        </div>
                    </div>
                    </>
                ) : (
                    <Typography variant='h6'>Pas de musique en cours</Typography>
                )
            }
            <select style={{ marginTop: '10px' }} value={selectedDeviceId} onChange={handleDeviceIdChange}>
                {
                    playerDevices.map(device => (
                        <option key={device.id} value={device.id}>{device.name}</option>
                    ))
                }
            </select>
        </div>
    ) : (
        <select value={selectedDeviceId} onChange={handleDeviceIdChange}>
            {
                playerDevices.map(device => (
                    <option key={device.id} value={device.id}>{device.name}</option>
                ))
            }
        </select>
    )
}

export default Player;