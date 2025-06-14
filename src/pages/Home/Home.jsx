
import Banner from './Banner';
import WhyChoose from './WhyChoose';
import QuoteSection from './QuoteSection';
import FeaturedFoods from './FeaturedFoods';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';   
import { useContext } from 'react';
import Achievements from './Achievements ';
import BecomeMember from './BecomeMember';

const Home = () => {
    const { loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-bars loading-xl"></span>
            </div>
        );
    }
    
    return (
        <div className='bg-green-50 '>
            <Banner />
            <QuoteSection />
            {/* <FeaturedFoods /> */}
            {/* <WhyChoose /> */}
            {/* <Achievements></Achievements> */}
            {/* <BecomeMember></BecomeMember> */}
        </div>
    );
};

export default Home;
