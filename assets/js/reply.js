function showReplyForm(commentId) {
  // Hide all other reply forms first
  document.querySelectorAll(".reply-form").forEach(form => form.classList.add("hidden"));

  // Show the selected reply form
  const replyForm = document.getElementById(`reply-form-${commentId}`);
  if (replyForm) {
    replyForm.classList.remove("hidden");
  }
}

function submitReply(event, commentId) {
  event.preventDefault(); // Prevent page refresh

  const replyForm = document.getElementById(`reply-form-${commentId}`);
  const formData = new FormData(replyForm);

  const replyData = {
    parent_id: commentId,  // Send as parent_id
    comment: formData.get("reply_comment").trim(),
    name: formData.get("reply_name").trim(),
    email: formData.get("reply_email").trim(),
  };

  if (!replyData.comment || !replyData.name || !replyData.email) {
    alert("All fields are required!");
    return;
  }

  fetch("https://jekyll-comments-backend-production-8c02.up.railway.app/comments/reply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(replyData),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("Reply submitted successfully!");
        replyForm.style.display = "none"; // Hide the form

        // Add reply dynamically
        const parentComment = document.querySelector(`[data-comment-id="${commentId}"]`);
        const newReply = document.createElement("li");
        newReply.classList.add("comment", "comment-item", "reply");
        newReply.innerHTML = `
          <div class="comment-box">
            <img src="/assets/images/avatar.png" class="avatar" alt="">
            <div class="comment-box__body">
              <h5 class="comment-box__details">${replyData.name} <span>Just now</span></h5>
              <p>${replyData.comment}</p>
            </div>
          </div>
        `;

        let replyList = parentComment.querySelector(".replies");
        if (!replyList) {
          replyList = document.createElement("ul");
          replyList.classList.add("replies");
          parentComment.appendChild(replyList);
        }
        replyList.appendChild(newReply);
      } else {
        alert("Error submitting reply.");
      }
    })
    .catch(error => {
      console.error("Error submitting reply:", error);
      alert("Error submitting reply.");
    });
}
