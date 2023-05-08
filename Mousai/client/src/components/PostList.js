// import React, { useEffect, useState } from "react";
// import Post from './Post';
// import getPosts from "./postManager";
// import PostForm from './PostForm';

// const PostList = () => {
//     const [posts, setPosts] = useState([]);

//     const getPosts = () => {
//         getAllPosts().then(data => setPosts(data));
//     };

//     useEffect(() => {
//         getPosts();
//     }, []);


//     return (
//         <div className="container">
//             <div className="row justify-content-center">
//                 {posts.map((p) => (
//                     <Post post={p} key={p.id} />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default PostList
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