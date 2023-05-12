
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System;
using Mousai.Models;
using Mousai.Repositories;

namespace Mousai.Controllers
{

    [Route("api/[controller]")]
    //[Authorize]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly ICommentRepository _commentRepository;
        private readonly IFollowRepository _followRepository;

        public object GetCommentById { get; private set; }

        public PostController(IPostRepository postRepository,
                              IUserProfileRepository userProfileRepository,
                              ICommentRepository commentRepository,
                              IFollowRepository followRepository)
        {
            _postRepository = postRepository;
            _userProfileRepository = userProfileRepository;
            _commentRepository = commentRepository;
            _followRepository = followRepository;
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            return Ok(_postRepository.GetAllPublishedPosts());
        }

        [HttpPost("Add")]
        public IActionResult AddPost(Post post)
        {
            UserProfile user = GetCurrentUserProfile();
            post.CreatedAt = DateTime.Now;
            post.UserId = user.Id;
            _postRepository.Add(post);
            return CreatedAtAction(nameof(GetPublishedPostById), new { id = post.Id }, post);
        }


        [HttpGet("MyPosts")]
        public IActionResult GetMyPosts()
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser == null)
            {
                return Unauthorized();
            }
            var userId = currentUser.Id;
            var myPosts = _postRepository.GetPostsByUserId(userId);
            return Ok(myPosts);
        }

        [HttpPost("AddComment/{id}")]
        public IActionResult AddComment(Comment comment)
        {
            var currentUser = GetCurrentUserProfile();
            if (currentUser == null)
            {
                return Unauthorized();
            }

            comment.UserProfileId = currentUser.Id;
            _commentRepository.Add(comment);
            return CreatedAtAction(nameof(GetCommentById), new { id = comment.Id }, comment);
        }

        [HttpGet("GetComments/{postId}")]
        public IActionResult GetCommentsByPost(int postId)
        {
            var comments = _commentRepository.GetCommentsByPost(postId);
            return Ok(comments);
        }

        [HttpPut("EditComment/{id}")]
        public IActionResult EditComment(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }

            _commentRepository.Update(comment);
            return NoContent();
        }

        [HttpDelete("DeleteComment/{id}")]
        public IActionResult DeleteComment(int id)
        {
            _commentRepository.Delete(id);
            return NoContent();
        }
        [HttpGet("{id}")]
        public IActionResult GetPublishedPostById(int id)
        {
            var post = _postRepository.GetPublishedPostById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }


        [HttpGet("{id}/details")]
        public IActionResult GetPostDetails(int id)
        {
            var post = _postRepository.GetPublishedPostById(id);
            if (post == null)
            {
                return NotFound();
            }

            var userProfile = _userProfileRepository.GetById(post.UserId);
            var postDetails = new
            {
                title = post.Title,
                postImage = post.PostImage,
                body = post.Body,
                createdAt = post.CreatedAt,
                userProfile = new
                {
                    id = userProfile.Id,
                    penName = userProfile.PenName
                }
            };

            return Ok(postDetails);
        }
        [HttpDelete("{id}")]
        public IActionResult DeletePost(int id)
        {
            _postRepository.DeletePost(id);
            return NoContent();
        }

        [HttpPut("Edit/{id}")]
        public IActionResult EditPost(int id, Post post)
        {
            post.Id = id;
            _postRepository.UpdatePost(post);
            return NoContent();
        }


        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (firebaseUserId == null) return null;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
