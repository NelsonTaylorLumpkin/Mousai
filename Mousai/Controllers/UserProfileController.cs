using Microsoft.AspNetCore.Mvc;
using System;
using Mousai.Repositories;
using Mousai.Models;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Mousai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        // GET: api/<UserProfileController>
        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetUsers());
        }

        // GET api/<UserProfileController>/5
        [Authorize]
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
        [Authorize]
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
        [Authorize]
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
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userProfileRepository.Delete(id);
            return NoContent();
        }
    }
}
//using Microsoft.AspNetCore.Mvc;
//using System;
//using Mousai.Repositories;
//using Mousai.Models;
//using Microsoft.AspNetCore.Authorization;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace Mousai.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class UserProfileController : ControllerBase
//    {
//        private readonly IUserProfileRepository _userProfileRepository;
//        public UserProfileController(IUserProfileRepository userProfileRepository)
//        {
//            _userProfileRepository = userProfileRepository;
//        }

//        // GET: api/<ValuesController>
//        [Authorize]
//        [HttpGet]
//        public IActionResult Get()
//        {
//            return Ok(_userProfileRepository.GetUsers());
//        }

//        // GET api/<ValuesController>/5
//        [Authorize]
//        [HttpGet("{id}")]
//        public IActionResult Get(int id)
//        {
//            var user = _userProfileRepository.GetById(id);
//            if (user == null) 
//            { 
//                return NotFound();
//            }
//            return Ok(user);
//        }

//        [Authorize]
//        [HttpGet]
//        public IActionResult GetByFirebaseUserId(string id) 
//        {
//            var user = _userProfileRepository.GetByFirebaseUserId(id);
//            if (user == null) 
//            {
//                return NotFound();
//            }
//            return Ok(user);

//        }

//        // POST api/<ValuesController>
//        [HttpPost]
//        public IActionResult Post(UserProfile user)
//        {
//            _userProfileRepository.Add(user);
//            return CreatedAtAction("Get", new {id = user.Id}, user);
//        }

//        // PUT api/<ValuesController>/5
//        [Authorize]
//        [HttpPut("{id}")]
//        public IActionResult Put(int id, UserProfile user)
//        {
//            if (id != user.Id) 
//            {
//                return BadRequest();
//            }

//            _userProfileRepository.Update(user);
//            return NoContent();
//        }

//        // DELETE api/<ValuesController>/5
//        [Authorize]
//        [HttpDelete("{id}")]
//        public IActionResult Delete(int id)
//        {
//            _userProfileRepository.Delete(id);
//            return NoContent();
//        }
//    }
//}
