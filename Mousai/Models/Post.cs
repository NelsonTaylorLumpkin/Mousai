using Azure;
using System.Collections.Generic;
using System.Reflection.Metadata;
using System;

namespace Mousai.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }
        public string PostImage { get; set; }

        public UserProfile UserProfile { get; set; }

    }
}
