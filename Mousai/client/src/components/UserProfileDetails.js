import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { userById } from "../modules/userManager";
import { getMyPosts } from "../modules/postManager";

const UserProfileDetails = () => {
    const [userProfile, setUserProfile] = useState({});
    const [posts, setPosts] = useState([]);

    const { id } = useParams();



    const getUserPosts = () => {
        getMyPosts().then(setPosts);
    }

    const getUser = () => {
        userById(id).then(setUserProfile);
    }

    useEffect(() => {
        getUser();
        getUserPosts();
    }, []);

    return (
        <>
            <Card>
                <CardBody>
                    <h2>{userProfile.name}</h2>
                    <img src={userProfile.profileImage} />
                    <p>Pen Name: {userProfile.penName}</p>
                    <p>Email: {userProfile.email}</p>
                    <p>User Created: {userProfile.createdAt}</p>
                </CardBody>
            </Card>
            <div className="container">
                <div className="row justify-content-center">
                    <Card>
                        <CardBody>
                            <h2>{userProfile.name}'s Posts</h2>
                            <ul>
                                {posts.map((post) => (
                                    <li>
                                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );

}

export default UserProfileDetails;