import React, { useEffect, useState, } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { addPost } from "../modules/postManager";

const PostForm = () => {

    const [post, setPost] = useState({
        Title: '',
        Body: '',
        PostImage: ''

    })

    // useEffect(() => {
    //     const fetchCategoies = async () => {
    //         const result = await getAllCategories();
    //         setCategories(result)
    //     }
    //     fetchCategoies();
    // }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        addPost(post).then(navigate("/"))
    }

    const navigate = useNavigate();

    return (
        <form className="formContainer" onSubmit={handleSubmit}>
            <h2>Add New Post</h2>
            <input type="text"
                placeholder="Title"
                required
                onChange={
                    (event) => {
                        const copy = { ...post }
                        copy.Title = event.target.value
                        setPost(copy)
                    }
                } /> <br />
            <input type="text"
                placeholder="Body"
                required
                onChange={
                    (event) => {
                        const copy = { ...post }
                        copy.Content = event.target.value
                        setPost(copy)
                    }
                } /> <br />
            <input type="url"
                placeholder="PostImage"
                required
                onChange={
                    (event) => {
                        const copy = { ...post }
                        copy.ImageLocation = event.target.value
                        setPost(copy)
                    }
                } /> <br />
            {/* <select className="categoryDropdown"
                required
                onChange={
                    (event) => {
                        const copy = { ...post }
                        copy.CategoryId = parseInt(event.target.value)
                        setPost(copy)
                    }
                } >
                <option value="0">Select Category</option>
                {categories.map(
                    (c) => {
                        return <option
                            key={c.id}
                            value={c.id}>
                            {c.name}</option>
                    }
                )}
            </select> <br /> */}

            <input type="submit" />

        </form>
    )
}

export default PostForm;