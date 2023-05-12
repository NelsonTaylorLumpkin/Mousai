import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { editPost, getMyPosts, getPostById } from '../modules/postManager';

const EditPostForm = ({ }) => {
    const [error, setError] = useState(null);
    let { postId } = useParams();
    const [post, setPost] = useState({
        title: "",
        body: "",
        postImage: "",
    });
    useEffect(() => {
        getPostById(postId)
            .then(data => {
                delete data.userProfile
                setPost(data);

            })

    }, []);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!post.title || !post.body || !post.postImage) {
            setError("Please enter all fields.");
            return;
        }
        editPost(postId, post)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                setError(
                    "An unknown error occurred while trying to save the post."
                );
            });
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2>Edit Post</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" className="form-control" id="title" value={post.title}
                                onChange={(e) => handleChange(e)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea className="form-control" name="body" id="content" rows="5" value={post.body}
                                onChange={(e) => handleChange(e)} required ></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="postImage">Post Image:</label>
                            <input
                                type="url"
                                id="postImage"
                                name="postImage"
                                className="form-control"
                                value={post.postImage}
                                onChange={(e) => handleChange(e)} required />


                        </div>
                        <button type="submit" className="btn btn-primary">Submit Edit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPostForm;
