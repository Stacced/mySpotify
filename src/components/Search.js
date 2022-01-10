import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, Grid, InputAdornment, InputLabel, List, ListItem, Select, MenuItem, TextField, Typography, Box } from "@mui/material";
import { Search as SearchIcon } from '@mui/icons-material';
import { useSpotify } from '../hooks/spotify';

const Search = () => {
    const [search, setSearch] = useState({ value: '', category: 'artist' });
    const [searchResults, setSearchResults] = useState([]);
    const { callEndpoint, playTrack } = useSpotify();
    const navigate = useNavigate();

    useEffect(() => {
        if (search.value) {
            const timeout = setTimeout(() => {
                const path = `/search?q=${search.value}&type=${search.category}`;
                callEndpoint({ path: path })
                .then(res => {
                    setSearchResults(res[search.category + 's'].items);
                    console.log(res[search.category + 's']);
                })
                .catch(console.error);
            }, 500);
        }
    }, [search]);

    const handleSearch = e => {
        setSearch({ ...search, value: e.target.value });
    }

    const handleSearchCategoryChange = e => {
        setSearch({ ...search, category: e.target.value });
    }

    const handleSearchResultClick = e => {
        if (search.category === 'track') {
            playTrack(e.currentTarget.dataset.uri);
        } else {
            navigate(`/dashboard/${search.category}/${e.currentTarget.dataset.id}`);
        }
    }

    return (
        <>
        <Grid container justifyContent="center" paddingTop={2} sx={{ width: '100%' }}>
            <TextField label="Spotify search" variant="standard" placeholder="Search..." onChange={handleSearch} value={search.value} sx={{ width: '30%' }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon/>
                    </InputAdornment>
                )
            }}/>
            <FormControl>
                <InputLabel id="select-search-category-label">Catégorie</InputLabel>
                <Select labelId="select-search-category-label" id="select-search-category" value={search.category} label="Catégorie" onChange={handleSearchCategoryChange}>
                    <MenuItem value={'album'}>Album</MenuItem>
                    <MenuItem value={'artist'}>Artiste</MenuItem>
                    <MenuItem value={'playlist'}>Playlist</MenuItem>
                    <MenuItem value={'track'}>Titre</MenuItem>
                </Select>
            </FormControl>
        </Grid>
        <Box id="results-container" sx={{ maxHeight: '90vh', overflow: 'auto' }}>
            <List>
                {
                    searchResults
                    .sort((a, b) => b.popularity - a.popularity) // Sort by popularity for artists, doesn't impact other categories
                    .map(result => (
                        <ListItem key={result.id} data-id={result.id} data-uri={result.uri} onClick={handleSearchResultClick}>
                            { result.hasOwnProperty('images') ? <img src={result.images[0]?.url} alt="Cover" width="200vw" /> : <img src={result.album.images[0]?.url} alt="Cover" width="200vw" /> }
                            <Typography variant="h6" sx={{ paddingLeft: '2vw' }}>{result.name}</Typography>
                        </ListItem>
                    ))
                }
            </List>
        </Box>
        </>
    )
}

export default Search;