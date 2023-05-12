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
import Follow from "./Follow"; // import the Follow component
import UserProfileCard from "./UserProfileCard";

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
                    <Route path="edit/:postId" element={isLoggedIn ? <EditPostForm /> : <Navigate to="/mypostlist" />} />
                    <Route path="mypostlist" element={<MyPostsList />} />
                    <Route path="post/:id" element={<Post />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="userprofile" element={<UserProfiles />} />
                    <Route path="userprofile/:id" element={<UserProfileDetails />} />
                    <Route path="userprofilecard/:id" element={<UserProfileCard />} />
                    <Route path="follow/:idoftarget" element={<Follow />} />
                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route>
            </Routes>
        </main>
    );
};
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "./Login";
// import Register from "./Register";
// import Hello from "./Hello";
// import UserProfiles from "./UserProfile";
// import UserProfileDetails from "./UserProfileDetails";
// import PostList from "./PostList";
// import PostForm from "./PostForm";
// import Post from "./Post";
// import MyPostsList from "./MyPostsList";
// import EditPostForm from "./EditPostForm";
// import Follow from "./Follow"; // import the Follow component
// import UserProfileCard from "./UserProfileCard";

// export default function ApplicationViews({ isLoggedIn }) {
//     return (
//         <main>
//             <Routes>
//                 <Route path="/">
//                     <Route
//                         index
//                         element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
//                     />
//                     <Route path="post" element={<PostList />} />
//                     <Route path="add" element={isLoggedIn ? <PostForm /> : <Navigate to="/login" />} />
//                     <Route path="edit/:postId" element={isLoggedIn ? <EditPostForm /> : <Navigate to="/mypostlist" />} />
//                     <Route path="mypostlist" element={<MyPostsList />} />
//                     <Route path="post/:id" element={<Post />} />
//                     <Route path="login" element={<Login />} />
//                     <Route path="register" element={<Register />} />
//                     <Route path="userprofile" element={<UserProfiles />} />
//                     <Route path="userprofile/:id" element={<UserProfileDetails />} />
//                     <Route path="userprofilecard/:id" element={<UserProfileCard />} />
//                     <Route path="follow" element={<Follow />} /> {/* add the Follow component to the routes */}
//                     <Route path="*" element={<p>Whoops, nothing here...</p>} />
//                 </Route>
//             </Routes>
//         </main>
//     );
// };
