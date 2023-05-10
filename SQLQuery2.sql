  Insert Into Follow (FollowingUserId, FollowedUserId)
                    OUTPUT INSERTED.Id
                    Values (2, 5)