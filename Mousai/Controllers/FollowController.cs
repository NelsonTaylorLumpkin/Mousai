
using Microsoft.AspNetCore.Mvc;
using Mousai.Models;
using Mousai.Repositories;
using System.Security.Claims;

namespace Mousai.Controllers
{
    [Route("api/[controller]")]

    [ApiController]
    public class FollowController : ControllerBase
    {
        private readonly IFollowRepository _followRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public FollowController(IFollowRepository followRepository, IUserProfileRepository userProfileRepository)
        {
            _followRepository = followRepository;
            _userProfileRepository = userProfileRepository;

        }

        [HttpGet("AddFollow/{Id}")]
        public ActionResult<Follow> AddFollow(int Id)
        {
            var currentUser = GetCurrentUserProfile();
            var follow = new Follow 
            { 
                FollowingUserId = currentUser.Id,
                FollowedUserId = Id
                //You must remember this, a kiss is just a kiss
            };
            
            var newFollow = _followRepository.AddFollow(follow);
            return CreatedAtAction(nameof(AddFollow), new { id = newFollow.Id }, newFollow);
        }

        [HttpGet("{followingUserId}/{followedUserId}")]
        public ActionResult<Follow> GetFollow(int followingUserId, int followedUserId)
        {
            var follow = _followRepository.GetFollowByUserIdAndProviderId(followingUserId, followedUserId);
            if (follow == null)
            {
                return NotFound();
            }
            return follow;
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
