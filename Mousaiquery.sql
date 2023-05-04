INSERT INTO [User] ([FirebaseUserId], [Name], [Email], [PenName], [ProfileImage], [CreatedAt])
VALUES ('firebaseuser1', 'Alice', 'alice@example.com', 'AliceWriter', 'alice_profile.jpg', DEFAULT);

INSERT INTO [User] ([FirebaseUserId], [Name], [Email], [PenName], [ProfileImage], [CreatedAt])
VALUES ('firebaseuser2', 'Bob', 'bob@example.com', 'BobAuthor', 'bob_profile.jpg', DEFAULT);

INSERT INTO [User] ([FirebaseUserId], [Name], [Email], [PenName], [ProfileImage], [CreatedAt])
VALUES ('firebaseuser3', 'Charlie', 'charlie@example.com', 'CharlieStoryteller', 'charlie_profile.jpg', DEFAULT);

-- Seed data for Follow table
INSERT INTO [Follow] ([FollowingUserId], [FollowedUserId])
VALUES (1, 2);

INSERT INTO [Follow] ([FollowingUserId], [FollowedUserId])
VALUES (2, 3);

INSERT INTO [Follow] ([FollowingUserId], [FollowedUserId])
VALUES (3, 1);

-- Seed data for Post table
INSERT INTO [Post] ([Title], [Body], [UserId], [PostImage], [CreatedAt])
VALUES ('My First Post', 'This is the content of my first post.', 1, 'post1_image.jpg', DEFAULT);

INSERT INTO [Post] ([Title], [Body], [UserId], [PostImage], [CreatedAt])
VALUES ('My Second Post', 'This is the content of my second post.', 2, 'post2_image.jpg', DEFAULT);

INSERT INTO [Post] ([Title], [Body], [UserId], [PostImage], [CreatedAt])
VALUES ('My Third Post', 'This is the content of my third post.', 3, 'post3_image.jpg', DEFAULT);

-- Seed data for Comment table
INSERT INTO [Comment] ([Message], [PostId], [UserProfileId])
VALUES ('Nice post!', 1, 2);

INSERT INTO [Comment] ([Message], [PostId], [UserProfileId])
VALUES ('Interesting thoughts.', 1, 3);

INSERT INTO [Comment] ([Message], [PostId], [UserProfileId])
VALUES ('Great writing!', 2, 1);