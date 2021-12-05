import { useEffect } from 'react';
import { useSpotify } from '../hooks/spotify';

const SpotifyAuthRedirect = () => {
    const { saveTokenWhenRedirected } = useSpotify();

    useEffect(() => {
        saveTokenWhenRedirected();
    }, []);
    
    return <div>Redirecting...</div>
}

export default SpotifyAuthRedirect;
