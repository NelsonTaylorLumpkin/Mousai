using Microsoft.AspNetCore.Mvc;
using Mousai.Models;
using Mousai.Repositories;

namespace Mousai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FollowController : ControllerBase
    {
        private readonly IFollowRepository _followRepository;

        public FollowController(IFollowRepository followRepository)
        {
            _followRepository = followRepository;
        }

        [HttpPost]
        public ActionResult<Follow> AddFollow(Follow follow)
        {
            var newFollow = _followRepository.AddFollow(follow);
            return CreatedAtAction(nameof(follow), new { id = newFollow.Id }, newFollow);
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
    }
}
