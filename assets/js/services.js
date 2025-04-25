// Services - Bootstrap Modal Logic

function servicesOpenPopup(element) {
    const keyword = element.getAttribute("data-keyword");
    const description = element.getAttribute("data-description") || "More details coming soon...";
    const image = element.getAttribute("data-image");
    const fulltext = element.getAttribute("data-fulltext");

    // Update modal content
    document.getElementById("popup-title").innerText = keyword;
    document.getElementById("popup-description").innerText = description;
    document.getElementById("popup-image").src = image || "";
    document.getElementById("popup-full-text").innerText = fulltext || "";

    // Show Bootstrap modal
    const popupModal = new bootstrap.Modal(document.getElementById('popup-modal'), {
        backdrop: false,
        keyboard: true // optional: allows Esc to close
    });

    popupModal.show();
}

function servicesClosePopup() {
    const modalEl = document.getElementById("popup-modal");
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) {
        modalInstance.hide();
    }
}
