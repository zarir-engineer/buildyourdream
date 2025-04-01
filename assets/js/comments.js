document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("commentForm");
    const messageBox = document.getElementById("commentMessage");
    const popup = document.getElementById("commentPopup");

    const slugElement = document.querySelector("[name='options[slug]']");
    if (slugElement) {
        const slug = slugElement.value;
        console.log("Calling loadComments for slug:", slug);
        loadComments(slug); // Ensure it runs on page load
    } else {
        console.error("Slug not found on the page!");
    }

    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Select fields using the correct names
        const name = document.querySelector("[name='fields[name]']").value.trim();
        const email = document.querySelector("[name='fields[email]']").value.trim();
        const comment = document.querySelector("[name='fields[comment]']").value.trim();
        const slug = document.querySelector("[name='options[slug]']")?.value || null;

        if (!name || !email || !comment) {
            alert("All fields are required!");
            return;
        }

        const commentData = { name, email, comment, slug };

        console.log("Sending commentData:", JSON.stringify(commentData)); // Debugging

        try {
            const response = await fetch("https://jekyll-comments-backend-production-8c02.up.railway.app/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(commentData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                messageBox.innerText = "Comment submitted successfully!";
                form.reset(); // Clear form fields
                popup.style.display = "block"; // Show confirmation

                // ✅ Call loadComments to refresh the comment list
                if (commentData.slug) {
                    loadComments(commentData.slug);
                }
            } else {
                throw new Error(result.message || "Error submitting comment.");
            }

        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    });
});

// Function to close the popup
function closePopup() {
    document.getElementById("commentPopup").style.display = "none";
}

// 🔥 LOAD COMMENTS INCLUDING REPLIES 🔥
async function loadComments(slug) {
    console.log("Loading comments for:", slug);

    if (!slug) {
        console.error("Slug is missing!");
        return;
    }

    try {
        const response = await fetch(`https://jekyll-comments-backend-production-8c02.up.railway.app/comments/${slug}?t=${Date.now()}`);
        if (!response.ok) throw new Error("Failed to fetch comments");

        const comments = await response.json();
        console.log("Fetched comments:", comments);

        const commentsContainer = document.querySelector(".comments");
        if (!commentsContainer) {
            console.error("Comments container not found!");
            return;
        }

        commentsContainer.innerHTML = ""; // Clear old comments

        if (!Array.isArray(comments) || comments.length === 0) {
            commentsContainer.innerHTML = "<p>No comments yet. Be the first to comment!</p>";
            return;
        }

        comments.forEach(comment => {
            const commentElement = createCommentElement(comment);
            commentsContainer.appendChild(commentElement);
        });

        console.log("✅ Comments updated successfully");

    } catch (error) {
        console.error("Error loading comments:", error);
    }
}

// 🔥 CREATE COMMENT ELEMENT WITH REPLIES 🔥
function createCommentElement(comment) {
    const formattedDate = comment.timestamp
        ? new Date(comment.timestamp).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
        : "Unknown Date";

    const li = document.createElement("li");
    li.classList.add("comment", "comment-item");
    li.setAttribute("data-comment-id", comment._id);

    li.innerHTML = `
        <div class="comment-box">
            <img src="/assets/images/avatar.png" class="avatar" alt="">
            <div class="comment-box__body">
                <h5 class="comment-box__details">${comment.name} <span>${formattedDate}</span></h5>
                <p>${comment.comment}</p>
            </div>
            <div class="comment-footer">
                <a class="comment-reply-link" href="#" onclick="showReplyForm('${comment._id}')">Reply</a>
            </div>
        </div>
        <ul class="replies"></ul>
        <div id="reply-form-${comment._id}" class="reply-form hidden">
          <form onsubmit="submitReply(event, '${comment._id}')">
            <input type="hidden" name="parent_id" value="${comment._id}">
            <div class="group-row">
              <div class="group">
                <textarea class="textarea" name="reply_comment" rows="2" placeholder="Reply"></textarea>
              </div>
            </div>
            <div class="group-row">
              <div class="group">
                <input type="text" name="reply_name" class="input" placeholder="Name" required>
              </div>
              <div class="group">
                <input type="email" name="reply_email" class="input" placeholder="Email (not shown)" required>
              </div>
            </div>
            <div class="group-row">
              <div class="group">
                <button type="submit" class="btn">Submit</button>
              </div>
            </div>
          </form>
        </div>
    `;

    if (comment.replies && comment.replies.length > 0) {
        const repliesContainer = li.querySelector(".replies");
        comment.replies.forEach(reply => {
            const replyElement = createReplyElement(reply);
            repliesContainer.appendChild(replyElement);
        });
    }

    return li;
}

// 🔥 CREATE REPLY ELEMENT 🔥
function createReplyElement(reply) {
    const formattedDate = reply.timestamp
        ? new Date(reply.timestamp).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
        : "Unknown Date";

    const li = document.createElement("li");
    li.classList.add("comment", "comment-item", "reply");

    li.innerHTML = `
        <div class="comment-box">
            <img src="/assets/images/avatar.png" class="avatar" alt="">
            <div class="comment-box__body">
                <h5 class="comment-box__details">${reply.name} <span>${formattedDate}</span></h5>
                <p>${reply.comment}</p>
            </div>
        </div>
    `;

    return li;
}

// 🔥 SHOW REPLY FORM 🔥
function showReplyForm(commentId) {
    event.preventDefault();  // Stops the page from jumping to the top

    // Hide all other reply forms first
    document.querySelectorAll(".reply-form").forEach(form => form.classList.add("reply-hidden"));

    // Show the selected reply form
    const replyForm = document.getElementById(`reply-form-${commentId}`);
    if (replyForm) {
        replyForm.classList.remove("reply-hidden");
    }
}

// 🔥 SUBMIT REPLY 🔥
function submitReply(event, commentId) {
    event.preventDefault();

    const replyForm = document.getElementById(`reply-form-${commentId}`);
    const formData = new FormData(replyForm);

    const replyData = {
        parent_id: commentId,
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
            loadComments(document.querySelector("[name='options[slug]']").value);
        } else {
            alert("Error submitting reply.");
        }
    })
    .catch(error => console.error("Error submitting reply:", error));
}
