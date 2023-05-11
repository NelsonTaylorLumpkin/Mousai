import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { editPost, getMyPosts } from '../modules/postManager';

const EditPostForm = ({ postId }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        getMyPosts(postId).then(post => {
            if (post) {
                setTitle(post.title || '');
                setContent(post.content || '');
            }
        });
    }, [postId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }
        editPost(postId, formData).then(() => {

            return <Link to={`/post/${postId}`}>View Post</Link>;
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
                        <button type="submit" className="btn btn-primary">Submit Edit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPostForm;
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { editPost, getMyPosts } from '../modules/postManager';

// const EditPostForm = ({ postId }) => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [image, setImage] = useState(null);

//     useEffect(() => {
//         getMyPosts(postId).then(post => {
//             setTitle(post.title);
//             setContent(post.content);
//         });
//     }, [postId]);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('content', content);
//         if (image) {
//             formData.append('image', image);
//         }
//         editPost(postId, formData).then(() => {
//             // use the `postId` parameter to navigate to the post page
//             return <Link to={`/post/${postId}`}>View Post</Link>;
//         });
//     };

//     return (
//         <div className="container">
//             <div className="row justify-content-center">
//                 <div className="col-md-8">
//                     <h2>Edit Post</h2>
//                     <form onSubmit={handleSubmit}>
//                         <div className="form-group">
//                             <label htmlFor="title">Title</label>
//                             <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="content">Content</label>
//                             <textarea className="form-control" id="content" rows="5" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="image">Image</label>
//                             <input type="file" className="form-control-file" id="image" onChange={(e) => setImage(e.target.files[0])} />
//                         </div>
//                         <button type="submit" className="btn btn-primary">Submit Edit</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditPostForm;
