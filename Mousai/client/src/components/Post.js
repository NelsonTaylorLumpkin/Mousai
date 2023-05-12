import React, { useState } from "react";
import { Card, CardBody, Form, FormGroup, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { addFollow } from "../modules/followManager";
import { addPostComment } from "../modules/postManager";

const Post = ({ post, addComment }) => {
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(post.comments || []);

    const handleSubmit = (e) => {
        e.preventDefault();
        addPostComment(comment); // Call the prop function
        setComment("");
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setComments([...comments, { message: comment }]);
    //     setComment("");
    // };

    return (
        <Card>
            <p className="text-left px-2">
                Posted By: <Link to={`/users/${post.userId}`}>{post.userProfile.Name}</Link>
                <br />
                <br />
                <Link to={`/post/${post.id}`}>
                    <strong>{post.title}</strong>
                </Link>
            </p>
            <CardBody>
                <iframe className="post" src={post.postImage} title={post.title}></iframe>

                <p>{post.body}</p>

                <ul>
                    {comments.map((c) => (
                        <li key={c.id}>{c.message}</li>
                    ))}
                </ul>

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="comment">Comment</Label>
                        <Input
                            type="text"
                            name="comment"
                            id="comment"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </FormGroup>
                    <button type="submit">Add Comment</button>
                </Form>

                <Link to={`/follow/${post.userId}`}>{post.userId}</Link>
                <br />
                <button onClick={() => addFollow(post.id)}>Follow This Person</button>
            </CardBody>
        </Card>
    );
};

export default Post;