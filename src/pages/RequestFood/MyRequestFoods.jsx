import React, { useContext, useEffect, useState } from 'react';
import useAuth from '../../hooks/UseAuth';
import RequestsList from './RequestsList';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import axios from 'axios';

const MyRequestFoods = () => {
    const [foods, setFoods] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    // Fetch featured foods
    useEffect(() => {
        fetch('http://localhost:5000/api/foods/featured')
            .then(res => res.json())
            .then(data => setFoods(data));
    }, []);

    // Fetch requested foods for this user
    useEffect(() => {
        const fetchUserRequests = async () => {
            if (user?.email) {
                try {
                    setLoading(true);
                    console.log('📨 Fetching requests for user:', user.email);
                    
                    const response = await axios.get(`http://localhost:5000/api/requests/user/${user.email}`);
                    
                    if (response.data.success) {
                        setRequests(response.data.requests);
                        console.log(`✅ Found ${response.data.requests.length} requests`);
                    } else {
                        throw new Error(response.data.error || 'Failed to fetch requests');
                    }
                } catch (error) {
                    console.error('❌ Error fetching requests:', error);
                    // Set empty array on error
                    setRequests([]);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUserRequests();
    }, [user?.email]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-bars loading-xl"></span>
            </div>
        );
    }

    return (
        <div className="bg-green-50 min-h-screen">
            <RequestsList
                requests={requests}
                foods={foods}
            />
        </div>
    );
};

export default MyRequestFoods;