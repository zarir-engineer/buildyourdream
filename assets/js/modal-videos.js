// horizontal scrolling
function disableHorizontalScroll() {
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
}

function enableHorizontalScroll() {
    document.body.style.overflowX = "";
    document.documentElement.style.overflowX = "";
}


// Services

function openPopup(element) {
    var keyword = element.getAttribute("data-keyword");
    var description = element.getAttribute("data-description");
    var image = element.getAttribute("data-image");
    var fulltext = element.getAttribute("data-fulltext");
    console.log('+++ keyword ', keyword);
    console.log('+++ description ', description);
    console.log('+++ image ', image);
    // Update modal content
    document.getElementById("popup-title").innerText = keyword;
    document.getElementById("popup-description").innerText = description || "More details coming soon...";
    document.getElementById("popup-modal").style.display = "block";

    if (image) {
        document.getElementById("popup-image").style.backgroundImage = "url(" + image + ")";
    }

    if (fulltext) {
        document.getElementById("popup-full-text").innerText = fulltext;
    }

    // Show modal
    document.getElementById("popup-content").style.display = "block";
    document.getElementById("overlay").style.display = "block";

    // Prevent background scrolling
    document.body.classList.add("modal-open");

    document.querySelectorAll(".background-element").forEach(el => el.style.display = "none");
}

function closePopup() {
    document.getElementById("popup-content").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    document.body.classList.remove("modal-open"); // Re-enable scrolling
    // Enable scrolling
    document.getElementById("popup-modal").style.display = "none";
}

// Testimonies

function testimonyOpenPopup(element) {
    var videoSrc = element.getAttribute("data-video");
    let videoIframe = document.getElementById("testimony-popup-video");

    // Force reset first to stop previous video
    videoIframe.src = "";
    setTimeout(() => {
        videoIframe.src = videoSrc;
    }, 100); // Small delay to ensure reset

    // Show modal
    document.getElementById("testimony-overlay").style.display = "block";
    document.getElementById("testimony-popup").style.display = "block";

    // Disable scrolling
    document.body.classList.add("modal-open");

    // Optional: disableHorizontalScroll();
}

function testimonyClosePopup() {
    // Hide modal
    document.getElementById("testimony-overlay").style.display = "none";
    document.getElementById("testimony-popup").style.display = "none";

    // Stop video playback by resetting the iframe source
    document.getElementById("testimony-popup-video").src = "";

    // Re-enable scrolling
    document.body.classList.remove("modal-open");

    // Optional: enableHorizontalScroll();
}

