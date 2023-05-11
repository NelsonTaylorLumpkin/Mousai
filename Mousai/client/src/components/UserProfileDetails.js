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
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getUserById } from '../modules/userManager';
// import { getMyPosts } from '../modules/postManager';
// import PostForm from './PostForm';

// const UserProfileDetails = () => {
//     const [user, setUser] = useState(null);
//     const [posts, setPosts] = useState([]);
//     const { id } = useParams();

//     useEffect(() => {
//         getUserById(id).then(setUser);
//         getMyPosts().then(setPosts);
//     }, [id]);

//     if (!user) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="container">
//             <div className="row justify-content-center">
//                 <div className="col-md-8">
//                     <h2>{user.name}'s Profile</h2>
//                     <p>Email: {user.email}</p>
//                     <p>Pen Name: {user.penName}</p>
//                 </div>
//             </div>
//             <div className="row justify-content-center">
//                 {posts.map(post => <PostForm key={post.id} post={post} />)}
//             </div>
//         </div>
//     );
// };

// export default UserProfileDetails;
// import React, { useEffect, useState } from "react";
// import { Card, CardBody } from "reactstrap";
// import { Link, useParams } from "react-router-dom";
// import { userById } from "../modules/userManager";
// import { getMyPosts } from "../modules/postManager";

// const UserProfileDetails = () => {
//     const [userProfile, setUserProfile] = useState({});
//     const [posts, setPosts] = useState([]);

//     const { id } = useParams();



//     const getUserPosts = () => {
//         getMyPosts().then(setPosts);
//     }

//     const getUser = () => {
//         userById(id).then(setUserProfile);
//     }

//     useEffect(() => {
//         getUser();
//         getUserPosts();
//     }, []);

//     return (
//         <>
//             <Card>
//                 <CardBody>
//                     <h2>{userProfile.name}</h2>
//                     <img src={userProfile.profileImage} />
//                     <p>Pen Name: {userProfile.penName}</p>
//                     <p>Email: {userProfile.email}</p>
//                     <p>User Created: {userProfile.createdAt}</p>
//                 </CardBody>
//             </Card>
//             <div className="container">
//                 <div className="row justify-content-center">
//                     <Card>
//                         <CardBody>
//                             <h2>{userProfile.name}'s Posts</h2>
//                             <ul>
//                                 {posts.map((post) => (
//                                     <li>
//                                         <Link to={`/post/${post.id}`}>{post.title}</Link>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </CardBody>
//                     </Card>
//                 </div>
//             </div>
//         </>
//     );

// }

// export default UserProfileDetails;