/* ============================================
   GGJason | 吳軒竹 — Film Photography Theme
   Scroll reveal, frame counter, interactions
   ============================================ */

(function () {
    'use strict';

    // --- Scroll Reveal (IntersectionObserver) ---
    var revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        revealElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        revealElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // --- Animated Frame Counter ---
    // Mimics a film frame counter that increments as you scroll
    var frameNumEl = document.querySelector('.frame-counter .frame-num');
    var totalFrames = 36; // 35mm film has 36 exposures

    function updateFrameCounter() {
        var scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        var frame = Math.min(Math.ceil(scrollProgress * totalFrames), totalFrames);
        if (frameNumEl) {
            frameNumEl.textContent = String(frame).padStart(2, '0') + ' / ' + String(totalFrames).padStart(2, '0');
        }
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                updateFrameCounter();
                ticking = false;
            });
            ticking = true;
        }
    });

    updateFrameCounter();

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();