import React, { Suspense } from 'react';
import useAuth from '../../hooks/UseAuth';
import AddFoodList from './AddFoodList';
import { myAddFoodsPromise } from '../../services/myAddFoodsApi';

const ManageMyFoods = () => {

    const { user } = useAuth();

    return (
        <div>
            <Suspense fallback={
                <div className="flex min-h-screen justify-center items-center h-60">
                    <span className="loading loading-bars loading-lg"></span>
                </div>
            }>
                <AddFoodList
                    myAddFoodsPromise={myAddFoodsPromise(user.email)}
                ></AddFoodList>
            </Suspense>
        </div>
    );
};

export default ManageMyFoods;