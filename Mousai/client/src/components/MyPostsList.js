import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deletePost, getMyPosts, getToken, baseUrl } from '../modules/postManager';

const MyPostsList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getMyPosts().then((res) => { setPosts(res) })
    }, []);

    const handleDelete = async (postId) => {
        try {
            await deletePost(postId);
            setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        } catch (error) {
            // Handle error here
        }
    };

    return (
        <>
            <h1 className="text-center">My Posts</h1>
            <section>
                {posts.map(post => (
                    <div key={post.id}>
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                        <Link to={`/edit/${post.id}`}>   Edit</Link>
                        <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </div>
                ))}
            </section>
        </>
    );
};

export default MyPostsList;
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { deletePost, getMyPosts } from '../modules/postManager';

// const MyPostsList = () => {
//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         getMyPosts().then((res) => { setPosts(res) })
//     }, []);

//     const handleDelete = async (postId) => {
//         try {
//             await deletePost(postId);
//             setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
//         } catch (error) {
//             // Handle error here
//         }
//     };

//     return (
//         <>
//             <h1 className="text-center">My Posts</h1>
//             <section>
//                 {posts.map(post => (
//                     <div key={post.id}>
//                         <Link to={`/post/${post.id}`}>{post.title}</Link>
//                         <Link to={`/edit/${post.id}`}>   Edit</Link>
//                         <Link to={`${baseUrl}/Delete/${}`}
//                         <button onClick={() => handleDelete(post.id)}>Delete</button>
//                     </div>
//                 ))}
//             </section>
//         </>
//     );
// };

// export default MyPostsList;
