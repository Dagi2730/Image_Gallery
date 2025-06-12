document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const images = document.querySelectorAll(".gallery-item");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const closeButton = document.querySelector(".close");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const menuButton = document.querySelector(".menu-btn");
    const filterContainer = document.querySelector(".filter-container");

    let currentIndex = 0;

    // Toggle menu visibility for mobile screens
    menuButton.addEventListener("click", () => {
        filterContainer.style.display = filterContainer.style.display === "none" ? "flex" : "none";
    });

    // Image Filtering Functionality
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            images.forEach(img => {
                img.style.display = (filter === "all" || img.dataset.category === filter) ? "block" : "none";
            });
        });
    });

    // Lightbox Functionality (Open Image)
    images.forEach((img, index) => {
        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
            currentIndex = index;
        });
    });

    // Navigate to Previous Image
    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            lightboxImg.src = images[currentIndex].src;
        }
    });

    // Navigate to Next Image
    nextButton.addEventListener("click", () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            lightboxImg.src = images[currentIndex].src;
        }
    });

    // Fix Close Button Not Working Issue
    closeButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent interference from parent div
        lightbox.style.display = "none";
    });

    // Close Lightbox when clicking outside the image
    lightbox.addEventListener("click", (event) => {
        if (event.target !== lightboxImg && event.target !== prevButton && event.target !== nextButton) {
            lightbox.style.display = "none";
        }
    });

    // Close Lightbox when pressing "Escape" key
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            lightbox.style.display = "none";
        } else if (event.key === "ArrowLeft") {
            prevButton.click();
        } else if (event.key === "ArrowRight") {
            nextButton.click();
        }
    });
});