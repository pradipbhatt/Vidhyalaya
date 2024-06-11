import React from 'react';
import { Typography, Box, Grid, Card, CardContent, Avatar } from '@mui/material';

const testimonials = [
    {
        quote: "Our platform isn't just about comparing schools; it's about empowering parents and students with the information they need to make one of the most important decisions in their lives.",
        author: 'Janak S. Dhami',
        authorHandle: 'jsdhami',
        authorImage: 'https://via.placeholder.com/150'
    },
    {
        quote: "Our platform isn't just about comparing schools; it's about empowering parents and students with the information they need to make one of the most important decisions in their lives.",
        author: 'Pradip Bhatt',
        authorHandle: 'pradipbhatt',
        authorImage: 'https://via.placeholder.com/150'
    },
    // Repeat as necessary
];

const Testimonials = () => {
    return (
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
    );
};

export default Testimonials;
