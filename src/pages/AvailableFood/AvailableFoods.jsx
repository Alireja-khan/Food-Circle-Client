import React, { useContext, useEffect, useState } from 'react';
import AvailableFoodCards from './AvailableFoodCards';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const AvailableFoods = () => {
    const [foods, setFoods] = useState([]);
    const { loading } = useContext(AuthContext);



    useEffect(() => {
        fetch('http://localhost:3000/foods/available')
            .then(res => res.json())
            .then(data => setFoods(data));
    }, []);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-bars loading-xl"></span>
            </div>
        )
    }

    return (
        <div>
            <AvailableFoodCards foods={foods}></AvailableFoodCards>
        </div>
    );
};

export default AvailableFoods;