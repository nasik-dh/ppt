// Elements
const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');
const slidesContainer = document.getElementById('slidesContainer');
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

// Variables
let currentSlide = 0;
let touchStartX = 0;
let touchEndX = 0;
let lastTapTime = 0;
let isTransitioning = false;

// Start Button Click
startBtn.addEventListener('click', async () => {
    // Hide start screen
    startScreen.classList.add('hidden');
    
    setTimeout(async () => {
        startScreen.style.display = 'none';
        slidesContainer.classList.add('active');
        
        // Enter fullscreen
        await enterFullscreen();
        
        // Lock orientation to landscape on mobile
        await lockOrientation();
    }, 500);
});

// Enter Fullscreen Function
async function enterFullscreen() {
    const elem = slidesContainer;
    
    try {
        if (elem.requestFullscreen) {
            await elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            await elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            await elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
            await elem.msRequestFullscreen();
        }
    } catch (err) {
        console.log('Fullscreen error:', err);
    }
}

// Lock Orientation to Landscape
async function lockOrientation() {
    try {
        if (screen.orientation && screen.orientation.lock) {
            await screen.orientation.lock('landscape').catch(() => {
                console.log('Orientation lock not available');
            });
        } else if (window.screen.lockOrientation) {
            window.screen.lockOrientation('landscape');
        } else if (window.screen.mozLockOrientation) {
            window.screen.mozLockOrientation('landscape');
        } else if (window.screen.msLockOrientation) {
            window.screen.msLockOrientation('landscape');
        }
    } catch (err) {
        console.log('Orientation lock error:', err);
    }
}

// Show Slide Function
function showSlide(index, direction = 'none') {
    if (isTransitioning || index < 0 || index >= slides.length) return;
    
    isTransitioning = true;
    
    // Update slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev', 'next');
        
        if (i === index) {
            slide.classList.add('active');
        }
    });
    
    // Update indicators
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
    
    // Stop all audio when changing slides
    stopAllAudio();
    
    // Update current slide
    currentSlide = index;
    
    setTimeout(() => {
        isTransitioning = false;
    }, 600);
}

// Next Slide
function nextSlide() {
    if (currentSlide < slides.length - 1) {
        showSlide(currentSlide + 1, 'next');
    }
}

// Previous Slide
function prevSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1, 'prev');
    }
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (!slidesContainer.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') {
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'Escape') {
        exitFullscreen();
    }
});

// Touch Events for Swipe
slidesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
}, { passive: true });

slidesContainer.addEventListener('touchmove', (e) => {
    touchEndX = e.touches[0].clientX;
}, { passive: true });

slidesContainer.addEventListener('touchend', (e) => {
    handleSwipe();
});

// Handle Swipe Gesture
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

// Double Tap to Exit Fullscreen (Mobile)
slidesContainer.addEventListener('touchend', (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;
    
    if (tapLength < 300 && tapLength > 0) {
        // Double tap detected
        exitFullscreen();
    }
    
    lastTapTime = currentTime;
});

// Exit Fullscreen
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

// Audio Player - Slide 3
const playBtn3 = document.getElementById('playBtn3');
const audio3 = document.getElementById('audio3');

if (playBtn3 && audio3) {
    const playIcon3 = playBtn3.querySelector('.play-icon');
    const pauseIcon3 = playBtn3.querySelector('.pause-icon');
    const audioPlayer3 = playBtn3.closest('.whatsapp-audio-player');
    const timeDisplay3 = audioPlayer3.querySelector('.audio-time');
    const progressBar3 = audioPlayer3.querySelector('.audio-progress');
    
    playBtn3.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAudio(audio3, playIcon3, pauseIcon3, audioPlayer3);
    });
    
    audio3.addEventListener('timeupdate', () => {
        updateAudioProgress(audio3, timeDisplay3, progressBar3);
    });
    
    audio3.addEventListener('ended', () => {
        resetAudio(playIcon3, pauseIcon3, audioPlayer3);
    });
    
    audio3.addEventListener('loadedmetadata', () => {
        const duration = formatTime(audio3.duration);
        timeDisplay3.textContent = duration;
    });
}

// Audio Player - Slide 5
const playBtn5 = document.getElementById('playBtn5');
const audio5 = document.getElementById('audio5');

if (playBtn5 && audio5) {
    const playIcon5 = playBtn5.querySelector('.play-icon');
    const pauseIcon5 = playBtn5.querySelector('.pause-icon');
    const audioPlayer5 = playBtn5.closest('.whatsapp-audio-player');
    const timeDisplay5 = audioPlayer5.querySelector('.audio-time');
    const progressBar5 = audioPlayer5.querySelector('.audio-progress');
    
    playBtn5.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleAudio(audio5, playIcon5, pauseIcon5, audioPlayer5);
    });
    
    audio5.addEventListener('timeupdate', () => {
        updateAudioProgress(audio5, timeDisplay5, progressBar5);
    });
    
    audio5.addEventListener('ended', () => {
        resetAudio(playIcon5, pauseIcon5, audioPlayer5);
    });
    
    audio5.addEventListener('loadedmetadata', () => {
        const duration = formatTime(audio5.duration);
        timeDisplay5.textContent = duration;
    });
}

// Toggle Audio Play/Pause
function toggleAudio(audio, playIcon, pauseIcon, player) {
    if (audio.paused) {
        audio.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        player.classList.add('playing');
    } else {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        player.classList.remove('playing');
    }
}

// Update Audio Progress
function updateAudioProgress(audio, timeDisplay, progressBar) {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progress = (currentTime / duration) * 100;
    
    timeDisplay.textContent = formatTime(currentTime);
    progressBar.style.width = progress + '%';
}

// Reset Audio
function resetAudio(playIcon, pauseIcon, player) {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    player.classList.remove('playing');
}

// Format Time
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Stop All Audio
function stopAllAudio() {
    const allAudios = document.querySelectorAll('audio');
    allAudios.forEach(audio => {
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
    
    // Reset all players
    const allPlayers = document.querySelectorAll('.whatsapp-audio-player');
    allPlayers.forEach(player => {
        player.classList.remove('playing');
        const playIcon = player.querySelector('.play-icon');
        const pauseIcon = player.querySelector('.pause-icon');
        if (playIcon) playIcon.style.display = 'block';
        if (pauseIcon) pauseIcon.style.display = 'none';
    });
}

// Indicator Click Navigation
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
    });
});

// Prevent Context Menu
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Prevent Text Selection
document.addEventListener('selectstart', (e) => {
    e.preventDefault();
});
