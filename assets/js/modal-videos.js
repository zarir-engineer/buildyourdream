// horizontal scrolling
function disableHorizontalScroll() {
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
}

function enableHorizontalScroll() {
    document.body.style.overflowX = "";
    document.documentElement.style.overflowX = "";
}

function parseMarkdown(mdText) {
    return mdText
        .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-bold mb-4">$1</h1>')
        .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mb-3">$1</h2>')
        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-medium mb-2">$1</h3>')
        .replace(/\n/gim, '<br/>');
}


// Services

function openPopup(element) {
    const keyword = element.getAttribute("data-keyword");
    const description = element.getAttribute("data-description");
    const image = element.getAttribute("data-image");
    const mdfile = element.getAttribute("data-mdfile");

    // Update static content
    document.getElementById("popup-title").innerText = keyword;
    document.getElementById("popup-description").innerText = description || "More details coming soon...";
    if (image) {
        document.getElementById("popup-image").style.backgroundImage = "url(" + image + ")";
    }

    // Load and render Markdown if available
    const mdContainer = document.getElementById("popup-mdtext");
    if (mdfile) {
        fetch(mdfile)
            .then(res => res.text())
            .then(md => {
                mdContainer.innerHTML = marked.parse(md);  // Using marked.js for markdown parsing
            })
            .catch(err => {
                mdContainer.innerHTML = "<p style='color:red;'>Could not load content.</p>";
                console.error("Markdown load error:", err);
            });
    } else {
        mdContainer.innerHTML = "";  // Clear markdown content if none provided
    }

    // Show the modal and overlay with a solid black background
    document.getElementById("popup-content").style.display = "block";
    document.getElementById("overlay").style.display = "block";  // Full opaque overlay

    // Lock body scroll and prevent interaction with the background content
    document.body.classList.add("modal-open");

    // Optionally, disable background elements (e.g., images) if needed
    document.querySelectorAll(".background-element").forEach(el => el.style.display = "none");
}

function closePopup() {
    // Hide the modal and overlay
    document.getElementById("popup-content").style.display = "none";
    document.getElementById("overlay").style.display = "none";

    // Re-enable scrolling and interaction with the background content
    document.body.classList.remove("modal-open");
    document.querySelectorAll(".background-element").forEach(el => el.style.display = "block");
}

// Testimonies

function disableHorizontalScroll() {
    document.body.style.overflowX = "hidden";
}

function enableHorizontalScroll() {
    document.body.style.overflowX = "";
}

function testimonyOpenPopup(element) {
    const videoSrc = element.getAttribute("data-video");
    const videoIframe = document.getElementById("testimony-popup-video");

    // Reset and load video
    videoIframe.src = "";
    setTimeout(() => {
        videoIframe.src = videoSrc;
    }, 100);

    // Show modal
    document.getElementById("testimony-overlay").style.display = "block";
    document.getElementById("testimony-popup").style.display = "block";

    // Disable scrolling
    document.body.classList.add("modal-open");

    // ✅ Disable horizontal scroll (if this function is defined)
    if (typeof disableHorizontalScroll === "function") {
        disableHorizontalScroll();
    }
}

function testimonyClosePopup() {
    // Hide modal
    document.getElementById("testimony-overlay").style.display = "none";
    document.getElementById("testimony-popup").style.display = "none";

    // Stop video playback
    const videoIframe = document.getElementById("testimony-popup-video");
    videoIframe.src = "";

    // Re-enable scrolling
    document.body.classList.remove("modal-open");

    // ✅ Re-enable horizontal scroll
    enableHorizontalScroll();
}

