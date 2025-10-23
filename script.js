// Get elements
const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');
const slidesContainer = document.getElementById('slidesContainer');
const slides = document.querySelectorAll('.slide');

let currentSlide = 0;
let touchStartX = 0;
let touchEndX = 0;
let lastTapTime = 0;

// Start button click
startBtn.addEventListener('click', async () => {
    startScreen.style.display = 'none';
    slidesContainer.classList.add('active');
    
    // Request fullscreen
    try {
        if (slidesContainer.requestFullscreen) {
            await slidesContainer.requestFullscreen();
        } else if (slidesContainer.webkitRequestFullscreen) {
            await slidesContainer.webkitRequestFullscreen();
        } else if (slidesContainer.mozRequestFullScreen) {
            await slidesContainer.mozRequestFullScreen();
        } else if (slidesContainer.msRequestFullscreen) {
            await slidesContainer.msRequestFullscreen();
        }
        
        // Lock orientation to landscape on mobile
        if (screen.orientation && screen.orientation.lock) {
            try {
                await screen.orientation.lock('landscape');
            } catch (err) {
                console.log('Orientation lock not supported');
            }
        }
    } catch (err) {
        console.log('Fullscreen request failed:', err);
    }
});

// Show slide function
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

// Next slide
function nextSlide() {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

// Previous slide
function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'Escape') {
        exitFullscreen();
    }
});

// Touch events for mobile
slidesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

slidesContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            nextSlide();
        } else {
            // Swipe right - previous slide
            prevSlide();
        }
    }
}

// Double tap to exit fullscreen on mobile
slidesContainer.addEventListener('touchend', (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;
    
    if (tapLength < 300 && tapLength > 0) {
        exitFullscreen();
    }
    lastTapTime = currentTime;
});

// Exit fullscreen function
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

// Audio player for slide 3
const playBtn3 = document.getElementById('playBtn3');
const audio3 = document.getElementById('audio3');

if (playBtn3 && audio3) {
    playBtn3.addEventListener('click', (e) => {
        e.stopPropagation();
        if (audio3.paused) {
            audio3.play();
            playBtn3.textContent = '⏸';
        } else {
            audio3.pause();
            playBtn3.textContent = '▶';
        }
    });

    audio3.addEventListener('timeupdate', () => {
        const duration = audio3.duration;
        const currentTime = audio3.currentTime;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        const durationDisplay = playBtn3.nextElementSibling.nextElementSibling;
        durationDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    });

    audio3.addEventListener('ended', () => {
        playBtn3.textContent = '▶';
    });
}

// Audio player for slide 5
const playBtn5 = document.getElementById('playBtn5');
const audio5 = document.getElementById('audio5');

if (playBtn5 && audio5) {
    playBtn5.addEventListener('click', (e) => {
        e.stopPropagation();
        if (audio5.paused) {
            audio5.play();
            playBtn5.textContent = '⏸';
        } else {
            audio5.pause();
            playBtn5.textContent = '▶';
        }
    });

    audio5.addEventListener('timeupdate', () => {
        const duration = audio5.duration;
        const currentTime = audio5.currentTime;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        const durationDisplay = playBtn5.nextElementSibling.nextElementSibling;
        durationDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    });

    audio5.addEventListener('ended', () => {
        playBtn5.textContent = '▶';
    });
}

// Pause all audio when changing slides
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        if (audio3) {
            audio3.pause();
            audio3.currentTime = 0;
            if (playBtn3) playBtn3.textContent = '▶';
        }
        if (audio5) {
            audio5.pause();
            audio5.currentTime = 0;
            if (playBtn5) playBtn5.textContent = '▶';
        }
    }
});
