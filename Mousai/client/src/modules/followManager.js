// import { getToken } from "./authManager";

// const baseUrl = "/api/Follow";

// export const getFollowers = (userId) => {
//     return getToken().then((token) =>
//         fetch(`${baseUrl}/followers/${userId}`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }).then(resp => resp.json()));
// };

// export const getFollowing = (userId) => {
//     return getToken().then((token) =>
//         fetch(`${baseUrl}/following/${userId}`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }).then(resp => resp.json()));
// };

// export const followUser = (follow) => {
//     return getToken().then((token) =>
//         fetch(`${baseUrl}`, {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(follow)
//         }).then(resp => {
//             if (resp.ok) {
//                 return resp.json();
//             } else if (resp.status === 401) {
//                 throw new Error("Unauthorized");
//             } else {
//                 throw new Error("An unknown error occurred while trying to follow a user.");
//             }
//         }));
// };

// export const unfollowUser = (followId) => {
//     return getToken().then((token) =>
//         fetch(`${baseUrl}/${followId}`, {
//             method: "DELETE",
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }).then(resp => {
//             if (!resp.ok) {
//                 throw new Error("An unknown error occurred while trying to unfollow a user.");
//             }
//         }));
// };