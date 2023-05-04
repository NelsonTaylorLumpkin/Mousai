﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Mousai.Models;
using Mousai.Repositories;
using Mousai.Utils;
using System.Collections.Generic;
using System.Data;


namespace Mousai.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }
        public List<Post> GetAllPublishedPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Body, 
                              p.PostImage AS HeaderImage,
                              p.CreatedAt, 
                              p.UserId,
                             
                              u.Name, u.PenName, 
                              u.Email, u.CreatedAt, u.ProfileImage AS ProfileImage
                             
                             
                         FROM Post p
                             
                              LEFT JOIN User u ON p.UserId = u.id
                              
                        WHERE CreatedAt < SYSDATETIME()
                               ORDER BY p.CreatedAt DESC";
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }
        public Post GetPublishedPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Body, 
                              p.PostImage AS PostImage,
                              p.CreatedAt, 
                              p.UserId,
                             
                              u.Name, u.PenName, 
                              u.Email, u.CreatedAt, u.ProfileImage AS ProfileImage
                            
                             
                         FROM Post p
                             
                              LEFT JOIN User u ON p.UserId = u.id
                              
                        WHERE PublishDateTime < SYSDATETIME()
                              AND p.Id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Post post = null;

                    if (reader.Read())
                    {
                        post = NewPostFromReader(reader);
                    }

                    reader.Close();

                    return post;
                }
            }
        }

        public List<Post> GetPostsByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Body, 
                              p.PostImage AS PostImage,
                              p.CreatedAt, 
                              p.UserProfileId,
                              
                              u.Name, u.PenName, 
                              u.Email, u.CreatedAt, u.ProfileImage AS ProfileImage
                             
                              
                         FROM Post p
                              
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              
                        WHERE p.UserId = @userId ORDER BY p.CreatedAt";


                    cmd.Parameters.AddWithValue("@userId", userId);

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (
                            Title, Body, PostImage, CreatedAt,
                            UserId )
                        OUTPUT INSERTED.ID
                        VALUES (
                            @Title, @Body, @PostImage, @CreatedAt,
                            @UserId )";
                    cmd.Parameters.AddWithValue("@Title", post.Title);
                    cmd.Parameters.AddWithValue("@Body", post.Body);
                    cmd.Parameters.AddWithValue("@PostImage", DbUtils.ValueOrDBNull(post.PostImage));
             
                    cmd.Parameters.AddWithValue("@CreatedAt", DbUtils.ValueOrDBNull(post.CreatedAt));
        
                    cmd.Parameters.AddWithValue("@UserId", post.UserId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void UpdatePost(Post post)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Post
                                           SET Title = @title,
                                               Body = @body,
                                               PostImage = @postimage,
                                               CreatedAt = @createdat,
                                               UserId = @userId,
                                             
                                         WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@title", post.Title);
                    cmd.Parameters.AddWithValue("@body", post.Body);
                    cmd.Parameters.AddWithValue("@createdAt", post.CreatedAt);
                   
                    cmd.Parameters.AddWithValue("@userId", post.UserId);
                  
                    cmd.Parameters.AddWithValue("@id", post.Id);
                    cmd.Parameters.AddWithValue("@postImage", post.PostImage);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeletePost(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Post WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
       

        public Post NewPostFromReader(SqlDataReader reader)
        {
            int postId = reader.GetInt32(reader.GetOrdinal("Id"));


            return new Post()
            {

                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Title = reader.GetString(reader.GetOrdinal("Title")),
                Body = reader.GetString(reader.GetOrdinal("Body")),
                PostImage = DbUtils.GetNullableString(reader, "PostImage"),
                CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt")),
               
               
                UserProfile = new UserProfile()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    Name = reader.GetString(reader.GetOrdinal("Name")),
                    PenName = reader.GetString(reader.GetOrdinal("PenName")),
                    
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt")),
                    ProfileImage = DbUtils.GetNullableString(reader, "ProfileImage"),
                    
                }
            };

        }

      
    }

}
