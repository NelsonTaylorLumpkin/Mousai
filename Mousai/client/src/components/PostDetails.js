import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../modules/postManager';

const PostDetails = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getPostById(id).then(setPost);
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;