function testimonyOpenPopup(element) {
    var videoSrc = element.getAttribute("data-video");
    let videoIframe = document.getElementById("testimony-popup-video");

    // Force reset first to stop previous video
    videoIframe.src = ""; // Clear the previous video
    setTimeout(() => {
        videoIframe.src = videoSrc; // Set the new video source
    }, 100);

    // Show modal
    document.getElementById('testimony-popup').style.display = 'block';
    document.getElementById('testimony-overlay').style.display = 'block';

    // Disable scrolling when modal is open
    document.body.classList.add("modal-open");
}

function testimonyClosePopup() {
    // Hide modal and overlay
    document.getElementById('testimony-popup').style.display = 'none';
    document.getElementById('testimony-overlay').style.display = 'none';

    // Reset the iframe video source to stop the video
    document.getElementById("testimony-popup-video").src = "";

    // Re-enable scrolling
    document.body.classList.remove("modal-open");
}

// Close modal when clicking on the overlay
document.getElementById('testimony-overlay').addEventListener('click', testimonyClosePopup);

// Keyboard support for closing modal with Esc
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        testimonyClosePopup();
    }
});
