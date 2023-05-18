import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deletePost, getMyPosts, getToken, baseUrl } from '../modules/postManager';
import styles from './MyPostsList.module.css'; // Import styles

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
                    <div key={post.id} className={styles.card}>
                        <div className={styles.cardBody}>
                            <h2 className={styles.textLeft}>
                                <Link to={`/post/${post.id}`}>{post.title}</Link>
                            </h2>
                            <div className={styles.buttonContainer}>
                                <Link className={styles.buttonEdit} to={`/edit/${post.id}`}>Edit</Link>
                                <button className={styles.buttonDelete} onClick={() => handleDelete(post.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </>
    );
};

export default MyPostsList;

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { deletePost, getMyPosts, getToken, baseUrl } from '../modules/postManager';
// import styles from './MyPostsList.module.css'; // Import styles

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
//                     <div key={post.id} className={styles.card}>
//                         <div className={styles.cardBody}>
//                             <h2 className={styles.textLeft}>
//                                 <Link to={`/post/${post.id}`}>{post.title}</Link>
//                             </h2>
//                             <div>
//                                 <Link className={styles.buttonEdit} to={`/edit/${post.id}`}>Edit</Link>
//                                 <button className={styles.buttonDelete} onClick={() => handleDelete(post.id)}>Delete</button>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </section>
//         </>
//     );
// };

// export default MyPostsList;

