import React, { useEffect, useState } from "react";
import { allUsers } from "../modules/userManager";
import UserProfileCard from "./UserProfileCard";

const UserProfiles = () => {
    const [userProfiles, setUserProfiles] = useState([]);

    const getAllUserProfiles = () => {
        allUsers().then(setUserProfiles);
    }

    useEffect(() => {
        getAllUserProfiles();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h2>All User Profiles</h2>
                {userProfiles.map((userProfile) => (
                    <UserProfileCard userProfile={userProfile} key={userProfile.id} />
                ))}
            </div>
        </div>
    );
}

export default UserProfiles