import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import UserProfiles from "./UserProfile";
import UserProfileDetails from "./UserProfileDetails";
import PostList from "./PostList";


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



                    <Route path="*" element={<p>Whoops, nothing here...</p>} />
                </Route>
            </Routes>
        </main>
    );
};