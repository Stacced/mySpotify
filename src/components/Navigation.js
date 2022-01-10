import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { Home as HomeIcon, Search as SearchIcon, LibraryMusic as LibraryMusicIcon } from '@mui/icons-material';

import RecentlyPlayedTracks from './RecentlyPlayedTracks';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
    let navigate = useNavigate();
    return (
        <>
        <Box sx={{ bgcolor: 'background.paper' }}>
            <List>
                <ListItem disablePadding onClick={() => { navigate('/dashboard') }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Accueil" />
                    </ListItemButton>   
                </ListItem>
                <ListItem disablePadding onClick={() => { navigate('/dashboard/search') }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText primary="Recherche" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding onClick={() => { navigate('/dashboard/library') }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <LibraryMusicIcon />
                        </ListItemIcon>
                        <ListItemText primary="Bibliothèque" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
        <Divider />
        <Box sx={{ bgcolor: 'background.paper', overflow: 'auto', maxHeight: '75vh' }}>
            <RecentlyPlayedTracks />
        </Box>
        </>
    )
}

export default Navigation;