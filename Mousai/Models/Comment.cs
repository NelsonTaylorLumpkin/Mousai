﻿namespace Mousai.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public int PostId { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; internal set; }
    }
}
