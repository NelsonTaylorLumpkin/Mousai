using Mousai.Models;
using System.Collections.Generic;

namespace Mousai.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetCommentsByPost(int id);
        void Add(Comment comment);
        void Update(Comment comment);
        void Delete(int id);
    }
}
