import React, { useContext } from 'react';
import AvailableFoodCards from './AvailableFoodCards';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AvailableFoods = () => {
  const { loading } = useContext(AuthContext);

  const fetchFoods = async () => {
  const res = await axios.get('https://food-circle-server-five.vercel.app/api/foods/available');
  return res.data;
};


  const {
    data: foods = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['availableFoods'],
    queryFn: fetchFoods,
  });



  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if (isError) {
    return <p className="text-center text-red-600">Error: {error.message}</p>;
  }

  return (
    <div className='bg-green-50'>
      <AvailableFoodCards foods={foods} />
    </div>
  );
};

export default AvailableFoods;
