SELECT *
FROM Follow
WHERE FollowingUserId NOT IN (SELECT Id FROM [User])