document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ DOM is fully loaded");
  const commentForm = document.getElementById("comment-form");
  console.log("📝 Found comment form:", commentForm);

  const commentsContainer = document.getElementById("comments-container");
  const slug = window.location.pathname.split("/").filter(Boolean).join("-") + "-slug";

  const API_URL = "https://my-comments-backend.onrender.com";

  // Load comments
  async function loadComments() {
    try {
      const response = await fetch(`${API_URL}/comments/${slug}`);
      const comments = await response.json();
      displayComments(comments);
    } catch (err) {
      console.error("Failed to load comments:", err);
    }
  }

  // Render comments and replies
  function displayComments(comments) {
    commentsContainer.innerHTML = "";
    comments.forEach(comment => {
      const commentDiv = document.createElement("div");
      commentDiv.className = "comment border p-3 mb-2 rounded bg-gray-100";

      const name = document.createElement("strong");
      name.textContent = comment.name;

      const text = document.createElement("p");
      text.textContent = comment.comment;

      const replyBtn = document.createElement("button");
      replyBtn.textContent = "Reply";
      replyBtn.className = "text-sm text-blue-600 underline mt-2";
      replyBtn.addEventListener("click", () => showReplyForm(comment._id, commentDiv));

      commentDiv.appendChild(name);
      commentDiv.appendChild(text);
      commentDiv.appendChild(replyBtn);

      // Replies
      if (comment.replies && comment.replies.length) {
        const repliesDiv = document.createElement("div");
        repliesDiv.className = "ml-6 mt-2";
        comment.replies.forEach(reply => {
          const replyEl = document.createElement("div");
          replyEl.className = "p-2 border-l border-gray-400";

          const replyName = document.createElement("strong");
          replyName.textContent = reply.name + ": ";

          const replyText = document.createElement("span");
          replyText.textContent = reply.comment;

          replyEl.appendChild(replyName);
          replyEl.appendChild(replyText);
          repliesDiv.appendChild(replyEl);
        });
        commentDiv.appendChild(repliesDiv);
      }

      commentsContainer.appendChild(commentDiv);
    });
  }

  // Reply form
  function showReplyForm(parentId, container) {
    console.log("📥 showReplyForm triggered for ID:", parentId);
    const existingForm = container.querySelector(".reply-form");
    if (existingForm) return;

    const form = document.createElement("form");
    form.className = "reply-form mt-2";

    const nameInput = document.createElement("input");
    nameInput.placeholder = "Your name";
    nameInput.required = true;
    nameInput.className = "block mb-1 w-full border p-1";

    const commentInput = document.createElement("textarea");
    commentInput.placeholder = "Your reply";
    commentInput.required = true;
    commentInput.className = "block mb-1 w-full border p-1";

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Reply";
    submitBtn.className = "bg-blue-500 text-white px-2 py-1";
    submitBtn.type = "submit";

    form.appendChild(nameInput);
    form.appendChild(commentInput);
    form.appendChild(submitBtn);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      await postReply(parentId, nameInput.value, commentInput.value);
      loadComments();
    });

    container.appendChild(form);
  }

  // Submit comment
  if (commentForm) {
    commentForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const name = commentForm.elements["fields[name]"].value.trim();
      const comment = commentForm.elements["fields[comment]"].value.trim();

      if (!name || !comment) return;

      try {
        await fetch(`${API_URL}/comments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, comment, slug }),
        });
        commentForm.reset();
        loadComments();
      } catch (err) {
        console.error("Failed to post comment:", err);
      }
    });
  }

  // Submit reply
  async function postReply(parent_id, name, comment) {
    try {
      await fetch(`${API_URL}/comments/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, comment, parent_id }),
      });
    } catch (err) {
      console.error("Failed to post reply:", err);
    }
  }

  loadComments();
});
