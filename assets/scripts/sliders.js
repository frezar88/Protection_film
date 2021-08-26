new Swiper(".features-slider", {
    observer: true,
    observeParents: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: false,
    },
    spaceBetween: 30,
    slidesPerView: 1,
    slidesPerGroup: 1,
    loop: false,
    speed: 800,
    autoHeight: true,
    watchOverflow: true,
    breakpoints: {
        600: {
            slidesPerView: 3,
        }
    }
})
new Swiper(".competitors-slider", {
    observer: true,
    observeParents: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: false,
    },
    spaceBetween: 30,
    slidesPerView: 1,
    slidesPerGroup: 1,
    loop: false,
    speed: 800,
    autoHeight: true,
    watchOverflow: true,
    breakpoints: {
        600: {
            slidesPerView: 3,
        }
    }
})
new Swiper(".install-slider", {
    observer: true,
    observeParents: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: false,
    },
    spaceBetween: 30,
    slidesPerView: 1,
    slidesPerGroup: 1,
    loop: false,
    speed: 800,
    autoHeight: true,
    watchOverflow: true,
    breakpoints: {
        600: {
            slidesPerView: 2,
        }
    }
})

