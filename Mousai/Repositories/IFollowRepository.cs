
using Mousai.Models;

namespace Mousai.Repositories
{
    public interface IFollowRepository
    {
        Follow AddFollow(Follow follow);
        Follow GetFollowByUserIdAndProviderId(int followingUserId, int followedUserId);
    }
}
