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
    var keyword = element.getAttribute("data-keyword"); // Get the service name
    var description = element.getAttribute("data-description"); // Get description (optional)
    var image = element.getAttribute("data-image"); // Get image URL (optional)

    // Update modal content
    document.getElementById("popup-title").innerText = keyword;
    document.getElementById("popup-description").innerText = description || "More details coming soon...";

    // Update image if provided
    if (image) {
        document.getElementById("popup-image").style.backgroundImage = "url(" + image + ")";
    }

    // Show modal
    document.getElementById("popup-content").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    document.body.classList.add("modal-open"); // Prevents background scrolling
   // Disable scrolling
    document.body.classList.add("modal-open");
    document.querySelectorAll(".background-element").forEach(el => el.style.display = "none");
}

function closePopup() {
    document.getElementById("popup-content").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    document.body.classList.remove("modal-open"); // Re-enable scrolling
    // Enable scrolling
    document.body.classList.remove("modal-open");
    document.querySelectorAll(".background-element").forEach(el => el.style.display = "block");
}

// Testimonies

function testimonyOpenPopup(element) {
    var videoSrc = element.getAttribute("data-video");
    let videoIframe = document.getElementById("testimony-popup-video");
    videoIframe.src = ""; // Force reset first
    setTimeout(() => {
        videoIframe.src = videoSrc;
    }, 100); // Small delay to ensure reset

    // Show modal
    document.getElementById("testimony-overlay").style.display = "block";
    document.getElementById("testimony-popup").style.display = "block";

   // Disable scrolling
    document.body.classList.add("modal-open");

//  Disable Horizontal scrolling
    window.testimonyOpenPopup = function (element) {
        document.getElementById("testimony-overlay").style.display = "block";
        document.getElementById("testimony-popup").style.display = "block";
        disableHorizontalScroll();
    };

}

function testimonyClosePopup() {
    // Hide modal
    document.getElementById("testimony-overlay").style.display = "none";
    document.getElementById("testimony-popup").style.display = "none";
    document.body.classList.add("modal-open"); // Prevents background scrolling

    // Stop video playback by resetting the iframe source
    document.getElementById("testimony-popup-video").src = "";

    // Enable vertical scrolling
    document.body.classList.remove("modal-open");

    // Enable horizontal scrolling
    window.testimonyClosePopup = function () {
        document.getElementById("testimony-overlay").style.display = "none";
        document.getElementById("testimony-popup").style.display = "none";
        document.body.classList.remove("modal-open"); // Re-enable scrolling
        enableHorizontalScroll();
    };

    // ensure video is closed
    let videoIframe = document.getElementById("testimony-popup-video");
    videoIframe.src = "";  // Reset src to stop playing

}

