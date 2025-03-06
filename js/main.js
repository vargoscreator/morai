document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.addreview__form');

    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let isValid = true;

        form.querySelectorAll('.addreview__form-input, .addreview__form-textarea').forEach(input => {
            if (input.value.trim() === '') {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });

        if (isValid) {
            console.log('Форма отправлена!');
            form.submit();
        }
    });

    form.querySelectorAll('.addreview__form-input, .addreview__form-textarea').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
        });
    });





    const reviewSlider = document.querySelector('.review__slider');
    const reviewSlides = document.querySelectorAll('.review__slide');
    const reviewSlideNext = document.querySelector('.review__next');
    const reviewSlidePrev = document.querySelector('.review__prev');

    const reviewSwiper = new Swiper('.review__slider', {
        slidesPerView: 1,
        spaceBetween: 14,
        loop: false,
        freeMode: false,
        breakpoints: {
            768: {
                slidesPerView: 'auto',
                freeMode: true
            },
        },
    });
    if (!reviewSlider || reviewSlides.length === 0) return;
    let activeIndex = 0;
    function updateActiveSlide(index) {
        reviewSlides.forEach(s => s.classList.remove('active'));
        reviewSlides[index]?.classList.add('active');
    }
    reviewSlideNext?.addEventListener('click', () => {
        if (activeIndex < reviewSlides.length - 1) {
            activeIndex++;
            updateActiveSlide(activeIndex);
        }
    });
    reviewSlidePrev?.addEventListener('click', () => {
        if (activeIndex > 0) {
            activeIndex--;
            updateActiveSlide(activeIndex);
        }
    });
    reviewSlides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            activeIndex = index;
            updateActiveSlide(activeIndex);
        });
    });
    updateActiveSlide(activeIndex);

    const reviewAddBtn = document.querySelector('.review__add');
    const addReviewBlock = document.querySelector('.addreview');
    const closeBtn = document.querySelector('.addreview__close');
    const addReviewInner = document.querySelector('.addreview__inner');
    reviewAddBtn.addEventListener('click', () => {
        addReviewBlock.classList.add('show');
    });
    closeBtn.addEventListener('click', () => {
        addReviewBlock.classList.remove('show');
    });
    document.addEventListener('click', (e) => {
        if (!addReviewInner.contains(e.target) && !reviewAddBtn.contains(e.target)) {
            addReviewBlock.classList.remove('show');
        }
    });
});
const headerAnimate = document.querySelector('.header-animate');
function checkScroll() {
    if (window.scrollY >= 500) {
        headerAnimate.classList.add('active');
    } else {
        headerAnimate.classList.remove('active');
    }
}

window.addEventListener('scroll', checkScroll);
checkScroll();


