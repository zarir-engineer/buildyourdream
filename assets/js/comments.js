document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("commentForm");
    const messageBox = document.getElementById("commentMessage");
    const popup = document.getElementById("commentPopup");

    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Extract data from the form
        const formData = new FormData(form);
        const commentData = {
            name: formData.get("name"),  // Ensure your form has an input named "name"
            email: formData.get("email"),  // Ensure your form has an input named "email"
            comment: formData.get("comment"),  // Ensure your form has a textarea named "comment"
            slug: form.dataset.slug  // Assuming the post/page has a data attribute for slug
        };

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
                form.reset(); // Clear the form fields
                popup.style.display = "block"; // Show popup

                // Optionally reload comments without refreshing
                if (commentData.slug) {
                    loadComments(commentData.slug);
                }
            } else {
                throw new Error(result.message || "Error submitting comment.");
            }

        } catch (error) {
            console.error("Error:", error);
            messageBox.innerText = "An error occurred. Please try again.";
            popup.style.display = "block";
        }
    });
});

// Function to close the popup
function closePopup() {
    document.getElementById("commentPopup").style.display = "none";
}

// (Optional) Function to reload comments without refreshing
async function loadComments(slug) {
    console.log("Loading comments for slug:", slug); // Debugging log

    if (!slug) {
        console.error("Slug is missing!");
        return;
    }

    try {
        const response = await fetch(`https://jekyll-comments-backend-production-8c02.up.railway.app/comments/${slug}?t=${Date.now()}`);
        if (!response.ok) throw new Error("Failed to fetch comments");
        const comments = await response.json();

        console.log("+++ Fetched comments:", comments); // Debugging log

        const commentsContainer = document.querySelector(".comments");
        if (!commentsContainer) {
            console.error("Comments container not found!");
            return;
        }

        commentsContainer.innerHTML = ""; // Clear old comments

        comments.forEach(comment => {
            const commentItem = document.createElement("li");
            commentItem.classList.add("comment", "comment-item");
            commentItem.innerHTML = `
                <div class="comment-box">
                    <img src="/assets/images/avatar.png" class="avatar" alt="">
                    <div class="comment-box__body">
                        <h5 class="comment-box__details">${comment.name} <span>${new Date(comment.date).toLocaleDateString()}</span></h5>
                        <p>${comment.comment}</p>
                    </div>
                </div>
            `;
            commentsContainer.appendChild(commentItem);
        });

        console.log("Comments updated successfully");

    } catch (error) {
        console.error("Error loading comments:", error);
    }
}
