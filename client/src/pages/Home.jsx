import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    TextField,
    MenuItem,
    Container,
    Box,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Avatar,
} from '@mui/material';

const Home = () => {
    return (
        <div>
            <Container>
                <Box textAlign="center" py={5}>
                    <Typography variant="h2">
                        Let’s <span style={{ color: '#007b5e' }}>Compare & connect the best</span>
                    </Typography>
                    <Box display="flex" justifyContent="center" mt={3}>
                        <TextField
                            select
                            size="small"
                            variant="outlined"
                            defaultValue="Schools"
                            sx={{ marginRight: 2 }}
                        >
                            <MenuItem value="Schools">Schools</MenuItem>
                            {/* Add more options here */}
                        </TextField>
                        <TextField placeholder="Enter School Name" size="small" variant="outlined" sx={{ marginRight: 2 }} />
                        <Button variant="contained" color="primary">Find</Button>
                    </Box>
                </Box>

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

                <Box py={5} bgcolor="#f8f8f8">
                    <Typography variant="h4" textAlign="center" mb={5}>
                        Testimonials
                    </Typography>
                    <Grid container spacing={3} justifyContent="center">
                        {testimonials.map((testimonial, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="body1">
                                            “{testimonial.quote}”
                                        </Typography>
                                        <Box display="flex" alignItems="center" mt={2}>
                                            <Avatar src={testimonial.authorImage} sx={{ marginRight: 2 }} />
                                            <div>
                                                <Typography variant="h6">
                                                    {testimonial.author}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    @{testimonial.authorHandle}
                                                </Typography>
                                            </div>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>

            <Box bgcolor="#333" color="white" py={5} textAlign="center">
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
        </div>
    );
};

const schools = [
    {
        image: '/path-to-image/radiant.jpg',
        name: 'Radiant Secondary School',
        description: 'Radiant Secondary School was founded in 2057 BS (2000 AD) by some academicians...'
    },
    {
        image: '/path-to-image/little-buddha.jpg',
        name: 'Little Buddha Academy',
        description: 'Little Buddha Academy was founded in 2057 BS (2000 AD) by some academicians...'
    },
    {
        image: '/path-to-image/sarc.jpg',
        name: 'Sarc Education Foundation',
        description: 'Sarc Education Foundation was founded in 2057 BS (2000 AD) by some academicians...'
    },
    // Repeat as necessary
];

const testimonials = [
    {
        quote: "Our platform isn't just about comparing schools; it's about empowering parents and students with the information they need to make one of the most important decisions in their lives.",
        author: 'Janak S. Dhami',
        authorHandle: 'jsdhami',
        authorImage: '/path-to-image/janak.jpg'
    },
    {
        quote: "Our platform isn't just about comparing schools; it's about empowering parents and students with the information they need to make one of the most important decisions in their lives.",
        author: 'Pradip Bhatt',
        authorHandle: 'pradipbhatt',
        authorImage: '/path-to-image/pradip.jpg'
    },
    // Repeat as necessary
];

export default Home;
