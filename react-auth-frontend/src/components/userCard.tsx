import React from "react";
import { Card, CardContent, Typography, CircularProgress, Box, Avatar } from "@mui/material";

interface DashboardCardProps {
    user: any;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ user }) => {
    return (
        <Card sx={{ maxWidth: 400, p: 3, boxShadow: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
            <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    Dashboard
                </Typography>
                <Avatar 
                    src="/broken-image.jpg" 
                    sx={{ width: 80, height: 80, margin: "10px auto", color: '#333'}} 
                />
            </Box>
            <CardContent sx={{ textAlign: "center" }}>
                {user ? (
                    <>
                        <Typography variant="body1"><strong>UserID:</strong> {user.id}</Typography>
                        <Typography variant="body1"><strong>Email:</strong> {user.email}</Typography>
                        <Typography variant="body1"><strong>Created At:</strong> {user.createdAt.split("T")[0]}</Typography>
                    </>
                ) : (
                    <CircularProgress />
                )}
            </CardContent>
        </Card>
    );
};

export default DashboardCard;
