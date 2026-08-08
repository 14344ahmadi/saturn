document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const thumbnails = document.querySelectorAll('.thumbnail');
    let currentIndex = 0;

    function getSlideWidth() {
        return document.querySelector('.slide').clientWidth;
    }

    function showSlide(index) {
        const slider = document.querySelector('.slides');
        const slideWidth = getSlideWidth();

        slider.style.transform = `translateX(-${index * slideWidth}px)`;

        thumbnails.forEach((thumbnail, idx) => {
            thumbnail.classList.toggle('active', idx === index);
        });
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            currentIndex = index;
            showSlide(index);
        });
    });

    setInterval(function() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }, 5000);

    showSlide(currentIndex);

    window.addEventListener('resize', function() {
        showSlide(currentIndex);
    });
});

/* =========================================
   DESKTOP PHOTO SLIDER
========================================= */

const photoTrack = document.querySelector(".photo-slider-track");
const photoSlides = document.querySelectorAll(".photo-slide");

const photoPrev = document.querySelector(".photo-prev");
const photoNext = document.querySelector(".photo-next");

let photoIndex = 0;

function updatePhotoSlider() {

    if (!photoSlides.length) return;

    const slideWidth = photoSlides[0].offsetWidth;
    const gap = 30;

    photoTrack.style.transform =
        `translateX(-${photoIndex * (slideWidth + gap)}px)`;
}


/* NEXT */

photoNext.addEventListener("click", () => {

    const visiblePhotos = 5;
    const maxIndex = photoSlides.length - visiblePhotos;

    if (photoIndex < maxIndex) {
        photoIndex++;
    } else {
        photoIndex = 0;
    }

    updatePhotoSlider();
});


/* PREVIOUS */

photoPrev.addEventListener("click", () => {

    const visiblePhotos = 5;
    const maxIndex = photoSlides.length - visiblePhotos;

    if (photoIndex > 0) {
        photoIndex--;
    } else {
        photoIndex = maxIndex;
    }

    updatePhotoSlider();
});


/* Keep correct position after resize */

window.addEventListener("resize", updatePhotoSlider);

/* =========================================
   MOBILE MENU
========================================= */

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');


/* Open / close hamburger menu */

menuToggle.addEventListener('click', function() {

    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');

    document.body.classList.toggle('menu-open');

    const isOpen = menuToggle.classList.contains('active');

    menuToggle.setAttribute('aria-expanded', isOpen);

});


/* Open / close Behandelingen and Huidproblemen */

mobileDropdowns.forEach(function(dropdown) {

    const button = dropdown.querySelector('.mobile-dropdown-toggle');

    button.addEventListener('click', function() {

        dropdown.classList.toggle('active');

    });

});


/* Close menu after clicking a link */

const mobileLinks = document.querySelectorAll(
    '.mobile-menu a'
);

mobileLinks.forEach(function(link) {

    link.addEventListener('click', function() {

        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');

        document.body.classList.remove('menu-open');

        menuToggle.setAttribute(
            'aria-expanded',
            'false'
        );

    });

});

