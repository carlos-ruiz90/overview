document.querySelectorAll('.carousel-container').forEach((container) => {
    const carousel = container.querySelector('.carousel');
    const items = carousel.querySelectorAll('img');
    const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(carousel).gap) || 20;
    const totalWidth = itemWidth * items.length;
    let currentPosition = -itemWidth;
    let animationFrameId;

    // Clone the first and last elements
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[items.length - 1].cloneNode(true);

    carousel.appendChild(firstClone);
    carousel.insertBefore(lastClone, items[0]);

    carousel.style.transform = `translateX(${currentPosition}px)`;

    function animateCarousel() {
        currentPosition -= 1;

        // Seamless loop logic
        if (Math.abs(currentPosition) >= totalWidth) {
            currentPosition = 0;
        }

        carousel.style.transform = `translateX(${currentPosition}px)`;

        animationFrameId = requestAnimationFrame(animateCarousel);
    }

    function startAnimation() {
        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(animateCarousel);
        }
    }

    function stopAnimation() {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }

    container.addEventListener('mouseenter', startAnimation);
    container.addEventListener('mouseleave', stopAnimation);
});
