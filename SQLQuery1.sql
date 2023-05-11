 SELECT p.Id, p.Title, p.Body, 
                               p.PostImage AS PostImage,
                               p.CreatedAt, 
                               p.UserId AS UserProfileId,

                               u.Name AS [Name], 
                               u.PenName AS PenName, 
                               u.Email AS Email, 
                               u.CreatedAt AS CreatedAt, 
                               u.ProfileImage AS ProfileImage

                               FROM Post p

                        LEFT JOIN [User] u ON p.UserId = u.Id

                        WHERE p.UserId = 3
                        ORDER BY p.CreatedAt