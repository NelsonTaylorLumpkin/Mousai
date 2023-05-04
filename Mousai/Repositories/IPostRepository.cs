using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using Mousai.Models;

namespace Mousai.Repositories
{
    public interface IPostRepository
    {
      
        List<Post> GetAllPublishedPosts();
        Post GetPublishedPostById(int id);

        List<Post> GetPostsByUserId(int userId);
        void Add(Post post);

        void UpdatePost(Post post);
        void DeletePost(int id);
        Post NewPostFromReader(SqlDataReader reader);


    }
}
