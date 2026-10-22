/* Conceito B: HTML/CSS visível antes de qualquer melhoria com GSAP. */
(() => {
  'use strict';
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return;
  const root = document.documentElement;
  const scroller = document.querySelector('.site-scroll');
  const toggle = document.querySelector('.motion-toggle');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine)');
  let context = null;
  let cleanups = [];
  let paused = false;
  try { gsap.registerPlugin(ScrollTrigger); } catch { return; }

  function stop() {
    cleanups.forEach(dispose => dispose());
    cleanups = [];
    if (context) context.revert();
    context = null;
    root.classList.remove('motion-ready');
  }

  function start() {
    if (context || reduce.matches || paused) return;
    const abort = new AbortController();
    const { signal } = abort;
    cleanups.push(() => abort.abort());
    context = gsap.context(() => {});
    try {
      context.add(() => {
        root.classList.add('motion-ready');
        const italic = document.querySelector('.hero-title-italic');
        const portrait = document.querySelector('.hero-portrait');
        const timeline = gsap.timeline({
          defaults: { ease: 'power3.out' },
          onComplete: () => gsap.set([italic, portrait], { clearProps: 'clipPath,transform,opacity,willChange' })
        });
        // As máscaras nunca atingem os CTAs ou o dock de agendamento.
        timeline.fromTo(italic, { clipPath: 'inset(0 100% 0 0)', y: 12 }, {
          clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: .85,
          onStart: () => gsap.set(italic, { willChange: 'clip-path,transform' })
        }).fromTo(portrait, { clipPath: 'inset(0 0 0 100%)' }, {
          clipPath: 'inset(0% 0% 0% 0%)', duration: .95,
          onStart: () => gsap.set(portrait, { willChange: 'clip-path' })
        }, .1);

        gsap.utils.toArray('.reveal').forEach(element => {
          gsap.fromTo(element, { y: 16, opacity: 0 }, {
            y: 0, opacity: 1, duration: .6, ease: 'power2.out', immediateRender: false,
            scrollTrigger: { scroller, trigger: element, start: 'top 92%', once: true },
            onComplete: () => gsap.set(element, { clearProps: 'transform,opacity' })
          });
        });
        gsap.fromTo('.service', { y: 20, opacity: .4 }, {
          y: 0, opacity: 1, duration: .55, stagger: .09, ease: 'power2.out', immediateRender: false,
          scrollTrigger: { scroller, trigger: '.service-grid', start: 'top 90%', once: true },
          onComplete: () => gsap.set('.service', { clearProps: 'transform,opacity' })
        });

        const marquee = gsap.to('.marquee-track', { xPercent: -50, duration: 30, ease: 'none', repeat: -1 });
        let marqueeVisible = true;
        const syncMarquee = () => marquee.paused(document.hidden || !marqueeVisible);
        document.addEventListener('visibilitychange', syncMarquee, { signal });
        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver(entries => {
            marqueeVisible = entries[0].isIntersecting;
            syncMarquee();
          }, { root: scroller });
          observer.observe(document.querySelector('.marquee'));
          cleanups.push(() => observer.disconnect());
        }
        syncMarquee();
        // Faixas sem texto fazem a passagem marfim/bordô sem afetar a leitura.
        gsap.utils.toArray('.tone-layer').forEach(layer => {
          gsap.fromTo(layer, { opacity: 0 }, {
            opacity: 1, ease: 'none', immediateRender: false,
            scrollTrigger: { scroller, trigger: layer.parentElement, start: 'top 95%', end: 'bottom 75%', scrub: true }
          });
        });

        if (desktop.matches) {
          gsap.fromTo('.portrait-image', { scale: 1.04, yPercent: -1 }, {
            scale: 1.04, yPercent: 1, ease: 'none',
            scrollTrigger: { scroller, trigger: '.hero-portrait', start: 'top top', end: 'bottom top', scrub: .65 }
          });
          gsap.utils.toArray('.gallery-frame').forEach(frame => {
            gsap.fromTo(frame.querySelector('img'), { scale: 1.06, yPercent: -1 }, {
              scale: 1.04, yPercent: 1, ease: 'none',
              scrollTrigger: { scroller, trigger: frame, start: 'top bottom', end: 'bottom top', scrub: .65 }
            });
          });
          const reflection = document.querySelector('.glass-reflection');
          const shineX = gsap.quickTo(reflection, 'xPercent', { duration: .4, ease: 'power2.out' });
          const shineOpacity = gsap.quickTo(reflection, 'opacity', { duration: .3, ease: 'power2.out' });
          const glass = document.querySelector('.hero-glass');
          let rect;
          let pending = 0;
          let pointerX = 0;
          glass.addEventListener('pointerenter', event => {
            if (event.pointerType === 'mouse') rect = glass.getBoundingClientRect();
          }, { signal });
          glass.addEventListener('pointermove', event => {
            if (!rect || event.pointerType !== 'mouse') return;
            pointerX = Math.max(-.5, Math.min(.5, (event.clientX - rect.left) / rect.width - .5));
            if (pending) return;
            pending = requestAnimationFrame(() => { pending = 0; shineX(pointerX * 40); shineOpacity(.65); });
          }, { signal });
          const resetShine = (instant = false) => {
            cancelAnimationFrame(pending); pending = 0;
            shineX(0); shineOpacity(0);
            if (instant) { shineX.tween.progress(1).pause(); shineOpacity.tween.progress(1).pause(); }
          };
          glass.addEventListener('pointerleave', () => resetShine(), { signal });
          glass.addEventListener('focusin', () => resetShine(true), { signal });
          cleanups.push(() => cancelAnimationFrame(pending));

          document.querySelectorAll('.magnetic').forEach(button => {
            const xTo = gsap.quickTo(button, 'x', { duration: .25, ease: 'power2.out' });
            const yTo = gsap.quickTo(button, 'y', { duration: .25, ease: 'power2.out' });
            let bounds;
            let raf = 0;
            let point;
            button.addEventListener('pointerenter', event => {
              if (event.pointerType === 'mouse') bounds = button.getBoundingClientRect();
            }, { signal });
            button.addEventListener('pointermove', event => {
              if (!bounds || event.pointerType !== 'mouse') return;
              point = {
                x: Math.max(-4, Math.min(4, (event.clientX - bounds.left - bounds.width / 2) * .06)),
                y: Math.max(-4, Math.min(4, (event.clientY - bounds.top - bounds.height / 2) * .08))
              };
              if (raf) return;
              raf = requestAnimationFrame(() => { raf = 0; xTo(point.x); yTo(point.y); });
            }, { signal });
            const reset = (instant = false) => {
              cancelAnimationFrame(raf); raf = 0;
              xTo(0); yTo(0);
              if (instant) { xTo.tween.progress(1).pause(); yTo.tween.progress(1).pause(); }
            };
            button.addEventListener('pointerleave', () => reset(), { signal });
            button.addEventListener('focusin', () => reset(true), { signal });
            cleanups.push(() => cancelAnimationFrame(raf));
          });
        }
        let refreshFrame = 0;
        const refresh = () => {
          if (refreshFrame) return;
          refreshFrame = requestAnimationFrame(() => { refreshFrame = 0; ScrollTrigger.refresh(); });
        };
        cleanups.push(() => cancelAnimationFrame(refreshFrame));
        if (document.readyState === 'complete') refresh();
        else window.addEventListener('load', refresh, { once: true, signal });
        document.querySelectorAll('img[loading="lazy"]').forEach(image => image.addEventListener('load', refresh, { once: true, signal }));
        document.querySelectorAll('details').forEach(details => details.addEventListener('toggle', refresh, { signal }));
        if (document.fonts) document.fonts.ready.then(() => { if (!signal.aborted) refresh(); });
      });
    } catch {
      stop();
      if (toggle) toggle.hidden = true;
    }
  }
  function sync() {
    stop();
    if (toggle) {
      toggle.hidden = reduce.matches;
      toggle.textContent = paused ? 'Ativar efeitos' : 'Pausar efeitos';
      toggle.setAttribute('aria-pressed', String(paused));
    }
    start();
  }
  if (toggle) toggle.addEventListener('click', () => { paused = !paused; sync(); });
  reduce.addEventListener('change', sync);
  desktop.addEventListener('change', sync);
  sync();
})();
