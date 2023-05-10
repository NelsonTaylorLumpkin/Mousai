import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getPostById, deletePost } from '../modules/postManager';

const PostDetails = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getPostById(id).then(setPost);
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    function handleDelete() {
        deletePost(id)
            .then(() => history.push('/posts'))
            .catch((error) => console.log(error));
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { getPostById } from '../modules/postManager';

// const PostDetails = () => {
//     const [post, setPost] = useState(null);
//     const { id } = useParams();

//     useEffect(() => {
//         getPostById(id).then(setPost);
//     }, [id]);

//     if (!post) {
//         return <div>Loading...</div>;
//     }

//     function handleDelete() {
//         deletePost(id)
//             .then(() => history.push('/posts'));
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