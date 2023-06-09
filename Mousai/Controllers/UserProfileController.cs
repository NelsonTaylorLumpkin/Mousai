﻿using Microsoft.AspNetCore.Mvc;
using System;
using Mousai.Repositories;
using Mousai.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Mousai.Controllers
{
   
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
   
    public class UserProfileController : ControllerBase
    {
        public IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        // GET: api/<UserProfileController>
       
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetUsers());
        }

        // GET api/<UserProfileController>/5
        
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var user = _userProfileRepository.GetById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // GET api/<UserProfileController>/firebase/{id}
        [HttpGet("Me")]
        public IActionResult Me()
        {
            var userProfile = GetCurrentUserProfile();
            if (userProfile == null)
            {
                return NotFound();
            }

            return Ok(userProfile);
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }
        [HttpGet("firebase/{id}")]
        public IActionResult GetByFirebaseUserId(string id)
        {
            var user = _userProfileRepository.GetByFirebaseUserId(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // POST api/<UserProfileController>
        [HttpPost]
        public IActionResult Post(UserProfile user)
        {
            _userProfileRepository.Add(user);
            return CreatedAtAction("Get", new { id = user.Id }, user);
        }

        // PUT api/<UserProfileController>/5
        
        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _userProfileRepository.Update(user);
            return NoContent();
        }

        // DELETE api/<UserProfileController>/5
        
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userProfileRepository.Delete(id);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
