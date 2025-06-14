import React, { Suspense } from 'react';
import useAuth from '../../hooks/UseAuth';
import RequestsList from './RequestsList';
import { myRequestFoodsPromise } from '../../services/myRequestFoodsApi';


const MyRequestFoods = () => {

    const { user } = useAuth();

    return (
        <Suspense fallback={
            <div className="flex min-h-screen justify-center items-center h-60">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        }>
            <RequestsList
                myRequestFoodsPromise={myRequestFoodsPromise(user.email)}
            ></RequestsList>
        </Suspense>
    );
};

export default MyRequestFoods;