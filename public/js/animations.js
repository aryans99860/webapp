// Animation for the table saw manual
document.addEventListener("DOMContentLoaded", function(event) {
    animateManual();
});

function animateManual() {
    // Animate the header
    const header = document.querySelector("header");
    header.style.opacity = "0";
    header.style.transition = "opacity 1s ease-in-out";
    setTimeout(() => {
        header.style.opacity = "1";
    }, 500);

    // Animate the main content section
    const mainContent = document.querySelector(".main-content");
    mainContent.style.opacity = "0";
    mainContent.style.transition = "opacity 1s ease-in-out";
    setTimeout(() => {
        mainContent.style.opacity = "1";
    }, 1000);

    // Animate the footer
    const footer = document.querySelector("footer");
    footer.style.opacity = "0";
    footer.style.transition = "opacity 1s ease-in-out";
    setTimeout(() => {
        footer.style.opacity = "1";
    }, 1500);
}
