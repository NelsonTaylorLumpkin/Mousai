import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import UserProfiles from "./UserProfile";
import UserProfileDetails from "./UserProfileDetails";
import PostList from "./PostList";
import PostForm from "./PostForm";
import Post from "./Post";
import MyPostsList from "./MyPostsList";
import EditPostForm from "./EditPostForm";
import PostDetails from "./PostDetails";

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
                    />
                    <Route path="post" element={<PostList />} />
                    <Route path="add" element={isLoggedIn ? <PostForm /> : <Navigate to="/login" />} />
                    <Route path="edit/:id" element={isLoggedIn ? <EditPostForm /> : <Navigate to="/mypostlist" />} />
                    <Route path="mypostlist" element={<MyPostsList />} />
                    <Route path="post/:id" element={<PostDetails />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="userprofile" element={<UserProfiles />} />
                    <Route path="userprofile/:id" element={<UserProfileDetails />} />
                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route>
            </Routes>
        </main>
    );
};
// import React, { useEffect, useState } from 'react';
// import { useParams, useHistory } from 'react-router-dom';
// import { getPostById, deletePost } from '../modules/postManager';

// const PostDetails = () => {
//     const [post, setPost] = useState(null);
//     const { id } = useParams();
//     const history = useHistory();

//     useEffect(() => {
//         getPostById(id).then(setPost);
//     }, [id]);

//     if (!post) {
//         return <div>Loading...</div>;
//     }

//     function handleDelete() {
//         deletePost(id)
//             .then(() => history.push('/posts'))
//             .catch((error) => console.log(error));
//     }

//     return (
//         <div className="container">
//             <div className="row justify-content-center">
//                 <div className="col-md-8">
//                     <h2>{post.title}</h2>
//                     <p>{post.content}</p>
//                     <button className="btn btn-danger" onClick={handleDelete}>
//                         Delete
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PostDetails;
