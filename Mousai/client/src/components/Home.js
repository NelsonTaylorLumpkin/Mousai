import React, { useEffect, useState } from 'react';
import { getPosts } from '../modules/postManager';
import PostCard from './PostCard';

const HomePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then(setPosts);
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                {posts.map(post => <PostCard key={post.id} post={post} />)}
            </div>
        </div>
    );
};

export default HomePage;