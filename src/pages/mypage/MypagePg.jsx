import React from 'react';
import Header from '../../components/Header'
import MypageProfile from './components/MypageProfile';
import MypageTap from './components/MypageTap';

const MypagePg = () => {
    return (
        <>
        <Header/>
        <MypageProfile/>
            <MypageTap/>
        </>
    );
}

export default MypagePg;