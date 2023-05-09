-- Users
INSERT INTO [User] (FirebaseUserId, [Name], Email, PenName, ProfileImage, CreatedAt)
VALUES ('XzkCESaoZcRHpgYzSgq2ZSQhRnO2', 'Nelson', 'ossocasa@gmail.com', 'MoonlitMuse', 'alice.jpg', '2023-01-01');

INSERT INTO [User] (FirebaseUserId, [Name], Email, PenName, ProfileImage, CreatedAt)
VALUES ('aNjSMQqBRKbfQ0j5JuyyOVlCCUj1', 'Bobby Bigwaters', 'dr.bigwaters@yahooaiasks.com', 'WhimsicalWhale', 'bob.jpg', '2023-02-01');

INSERT INTO [User] (FirebaseUserId, [Name], Email, PenName, ProfileImage, CreatedAt)
VALUES ('ghi7899dErZa395CePlMrA2845K1', 'Carol', 'carol@example.com', 'SurrealSerpent', 'carol.jpg', '2023-03-01');

-- Follows
INSERT INTO [Follow] (FollowingUserId, FollowedUserId)
VALUES (1, 2);

INSERT INTO [Follow] (FollowingUserId, FollowedUserId)
VALUES (2, 3);

INSERT INTO [Follow] (FollowingUserId, FollowedUserId)
VALUES (3, 1);

-- Posts
INSERT INTO [Post] (Title, Body, UserId, PostImage, CreatedAt)
VALUES ('The Moonlit Pond', 'Once upon a midnight dreary, frogs danced in the moonlit pond.', 1, 'moonlit_pond.jpg', '2023-03-15');

INSERT INTO [Post] (Title, Body, UserId, PostImage, CreatedAt)
VALUES ('Whales in the Sky', 'A pod of whales soared through the sky, their laughter echoing through the clouds.', 2, 'sky_whales.jpg', '2023-04-01');

INSERT INTO [Post] (Title, Body, UserId, PostImage, CreatedAt)
VALUES ('Serpent of Dreams', 'In the realm of dreams, a surreal serpent slithered, weaving tales of mystery and wonder.', 3, 'dream_serpent.jpg', '2023-04-20');

-- Comments
INSERT INTO [Comment] ([Message], PostId, UserProfileId)
VALUES ('Such a mesmerizing scene! I adore it.', 1, 2);

INSERT INTO [Comment] ([Message], PostId, UserProfileId)
VALUES ('I never thought I would see whales in the sky. This is amazing!', 2, 3);

INSERT INTO [Comment] ([Message], PostId, UserProfileId)
VALUES ('The serpent of dreams has captured my imagination. Beautifully written.', 3, 1);