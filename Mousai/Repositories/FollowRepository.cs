using System.Collections.Generic;
using Mousai.Models;
using Microsoft.Extensions.Configuration;
using Mousai.Utils;
using Microsoft.AspNetCore.SignalR;
using Mousai.Repositories;

namespace Mousai.Repositories
{
    public class FollowRepository : BaseRepository, IFollowRepository
    {
        public FollowRepository(IConfiguration configuration) : base(configuration) { }

        public Follow AddFollow(Follow follow)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            Insert Into Follow (FollowingUserId, FollowedUserId)
                            Output Inserted.Id
                            Values (@followingUserId, @followedUserId)";

                    cmd.Parameters.AddWithValue("@followingUserId", follow.FollowingUserId);
                    cmd.Parameters.AddWithValue("@followedUserId", follow.FollowedUserId);


                    follow.Id = (int)cmd.ExecuteScalar();
                }
            }
            return follow;
        }

        public Follow GetFollowByUserIdAndProviderId(int followingUserId, int followedUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            Select * From Follow f Where f.FollowedUserId = @FolloweduserId AND f.FollowingUserId = @followedUserId"
                    ;

                    cmd.Parameters.AddWithValue("@followingUserId", followingUserId);
                    cmd.Parameters.AddWithValue("@followedUserId", followedUserId);

                    var reader = cmd.ExecuteReader();
                    Follow follow = null;

                    if (reader.Read())
                    {
                        follow = new Follow()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FollowedUserId = reader.GetInt32(reader.GetOrdinal("FollowedUserId")),
                            FollowingUserId = reader.GetInt32(reader.GetOrdinal("FollowingUserId"))


                        };
                        reader.Close();
                        return follow;
                    }

                    return follow;
                }
            }
        }



    }
}
