using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mousai.Models;
using Mousai.Repositories;
using System;

namespace Mousai.Controllers
{
    public class CommentController : Controller
    {
        private readonly ICommentRepository _commentRepository;

        public CommentController(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Comment comment)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    //comment.CreateDateTime = DateTime.Now;
                    _commentRepository.Add(comment);
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", $"Unable to save changes. {ex.Message}");
                }
            }

            return RedirectToAction("Details", "Post", new { id = comment.PostId });
        }

        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Comment comment)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _commentRepository.Update(comment);
                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", $"Unable to save changes. {ex.Message}");
                }
            }

            return RedirectToAction("Details", "Post", new { id = comment.PostId });
        }

        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(int id)
        {
            try
            {
                _commentRepository.Delete(id);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", $"Unable to delete comment. {ex.Message}");
            }

            return RedirectToAction("Index", "Home");
        }
    }
}