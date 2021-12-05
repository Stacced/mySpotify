import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateState } from "../utils";

const {
    REACT_APP_SPOTIFY_CLIENT_ID,
    REACT_APP_SPOTIFY_REDIRECT_URI,
    REACT_APP_SPOTIFY_SCOPES,
} = process.env;

const SPOTIFY_API_URL = "https://api.spotify.com/v1";
const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";

const LS_KEYS = {
    ACCESS_TOKEN: "MYS_ACCESS_TOKEN",
    EXP_TIMESTAMP: "MYS_TOKEN_EXPIRY_TIMESTAMP",
    TOKEN_TYPE: "MYS_TOKEN_TYPE",
}

const spotifyContext = createContext();

// Auth provider
export const SpotifyProvider = ({ children }) => {
    const auth = useProvideSpotify();
    
    return (
        <spotifyContext.Provider value={auth}>
        {children}
        </spotifyContext.Provider>
    );
}

export const useSpotify = () => {
    return useContext(spotifyContext);
}

const useProvideSpotify = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [tokenExp, setTokenExp] = useState(null);

    const navigate = useNavigate();

    const callEndpoint = async ({ path, method = "GET" }) => {
        if (hasTokenExpired()) {
            invalidateToken();

            throw new Error("Token has expired");
        }

        return await (
            await fetch(`${SPOTIFY_API_URL}${path}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method
            })).json();
    }

    const loadCurrentUserProfile = async () => {
        try {
            const userInfo = await callEndpoint({ path: "/me" });
            setUser(userInfo);
        } catch (err) {
            console.log(err);

            navigate("/");
        }
    }

    const login = () => {
        const popup = window.open(`${SPOTIFY_AUTH_ENDPOINT}?client_id=${encodeURIComponent(REACT_APP_SPOTIFY_CLIENT_ID)}&redirect_uri=${encodeURIComponent(REACT_APP_SPOTIFY_REDIRECT_URI)}&scope=${encodeURIComponent(REACT_APP_SPOTIFY_SCOPES)}&state=${generateState(16)}&response_type=token&show_dialog=true`,
        "Connectez-vous avec Spotify", "width=600,height=600");

        window.spotifyAuthCallback = async (accessToken, tokenExpiry) => {
            popup.close();

            setToken(accessToken);
            setTokenExp(tokenExpiry);
        }
    }

    const logout = () => {
        invalidateToken();

        window.location.reload();
    }

    const hasLoggedIn = () => {
        return !!token && !!user && !hasTokenExpired();
    }

    const saveTokenWhenRedirected = () => {
        const searchParams = new URLSearchParams(window.location.hash.substring(1));

        try {
            const accessToken = searchParams.get("access_token");
            const tokenExpiry = Number(searchParams.get("expires_in"));
            const tokenType = searchParams.get("token_type");

            const tokenExpiryTimestamp = Math.floor(Date.now() / 1000) + tokenExpiry;

            localStorage.setItem(LS_KEYS.ACCESS_TOKEN, accessToken);
            localStorage.setItem(LS_KEYS.EXP_TIMESTAMP, tokenExpiryTimestamp);
            localStorage.setItem(LS_KEYS.TOKEN_TYPE, tokenType);

            window.opener.spotifyAuthCallback(accessToken, tokenExpiryTimestamp);
        } catch (err) {
            console.error(err);
            throw new Error("Something went wrong while trying to save information in local storage");
        }
    }

    const hasRedirectedFromValidSpotifyAuth = () => {
        if (window.opener === null) {
            return false;
        }

        const { hostname: openerHostname } = new URL(window.opener.location.href);
        const { hostname: currentHostname } = new URL(window.location.href);

        return window.opener && window.opener !== window && !!window.opener.spotifyAuthCallback && openerHostname === currentHostname && window.opener.history.length === 1;
    }

    const hasTokenExpired = () => {
        try {
            const accessToken = token || localStorage.getItem(LS_KEYS.ACCESS_TOKEN);
            const expiryTimestamp = tokenExp || Number(localStorage.getItem(LS_KEYS.EXP_TIMESTAMP));

            if (!accessToken || !expiryTimestamp || isNaN(expiryTimestamp)) {
                return false;
            }

            return Date.now() / 1000 > expiryTimestamp;
        } catch (err) {
            console.error(err);
            return true;
        }
    }

    const invalidateToken = () => {
        try {
            Object.keys(LS_KEYS).forEach(key => {
                localStorage.removeItem(LS_KEYS[key]);
            });
        } catch (err) {
            console.error(err);
        }

        setUser(null);
        setToken(null);
        setTokenExp(null);
    }

    useEffect(() => {
        try {
            const accessToken = localStorage.getItem(LS_KEYS.ACCESS_TOKEN);
            const tokenExpiryTimestamp = Number(localStorage.getItem(LS_KEYS.EXP_TIMESTAMP));

            if (accessToken && tokenExpiryTimestamp) {
                setToken(accessToken);
                setTokenExp(tokenExpiryTimestamp);
            } else {
                setIsLoading(false);
            }
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (token && tokenExp) {
            if (!user) {
                loadCurrentUserProfile();
            } else {
                setIsLoading(false);
            }
        }
    }, [token, tokenExp, user]);

    return {
        isLoading,
        user,
        login,
        logout,
        get hasLoggedIn() {
            return hasLoggedIn();
        },
        get hasRedirectedFromValidSpotifyAuth() {
            return hasRedirectedFromValidSpotifyAuth();
        },
        saveTokenWhenRedirected
    }
}
