/**
 * app.js — Our Story
 * Romantic relationship timeline · GitHub Pages edition
 *
 * Sections:
 *  1. Loading screen
 *  2. Floating hearts canvas
 *  3. Scroll progress bar
 *  4. Sticky navigation
 *  5. Active nav-tab tracking
 *  6. Fade-up scroll animations
 *  7. Animated stat counters
 *  8. Hero CTA smooth scroll
 *  9. Lightbox
 */

'use strict';

/* ─────────────────────────────────────────────────────────────
   1. LOADING SCREEN
   Hide after all assets finish loading (fonts, images, etc.)
   ───────────────────────────────────────────────────────────── */
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('gone');
    }, 1400);
});

/* ─────────────────────────────────────────────────────────────
   2. FLOATING HEARTS CANVAS
   Lightweight canvas animation — hearts drift upward
   ───────────────────────────────────────────────────────────── */
(function initHearts() {
    const canvas = document.getElementById('hearts');
    if (!canvas) return;

    const ctx  = canvas.getContext('2d');
    const N    = 20;
    const COLS = ['#F2B5C8', '#D4849A', '#C9956E', '#FCE8EF', '#F0E4D0'];

    /* Resize canvas to fill the viewport */
    function resize() {
        canvas.width  = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();

    /* Debounced resize handler so canvas doesn't thrash on every pixel */
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 150);
    }, { passive: true });

    function newHeart(scattered) {
        return {
            x:     Math.random() * canvas.width,
            y:     scattered ? Math.random() * canvas.height : canvas.height + 16,
            size:  Math.random() * 13 + 7,
            speed: Math.random() * 0.55 + 0.15,
            alpha: Math.random() * 0.30 + 0.08,
            drift: (Math.random() - 0.5) * 0.4,
            w:     Math.random() * Math.PI * 2,
            ws:    Math.random() * 0.018 + 0.004,
            color: COLS[Math.floor(Math.random() * COLS.length)]
        };
    }

    /* Draw a single heart using bezier curves */
    function drawHeart(h) {
        const s = h.size;
        ctx.save();
        ctx.globalAlpha = h.alpha;
        ctx.fillStyle   = h.color;
        ctx.translate(h.x, h.y);
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.28);
        ctx.bezierCurveTo( s * 0.5, -s,       s,     -s * 0.28,  0, s * 0.52);
        ctx.bezierCurveTo(-s,        -s * 0.28, -s * 0.5, -s,    0, -s * 0.28);
        ctx.fill();
        ctx.restore();
    }

    /* Scatter initial hearts so the canvas isn't empty at load */
    const hearts = Array.from({ length: N }, () => newHeart(true));

    function tick() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach(h => {
            drawHeart(h);
            h.w += h.ws;
            h.y -= h.speed;
            h.x += h.drift + Math.sin(h.w) * 0.25;
            if (h.y < -20) Object.assign(h, newHeart(false));
        });
        requestAnimationFrame(tick);
    }
    tick();
}());

/* ─────────────────────────────────────────────────────────────
   3. SCROLL PROGRESS BAR
   Thin gradient bar at the very top of the viewport
   ───────────────────────────────────────────────────────────── */
(function initProgress() {
    const bar = document.getElementById('progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const scrolled  = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0) + '%';
    }, { passive: true });
}());

/* ─────────────────────────────────────────────────────────────
   4. STICKY NAVIGATION
   The nav slides in once the hero section leaves the viewport
   ───────────────────────────────────────────────────────────── */
(function initNav() {
    const nav  = document.getElementById('nav');
    const hero = document.getElementById('hero');
    if (!nav || !hero) return;

    new IntersectionObserver(
        ([entry]) => nav.classList.toggle('show', !entry.isIntersecting),
        { threshold: 0.05 }
    ).observe(hero);

    /* Click a tab → smooth-scroll to the matching section */
    nav.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.getElementById(tab.dataset.to);
            if (!target) return;
            const offset = nav.offsetHeight + 14;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - offset,
                behavior: 'smooth'
            });
        });
    });
}());

/* ─────────────────────────────────────────────────────────────
   5. ACTIVE NAV-TAB TRACKING
   Highlights whichever section occupies the centre of the screen
   ───────────────────────────────────────────────────────────── */
(function initActiveTab() {
    const tabs     = document.querySelectorAll('.tab');
    const sections = document.querySelectorAll('.ts');
    if (!tabs.length || !sections.length) return;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                tabs.forEach(t => t.classList.toggle('active', t.dataset.to === entry.target.id));
            }
        });
    }, { rootMargin: '-38% 0px -57% 0px' });

    sections.forEach(s => obs.observe(s));
}());

/* ─────────────────────────────────────────────────────────────
   6. FADE-UP SCROLL ANIMATIONS
   Elements with class "fu" animate in when they enter the viewport
   ───────────────────────────────────────────────────────────── */
