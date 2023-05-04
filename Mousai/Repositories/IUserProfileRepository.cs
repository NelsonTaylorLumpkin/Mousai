using Mousai.Models;
using System.Collections.Generic;


namespace Mousai.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetUsers();
        UserProfile GetById(int id);
       
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string id);
        void Update(UserProfile user);
        void Delete(int id);



    }
}


