// import React, { useState } from 'react';
// import { FollowManager } from './followManager';

// function Follow() {
//     const [followingUserId, setFollowingUserId] = useState('');
//     const [followedUserId, setFollowedUserId] = useState('');
//     const [follow, setFollow] = useState(null);
//     const [error, setError] = useState(null);

//     const handleFollowingUserIdChange = (event) => {
//         setFollowingUserId(event.target.value);
//     };

//     const handleFollowedUserIdChange = (event) => {
//         setFollowedUserId(event.target.value);
//     };

//     const handleAddFollow = (event) => {
//         event.preventDefault();
//         const newFollow = { followingUserId, followedUserId };
//         FollowManager.addFollow(newFollow)
//             .then((response) => {
//                 setFollow(response.data);
//             })
//             .catch((error) => {
//                 setError(`Error adding follow: ${error.message}`);
//             });
//     };

//     const handleGetFollow = (event) => {
//         event.preventDefault();
//         FollowManager.getFollow(followingUserId, followedUserId)
//             .then((response) => {
//                 setFollow(response.data);
//             })
//             .catch((error) => {
//                 setError(`Error getting follow: ${error.message}`);
//             });
//     };

//     return (
//         <div>
//             <h2>Add Follow</h2>
//             <form onSubmit={handleAddFollow}>
//                 <label>
//                     Following User ID:
//                     <input type="number" value={followingUserId} onChange={handleFollowingUserIdChange} />
//                 </label>
//                 <label>
//                     Followed User ID:
//                     <input type="number" value={followedUserId} onChange={handleFollowedUserIdChange} />
//                 </label>
//                 <button type="submit">Add Follow</button>
//             </form>
//             {follow && (
//                 <div>
//                     <h3>Follow Added:</h3>
//                     <p>{JSON.stringify(follow)}</p>
//                 </div>
//             )}
//             {error && <p>{error}</p>}

//             <h2>Get Follow</h2>
//             <form onSubmit={handleGetFollow}>
//                 <label>
//                     Following User ID:
//                     <input type="number" value={followingUserId} onChange={handleFollowingUserIdChange} />
//                 </label>
//                 <label>
//                     Followed User ID:
//                     <input type="number" value={followedUserId} onChange={handleFollowedUserIdChange} />
//                 </label>
//                 <button type="submit">Get Follow</button>
//             </form>
//             {follow && (
//                 <div>
//                     <h3>Follow Found:</h3>
//                     <p>{JSON.stringify(follow)}</p>
//                 </div>
//             )}
//             {error && <p>{error}</p>}
//         </div>
//     );
// }

// export default Follow;
// // import React, { useState } from 'react';
// // import { FollowManager } from './followManager';

// // function Follow() {
// //     const [followingUserId, setFollowingUserId] = useState('');
// //     const [followedUserId, setFollowedUserId] = useState('');
// //     const [follow, setFollow] = useState(null);
// //     const [error, setError] = useState(null);

// //     const handleFollowingUserIdChange = (event) => {
// //         setFollowingUserId(event.target.value);
// //     };

// //     const handleFollowedUserIdChange = (event) => {
// //         setFollowedUserId(event.target.value);
// //     };

// //     const handleAddFollow = (event) => {
// //         event.preventDefault();
// //         const newFollow = { followingUserId, followedUserId };
// //         FollowManager.addFollow(newFollow)
// //             .then((response) => {
// //                 setFollow(response.data);
// //             })
// //             .catch((error) => {
// //                 setError(`Error adding follow: ${error.message}`);
// //             });
// //     };

// //     const handleGetFollow = (event) => {
// //         event.preventDefault();
// //         FollowManager.getFollow(followingUserId, followedUserId)
// //             .then((response) => {
// //                 setFollow(response.data);
// //             })
// //             .catch((error) => {
// //                 setError(`Error getting follow: ${error.message}`);
// //             });
// //     };

// //     return (
// //         <div>
// //             <h2>Add Follow</h2>
// //             <form onSubmit={handleAddFollow}>
// //                 <label>
// //                     Following User ID:
// //                     <input type="number" value={followingUserId} onChange={handleFollowingUserIdChange} />
// //                 </label>
// //                 <label>
// //                     Followed User ID:
// //                     <input type="number" value={followedUserId} onChange={handleFollowedUserIdChange} />
// //                 </label>
// //                 <button type="submit">Add Follow</button>
// //             </form>
// //             {follow && (
// //                 <div>
// //                     <h3>Follow Added:</h3>
// //                     <p>{JSON.stringify(follow)}</p>
// //                 </div>
// //             )}
// //             {error && <p>{error}</p>}

// //             <h2>Get Follow</h2>
// //             <form onSubmit={handleGetFollow}>
// //                 <label>
// //                     Following User ID:
// //                     <input type="number" value={followingUserId} onChange={handleFollowingUserIdChange} />
// //                 </label>
// //                 <label>
// //                     Followed User ID:
// //                     <input type="number" value={followedUserId} onChange={handleFollowedUserIdChange} />
// //                 </label>
// //                 <button type="submit">Get Follow</button>
// //             </form>
// //             {follow && (
// //                 <div>
// //                     <h3>Follow Found:</h3>
// //                     <p>{JSON.stringify(follow)}</p>
// //                 </div>
// //             )}
// //             {error && <p>{error}</p>}
// //         </div>
// //     );
// // }

// // export default Follow;