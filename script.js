// ============================
// DENISE PORTFOLIO — script.js
// Features: Mobile menu, Scroll reveal, Navbar scroll,
//           Bubble particles, Active nav tracking, Koi visibility,
//           Traffic signs parallax, Interactive Music Player (Web Audio)
// ============================

document.addEventListener('DOMContentLoaded', function () {

    // ── Mobile Menu Toggle ──
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const btnIcon = btn.querySelector('i');

    btn.addEventListener('click', function () {
        const isOpen = !menu.classList.contains('hidden');
        menu.classList.toggle('hidden');
        // Toggle hamburger / close icon
        if (isOpen) {
            btnIcon.classList.remove('fa-xmark');
            btnIcon.classList.add('fa-bars');
        } else {
            btnIcon.classList.remove('fa-bars');
            btnIcon.classList.add('fa-xmark');
        }
    });

    // Close mobile menu when a link is clicked
    const mobileLinks = menu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            btnIcon.classList.remove('fa-xmark');
            btnIcon.classList.add('fa-bars');
        });
    });

    // ── Navbar Scroll Effect ──
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll(); // Initial check

    // ── Active Nav Link on Scroll ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // ── Scroll Reveal Animation ──
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ── Koi Fish Visibility ──
    const koiElements = document.querySelectorAll('.koi');
    setTimeout(() => {
        koiElements.forEach(koi => {
            koi.classList.add('visible');
        });
    }, 1200);

    // ── Bubble Particles Generator ──
    const bubblesContainer = document.getElementById('bubbles');
    const BUBBLE_COUNT = 15;

    function createBubble() {
        if (!bubblesContainer) return;
        const bubble = document.createElement('div');
        bubble.className = 'bubble';

        const size = Math.random() * 12 + 4; // 4px to 16px
        const left = Math.random() * 100; // 0% to 100%
        const duration = Math.random() * 10 + 10; // 10s to 20s
        const delay = Math.random() * 10; // 0s to 10s

        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = left + '%';
        bubble.style.animationDuration = duration + 's';
        bubble.style.animationDelay = delay + 's';

        bubblesContainer.appendChild(bubble);
    }

    for (let i = 0; i < BUBBLE_COUNT; i++) {
        createBubble();
    }

    // ── Smooth Scroll for All Anchor Links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 70; // Navbar height offset
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ── Scroll Parallax on Traffic Signs & Clouds (Anime Aesthetic) ──
    const cloudsWrapper = document.querySelector('.clouds-wrapper');
    const powerlines = document.querySelector('.powerlines-container');
    const heroTrafficSign = document.getElementById('heroTrafficSign');
    const aboutTrafficSign = document.getElementById('aboutTrafficSign');

    window.addEventListener('scroll', function () {
        const scrolled = window.scrollY;

        // Hero elements parallax
        if (scrolled < window.innerHeight * 1.5) {
            if (cloudsWrapper) {
                cloudsWrapper.style.transform = `translateY(${scrolled * 0.28}px)`;
            }
            if (powerlines) {
                powerlines.style.transform = `translateY(${scrolled * 0.15}px)`;
            }
            if (heroTrafficSign) {
                heroTrafficSign.style.transform = `translateY(${scrolled * 0.18}px)`;
            }
        }

        // About traffic sign parallax
        if (aboutTrafficSign) {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const aboutTop = aboutSection.offsetTop;
                const dist = scrolled - aboutTop;
                if (Math.abs(dist) < window.innerHeight) {
                    aboutTrafficSign.style.transform = `translateY(${dist * 0.1}px)`;
                }
            }
        }
    }, { passive: true });

    // =========================================
    // INTERACTIVE MUSIC PLAYER (WHITE GLASS DISC)
    // Single Track: Anaheim - NIKI
    // =========================================
    const songData = {
        title: "Anaheim",
        artist: "NIKI ✦ Nicole",
        defaultDuration: 218 // 03:38
    };

    let isPlaying = false;
    let isLooping = false;
    let fallbackTimer = null;
    let fallbackTime = 0;

    // DOM Elements
    const audio = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('musicPlayBtn');
    const playIcon = document.getElementById('playIcon');
    const prevBtn = document.getElementById('musicPrevBtn');
    const nextBtn = document.getElementById('musicNextBtn');
    const muteBtn = document.getElementById('musicMuteBtn');
    const volumeIcon = document.getElementById('volumeIcon');
    const repeatBtn = document.getElementById('musicRepeatBtn');
    const seekBar = document.getElementById('musicSeekBar');
    const currentTimeEl = document.getElementById('musicCurrentTime');
    const totalTimeEl = document.getElementById('musicTotalTime');
    const whiteGlassDisc = document.getElementById('whiteGlassDisc');
    const turntableTonearm = document.getElementById('turntableTonearm');
    const musicEqualizer = document.getElementById('musicEqualizer');
    const audioStatusText = document.getElementById('audioStatusText');
    const statusSongName = document.getElementById('statusSongName');
    const playerTitle = document.getElementById('playerTitle');
    const playerArtist = document.getElementById('playerArtist');

    function formatTime(seconds) {
        if (!seconds || isNaN(seconds) || !isFinite(seconds)) return "00:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Set initial song UI
    if (playerTitle) playerTitle.textContent = songData.title;
    if (playerArtist) playerArtist.textContent = songData.artist;
    if (statusSongName) statusSongName.textContent = `${songData.title} - NIKI`;
    if (totalTimeEl) totalTimeEl.textContent = formatTime(songData.defaultDuration);

    // Update duration dynamically when real audio file loads
    if (audio) {
        audio.addEventListener('loadedmetadata', function () {
            if (audio.duration && isFinite(audio.duration)) {
                totalTimeEl.textContent = formatTime(audio.duration);
            }
        });

        audio.addEventListener('timeupdate', function () {
            if (!isPlaying) return;
            const dur = (audio.duration && isFinite(audio.duration)) ? audio.duration : songData.defaultDuration;
            currentTimeEl.textContent = formatTime(audio.currentTime);
            seekBar.value = (audio.currentTime / dur) * 100;
        });

        audio.addEventListener('ended', function () {
            if (isLooping) {
                audio.currentTime = 0;
                audio.play();
            } else {
                pauseMusic();
                audio.currentTime = 0;
                seekBar.value = 0;
                currentTimeEl.textContent = "00:00";
            }
        });
    }

    function setVisualPlaying(playing) {
        isPlaying = playing;
        if (whiteGlassDisc) whiteGlassDisc.classList.toggle('spinning', playing);
        if (turntableTonearm) turntableTonearm.classList.toggle('playing', playing);
        if (musicEqualizer) musicEqualizer.classList.toggle('active', playing);

        if (playIcon) {
            if (playing) {
                playIcon.classList.remove('fa-play', 'ml-1');
                playIcon.classList.add('fa-pause');
            } else {
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play', 'ml-1');
            }
        }

        if (audioStatusText) {
            audioStatusText.textContent = playing ? "Now Playing ✦" : "Paused";
        }
    }

    function startFallbackAnimation() {
        stopFallbackAnimation();
        fallbackTimer = setInterval(() => {
            if (isPlaying && (!audio || !audio.duration || isNaN(audio.duration) || audio.paused)) {
                fallbackTime++;
                const dur = songData.defaultDuration;
                if (fallbackTime >= dur) {
                    if (isLooping) {
                        fallbackTime = 0;
                    } else {
                        pauseMusic();
                        fallbackTime = 0;
                    }
                }
                currentTimeEl.textContent = formatTime(fallbackTime);
                seekBar.value = (fallbackTime / dur) * 100;
            }
        }, 1000);
    }

    function stopFallbackAnimation() {
        if (fallbackTimer) {
            clearInterval(fallbackTimer);
            fallbackTimer = null;
        }
    }

    function playMusic() {
        if (!audio) {
            setVisualPlaying(true);
            startFallbackAnimation();
            return;
        }

        const promise = audio.play();
        if (promise !== undefined) {
            promise.then(() => {
                setVisualPlaying(true);
                stopFallbackAnimation();
            }).catch(err => {
                // If audio file is not yet inserted by user, still animate smoothly
                console.info("Info: Audio file belum ditemukan di assets/anaheim.mp3. Animasi simulasi diaktifkan:", err);
                setVisualPlaying(true);
                if (audioStatusText) {
                    audioStatusText.textContent = "Playing ✦";
                }
                startFallbackAnimation();
            });
        } else {
            setVisualPlaying(true);
        }
    }

    function pauseMusic() {
        if (audio) {
            audio.pause();
        }
        setVisualPlaying(false);
        stopFallbackAnimation();
    }

    function togglePlay() {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }

    function restartTrack() {
        if (audio && audio.duration && isFinite(audio.duration)) {
            audio.currentTime = 0;
        }
        fallbackTime = 0;
        if (seekBar) seekBar.value = 0;
        if (currentTimeEl) currentTimeEl.textContent = "00:00";
        if (!isPlaying) {
            playMusic();
        }
    }

    // Event Listeners for Player Controls
    if (playBtn) playBtn.addEventListener('click', togglePlay);
    if (nextBtn) nextBtn.addEventListener('click', restartTrack);
    if (prevBtn) prevBtn.addEventListener('click', restartTrack);

    if (muteBtn && audio) {
        muteBtn.addEventListener('click', function () {
            audio.muted = !audio.muted;
            if (audio.muted) {
                volumeIcon.classList.remove('fa-volume-high');
                volumeIcon.classList.add('fa-volume-xmark');
            } else {
                volumeIcon.classList.remove('fa-volume-xmark');
                volumeIcon.classList.add('fa-volume-high');
            }
        });
    }

    if (repeatBtn) {
        repeatBtn.addEventListener('click', function () {
            isLooping = !isLooping;
            if (audio) audio.loop = isLooping;
            this.classList.toggle('active', isLooping);
        });
    }

    if (seekBar) {
        seekBar.addEventListener('input', function () {
            const dur = (audio && audio.duration && isFinite(audio.duration)) ? audio.duration : songData.defaultDuration;
            const target = (this.value / 100) * dur;
            if (audio && audio.duration && isFinite(audio.duration)) {
                audio.currentTime = target;
            }
            fallbackTime = target;
            if (currentTimeEl) currentTimeEl.textContent = formatTime(target);
        });
    }

    // ── Console Easter Egg ──
    console.log(
        '%c✦ Portfolio Denise Zara Ochila ✦\n%cFeaturing Anaheim by NIKI & Aesthetic Vinyl Player 🐟🎵',
        'color: #0ea5e9; font-size: 18px; font-weight: bold; font-family: Nunito, sans-serif;',
        'color: #38bdf8; font-size: 12px; font-family: Nunito, sans-serif;'
    );
});