document.addEventListener("DOMContentLoaded", function () {
  const commentForm = document.getElementById("comment-form");
  const commentsContainer = document.getElementById("comments-container");

  const slug = window.location.pathname.split("/").filter(Boolean).join("-") + "-slug";
  const API_URL = "https://jekyll-comments-backend-production-8c02.up.railway.app";

  if (commentForm) {
    commentForm.addEventListener("submit", handleFormSubmit);
  }

  // Load all comments
  async function loadComments() {
    try {
      const res = await fetch(`${API_URL}/comments/${slug}`);
      const comments = await res.json();
      renderComments(comments);
    } catch (err) {
      console.error("❌ Failed to load comments:", err);
    }
  }

  function createCommentForm() {
    const form = document.createElement("form");
    form.id = "comment-form";
    form.className = "comment-form";

    form.innerHTML = `
      <input type="text" id="name" placeholder="Name" required class="block mb-2 w-full" />
      <textarea id="comment" placeholder="Comment" required class="block mb-2 w-full"></textarea>
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    `;

    form.addEventListener("submit", handleFormSubmit); // attach your handler
    return form;
  }

//   Render comment list
  function renderComments(comments) {
    const commentsList = document.getElementById("comments-list");
    commentsList.innerHTML = ""; // 🔁 Only clear the comment list, not the form

    comments.forEach(comment => {
      const commentEl = document.createElement("div");
      commentEl.className = "comment border p-3 mb-3 bg-gray-50 rounded";

      const nameEl = document.createElement("strong");
      nameEl.textContent = comment.name;

      const textEl = document.createElement("p");
      textEl.textContent = comment.comment;

      const replyBtn = document.createElement("button");
      replyBtn.textContent = "Reply";
      replyBtn.className = "text-sm text-blue-600 underline mt-2";
      replyBtn.addEventListener("click", () => showReplyForm(comment._id, commentEl));

      commentEl.appendChild(nameEl);
      commentEl.appendChild(textEl);
      commentEl.appendChild(replyBtn);

      // Display replies if any
      if (comment.replies && comment.replies.length > 0) {
        const repliesWrapper = document.createElement("div");
        repliesWrapper.className = "ml-4 mt-2 space-y-2";

        comment.replies.forEach(reply => {
          const replyDiv = document.createElement("div");
          replyDiv.className = "reply border-l-2 pl-2 text-sm text-gray-700";

          const replyName = document.createElement("strong");
          replyName.textContent = reply.name + ": ";

          const replyText = document.createElement("span");
          replyText.textContent = reply.comment;

          replyDiv.appendChild(replyName);
          replyDiv.appendChild(replyText);
          repliesWrapper.appendChild(replyDiv);
        });

        commentEl.appendChild(repliesWrapper);
      }

      commentsList.appendChild(commentEl);
    });
  }


  // Show reply form under a comment
  function showReplyForm(parentId, container) {
    if (container.querySelector(".reply-form")) return;

    const form = document.createElement("form");
    form.className = "reply-form mt-3 space-y-2";

    const nameInput = document.createElement("input");
    nameInput.placeholder = "Your name";
    nameInput.required = true;
    nameInput.className = "block w-full border px-2 py-1";

    const commentInput = document.createElement("textarea");
    commentInput.placeholder = "Your reply";
    commentInput.required = true;
    commentInput.className = "block w-full border px-2 py-1";

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit Reply";
    submitBtn.className = "bg-blue-500 text-white px-3 py-1 rounded";
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

  // Handle comment form submission
  function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const name = commentForm.elements["fields[name]"].value.trim();
    const comment = commentForm.elements["fields[comment]"].value.trim();

    if (!name || !comment) return;

    fetch(`${API_URL}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, comment, slug }),
    })
      .then(() => {
        form.reset();
        loadComments();
      })
      .catch(err => {
        console.error("❌ Failed to post comment:", err);
      });
  }

  // Submit a reply to the backend
  async function postReply(parent_id, name, comment) {
    try {
      await fetch(`${API_URL}/comments/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parent_id, name, comment }),
      });
    } catch (err) {
      console.error("❌ Failed to post reply:", err);
    }
  }

  loadComments();
});
