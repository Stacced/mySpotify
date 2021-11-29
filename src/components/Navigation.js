import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { Home as HomeIcon, Search as SearchIcon, LibraryMusic as LibraryMusicIcon } from '@mui/icons-material';

import Playlists from './Playlists';

const Navigation = () => {
    return (
        <>
        <Box sx={{ bgcolor: 'background.paper' }}>
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Accueil" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText primary="Recherche" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
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
        <Box sx={{ bgcolor: 'background.paper' }}>
            <Playlists />
        </Box>
        </>
    )
}

export default Navigation;