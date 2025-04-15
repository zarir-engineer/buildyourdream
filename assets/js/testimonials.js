function testimonyOpenPopup(element) {
    var videoSrc = element.getAttribute("data-video");
    let videoIframe = document.getElementById("testimony-popup-video");

    // Force reset first to stop previous video
    videoIframe.src = "";
    setTimeout(() => {
        videoIframe.src = videoSrc;
    }, 100);

    // Show modal (Bootstrap modal)
    $('#testimony-popup').modal('show');
    $('#testimony-overlay').show();

    // Disable scrolling
    document.body.classList.add("modal-open");
}

function testimonyClosePopup() {
    // Hide modal (Bootstrap modal)
    $('#testimony-popup').modal('hide');
    $('#testimony-overlay').hide();

    // Stop video playback by resetting the iframe source
    document.getElementById("testimony-popup-video").src = "";

    // Re-enable scrolling
    document.body.classList.remove("modal-open");
}

// Keyboard support for closing modal with Esc
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        testimonyClosePopup();
    }
});
