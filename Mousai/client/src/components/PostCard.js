import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
    return (
        <div className="card">
            <img src={post.image ? post.image : 'https://via.placeholder.com/150'} className="card-img-top" alt={post.title} />
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content}</p>
                <Link to={`/post/${post.id}`} className="btn btn-primary">View Post</Link>
            </div>
        </div>
    );
};

export default PostCard;