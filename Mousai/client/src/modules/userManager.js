import firebase from "firebase/app";
import "firebase/auth";
import { getToken } from "./authManager";

const baseUrl = "/api/UserProfile";

export const allUsers = () => {
    return getToken().then((token) =>
        fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.json()));
};


export const getUsers = () => {
    return getToken().then((token) =>
        fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.json()));
};

export const getUserById = (id) => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.json()));
};

export const getMyProfile = () => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/Me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.json()));
};

export const checkIfUserExists = (firebaseUserId) => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/DoesUserExist/${firebaseUserId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return true;
            } else {
                return false;
            }
        }));
};

export const getUserByFirebaseId = (firebaseUserId) => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/firebase/${firebaseUserId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.json()));
};

export const addUser = (userProfile) => {
    return getToken().then((token) =>
        fetch(`${baseUrl}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userProfile)
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to save a new user profile.");
            }
        }));
};

export const updateUser = (userProfile) => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/${userProfile.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userProfile)
        }).then(resp => {
            if (resp.ok) {
                return;
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to save changes to a user profile.");
            }
        }));
};

export const deleteUser = (userId) => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/${userId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return;
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to delete a user profile.");
            }
        }));
};
// import firebase from "firebase/app";
// import "firebase/auth";
// import { getToken } from "./authManager";

// const baseUrl = "/api/userprofile";

// export const allUsers = () => {
//     return getToken().then((token) =>
//         fetch(`${baseUrl}`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }).then(resp => resp.json()));
// };

// export const getUserById = (userId) => {
//     return getToken().then((token) =>
//         fetch(`${baseUrl}/${userId}`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }).then(resp => resp.json()));
// };