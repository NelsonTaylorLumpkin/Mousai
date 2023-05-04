using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

using System;
using Mousai.Models;
using Mousai.Repositories;

namespace Tabloid.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class PostController : Controller
    {
        private readonly IPostRepository _postRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly ICommentRepository _commentRepository;
        private readonly IFollowRepository _followRepository;
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

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_postRepository.GetAllPublishedPosts());
        }

       


        [HttpPost("Add")]
        public IActionResult Post(Post post)
        {
            UserProfile user = GetCurrentUserProfile();

            
            {
                
                post.CreatedAt = DateTime.Now;
                post.UserId = user.Id;

                _postRepository.Add(post);
            }
          
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpGet("MyPosts")]
        public IActionResult MyPosts()
        {
            var currentUser = GetCurrentUserProfile();
            var userId = currentUser.Id;
            var myPosts = _postRepository.GetPostsByUserId(userId);
            return Ok(myPosts);
        }

       

        [HttpPost("AddComment")]
        public IActionResult Post(Comment comment)
        {
            UserProfile currentUser = GetCurrentUserProfile();
            comment.UserProfileId = currentUser.Id;

            //comment.CreatedAt = DateTime.Now;

            _commentRepository.Add(comment);

            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        [HttpPut("EditComment/{id}")]
        public IActionResult Put(int id, Comment comment)
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

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        [HttpGet("GetPostDetails")]
        public IActionResult GetPostDetails(int id)
        {
            Post post = _postRepository.GetPublishedPostById(id);
            if (post == null)
            {
                return NotFound();
            }
            else
            {
                Post postDetails = new Post()
                {
                    Title = post.Title,
                    PostImage = post.PostImage,
                    Body = post.Body,
                    CreatedAt = post.CreatedAt,
                    UserProfile = new UserProfile()
                    {
                        PenName = post.UserProfile.PenName
                    }
                };
            }
            return Ok(post);
        }
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _postRepository.DeletePost(id);


        }
        [HttpPut("Edit")]
        public IActionResult Edit(int id, Post post)
        {


            _postRepository.UpdatePost(post);

            return NoContent();


        }
    }
}