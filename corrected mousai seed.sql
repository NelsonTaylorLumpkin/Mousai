CREATE TABLE [Follow] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [FollowingUserId] integer NOT NULL,
  [FollowedUserId] integer NOT NULL
)
GO

CREATE TABLE [User] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [PenName] nvarchar(255) NOT NULL,
  [ProfileImage] nvarchar(255) NOT NULL,
  [CreatedAt] dateTime NOT NULL
)
GO

CREATE TABLE [Post] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [Title] nvarchar(255) NOT NULL,
  [Body] text NOT NULL,
  [UserId] integer NOT NULL,
  [PostImage] nvarchar(255) NOT NULL,
  [CreatedAt] dateTime NOT NULL
)
GO

CREATE TABLE [Comment] (
  [Id] integer PRIMARY KEY IDENTITY(1, 1),
  [Message] nvarchar(255) NOT NULL,
  [PostId] integer NOT NULL,
  [UserProfileId] integer NOT NULL
)
GO

ALTER TABLE [Post] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Follow] ADD FOREIGN KEY ([FollowingUserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Follow] ADD FOREIGN KEY ([FollowedUserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id])
GO

ALTER TABLE [Comment] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [User] ([Id])
GO
