import React, { useState } from 'react';
import { Typography, Button, TextField, MenuItem, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const [selectedSchool, setSelectedSchool] = useState('');
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const handleSchoolSelect = (event) => {
        const selectedSchoolName = event.target.value;
        setSelectedSchool(selectedSchoolName);
        setInputValue(selectedSchoolName);
    };

    const handleFind = () => {
        if (inputValue) {
            navigate(`/details/${inputValue}`);
        }
    };

    return (
        <Box py={5} px={2}>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Typography variant="h2" align="left">
                        Let’s <br />
                        <span style={{ color: '#007b5e' }}>Compare & connect the best</span>
                    </Typography>
                    <Box display="flex" justifyContent={{ xs: 'center', md: 'flex-start' }} mt={3}>
                        <TextField
                            select
                            size="small"
                            variant="outlined"
                            value={selectedSchool}
                            onChange={handleSchoolSelect}
                            sx={{ marginRight: 2, minWidth: '150px' }}
                            placeholder="Select a school"
                        >
                            <MenuItem value="School0">School0</MenuItem>
                            <MenuItem value="School1">School1</MenuItem>
                            <MenuItem value="School2">School2</MenuItem>
                            <MenuItem value="School3">School3</MenuItem>
                            <MenuItem value="School4">School4</MenuItem>
                        </TextField>
                        <TextField
                            placeholder="Enter School Name"
                            size="small"
                            variant="outlined"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            sx={{ marginRight: 2 }}
                        />
                        <Button variant="contained" color="primary" onClick={handleFind}>
                            Find
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box display="flex" justifyContent="center">
                        <img
                            src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/853250/college-building-clipart-md.png"
                            alt="Comparison"
                            style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Banner;
