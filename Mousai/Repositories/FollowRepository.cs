
using System.Collections.Generic;
using Mousai.Models;
using Microsoft.Extensions.Configuration;
using Mousai.Utils;
using Microsoft.AspNetCore.SignalR;
using Mousai.Repositories;
using Microsoft.Data.SqlClient;

namespace Mousai.Repositories
{
    public class FollowRepository : BaseRepository, IFollowRepository
    {
        public FollowRepository(IConfiguration configuration) : base(configuration) { }

        public List<Follow> GetAllFollows(Follow follow)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT f.Id, f.FollowingUserId, f.FollowedUserId
                                        FROM Follow f";
                    var reader = cmd.ExecuteReader();
                    var follows = new List<Follow>();
                    while (reader.Read())
                    {
                        follows.Add(new Follow()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            FollowingUserId = reader.GetInt32(reader.GetOrdinal("FollowingUserId")),
                            FollowedUserId = reader.GetInt32(reader.GetOrdinal("FollowedUserId"))
                        });
                    }
                    reader.Close();
                    return follows;
                }

            }
        }

        public Follow AddFollow(Follow follow)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    Insert Into Follow (FollowingUserId, FollowedUserId)
                    OUTPUT INSERTED.Id
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
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Follow f WHERE f.FollowedUserId = @followedUserId AND f.FollowingUserId = @followingUserId";

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
                    }

                    reader.Close();
                    return follow;
                }
            }
        }
    }
}
