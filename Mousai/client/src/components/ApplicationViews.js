import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./egister";
import Hello from "./Hello";
import UserProfiles from "./UserProfiles";
import UserProfileDetails from "./UserProfileDetails";
import PostList from "./PostList";
// import TagList from "./TagList";
// import { AddTag } from "./AddTag";
// import { TagEdit } from "./TagEdit";
import PostForm from "./PostForm";

export default function ApplicationViews({ isLoggedIn }) {
    return (
        <main>
            <Routes>
                <Route path="/">
                    <Route
                        index
                        element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
                    />
                    <Route path="Post" element={<PostList />} />
                    <Route path="add" element={isLoggedIn ? <PostForm /> : <Navigate to="/login" />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="userprofile" element={<UserProfiles />} />
                    <Route path="userprofile/:id" element={<UserProfileDetails />} />
                    {/* <Route path="tag" element={isLoggedIn ? <TagList /> : <Navigate to="/login" />} />

                    <Route path="tag/:id" element={isLoggedIn ? <TagEdit /> : <Navigate to="/login" />} />
                    <Route path="addtag" element={isLoggedIn ? <AddTag /> : <Navigate to="/login" />} /> */}
                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route>
            </Routes>
        </main>
    );
};