import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    Paper,
    } from '@mui/material';

    const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
        const { access_token } = await login(email, password);
        localStorage.setItem('token', access_token);
        navigate('/dashboard');
        } catch (err) {
        setError('invalid email or password');
        }
    };

    return (
        <Container maxWidth="xs">
        <Paper
            elevation={3}
            sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 2,
            }}
        >
            <Typography component="h1" variant="h5">
            Login
            </Typography>
            {error && (
            <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                {error}
            </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Login
            </Button>
            </Box>
        </Paper>
        </Container>
    );
};

export default Login;