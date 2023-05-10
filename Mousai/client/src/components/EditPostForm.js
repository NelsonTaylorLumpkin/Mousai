import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getPostById, editPost } from '../modules/postManager';

const EditPostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        getPostById(id).then(post => {
            setTitle(post.title);
            setContent(post.content);
        });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }
        editPost(id, formData).then(() => {
            history.push(`/post/${id}`);
        });
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2>Edit Post</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea className="form-control" id="content" rows="5" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Image</label>
                            <input type="file" className="form-control-file" id="image" onChange={(e) => setImage(e.target.files[0])} />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPostForm;