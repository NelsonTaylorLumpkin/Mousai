
// import { useState, useEffect } from "react";
// import { getPosts } from "../modules/postManager";

// const PostList = () => {
//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         getPosts().then((posts) => setPosts(posts));
//     }, []);

//     return (
//         <div>
//             <h1>Posts</h1>
//             <ul>
//                 {posts.map((post) => (
//                     <li key={post.id}>
//                         <h2>{post.title}</h2>
//                         <p>{post.body}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default PostList;
import React, { useEffect, useState } from "react";
import Post from './Post';
import { getPosts } from "../modules/postManager";
import PostForm from './PostForm';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getPosts()
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

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

export default PostList;