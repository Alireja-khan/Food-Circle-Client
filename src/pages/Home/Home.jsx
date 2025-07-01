
import Banner from './Banner';
import WhyChoose from './WhyChoose';
import QuoteSection from './QuoteSection';
import FeaturedFoods from './FeaturedFoods';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';   
import { useContext } from 'react';
import Achievements from './Achievements ';
import BecomeMember from './BecomeMember';
import HowItWorks from './HowItWorks';

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
            <FeaturedFoods />
            <HowItWorks></HowItWorks>
            <WhyChoose />
            <Achievements></Achievements>
            <QuoteSection />
            <BecomeMember></BecomeMember>
        </div>
    );
};

export default Home;
