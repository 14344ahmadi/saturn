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