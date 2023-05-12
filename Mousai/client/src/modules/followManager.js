
import { getToken } from "./authManager";

const baseUrl = "/api/Follow";

export const getFollower = (userId) => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/followers/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.json()));
};

export const getFollowing = (userId) => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/following/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => resp.json()));
};

export const addFollow = (follow) => {
    return getToken().then((token) =>
        fetch(`${baseUrl}/AddFollow/${follow}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },

        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error("An unknown error occurred while trying to follow a user.");
            }
        }));
};

