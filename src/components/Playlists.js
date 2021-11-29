import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const Playlists = () => {
    return (
        <>
        <List>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary="Accueil" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary="Recherche" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary="Bibliothèque" />
                </ListItemButton>
            </ListItem>
            </List>
        </>
    )
}

export default Playlists;