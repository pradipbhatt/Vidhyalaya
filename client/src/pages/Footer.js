import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box bgcolor="#333" color="white" py={5} textAlign="center" mt="auto">
            <img src="/path-to-your-logo/logo.png" alt="Vidyalaya" style={{ height: 50, marginBottom: 20 }} />
            <Container>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item>
                        <Typography variant="h6">Schools</Typography>
                        <ul>
                            <li>Radiant Secondary School</li>
                            <li>Little Buddha Academy</li>
                            <li>Sarc Education Foundation</li>
                        </ul>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">Important Links</Typography>
                        <ul>
                            <li>Radiant Secondary School</li>
                            <li>Little Buddha Academy</li>
                            <li>Sarc Education Foundation</li>
                        </ul>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;
