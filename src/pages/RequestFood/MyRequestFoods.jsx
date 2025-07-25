import React, { useContext, useEffect, useState } from 'react';
import useAuth from '../../hooks/UseAuth';
import RequestsList from './RequestsList';
import { myRequestFoodsPromise } from '../../services/myRequestFoodsApi';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const MyRequestFoods = () => {
    const [foods, setFoods] = useState([]);
    const [requests, setRequests] = useState([]);
    const { user } = useAuth();
    const { loading } = useContext(AuthContext);



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
        <>
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <span className="loading loading-bars loading-xl"></span>
                </div>
            ) : (
                <div className="bg-green-50 min-h-screen">
                    <RequestsList
                        requests={requests}
                        foods={foods}
                    />
                </div>
            )}
        </>
    );

};

export default MyRequestFoods;
