import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyPosts } from '../modules/postManager';

const MyPostsList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getMyPosts().then((res) => { setPosts(res) })
    }, []);

    return (
        <>
            <h1 className="text-center">My Posts</h1>
            <section>
                {posts.map(post => (
                    <div key={post.id}>
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                        <Link to={`/edit/${post.id}`}>   Edit</Link>
                    </div>
                ))}
            </section>
        </>
    );
};

export default MyPostsList;

//