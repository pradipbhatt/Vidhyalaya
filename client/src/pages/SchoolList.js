import React from 'react';
import { Typography, Box, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';

const schools = [
    {
        image: 'https://via.placeholder.com/150',
        name: 'Radiant Secondary School',
        description: 'Radiant Secondary School was founded in 2057 BS (2000 AD) by some academicians...'
    },
    {
        image: 'https://via.placeholder.com/150',
        name: 'Little Buddha Academy',
        description: 'Little Buddha Academy was founded in 2057 BS (2000 AD) by some academicians...'
    },
    {
        image: 'https://via.placeholder.com/150',
        name: 'Sarc Education Foundation',
        description: 'Sarc Education Foundation was founded in 2057 BS (2000 AD) by some academicians...'
    },
    // Repeat as necessary
];

const SchoolList = () => {
    return (
        <Box py={5}>
            <Typography variant="h4" textAlign="center" mb={5}>
                Find Your Best School !!!
            </Typography>
            <Grid container spacing={3}>
                {schools.map((school, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={school.image}
                                alt={school.name}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {school.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {school.description}
                                </Typography>
                                <Box mt={2}>
                                    {Array(5).fill().map((_, i) => (
                                        <span key={i} style={{ color: 'gold' }}>⭐</span>
                                    ))}
                                </Box>
                                <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
                                    Read More
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SchoolList;
