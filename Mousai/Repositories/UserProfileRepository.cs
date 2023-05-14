using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Mousai.Models;
using Mousai.Utils;
namespace Mousai.Repositories
{
    public class UserProfileRepository : IUserProfileRepository
    {

        private readonly IConfiguration _configuration;
        private readonly string _connectionString;
        public UserProfileRepository(IConfiguration configuration) 
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

        public List<UserProfile> GetUsers()
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                using (var cmd = new SqlCommand())
                {
                    cmd.Connection = conn;
                    cmd.CommandText = @"
                    SELECT Id, [Name], CreatedAt, PenName, Email, ProfileImage FROM [User]";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var profiles = new List<UserProfile>();
                        while (reader.Read())
                        {
                            profiles.Add(new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                               
                                Name = DbUtils.GetString(reader, "Name"),
                                PenName = DbUtils.GetString(reader, "PenName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                ProfileImage = DbUtils.GetString(reader, "ProfileImage"),
                                CreatedAt = DbUtils.GetDateTime(reader, "CreatedAt")
                            });


                        }
                        return profiles;
                    }
                }
            }
        }
        public UserProfile GetById(int id)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT u.Id, u.[Name],
                    u.PenName AS PenName,
                    u.Email, u.CreatedAt AS UserCreatedDate,
                    u.ProfileImage, p.Id AS PostId,
                    p.Title, p.Body, p.PostImage,
                    p.UserId, p.CreatedAt AS PostCreatedDate
                    FROM [User] u
                    LEFT JOIN Post p ON p.UserId = u.Id
                    WHERE u.Id = @Id";

                    DbUtils.AddParameter(cmd, "id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        UserProfile user = null;
                        while (reader.Read())
                        {
                            if (user == null)
                            {
                                user = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    CreatedAt = DbUtils.GetDateTime(reader, "UserCreatedDate"),
                                    PenName = DbUtils.GetString(reader, "PenName"),
                                    ProfileImage = DbUtils.GetString(reader, "ProfileImage"),
                                    Posts = new List<Post>()
                                };
                            }
                            if (DbUtils.IsNotDbNull(reader, "PostId"))
                            {
                                user.Posts.Add(new Post()
                                {
                                    Id = DbUtils.GetInt(reader, "PostId"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    Body = DbUtils.GetString(reader, "Body"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    CreatedAt = DbUtils.GetDateTime(reader, "PostCreatedDate"),
                                    PostImage = DbUtils.GetString(reader, "PostImage")
                                });
                            }
                        }
                        return user;
                    }
                }

            }

        }

        public UserProfile GetByFirebaseUserId(string id)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT u.Id, u.FirebaseUserId, u.[Name],
                        u.Email, u.PenName, u.CreatedAt AS UserCreatedDate,
                        u.ProfileImage, p.Id AS PostId,
                        p.Title, p.Body,
                        p.UserId, p.CreatedAt AS PostCreatedDate
                        FROM [User] u
                        LEFT JOIN Post p ON p.UserId = u.Id
                        WHERE u.FirebaseUserId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        UserProfile user = null;
                        while (reader.Read())
                        {
                            if (user == null)
                            {
                                user = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    CreatedAt = DbUtils.GetDateTime(reader, "UserCreatedDate"),
                                    ProfileImage = DbUtils.GetString(reader, "ProfileImage"),
                                    PenName = DbUtils.GetString(reader, "PenName"),
                                    Posts = new List<Post>()
                                };

                            };
                        }



                        if (DbUtils.IsNotDbNull(reader, "PostId"))
                        {
                            user.Posts.Add(new Post()
                            {
                                Id = DbUtils.GetInt(reader, "PostId"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Body = DbUtils.GetString(reader, "Body"),
                                PostImage = DbUtils.GetString(reader, "PostImage"),
                                CreatedAt = DbUtils.GetDateTime(reader, "CreatedAt"),
                                UserId = DbUtils.GetInt(reader, "UserId")
                            });


                        }


                        return user;

                    }

                }
            }
        }
      

        public void Add(UserProfile user)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO User ([Name], Email, CreatedAt, ProfileImage, PenName)
                        Output Inserted.ID
                        Values (@Name, @Email, @CreatedAt, @ProfileImage, @PenName)";

                    DbUtils.AddParameter(cmd, "@Name", user.Name);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@CreatedAt", user.CreatedAt);
                    DbUtils.AddParameter(cmd, "@PenName", user.PenName);
                    DbUtils.AddParameter(cmd, "@ProfileImage", user.ProfileImage);
                    user.CreatedAt = DateTime.Now;
                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(UserProfile user)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserProfile
                        SET Name = @Name,
                        Email = @Email,
                        ProfileImage = @ProfileImage,
                        PenName = @PenName
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", user.Name);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@ProfileImage", user.ProfileImage);
                    DbUtils.AddParameter(cmd, "@PenName", user.PenName);
                    DbUtils.AddParameter(cmd, "@Id", user.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }



        public void Delete(int id)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM User WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
