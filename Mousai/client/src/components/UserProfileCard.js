import React, { useEffect, use } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";


const UserProfileCard = ({ userProfile }) => {



    return (
        <Card>
            <CardBody>
                <Link to={`/userprofile/${userProfile.id}`}><h3>{userProfile.name}</h3></Link>
                <p>Pen Name: {userProfile.penName}</p>

            </CardBody>
        </Card>
    );
};

export default UserProfileCard