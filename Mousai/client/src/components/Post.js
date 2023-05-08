import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
    return (
        <Card>
            <p className="text-left px-2">
                Posted By:{" "}
                <Link to={`/users/${post.userId}`}>{post.userId.Name}</Link>
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
                    {post.comments ? (
                        post.comments.map((c) => <li key={c.id}>{c.message}</li>)
                    ) : null}
                </ul>
            </CardBody>
        </Card>
    );
};

export default Post;