using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Mousai.Models
{
    public class UserProfile
    {
        public int Id { get; set; }

        [Required]
        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        public string PenName { get; set; }

        public string ProfileImage { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<Post> Posts { get; internal set; }
    }
}