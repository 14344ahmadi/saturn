document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. HOMEPAGE IMAGE SLIDER
       Only runs when .slides and .slide exist
    ===================================================== */

    const slider = document.querySelector(".slides");
    const slides = document.querySelectorAll(".slide");
    const thumbnails = document.querySelectorAll(".thumbnail");

    if (slider && slides.length > 0) {

        let currentIndex = 0;

        function getSlideWidth() {
            return slides[0].clientWidth;
        }

        function showSlide(index) {

            const slideWidth = getSlideWidth();

            slider.style.transform =
                `translateX(-${index * slideWidth}px)`;

            thumbnails.forEach(function (thumbnail, idx) {

                thumbnail.classList.toggle(
                    "active",
                    idx === index
                );

            });
        }


        // Thumbnail clicks
        thumbnails.forEach(function (thumbnail, index) {

            thumbnail.addEventListener("click", function () {

                currentIndex = index;

                showSlide(currentIndex);

            });

        });


        // Automatic slider
        setInterval(function () {

            currentIndex =
                (currentIndex + 1) % slides.length;

            showSlide(currentIndex);

        }, 5000);


        // Initial position
        showSlide(currentIndex);


        // Recalculate slider when browser resizes
        window.addEventListener("resize", function () {

            showSlide(currentIndex);

        });

    }


    /* =====================================================
       2. DESKTOP INSTAGRAM / PHOTO SLIDER
       Only runs on pages where these elements exist
    ===================================================== */

    const photoTrack =
        document.querySelector(".photo-slider-track");

    const photoSlides =
        document.querySelectorAll(".photo-slide");

    const photoPrev =
        document.querySelector(".photo-prev");

    const photoNext =
        document.querySelector(".photo-next");


    if (
        photoTrack &&
        photoPrev &&
        photoNext &&
        photoSlides.length > 0
    ) {

        let photoIndex = 0;


        function getVisiblePhotos() {

            // Mobile / tablet
            if (window.innerWidth <= 768) {
                return 1;
            }

            // Smaller desktop
            if (window.innerWidth <= 1100) {
                return 3;
            }

            // Large desktop
            return 5;
        }


        function updatePhotoSlider() {

            const slideWidth =
                photoSlides[0].offsetWidth;

            // This must match your CSS gap
            const gap = 30;

            const visiblePhotos =
                getVisiblePhotos();

            const maxIndex =
                Math.max(
                    0,
                    photoSlides.length - visiblePhotos
                );


            // Prevent index from being too large
            if (photoIndex > maxIndex) {
                photoIndex = maxIndex;
            }


            photoTrack.style.transform =
                `translateX(-${
                    photoIndex * (slideWidth + gap)
                }px)`;

        }


        /* NEXT */

        photoNext.addEventListener("click", function () {

            const visiblePhotos =
                getVisiblePhotos();

            const maxIndex =
                Math.max(
                    0,
                    photoSlides.length - visiblePhotos
                );


            if (photoIndex < maxIndex) {

                photoIndex++;

            } else {

                photoIndex = 0;

            }


            updatePhotoSlider();

        });


        /* PREVIOUS */

        photoPrev.addEventListener("click", function () {

            const visiblePhotos =
                getVisiblePhotos();

            const maxIndex =
                Math.max(
                    0,
                    photoSlides.length - visiblePhotos
                );


            if (photoIndex > 0) {

                photoIndex--;

            } else {

                photoIndex = maxIndex;

            }


            updatePhotoSlider();

        });


        /* Resize */

        window.addEventListener(
            "resize",
            updatePhotoSlider
        );


        /* Initial position */

        updatePhotoSlider();

    }


    /* =====================================================
       3. MOBILE HEADER MENU
       Runs on every page that contains the header
    ===================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mobileMenu =
        document.querySelector(".mobile-menu");


    if (menuToggle && mobileMenu) {

        /* Hamburger open / close */

        menuToggle.addEventListener(
            "click",
            function () {

                menuToggle.classList.toggle("active");

                mobileMenu.classList.toggle("active");

                document.body.classList.toggle(
                    "menu-open"
                );


                const isOpen =
                    menuToggle.classList.contains(
                        "active"
                    );


                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );

            }
        );


        /* =================================================
           MOBILE DROPDOWNS
        ================================================= */

        const mobileDropdowns =
            document.querySelectorAll(
                ".mobile-dropdown"
            );


        mobileDropdowns.forEach(function (dropdown) {

            const button =
                dropdown.querySelector(
                    ".mobile-dropdown-toggle"
                );


            // Safety check
            if (!button) {
                return;
            }


            button.addEventListener(
                "click",
                function () {

                    /*
                    Optional:
                    close other dropdowns first
                    */

                    mobileDropdowns.forEach(
                        function (otherDropdown) {

                            if (
                                otherDropdown !== dropdown
                            ) {

                                otherDropdown.classList.remove(
                                    "active"
                                );

                                const otherArrow =
                                    otherDropdown.querySelector(
                                        ".mobile-arrow"
                                    );

                                if (otherArrow) {
                                    otherArrow.textContent = "+";
                                }

                            }

                        }
                    );


                    /* Open / close clicked dropdown */

                    dropdown.classList.toggle(
                        "active"
                    );


                    /* Change + to − */

                    const arrow =
                        button.querySelector(
                            ".mobile-arrow"
                        );


                    if (arrow) {

                        arrow.textContent =
                            dropdown.classList.contains(
                                "active"
                            )
                                ? "×"
                                : "+";

                    }

                }
            );

        });


        /* =================================================
           CLOSE MOBILE MENU AFTER CLICKING LINK
        ================================================= */

        const mobileLinks =
            mobileMenu.querySelectorAll("a");


        mobileLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    menuToggle.classList.remove(
                        "active"
                    );

                    mobileMenu.classList.remove(
                        "active"
                    );

                    document.body.classList.remove(
                        "menu-open"
                    );


                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });

    }


    /* =====================================================
       4. FOOTER OPENING HOURS
       Runs anywhere the footer exists
    ===================================================== */

    const openingDays =
        document.querySelectorAll(
            ".opening-hours [data-day]"
        );


    if (openingDays.length > 0) {

        const today =
            new Date().getDay();


        openingDays.forEach(function (day) {

            if (
                Number(day.dataset.day) === today
            ) {

                day.classList.add("today");

            }

        });

    }

});