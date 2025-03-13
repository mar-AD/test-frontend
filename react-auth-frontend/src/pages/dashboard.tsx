import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { getProfile } from "../api/auth";

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

            // Cleanup timeout on unmount
            return () => clearTimeout(timeout);
        } catch (error) {
            console.error("Invalid token", error);
            localStorage.removeItem("token");
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div>
            <h1>Dashboard</h1>
            {user ? (
                <div>
                    <p>UserID: {user.id}</p>
                    <p>Email: {user.email}</p>
                    <p>CreatedAt: {user.createdAt.split("T")[0]}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Dashboard;
