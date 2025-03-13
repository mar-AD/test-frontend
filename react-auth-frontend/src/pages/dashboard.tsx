import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getProfile } from "../api/auth";
import { Container } from "@mui/material";
import DashboardCard from "../components/UserCard";

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const decoded: any = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decoded.exp && decoded.exp < currentTime) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            const timeLeft = (decoded.exp - currentTime) * 1000;
            const timeout = setTimeout(() => {
                localStorage.removeItem("token");
                navigate("/login");
            }, timeLeft);

            const fetchProfile = async () => {
                try {
                    const profile = await getProfile(token);
                    setUser(profile);
                } catch (err) {
                    console.error("Failed to fetch profile", err);
                }
            };

            fetchProfile();

            return () => clearTimeout(timeout);
        } catch (error) {
            console.error("Invalid token", error);
            localStorage.removeItem("token");
            navigate("/login");
        }
    }, [navigate]);

    return (
        <Container 
            sx={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                height: "100vh",
            }}
        >
            <DashboardCard user={user} />
        </Container>
    );
};

export default Dashboard;
