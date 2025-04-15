// Services

function servicesOpenPopup(element) {
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

function servicesClosePopup() {
    document.getElementById("popup-content").style.display = "none";
    document.getElementById("overlay").style.display = "none";
    document.body.classList.remove("modal-open"); // Re-enable scrolling
    // Enable scrolling
    document.getElementById("popup-modal").style.display = "none";
}
