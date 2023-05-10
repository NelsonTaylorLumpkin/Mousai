import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPost } from "../modules/postManager";

const PostForm = () => {
    const [post, setPost] = useState({
        Title: "",
        Body: "",
        PostImage: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!post.Title || !post.Body || !post.PostImage) {
            setError("Please enter all fields.");
            return;
        }
        addPost(post)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                setError(
                    "An unknown error occurred while trying to save the post."
                );
            });
    };

    return (
        <form className="formContainer" onSubmit={handleSubmit}>
            <h2>Add New Post</h2>
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="Title"
                    className="form-control"
                    value={post.Title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="body">Body:</label>
                <textarea
                    id="body"
                    name="Body"
                    className="form-control"
                    value={post.Body}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="postImage">Post Image:</label>
                <input
                    type="url"
                    id="postImage"
                    name="PostImage"
                    className="form-control"
                    value={post.PostImage}
                    onChange={handleChange}
                    required
                />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
};

export default PostForm;

