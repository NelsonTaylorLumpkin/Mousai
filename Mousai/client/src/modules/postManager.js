
import { useNavigate } from "react-router-dom"
import { getToken } from "./authManager";
const baseUrl = '/api/post';
const userUrl = '/api/userprofile';

export const getPosts = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/GetAll`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get posts"
                );
            }
        });
    });
};





export const getMyPosts = () => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/MyPosts`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get your posts",
                );
            }
        });
    });
}



export const addPost = (post) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/Add`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } else if (resp.status === 401) {
                    throw new Error("Unauthorized");
                } else {
                    throw new Error(
                        "An unknown error occurred while trying to save new post"
                    );
                }
            });
    });
};

export const editPost = (postId, post) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${postId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } else if (resp.status === 401) {
                    throw new Error("Unauthorized");
                } else {
                    throw new Error(
                        "An unknown error occurred while trying to edit the post"
                    );
                }
            });
    });
};

export const deletePost = (postId) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/${postId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return;
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occurred while trying to delete the post"
                );
            }
        });
    });
};

export const addPostComment = (postId, comment) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/AddComment/${postId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } else if (resp.status === 401) {
                    throw new Error("Unauthorized");
                } else {
                    throw new Error(
                        "An unknown error occurred while trying to add comment"
                    );
                }
            });
    });
};

export const editPostComment = (commentId, comment) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/EditComment/${commentId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment)
        })
            .then((resp) => {
                if (resp.ok) {
                    return resp.json();
                } else if (resp.status === 401) {
                    throw new Error("Unauthorized");
                } else {
                    throw new Error(
                        "An unknown error occurred while trying to edit comment"
                    );
                }
            });
    });
};

export const deletePostComment = (commentId) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/DeleteComment/${commentId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((resp) => {
                if (resp.ok) {
                    return;
                } else if (resp.status === 401) {
                    throw new Error("Unauthorized");
                } else {
                    throw new Error(
                        "An unknown error occurred while trying to delete comment"
                    );
                }
            });
    });
};