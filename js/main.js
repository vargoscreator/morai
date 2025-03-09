AOS.init({
	once: false,
    duration: 700
});
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

document.addEventListener('mousemove', (e) => {
    const images = [
        { selector: '.hero__image img', speed: 30, follow: true },
        { selector: '.about__image img', speed: 50, follow: false }
    ];
    images.forEach(({ selector, speed, follow }) => {
        const image = document.querySelector(selector);
        if (!image) return;

        const rect = image.parentElement.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        const direction = follow ? 1 : -1;

        const moveX = (mouseX / rect.width) * speed * direction;
        const moveY = (mouseY / rect.height) * speed * direction;

        image.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const workBlock = document.querySelector('.work__block');
    let isDragging = false;
    let startX, startY;
    let scrollLeft;
    let translateX = 0;
    let isHorizontalScroll = false;

    const getBoundedTranslate = (translateX) => {
        const maxTranslate = 0;
        const totalWidth = workBlock.scrollWidth - workBlock.clientWidth;
        const minTranslate = -totalWidth;
        return Math.min(maxTranslate, Math.max(minTranslate, translateX));
    };

    const updateTransform = (newTranslateX) => {
        translateX = getBoundedTranslate(newTranslateX);
        workBlock.style.transform = `translateX(${translateX}px)`;
    };

    workBlock.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        scrollLeft = translateX;
        workBlock.style.cursor = 'grabbing';
    });

    workBlock.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
        scrollLeft = translateX;
        isHorizontalScroll = false;
    });

    workBlock.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = x - startX;
        updateTransform(scrollLeft + walk);
    });

    workBlock.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX;
        const y = e.touches[0].pageY;
        const deltaX = Math.abs(x - startX);
        const deltaY = Math.abs(y - startY);

        if (deltaX > deltaY) {
            isHorizontalScroll = true;
            e.preventDefault();
            updateTransform(scrollLeft + (x - startX));
        }
    });

    const stopDragging = () => {
        isDragging = false;
        workBlock.style.cursor = 'grab';
    };

    workBlock.addEventListener('mouseup', stopDragging);
    workBlock.addEventListener('mouseleave', stopDragging);
    workBlock.addEventListener('touchend', stopDragging);
    workBlock.style.cursor = 'grab';
});
