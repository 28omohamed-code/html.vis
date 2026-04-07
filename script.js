// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission (placeholder - in real implementation, send to server)
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
});

// Image gallery lightbox using Bootstrap modal with keyboard navigation
const galleryImages = Array.from(document.querySelectorAll('.gallery img'));
let currentImageIndex = 0;
const modalElement = document.getElementById('galleryModal');
const modalImg = document.getElementById('galleryModalImg');
const modalCaption = document.getElementById('galleryModalCaption');
const modalInstance = new bootstrap.Modal(modalElement);

function showGalleryImage(index) {
    if (index < 0) index = galleryImages.length - 1;
    if (index >= galleryImages.length) index = 0;
    currentImageIndex = index;
    const selected = galleryImages[currentImageIndex];
    modalImg.src = selected.src;
    modalImg.alt = selected.alt;
    modalCaption.textContent = selected.alt;
}

galleryImages.forEach((img, idx) => {
    img.addEventListener('click', function(event) {
        event.preventDefault();
        showGalleryImage(idx);
        modalInstance.show();
    });
});

// Keyboard arrows navigation in modal
modalElement.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showGalleryImage(currentImageIndex - 1);
    } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        showGalleryImage(currentImageIndex + 1);
    }
});

// Click arrows in modal
document.getElementById('galleryPrev').addEventListener('click', () => showGalleryImage(currentImageIndex - 1));
document.getElementById('galleryNext').addEventListener('click', () => showGalleryImage(currentImageIndex + 1));

// Keep track of active image index in case the modal is opened from elsewhere
modalElement.addEventListener('shown.bs.modal', () => {
    modalElement.focus();
});

// Ensure gallery links do not jump when image is clicked
document.querySelectorAll('.gallery-link').forEach(link => {
    link.addEventListener('click', event => event.preventDefault());
});