import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/UseAuth';
import RequestsList from './RequestsList';
import { myRequestFoodsPromise } from '../../services/myRequestFoodsApi';

const MyRequestFoods = () => {
    const [foods, setFoods] = useState([]);
    const [requests, setRequests] = useState([]);
    const { user } = useAuth();

    // Fetch featured foods
    useEffect(() => {
        fetch('https://food-circle-server-five.vercel.app/api/foods/featured')
            .then(res => res.json())
            .then(data => setFoods(data));
    }, []);

    // Fetch requested foods for this user
    useEffect(() => {
        if (user?.email) {
            myRequestFoodsPromise(user.email)
                .then(data => setRequests(data))
                .catch(err => console.error(err));
        }
    }, [user?.email]);

    return (
        <RequestsList
            requests={requests}
            foods={foods}
        />
    );
};

export default MyRequestFoods;
