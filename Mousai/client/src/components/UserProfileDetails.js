import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../modules/userManager';
import { Card, CardBody } from 'reactstrap';
import UserProfileCard from './UserProfileCard';

const UserProfileDetails = () => {
    const [userProfile, setUserProfile] = useState();
    const { id } = useParams();

    useEffect(() => {
        getUserById(id).then(setUserProfile);
    }, []);

    if (!userProfile) {
        return null;
    }

    return (
        <>
            <h1>{userProfile.name}'s Profile</h1>
            <Card>
                <CardBody>
                    <UserProfileCard userProfile={userProfile} />
                    <p>Email: {userProfile.email}</p>
                    <p>Pen Name: {userProfile.penName}</p>
                </CardBody>
            </Card>
        </>
    );
};

export default UserProfileDetails;

