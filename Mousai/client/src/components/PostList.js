import React, { useEffect, useState } from "react";
import Post from './Post';
import { getAllPosts } from "../modules/postManager";

const PostList = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = () => {
        getAllPosts().then(data => setPosts(data));
    };

    useEffect(() => {
        getPosts();
    }, []);


    return (
        <div className="container">
            <div className="row justify-content-center">
                {posts.map((p) => (
                    <Post post={p} key={p.id} />
                ))}
            </div>
        </div>
    );
};

export default PostList