(function initFadeUp() {
    const items = document.querySelectorAll('.fu');
    if (!items.length) return;

    const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

    items.forEach(el => obs.observe(el));
}());

/* ─────────────────────────────────────────────────────────────
   7. ANIMATED STAT COUNTERS
   Numbers count up with an ease-out cubic when scrolled into view
   ─────────────────────────────────────────────────────────────
   To change the numbers: edit data-count="XXX" in index.html
   ───────────────────────────────────────────────────────────── */
(function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    counters.forEach(el => {
        const target = parseInt(el.dataset.count, 10);

        new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                obs.unobserve(el);

                const duration = 1800;
                const startTime = performance.now();

                (function step(now) {
                    const elapsed  = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                    el.textContent = Math.round(eased * target).toLocaleString();
                    if (progress < 1) requestAnimationFrame(step);
                }(startTime));
            });
        }, { threshold: 0.6 }).observe(el);
    });
}());

/* ─────────────────────────────────────────────────────────────
   8. HERO CTA — smooth scroll to first timeline section
   ───────────────────────────────────────────────────────────── */
(function initHeroCTA() {
    const btn = document.querySelector('.btn-start');
    if (!btn) return;
    btn.addEventListener('click', e => {
        e.preventDefault();
        const target = document.getElementById('s-talking');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
}());

/* ─────────────────────────────────────────────────────────────
   9. LIGHTBOX
   Click any photo card to open a full-screen viewer.
   Navigate with arrow buttons, keyboard arrows, or touch swipe.

   HOW PHOTOS ARE ORGANIZED:
   Every clickable photo element carries two data attributes:
     data-gal="galleryName"   — links photos in the same group
     data-idx="0"             — position within that group (0 = featured)

   On first run, the gallery map is built from the DOM so adding
   real <img> tags is automatically picked up without touching JS.
   ───────────────────────────────────────────────────────────── */
(function initLightbox() {
    /* Build map: { galleryName: [ {src, cap}, … ] } */
    const map = {};
    document.querySelectorAll('[data-gal][data-idx]').forEach(el => {
        const gal = el.dataset.gal;
        const idx = +el.dataset.idx;
        if (!map[gal]) map[gal] = [];
        const cap   = el.querySelector('.pol-cap')?.textContent.trim() ?? '';
        const imgEl = el.querySelector('img');
        map[gal][idx] = { cap, src: imgEl ? imgEl.src : null };
    });

    let curGal = [];
    let curIdx = 0;

    const lb      = document.getElementById('lb');
    const content = document.getElementById('lb-content');
    const capEl   = document.getElementById('lb-cap');
    const counter = document.querySelector('.lb-counter');
    if (!lb) return;

    function render() {
        const item = curGal[curIdx];
        if (!item) return;

        if (item.src) {
            content.innerHTML = `<img id="lb-img" src="${item.src}" alt="${item.cap}">`;
        } else {
            content.innerHTML = `
                <div class="lb-ph">
                    <span class="big-ico">📷</span>
                    <span>Add your photo here</span>
                </div>`;
        }

        capEl.textContent   = item.cap;
        counter.textContent = `${curIdx + 1} / ${curGal.filter(Boolean).length}`;
    }

    function open(gal, idx) {
        curGal = map[gal] || [];
        curIdx = idx;
        render();
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
        lb.querySelector('.lb-close').focus();
    }

    function close() {
        lb.classList.remove('open');
        document.body.style.overflow = '';
    }

    function prev() {
        const len = curGal.filter(Boolean).length;
        curIdx = (curIdx - 1 + len) % len;
        render();
    }

    function next() {
        const len = curGal.filter(Boolean).length;
        curIdx = (curIdx + 1) % len;
        render();
    }

    /* Attach click handlers to every gallery card */
    document.querySelectorAll('[data-gal][data-idx]').forEach(el => {
        el.addEventListener('click', () => open(el.dataset.gal, +el.dataset.idx));
    });

    /* Controls */
    document.querySelector('.lb-close').addEventListener('click', close);
    document.getElementById('lb-prev').addEventListener('click', e => { e.stopPropagation(); prev(); });
    document.getElementById('lb-next').addEventListener('click', e => { e.stopPropagation(); next(); });

    /* Click the backdrop (not the image) to close */
    lb.addEventListener('click', e => { if (e.target === lb) close(); });

    /* Keyboard */
    document.addEventListener('keydown', e => {
        if (!lb.classList.contains('open')) return;
        if (e.key === 'Escape')     close();
        if (e.key === 'ArrowLeft')  prev();
        if (e.key === 'ArrowRight') next();
    });

    /* Touch swipe */
    let touchStartX = 0;
    lb.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    lb.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 45) dx < 0 ? next() : prev();
    }, { passive: true });
}());
