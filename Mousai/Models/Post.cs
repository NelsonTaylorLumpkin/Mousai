using Azure;
using System.Collections.Generic;
using System.Reflection.Metadata;
using System;
using System.ComponentModel.DataAnnotations;

namespace Mousai.Models
{
    public class Post
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Body { get; set; }

        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }
        public string PostImage { get; set; }

        public UserProfile UserProfile { get; set; }
    }
}
//using Azure;
//using System.Collections.Generic;
//using System.Reflection.Metadata;
//using System;

//namespace Mousai.Models
//{
//    public class Post
//    {
//        public int Id { get; set; }
//        public string Title { get; set; }
//        public string Body { get; set; }
//        public DateTime CreatedAt { get; set; }
//        public int UserId { get; set; }
//        public string PostImage { get; set; }

//        public UserProfile UserProfile { get; set; }

//    }
//}
