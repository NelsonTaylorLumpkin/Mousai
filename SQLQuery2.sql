
SELECT u.Id, u.FirebaseUserId, u.[Name],
                        u.Email, u.CreatedAt AS UserCreatedDate,
                        u.ProfileImage, p.Id AS PostId,
                        p.Title, p.Body,
                        p.UserId, p.CreatedAt AS PostCreatedDate
                        FROM [User] u
                        LEFT JOIN Post p ON p.UserId = u.Id
                        WHERE u.FirebaseUserId = 'M0gTm7Uz55QXQtT0hy7xvZGHVKA3'