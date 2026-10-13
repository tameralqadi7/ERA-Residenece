function initPreloader() {
  let e = !1;
  try {
    e = sessionStorage.getItem("hasVisited");
  } catch (e) {}
  (initLenis(),
    initCookies(),
    initAllParallax(),
    e ? animatePreloaederShort() : animatePreloaederIntro());
  try {
    sessionStorage.setItem("hasVisited", "true");
  } catch (e) {}
}
function animatePreloaederIntro() {
  const e = document.querySelector("[data-preloader]");
  if (!e)
    return (
      initPageTransitions(),
      void document.querySelector("[data-master-preloader]").remove()
    );
  const t = e.querySelectorAll('[data-part="a"]'),
    r = e.querySelectorAll('[data-part="h"]'),
    a = e.querySelectorAll('[data-part="p"]'),
    o = e.querySelectorAll('[data-part="ctn"]'),
    n = e.querySelectorAll('[data-part="line"]'),
    i = e.querySelector(".preloader_bg_a"),
    s = e.querySelector(".preloader_bg_decor"),
    l = e.querySelectorAll(".preloader_progress_track"),
    c = document.querySelector(".hero-w_bg_master_img");
  CustomEase.create(
    "loaderEase",
    "M0,0,C0,0,0.13,0.34,0.238,0.442,0.305,0.506,0.322,0.514,0.396,0.54,0.478,0.568,0.468,0.56,0.522,0.584,0.572,0.606,0.61,0.719,0.714,0.826,0.798,0.912,1,1,1,1",
  );
  const d = window.innerWidth >= breakPoint ? "24vw" : "40vw",
    u = window.innerWidth >= breakPoint ? "36vw" : "50vw",
    g = window.innerWidth >= breakPoint ? 0.75 : 1.15;
  (setTimeout(scrollToTop, 100),
    lockScroll(),
    c && gsap.set(c, { scale: g, transformOrigin: "center top" }));
  gsap
    .timeline()
    .set(e, { "--arch-w": d, "--arch-y": "104vh" })
    .add(() => {
      (animateTextA(t, "reveal"),
        animateTextH(r, "reveal"),
        animateTextP(a, "reveal"),
        animateCtn(o, "reveal", durS),
        animateLine(n, "reveal"));
    })
    .to({}, { duration: durL })
    .fromTo(i, { opacity: 0 }, { opacity: 0.05, duration: durL, ease: "Out" })
    .fromTo(s, { opacity: 0 }, { opacity: 1, duration: durL, ease: "Out" }, "<")
    .fromTo(
      l,
      { yPercent: -100 },
      { yPercent: 0, duration: 4, ease: "loaderEase" },
    )
    .fromTo(
      e,
      { "--arch-w": d, "--arch-y": "104vh" },
      {
        "--arch-w": u,
        "--arch-y": "15vh",
        duration: 1.25 * durL,
        ease: "InOut",
      },
    )
    .to(
      e,
      {
        "--arch-w": "125",
        "--arch-y": "-100vh",
        duration: 2 * durL,
        ease: "diveIn",
      },
      "<90%",
    )
    .add(() => {
      c &&
        gsap.fromTo(
          c,
          { scale: g },
          { scale: 1, duration: 1.25 * durL, ease: "InOut" },
        );
    }, "<")
    .add(() => {
      initPageTransitions();
    }, "<25%")
    .add(() => {
      (unlockScroll(), gsap.set(e, { display: "none" }));
    });
  document.querySelector("[data-master-preloader]").remove();
}
function animatePreloaederShort() {
  const e = document.querySelector("[data-preloader]");
  if (!e)
    return (
      initPageTransitions(),
      void document.querySelector("[data-master-preloader]").remove()
    );
  const t = e.querySelector(".preloader_ctn"),
    r = e.querySelector(".preloader_bg_a"),
    a = e.querySelector(".preloader_bg_decor"),
    o = document.querySelector(".hero-w_bg_master_img"),
    n = window.innerWidth >= breakPoint ? "24vw" : "40vw",
    i = window.innerWidth >= breakPoint ? "36vw" : "50vw",
    s = window.innerWidth >= breakPoint ? 0.75 : 1.15;
  (setTimeout(scrollToTop, 100),
    lockScroll(),
    o && gsap.set(o, { scale: s, transformOrigin: "center top" }));
  gsap
    .timeline()
    .set(e, { "--arch-w": n, "--arch-y": "104vh" })
    .set(t, { display: "none" })
    .fromTo(r, { opacity: 0 }, { opacity: 0.05, duration: durL, ease: "Out" })
    .fromTo(a, { opacity: 0 }, { opacity: 1, duration: durL, ease: "Out" }, "<")
    .fromTo(
      e,
      { "--arch-w": n, "--arch-y": "104vh" },
      {
        "--arch-w": i,
        "--arch-y": "15vh",
        duration: 1.25 * durL,
        ease: "InOut",
      },
      "<",
    )
    .to(
      e,
      {
        "--arch-w": "125",
        "--arch-y": "-100vh",
        duration: 2 * durL,
        ease: "diveIn",
      },
      "<90%",
    )
    .add(() => {
      o &&
        gsap.fromTo(
          o,
          { scale: s },
          { scale: 1, duration: 1.25 * durL, ease: "InOut" },
        );
    }, "<")
    .add(() => {
      initPageTransitions();
    }, "<25%")
    .add(() => {
      (unlockScroll(), gsap.set(e, { display: "none" }));
    });
  document.querySelector("[data-master-preloader]").remove();
}
function initPageTransitions() {
  async function e({ current: e }) {
    animateVisibleElements(e.container, "hide");
  }
  async function t({ current: e }) {
    return gsap.to(e.container, { opacity: 0, duration: durM, ease: "In" });
  }
  async function r({ current: e }) {
    (setTimeout(scrollToTop, 60),
      ScrollTrigger.getAll().forEach((e) => e.kill()),
      localLenisInstances.forEach((e) => {
        (e._ticker && gsap.ticker.remove(e._ticker), e.destroy());
      }),
      (localLenisInstances = []),
      e.container.remove());
  }
  async function a({ next: e }) {
    (gsap.set(e.container, { opacity: 0 }),
      initScripts(),
      initAllParallax(),
      ScrollTrigger.refresh(!0));
  }
  async function o({ next: e }) {
    return gsap.to(e.container, { opacity: 1, duration: durM, ease: "InOut" });
  }
  async function n(e) {
    initResetWebflow(e);
  }
  barba.init({
    debug: !1,
    transitions: [
      {
        name: "default",
        sync: !1,
        once(e) {
          initScripts();
        },
        async beforeLeave(t) {
          await e(t);
        },
        async leave(e) {
          await t(e);
        },
        async afterLeave(e) {
          await r(e);
        },
        async beforeEnter(e) {
          await a(e);
        },
        async enter(e) {
          await o(e);
        },
        async afterEnter(e) {
          await n(e);
        },
      },
    ],
  });
}
function initScripts() {
  (initTranistionFlow(),
    initLocalLenis(),
    initThemeChange(),
    initSnapSections(),
    initForm(),
    initUtmFields(),
    initPlayPauseVideoScroll(),
    initOther(),
    initIndexCounter(),
    fitText(),
    initBenefitCards(),
    initScrollRevealFirst(),
    initScrollElementsReveal(),
    initMagneticEffect(),
    initNavItemHover(),
    initLinkHover(),
    initBtnCircleHover(),
    initSelect(),
    initPins(),
    initLogo(),
    initScrollBar(),
    initTFTLjson(),
    initCardParts(),
    initAccordion(),
    initSlider(),
    initCarousel(),
    initLightbox(),
    initImageZoom(),
    initTabs(),
    initTabsHilight(),
    initTabsHero(),
    initModalCta(),
    initModalMenu(),
    initModalTip(),
    initFloatingTips(),
    initFilter(),
    initSort(),
    initReset());
}
function initLenis() {
  ((lenis = new Lenis({
    wrapper: window,
    duration: 1.2,
    smoothWheel: !0,
    touchMultiplier: 2,
    easing: (e) => Math.min(1, 1.001 - Math.pow(2, -10 * e)),
    infinite: !1,
  })),
    lenis.on("scroll", ScrollTrigger.update),
    gsap.ticker.add((e) => lenis.raf(1e3 * e)),
    gsap.ticker.lagSmoothing(0));
}
function initLocalLenis() {
  document.querySelectorAll("[data-lenis-scroll]").forEach((e) => {
    const t = new Lenis({
      wrapper: e,
      duration: 0.6,
      smoothWheel: !0,
      touchMultiplier: 2,
      easing: (e) => Math.min(1, 1.001 - Math.pow(2, -10 * e)),
      infinite: !1,
    });
    localLenisInstances.push(t);
    const r = (e) => t.raf(1e3 * e);
    (gsap.ticker.add(r), (t._ticker = r));
  });
}
function initCookies() {
  function e(e) {
    try {
      localStorage.setItem("cookies", e);
    } catch (e) {}
    gsap.to(t, {
      yPercent: 100,
      duration: durM,
      ease: "In",
      onComplete: () => t.remove(),
    });
  }
  const t = document.querySelector("[data-cookies]");
  if (!t) return;
  let r = null;
  try {
    r = localStorage.getItem("cookies");
  } catch (e) {}
  r
    ? t.remove()
    : (gsap.fromTo(
        t,
        { yPercent: 100 },
        { yPercent: 0, duration: durM, delay: delayReveal, ease: "Out" },
      ),
      document
        .querySelector('[data-cookies="accept"]')
        .addEventListener("click", () => e("accepted")),
      document
        .querySelector('[data-cookies="decline"]')
        .addEventListener("click", () => e("declined")));
}
function initThemeChange() {
  function e(e, r, a) {
    if ("none" === getComputedStyle(e).display) return;
    const o = e.getBoundingClientRect();
    t.forEach((t) => {
      const n = t.getBoundingClientRect(),
        i = n.left + n.width / 2;
      i < o.left ||
        i > o.right ||
        ScrollTrigger.create({
          trigger: e,
          start: () => `top top+=${n.top + n.height / 2}`,
          end: () => `bottom top+=${n.top + n.height / 2}`,
          markers: !1,
          onEnter: () => {
            (t.classList.add(r), t.classList.remove(...a));
          },
          onEnterBack: () => {
            (t.classList.add(r), t.classList.remove(...a));
          },
        });
    });
  }
  const t = document.querySelectorAll("[data-theme]");
  t.length &&
    (document.querySelectorAll('[data-bg="color"]').forEach((t) => {
      e(t, "theme_on-color", ["theme_on-light", "theme_on-dark"]);
    }),
    document.querySelectorAll('[data-bg="light"]').forEach((t) => {
      e(t, "theme_on-light", ["theme_on-dark", "theme_on-color"]);
    }),
    document.querySelectorAll('[data-bg="dark"]').forEach((t) => {
      e(t, "theme_on-dark", ["theme_on-light", "theme_on-color"]);
    }));
}
function initSnapSections() {
  gsap.matchMedia().add(`(min-width: ${breakPoint}px)`, () => {
    const e = gsap.utils.toArray("[data-snap]");
    if (!e.length || !lenis) return;
    let t = null;
    lenis.on("scroll", () => {
      (clearTimeout(t),
        (t = setTimeout(() => {
          const t = window.innerHeight;
          let r = null,
            a = 0;
          (e.forEach((e) => {
            const o = e.getBoundingClientRect(),
              n =
                (Math.min(o.bottom, t) - Math.max(o.top, 0)) /
                Math.min(e.offsetHeight, t);
            n > 0.5 && n > a && ((a = n), (r = e));
          }),
            r &&
              lenis.scrollTo(r, {
                duration: durL,
                easing: gsap.parseEase("Ease"),
              }));
        }, 40)));
    });
  });
}
function initForm() {
  (document.querySelectorAll("[data-form-btn]").forEach((e) => {
    e.addEventListener("click", (t) => {
      t.preventDefault();
      const r = e.closest("form");
      if (!r) return;
      const a = e.querySelectorAll('[hover="text"]'),
        o = () => {
          a.forEach((e) => {
            e.textContent = "Sending...";
          });
        };
      (r.addEventListener("submit", o, { once: !0 }), r.requestSubmit());
    });
  }),
    document.querySelectorAll(".input_field").forEach((e) => {
      const t = e.parentElement.querySelector(".input_label");
      t &&
        (e.addEventListener("focusin", () => t.classList.add("focused")),
        e.addEventListener("focusout", () => {
          e.value.trim() || t.classList.remove("focused");
        }));
    }),
    document.querySelectorAll('input[type="tel"]').forEach((e) => {
      e.addEventListener("input", () => {
        e.value = e.value.replace(/[^\d+\-]/g, "");
      });
    }),
    document.querySelectorAll('input[name="Name"]').forEach((e) => {
      e.addEventListener("input", () => {
        e.value = e.value.replace(
          /[\d!@#$%^&*()_+=\[\]{};:'"\\|,.<>/?~`]/g,
          "",
        );
      });
    }));
}
function initUtmFields() {
  const e = document.querySelector('input[name="title"]');
  e && (e.value = "Deal from Era");
  const t = new URLSearchParams(window.location.search),
    r = {
      utm_source: t.get("utm_source") || "",
      utm_medium: t.get("utm_medium") || "",
      utm_campaign: t.get("utm_campaign") || "",
      utm_content: t.get("utm_content") || "",
      utm_url: t.get("utm_url") || "",
      page_url: window.location.href,
    };
  Object.entries(r).forEach(([e, t]) => {
    const r = document.querySelector(`input[name="${e}"]`);
    r && (r.value = t);
  });
}
function initPlayPauseVideoScroll() {
  gsap.utils.toArray("[data-video-playpause]").forEach((e) => {
    const t = e.querySelectorAll(".video");
    t.length &&
      (t.forEach((e) => {
        (e.load(), (e.currentTime = 0));
      }),
      ScrollTrigger.create({
        trigger: e,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => t.forEach((e) => e.play().catch(() => {})),
        onEnterBack: () => t.forEach((e) => e.play().catch(() => {})),
        onLeave: () => t.forEach((e) => e.pause()),
        onLeaveBack: () => t.forEach((e) => e.pause()),
      }));
  });
}
function animateTextA(e, t, r) {
  const a = gsap.utils.toArray(e);
  a.length &&
    a.forEach((e, a) => {
      if (!e.textContent.trim()) return;
      e._split ||
        (e._split = new SplitText(e, {
          type: "chars",
          tag: "span",
          charsClass: "split-char",
          smartWrap: !0,
        }));
      const o = a * stagger * 1;
      switch (t) {
        case "reveal":
          gsap.fromTo(
            e._split.chars,
            {
              opacity: 0,
              rotateX: 90,
              x: "10rem",
              transformOrigin: "center bottom",
            },
            {
              opacity: 1,
              rotateX: 0,
              x: "0rem",
              duration: durL,
              delay: (r ?? delayReveal) + o,
              stagger: stagger,
              ease: "Out",
              overwrite: !0,
            },
          );
          break;
        case "hide":
          gsap.to(e._split.chars, {
            opacity: 0,
            rotateX: -90,
            x: "-10rem",
            transformOrigin: "center top",
            duration: durS,
            delay: r ?? 0,
            stagger: 0.5 * stagger,
            ease: "In",
            overwrite: !0,
          });
          break;
        case "initial":
          gsap.set(e._split.chars, {
            opacity: 0,
            rotateX: -90,
            x: "-10rem",
            transformOrigin: "center top",
          });
      }
    });
}
function animateTextH(e, t, r) {
  const a = gsap.utils.toArray(e);
  a.length &&
    a.forEach((e, a) => {
      if (!e.textContent.trim()) return;
      e._split ||
        (e._split = new SplitText(e, {
          type: "words,chars",
          tag: "span",
          wordsClass: "split-word",
          charsClass: "split-char",
          smartWrap: !0,
        }));
      const o = a * stagger;
      switch (t) {
        case "reveal":
          gsap.fromTo(
            e._split.chars,
            { opacity: 0, yPercent: 50, rotateY: 90 },
            {
              opacity: 1,
              yPercent: 0,
              rotateY: 0,
              duration: durL,
              delay: (r ?? delayReveal) + o,
              stagger: 0.5 * stagger,
              ease: "Out",
              overwrite: !0,
            },
          );
          break;
        case "hide":
          gsap.to(e._split.chars, {
            opacity: 0,
            yPercent: -50,
            rotateY: -90,
            duration: durS,
            delay: r ?? 0,
            stagger: 0.25 * stagger,
            ease: "In",
            overwrite: !0,
          });
          break;
        case "initial":
          gsap.set(e._split.chars, { opacity: 0, yPercent: 50, rotateY: 90 });
      }
    });
}
function animateTextP(e, t, r) {
  const a = gsap.utils.toArray(e);
  a.length &&
    a.forEach((e, a) => {
      if (!e.textContent.trim()) return;
      e._split ||
        ((e._split = new SplitText(e, {
          type: "lines,words",
          tag: "span",
          linesClass: "split-line",
          wordsClass: "split-word",
          mask: "lines",
        })),
        e.querySelectorAll("br").forEach((e) => {
          "BR" !== e.nextSibling?.nodeName &&
            e.after(document.createElement("br"));
        }));
      const o = a * stagger;
      switch (t) {
        case "reveal":
          gsap.fromTo(
            e._split.lines,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: durL,
              delay: (r ?? delayReveal) + o,
              stagger: stagger,
              ease: "Out",
              overwrite: !0,
            },
          );
          break;
        case "hide":
          gsap.to(e._split.lines, {
            yPercent: -110,
            duration: durS,
            delay: r ?? 0,
            stagger: 0.5 * stagger,
            ease: "In",
            overwrite: !0,
          });
          break;
        case "initial":
          gsap.set(e._split.lines, { yPercent: 110 });
      }
    });
}
function animateCtn(e, t, r) {
  const a = gsap.utils.toArray(e);
  if (!a.length) return;
  const o = window.innerWidth >= breakPoint ? "3.333rem" : "11.54rem";
  switch (t) {
    case "reveal":
      gsap.fromTo(
        a,
        { opacity: 0, y: o },
        {
          opacity: 1,
          y: "0rem",
          duration: durL,
          delay: r ?? delayReveal,
          stagger: stagger,
          ease: "Out",
          overwrite: !0,
        },
      );
      break;
    case "hide":
      gsap.to(a, {
        opacity: 0,
        y: "0rem",
        duration: durS,
        delay: r ?? 0,
        stagger: 0.5 * stagger,
        ease: "In",
        overwrite: !0,
      });
      break;
    case "initial":
      gsap.set(a, { opacity: 0, y: o });
  }
}
function animateLine(e, t, r) {
  const a = gsap.utils.toArray(e);
  if (a.length)
    switch (t) {
      case "reveal":
        gsap.fromTo(
          a,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: durL,
            delay: r ?? delayReveal,
            stagger: stagger,
            ease: "Out",
            overwrite: !0,
          },
        );
        break;
      case "hide":
        gsap.to(a, {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: durS,
          delay: r ?? 0,
          stagger: 0.5 * stagger,
          ease: "In",
          overwrite: !0,
        });
        break;
      case "initial":
        gsap.set(a, { clipPath: "inset(0% 0% 100% 0%)" });
    }
}
function animateSlide(e, t, r) {
  const a = gsap.utils.toArray(e);
  if (!a.length) return;
  const o = a.map((e) => e.firstElementChild);
  switch (t) {
    case "reveal":
      (gsap.fromTo(
        a,
        { clipPath: "polygon(100% 0%, 100% 0%, 101% 100%, 125% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: durL,
          delay: r ?? delayReveal,
          ease: "InOut",
          overwrite: !0,
        },
      ),
        gsap.fromTo(
          o,
          { scale: 1.5, xPercent: 25 },
          {
            scale: 1,
            xPercent: 0,
            duration: durL,
            delay: r ?? delayReveal,
            ease: "InOut",
            overwrite: !0,
          },
        ));
      break;
    case "hide":
      (gsap.fromTo(
        a,
        { clipPath: "polygon(0% 0%, 100% 0%, 125% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          duration: durL,
          delay: r ?? 0,
          ease: "InOut",
          overwrite: !0,
        },
      ),
        gsap.to(o, {
          scale: 1.5,
          xPercent: -25,
          duration: durL,
          delay: r ?? 0,
          ease: "InOut",
          overwrite: !0,
        }));
      break;
    case "initial":
      (gsap.set(a, { clipPath: "inset(100% 0% 0% 0%)" }),
        gsap.set(o, { scale: 1.5, xPercent: 25 }));
  }
}
function animateVisibleElements(e = document, t) {
  const r = {
    a: animateTextA,
    h: animateTextH,
    p: animateTextP,
    ctn: animateCtn,
    line: animateLine,
    slide: animateSlide,
  };
  Object.keys(r).forEach((a) => {
    const o = e.querySelectorAll(
      `[data-scroll-reveal="${a}"], [data-part="${a}"]`,
    );
    o.length &&
      o.forEach((e) => {
        const o = e.getBoundingClientRect();
        o.top < window.innerHeight && o.bottom > 0 && r[a](e, t, 0);
      });
  });
}
function lockScroll() {
  const e = window.innerWidth - document.documentElement.clientWidth;
  (document.documentElement.style.setProperty("--scrollbar-width", `${e}px`),
    (document.body.style.paddingRight = "var(--scrollbar-width)"),
    (document.documentElement.style.overflow = "hidden"),
    lenis.stop());
}
function unlockScroll() {
  (document.documentElement.style.removeProperty("--scrollbar-width"),
    (document.body.style.paddingRight = ""),
    (document.documentElement.style.overflow = ""),
    lenis.start());
}
function scrollToTop() {
  (window.scrollTo(0, 0),
    (document.body.scrollTop = 0),
    (document.documentElement.scrollTop = 0),
    lenis && lenis.scrollTo(0, { immediate: !0 }));
}
function initResetWebflow(e) {
  let t = new DOMParser()
    .parseFromString(e.next.html, "text/html")
    .querySelector("html")
    .getAttribute("data-wf-page");
  (document.documentElement.setAttribute("data-wf-page", t),
    window.Webflow.destroy(),
    window.Webflow.ready());
}
function initOther() {
  const e = document.querySelectorAll(".year");
  if (e.length) {
    const t = new Date().getFullYear();
    e.forEach((e) => {
      e.textContent = t;
    });
  }
  const t = document.querySelector("[data-btn-back]");
  t && t.addEventListener("click", () => history.back());
  const r = document.querySelector('[data-scroll-trigger="refresh"]');
  if (r) {
    new IntersectionObserver(([e]) => {
      e.isIntersecting && ScrollTrigger.refresh();
    }).observe(r);
  }
  const a = document.querySelectorAll("[data-comma-list]");
  (a.length &&
    a.forEach((e) => {
      const t = e.querySelectorAll("[data-comma]");
      t.length && t[t.length - 1].remove();
    }),
    gsap.matchMedia().add(`(max-width: ${breakPoint - 1}px)`, () => {
      const e = document.querySelector(".loc-path-s_path");
      e && (e.scrollLeft = (e.scrollWidth - e.clientWidth) / 2);
    }),
    document.querySelectorAll("[data-crumb-item]").forEach((e) => {
      "#" === e?.getAttribute("href") && e.classList.add("is-active");
    }),
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
      (document
        .querySelectorAll('source[src$=".webm"]')
        .forEach((e) => e.remove()),
      document.querySelectorAll("video").forEach((e) => {
        e.closest(".hero-w") ||
          e.closest(".cta-w") ||
          (e.load(), e.play().catch(() => {}));
      })));
}
function initIndexCounter() {
  const e = document.querySelectorAll("[data-index]");
  e.length &&
    e.forEach((e) => {
      e.querySelectorAll('[data-index="text"]').forEach((e, t) => {
        e.textContent = `${t + 1}.0`;
      });
    });
}
function fitText() {
  (document.querySelectorAll("[data-fit-text]").forEach((e) => {
    ((e.style.whiteSpace = "nowrap"),
      (e.style.fontSize = ""),
      (e.style.width = "max-content"));
    const t = e.parentElement.clientWidth,
      r = e.offsetWidth,
      a = parseFloat(getComputedStyle(e).fontSize);
    ((e.style.width = ""), (e.style.fontSize = a * (t / r) + "px"));
  }),
    window.addEventListener("resize", fitText, { once: !0 }));
}
function initBenefitCards() {
  function e() {
    const e = getComputedStyle(t).gridTemplateColumns.split(" ").length,
      a = window.innerWidth < breakPoint,
      o = a ? 8 : 2,
      n = (t) => (a ? 1 : t % 2 == 1 ? e : 1);
    r.forEach((e, t) => {
      const r = t + 1;
      ((e.style.gridRow = String(o * r)), (e.style.gridColumn = String(n(r))));
    });
    const i = [...t.querySelectorAll("[data-filter-item]")].filter(
      (e) => "none" !== e.style.display,
    ).length;
    let s = 0,
      l = 0,
      c = 1;
    for (; s < i;) {
      for (let t = 1; t <= e && s < i; t++) {
        c % o == 0 && t === n(c / o) ? l++ : s++;
      }
      c++;
    }
    r.forEach((e, t) => {
      gsap.set(e, { display: t < l ? "" : "none" });
    });
  }
  const t = document.querySelector(".apart-cms_list");
  if (!t) return;
  const r = [...document.querySelectorAll(".benefit-card")].filter(
    (e) => !t.contains(e),
  );
  if (!r.length) return;
  (r.forEach((e) => t.appendChild(e)), e());
  const a = new MutationObserver(() => e());
  t.querySelectorAll("[data-filter-item]").forEach((e) => {
    a.observe(e, { attributes: !0, attributeFilter: ["style"] });
  });
  let o = null;
  window.addEventListener("resize", () => {
    (clearTimeout(o), (o = setTimeout(e, 40)));
  });
}
function initScrollRevealFirst() {
  const e = document.querySelectorAll("[data-reveal-first]");
  if (!e.length) return;
  const t = new Map();
  (e.forEach((e) => {
    const r = e.parentElement;
    (t.has(r) || t.set(r, []), t.get(r).push(e));
  }),
    t.forEach((e) => {
      e.slice(1).forEach((e) => {
        e.querySelectorAll("[data-scroll-reveal]").forEach((e) =>
          e.removeAttribute("data-scroll-reveal"),
        );
      });
    }));
}
function initAllParallax() {
  (gsap.utils.toArray('[data-parallax="img"]').forEach((e) => {
    const t = e.closest('[data-parallax="w"]');
    if (!t) return;
    const r = window.innerWidth < breakPoint;
    (r && "off" === t.dataset.mob) ||
      ((r || "off" !== t.dataset.desk) &&
        gsap.fromTo(
          e,
          { yPercent: -15, translateZ: 10 },
          {
            yPercent: 15,
            translateZ: 10,
            ease: "none",
            scrollTrigger: { trigger: t, start: "top bottom", scrub: 0.5 },
          },
        ));
  }),
    gsap.utils.toArray('[data-parallax="img-out"]').forEach((e) => {
      const t = e.closest('[data-parallax="w"]');
      if (!t) return;
      const r = window.innerWidth < breakPoint;
      (r && "off" === t.dataset.mob) ||
        ((r || "off" !== t.dataset.desk) &&
          gsap.fromTo(
            e,
            { yPercent: 0, translateZ: 10 },
            {
              yPercent: 20,
              translateZ: 10,
              ease: "none",
              scrollTrigger: {
                trigger: t,
                start: "bottom bottom",
                end: "bottom top",
                scrub: 0.5,
              },
            },
          ));
    }),
    gsap.utils.toArray('[data-parallax="img-in"]').forEach((e) => {
      const t = e.closest('[data-parallax="w"]');
      if (!t) return;
      const r = window.innerWidth < breakPoint;
      (r && "off" === t.dataset.mob) ||
        ((r || "off" !== t.dataset.desk) &&
          gsap.fromTo(
            e,
            { yPercent: -20, translateZ: 10 },
            {
              yPercent: 0,
              translateZ: 10,
              ease: "none",
              scrollTrigger: {
                trigger: t,
                start: "top bottom",
                end: "bottom bottom",
                scrub: !0,
              },
            },
          ));
    }),
    gsap.utils.toArray('[data-parallax="ctn-down"]').forEach((e) => {
      if (!e) return;
      const t = window.innerWidth < breakPoint;
      (t && "off" === e.dataset.mob) ||
        ((t || "off" !== e.dataset.desk) &&
          gsap.fromTo(
            e,
            { yPercent: -10 },
            {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: e,
                start: "top 125%",
                end: "bottom -25%",
                scrub: 0.5,
              },
            },
          ));
    }),
    gsap.utils.toArray('[data-parallax="ctn-up"]').forEach((e) => {
      if (!e) return;
      const t = window.innerWidth < breakPoint;
      (t && "off" === e.dataset.mob) ||
        ((t || "off" !== e.dataset.desk) &&
          gsap.fromTo(
            e,
            { yPercent: 10 },
            {
              yPercent: -10,
              ease: "none",
              scrollTrigger: {
                trigger: e,
                start: "top 125%",
                end: "bottom -25%",
                scrub: 0.5,
              },
            },
          ));
    }));
}
function initScrollElementsReveal() {
  function e(e, t, r) {
    const a = e.closest("[data-scroll-horizontal]");
    ScrollTrigger.create({
      trigger: e,
      containerAnimation: a?._horizontalTween,
      start: a ? "left bottom" : "top bottom",
      once: !0,
      onEnter: () => r(t, "reveal"),
    });
  }
  const t = document.querySelectorAll('[data-scroll-reveal="a"]');
  if (t.length) {
    const r = new Map();
    (t.forEach((e) => {
      const t = e.closest('[data-scroll-reveal="w"]') || e;
      (r.has(t) || r.set(t, { trigger: t, items: [] }), r.get(t).items.push(e));
    }),
      r.forEach(({ trigger: t, items: r }) => {
        (gsap.set(r, { visibility: "visible" }),
          e(t, r, animateTextA),
          animateTextA(r, "initial"));
      }));
  }
  const r = document.querySelectorAll('[data-scroll-reveal="h"]');
  if (r.length) {
    const t = new Map();
    (r.forEach((e) => {
      const r = e.closest('[data-scroll-reveal="w"]') || e;
      (t.has(r) || t.set(r, { trigger: r, items: [] }), t.get(r).items.push(e));
    }),
      t.forEach(({ trigger: t, items: r }) => {
        (gsap.set(r, { visibility: "visible" }),
          e(t, r, animateTextH),
          animateTextH(r, "initial"));
      }));
  }
  const a = document.querySelectorAll('[data-scroll-reveal="p"]');
  if (a.length) {
    const t = new Map();
    (a.forEach((e) => {
      const r = e.closest('[data-scroll-reveal="w"]') || e;
      (t.has(r) || t.set(r, { trigger: r, items: [] }), t.get(r).items.push(e));
    }),
      t.forEach(({ trigger: t, items: r }) => {
        (gsap.set(r, { visibility: "visible" }),
          e(t, r, animateTextP),
          animateTextP(r, "initial"));
      }));
  }
  const o = document.querySelectorAll('[data-scroll-reveal="ctn"]');
  if (o.length) {
    const t = new Map();
    (o.forEach((e) => {
      const r = e.closest('[data-scroll-reveal="w"]') || e;
      (t.has(r) || t.set(r, { trigger: r, items: [] }), t.get(r).items.push(e));
    }),
      t.forEach(({ trigger: t, items: r }) => {
        (gsap.set(r, { visibility: "visible" }),
          e(t, r, animateCtn),
          animateCtn(r, "initial"));
      }));
  }
  const n = document.querySelectorAll('[data-scroll-reveal="line"]');
  if (n.length) {
    const t = new Map();
    (n.forEach((e) => {
      const r = e.closest('[data-scroll-reveal="w"]') || e;
      (t.has(r) || t.set(r, { trigger: r, items: [] }), t.get(r).items.push(e));
    }),
      t.forEach(({ trigger: t, items: r }) => {
        (gsap.set(r, { visibility: "visible" }),
          e(t, r, animateLine),
          animateLine(r, "initial"));
      }));
  }
  const i = document.querySelectorAll('[data-scroll-reveal="slide"]');
  if (i.length) {
    const t = new Map();
    (i.forEach((e) => {
      const r = e.closest('[data-scroll-reveal="w"]') || e;
      (t.has(r) || t.set(r, { trigger: r, items: [] }), t.get(r).items.push(e));
    }),
      t.forEach(({ trigger: t, items: r }) => {
        (gsap.set(r, { visibility: "visible" }),
          e(t, r, animateSlide),
          animateSlide(r, "initial"));
      }));
  }
}
function initMagneticEffect() {
  gsap.matchMedia().add(`(min-width: ${breakPoint}px)`, () => {
    const e = document.querySelectorAll("[data-magnetic-btn]"),
      t = (e, t) => {
        (gsap.killTweensOf(e),
          (t ? gsap.set : gsap.to)(e, {
            x: 0,
            y: 0,
            force3D: !0,
            clearProps: "all",
            ...(!t && { ease: "elastic.out(1, 0.3)", duration: 1.6 }),
          }));
      },
      r = (e) => e.querySelectorAll("[data-magnetic-inner]"),
      a = (e) => {
        const a = e.currentTarget;
        (t(a, !0), r(a).forEach((e) => t(e, !0)));
      },
      o = (e) => {
        const t = e.currentTarget,
          a = t.getBoundingClientRect(),
          o = parseFloat(t.dataset.magneticStrength) || 25,
          n = parseFloat(t.dataset.magneticStrengthInner) || o,
          i = ((e.clientX - a.left) / t.offsetWidth - 0.5) * (o / 16),
          s = ((e.clientY - a.top) / t.offsetHeight - 0.5) * (o / 16);
        (gsap.to(t, {
          x: i + "em",
          y: s + "em",
          force3D: !0,
          ease: "power4.out",
          duration: 1.6,
        }),
          r(t).forEach((r) => {
            gsap.to(r, {
              x: ((e.clientX - a.left) / t.offsetWidth - 0.5) * (n / 16) + "em",
              y: ((e.clientY - a.top) / t.offsetHeight - 0.5) * (n / 16) + "em",
              force3D: !0,
              ease: "power4.out",
              duration: 2,
            });
          }));
      },
      n = (e) => {
        const a = e.currentTarget;
        (t(a, !1), r(a).forEach((e) => t(e, !1)));
      };
    e.forEach((e) => {
      (e.addEventListener("mouseenter", a),
        e.addEventListener("mousemove", o),
        e.addEventListener("mouseleave", n));
    });
  });
}
function initNavItemHover() {
  function e(e) {
    return (t, r, a) => {
      const o = a.map((e) => e.getBoundingClientRect().left),
        n = Math.min(...o),
        i = Math.max(...o) - n || 1;
      return ((o[t] - n) / i) * e;
    };
  }
  document.querySelectorAll("[hover-nav-item]").forEach((t) => {
    function r() {
      (gsap.fromTo(
        n.chars,
        { opacity: 1, yPercent: 0 },
        {
          opacity: 0,
          yPercent: -100,
          duration: durM,
          ease: "Ease",
          stagger: e(2 * stagger),
          overwrite: !0,
          force3D: !0,
        },
      ),
        gsap.fromTo(
          i.chars,
          { yPercent: 100, opacity: 0 },
          {
            opacity: 1,
            yPercent: 0,
            duration: durM,
            ease: "Ease",
            stagger: e(2 * stagger),
            overwrite: !0,
            force3D: !0,
          },
        ));
    }
    function a() {
      (gsap.to(n.chars, {
        opacity: 1,
        yPercent: 0,
        duration: durM,
        ease: "Ease",
        stagger: e(2 * stagger),
        overwrite: !0,
        force3D: !0,
      }),
        gsap.to(i.chars, {
          opacity: 0,
          yPercent: 100,
          duration: durM,
          ease: "Ease",
          stagger: e(2 * stagger),
          overwrite: !0,
          force3D: !0,
        }));
    }
    const o = t.querySelectorAll("[hover='text']");
    if (o.length < 2) return;
    const n = new SplitText(o[0], {
        type: "words,chars",
        tag: "span",
        smartWrap: !0,
        wordsClass: "split-word",
        charsClass: "split-char",
        mask: "words",
      }),
      i = new SplitText(o[1], {
        type: "words,chars",
        tag: "span",
        smartWrap: !0,
        wordsClass: "split-word",
        charsClass: "split-char",
        mask: "words",
      });
    gsap.set(i.chars, { yPercent: 100, opacity: 0 });
    const s = t.closest("[hover-nav-item-trigger]") || t;
    (s.addEventListener("mouseenter", r), s.addEventListener("mouseleave", a));
  });
}
function initLinkHover() {
  document.querySelectorAll("[hover-link]").forEach((e) => {
    function t() {
      (gsap.fromTo(
        o.chars,
        { opacity: 1, x: "0em", yPercent: 0, rotateY: 0 },
        {
          opacity: 0,
          x: "0.4em",
          yPercent: -25,
          rotateY: -90,
          duration: durM,
          ease: "Out",
          stagger: stagger / 4,
          overwrite: !0,
          force3D: !0,
        },
      ),
        gsap.fromTo(
          n.chars,
          { opacity: 0, x: "-0.4em", yPercent: 25, rotateY: 90 },
          {
            opacity: 1,
            x: "0em",
            yPercent: 0,
            rotateY: 0,
            duration: durM,
            ease: "Out",
            delay: 0.2,
            stagger: stagger / 4,
            overwrite: !0,
            force3D: !0,
          },
        ),
        gsap.fromTo(
          i,
          { scaleX: 1, transformOrigin: "right center" },
          {
            scaleX: 0,
            duration: durM,
            ease: "Out",
            stagger: stagger,
            overwrite: !0,
          },
        ));
    }
    function r() {
      (gsap.to(o.chars, {
        opacity: 1,
        x: "0em",
        yPercent: 0,
        rotateY: 0,
        duration: durM,
        ease: "Out",
        delay: 0.2,
        stagger: stagger / 4,
        overwrite: !0,
        force3D: !0,
      }),
        gsap.to(n.chars, {
          opacity: 0,
          x: "-0.4em",
          yPercent: 25,
          rotateY: 90,
          duration: durM,
          ease: "Out",
          stagger: stagger / 4,
          overwrite: !0,
          force3D: !0,
        }),
        gsap.to(i, {
          scaleX: 1,
          transformOrigin: "left center",
          duration: durM,
          ease: "Out",
          stagger: stagger,
          overwrite: !0,
        }));
    }
    const a = e.querySelectorAll("[hover='text']");
    if (a.length < 2) return;
    const o = new SplitText(a[0], {
        type: "lines,words,chars",
        tag: "span",
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
        smartWrap: !0,
      }),
      n = new SplitText(a[1], {
        type: "words,chars",
        tag: "span",
        wordsClass: "split-word",
        charsClass: "split-char",
        smartWrap: !0,
      }),
      i = o.lines.map((e) => {
        const t = document.createElement("span");
        return (t.classList.add("link_line"), e.appendChild(t), t);
      });
    (gsap.set(i, { scaleX: 1, transformOrigin: "right center" }),
      gsap.set(n.chars, {
        opacity: 0,
        x: "-0.4em",
        yPercent: 25,
        rotateY: 90,
      }));
    const s = e.closest("[hover-link-trigger]") || e;
    (s.addEventListener("mouseenter", t), s.addEventListener("mouseleave", r));
  });
}
function initBtnCircleHover() {
  document.querySelectorAll("[hover-btn-circle]").forEach((e) => {
    const t = e.querySelectorAll("[data-arc]");
    if (!t.length) return;
    const r = 2 * Math.PI * 103.5,
      a = 0.0417 * r;
    gsap.set(t, { strokeDasharray: `${a} ${r}` });
    const o = gsap
      .timeline({ paused: !0 })
      .to(t, {
        strokeDasharray: `${r / 2} ${r}`,
        duration: durM,
        ease: "InOut",
      });
    (e.addEventListener("mouseenter", () => o.play()),
      e.addEventListener("mouseleave", () => o.reverse()));
  });
}
function initSelect() {
  document.querySelectorAll('[data-select=""]').forEach((e) => {
    function t() {
      const e = [...o].filter((e) => e.classList.contains("is-active"));
      let t;
      ((t = e.length
        ? 1 === e.length
          ? e[0].textContent.trim()
          : `${e[0].textContent.trim()} +${e.length - 1}`
        : n),
        a.forEach((e) => (e.textContent = t)));
    }
    const r = e.querySelector('[data-select="btn"]'),
      a = e.querySelectorAll('[data-select="value"]'),
      o = e.querySelectorAll('[data-select="item"]'),
      n = a[0]?.textContent;
    (r.addEventListener("click", () => {
      e.classList.toggle("is-open");
    }),
      o.forEach((r) => {
        r.addEventListener("click", () => {
          (e.classList.remove("is-open"), requestAnimationFrame(t));
        });
      }),
      document.addEventListener("click", (t) => {
        e.contains(t.target) || e.classList.remove("is-open");
      }),
      t());
  });
}
function initPins() {
  const e = document.querySelectorAll("[data-pin]");
  e.length &&
    e.forEach((e) => {
      const t = e.querySelector('[data-ico-plus="v"]'),
        r = e.querySelectorAll("[data-pin-pulse]"),
        a = e.offsetWidth;
      if (
        (r.length &&
          gsap.fromTo(
            r,
            { opacity: 1, width: a, height: a },
            {
              opacity: 0,
              width: 1.6 * a,
              height: 1.6 * a,
              duration: durL,
              ease: "In",
              stagger: 0.2,
              repeat: -1,
            },
          ),
        t)
      ) {
        function o() {
          gsap.fromTo(
            t,
            { rotate: 0 },
            { rotate: -90, duration: durM, ease: "Out", overwrite: !0 },
          );
        }
        function n() {
          gsap.to(t, {
            rotate: -180,
            duration: durM,
            ease: "Out",
            overwrite: !0,
          });
        }
        (e.addEventListener("mouseenter", o),
          e.addEventListener("mouseleave", n));
      }
    });
}
function initLogo() {
  const e = document.querySelector(".header-logo");
  if (!e) return;
  const t = [...e.querySelectorAll(".header-logo_bg")].find(
    (e) => "none" !== getComputedStyle(e).display,
  );
  if (!t) return;
  const r = { speed: 30 };
  let a,
    o = 1,
    n = 0,
    i = !1;
  (window.addEventListener(
    "wheel",
    () => {
      i = !0;
    },
    { once: !0 },
  ),
    window.addEventListener(
      "touchmove",
      () => {
        i = !0;
      },
      { once: !0 },
    ),
    gsap.ticker.add((e, a) => {
      const o = Math.min(a, 100);
      ((n += r.speed * (o / 1e3)),
        gsap.set(t, { rotation: n, transformOrigin: "center center" }));
    }),
    lenis.on("scroll", ({ velocity: e }) => {
      if (!i) return;
      0 !== e && (o = e > 0 ? 1 : -1);
      const t = o * (30 + 10 * Math.abs(e));
      (gsap.to(r, { speed: t, duration: 0.3, ease: "Out", overwrite: !0 }),
        clearTimeout(a),
        (a = setTimeout(() => {
          gsap.to(r, { speed: 30 * o, duration: durL, ease: "Out" });
        }, 100)));
    }));
}
function initScrollBar() {
  gsap.matchMedia().add(`(min-width: ${breakPoint}px)`, () => {
    const e = document.querySelector("[data-s-bar]");
    if (!e) return;
    const t = e.querySelector("[data-s-bar-thumb]"),
      r = e.querySelector("[data-s-bar-label]");
    ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (t) => {
        const a = Math.round(100 * t.progress);
        (e.style.setProperty("--progress", 100 * t.progress + "%"),
          r && (r.textContent = `${String(a).padStart(2, "0")}`));
      },
    });
    let a = !1;
    (t.addEventListener("pointerenter", () => {
      document.body.style.cursor = "grab";
    }),
      t.addEventListener("pointerleave", () => {
        a || (document.body.style.cursor = "");
      }),
      t.addEventListener("pointerdown", (e) => {
        ((a = !0),
          t.setPointerCapture(e.pointerId),
          (document.body.style.cursor = "grabbing"));
      }),
      t.addEventListener("pointermove", (t) => {
        if (!a) return;
        const r = e.getBoundingClientRect(),
          o = Math.max(0, Math.min(1, (t.clientY - r.top) / r.height)),
          n = document.documentElement.scrollHeight - window.innerHeight;
        lenis.scrollTo(o * n, { duration: 3.2 });
      }),
      t.addEventListener("pointerup", () => {
        ((a = !1), (document.body.style.cursor = "grab"));
      }));
  });
}
function initTFTLjson() {
  document.querySelectorAll(".credits").forEach((e) => {
    const t = e.querySelector(".credits_logo");
    if (!t) return;
    const r = lottie.loadAnimation({
      container: t,
      renderer: "svg",
      loop: !1,
      autoplay: !1,
      path: t.getAttribute("data-json"),
    });
    r.goToAndStop(0, !0);
    const a = 99,
      o = gsap.timeline({ paused: !0 });
    (o.to(
      { p: 0 },
      {
        p: 1,
        duration: 1,
        ease: "none",
        onUpdate: function () {
          const e = Math.round(this.targets()[0].p * (a - 1));
          r.goToAndStop(e, !0);
        },
      },
    ),
      e.addEventListener("mouseenter", () => {
        gsap.to(o, { progress: 0.5, duration: 1 });
      }),
      e.addEventListener("mouseleave", () => {
        gsap.to(o, { progress: 1, duration: 1 });
      }));
  });
}
function initCardParts() {
  document.querySelectorAll("[hover-card]").forEach((e) => {
    function t() {
      (animateTextH(a, "reveal", 0),
        animateTextP(o, "reveal", 0),
        animateLine(n, "reveal", 0));
    }
    function r() {
      (animateTextH(a, "hide", 0),
        animateTextP(o, "hide", 0),
        animateLine(n, "hide", 0));
    }
    e.querySelector('[hover="info"]');
    const a = e.querySelectorAll('[hover="h"]'),
      o = e.querySelectorAll('[hover="p"]'),
      n = e.querySelectorAll('[hover="line"]');
    (animateTextH(a, "initial"),
      animateTextP(o, "initial"),
      animateLine(n, "initial"),
      e.addEventListener("mouseenter", t),
      e.addEventListener("mouseleave", r));
  });
}
function initAccordion() {
  let e = null;
  (document.querySelectorAll("[data-accordion-card]").forEach((t) => {
    function r() {
      (t.classList.add("is-active"),
        gsap.to(o, {
          height: "auto",
          duration: durL,
          ease: "Out",
          onComplete: () => {
            ScrollTrigger.refresh();
          },
        }),
        gsap.fromTo(
          n,
          { rotate: 0 },
          { rotate: -45, duration: durM, ease: "InOut", overwrite: !0 },
        ),
        animateTextP(i, "reveal"),
        animateCtn(s, "reveal"));
    }
    function a() {
      (t.classList.remove("is-active"),
        gsap.to(o, {
          height: 0,
          duration: durL,
          ease: "Out",
          onComplete: () => {
            ScrollTrigger.refresh();
          },
          overwrite: !0,
        }),
        gsap.to(n, {
          rotate: -90,
          duration: durM,
          ease: "InOut",
          overwrite: !0,
        }),
        animateTextP(i, "hide", 0),
        animateCtn(s, "hide", 0));
    }
    const o = t.querySelector('[data-accordion-card="content"]'),
      n = t.querySelector("[data-ico-plus]"),
      i = t.querySelectorAll('[data-accordion-card="p"]'),
      s = t.querySelectorAll('[data-accordion-card="ctn"]');
    o &&
      (gsap.set(o, { height: 0, overflow: "hidden" }),
      t.addEventListener("click", () => {
        (e && e !== t && e.closeFunc(),
          e !== t ? (r(), (e = t)) : (a(), (e = null)));
      }),
      (t.closeFunc = a));
  }),
    ScrollTrigger.refresh());
}
function initSlider() {
  const e = gsap.utils.toArray("[data-slider]");
  e.length &&
    e.forEach((e) => {
      function t() {
        const e = l.$slides[l.prev],
          t = e.querySelectorAll('[data-slider="h"]'),
          r = e.querySelectorAll('[data-slider="p"]'),
          a = e.querySelectorAll('[data-slider="ctn"]'),
          o = e.querySelectorAll('[data-slider="img"]'),
          n = l.$slides[l.current],
          i = n.querySelectorAll('[data-slider="h"]'),
          s = n.querySelectorAll('[data-slider="p"]'),
          c = n.querySelectorAll('[data-slider="ctn"]'),
          d = n.querySelectorAll('[data-slider="img"]');
        ((e.style.zIndex = 0),
          (n.style.zIndex = 1),
          gsap.killTweensOf([e, n]),
          gsap
            .timeline({
              onComplete: () => {
                ((e.style.zIndex = "auto"),
                  (n.style.zIndex = 1),
                  (l.animating = !1));
              },
            })
            .set(n, { display: "block", position: "relative" })
            .set(e, { display: "block", position: "absolute" })
            .add(() => {
              (animateTextH(i, "initial"),
                animateTextP(s, "initial"),
                animateCtn(c, "initial"),
                animateSlide(d, "initial"));
            })
            .add(() => {
              ScrollTrigger.refresh();
            })
            .add(() => {
              (animateTextH(t, "hide", 0),
                animateTextP(r, "hide", 0),
                animateCtn(a, "hide", 0),
                animateSlide(o, "hide", 0),
                animateSlide(d, "reveal", 0));
            })
            .to({}, { duration: durM })
            .add(() => {
              (animateTextH(i, "reveal", 0),
                animateTextP(s, "reveal", 0),
                animateCtn(c, "reveal", durS));
            })
            .to({}, { duration: durS })
            .set(e, { display: "none" }));
      }
      function r() {
        (l.$current && (l.$current.textContent = l.current + 1),
          l.$total && (l.$total.textContent = l.length),
          l.$next_num &&
            (l.$next_num.textContent =
              l.current === l.length - 1 ? 1 : l.current + 2));
      }
      function a() {
        ((l.animating = !0),
          (l.prev = l.current),
          (l.current = l.current === l.length - 1 ? 0 : l.current + 1),
          r(),
          t());
      }
      function o() {
        l.$progressEl &&
          gsap.fromTo(
            l.$progressEl,
            { width: "0%" },
            { width: "100%", duration: l.autoDuration, ease: "none" },
          );
      }
      function n() {
        l.$progressEl &&
          (gsap.killTweensOf(l.$progressEl),
          gsap.set(l.$progressEl, { width: "0%" }));
      }
      function i() {
        return (
          o(),
          setInterval(() => {
            (a(), o());
          }, 1e3 * l.autoDuration)
        );
      }
      function s() {
        (clearInterval(c), n());
      }
      const l = {
        $slides: e.querySelectorAll('[data-slider="slide"]'),
        $pag: e.querySelector('[data-slider="pag"]'),
        $prev: e.querySelector('[data-slider="prev"]'),
        $next: e.querySelector('[data-slider="next"]'),
        $current: e.querySelector('[data-slider="current"]'),
        $total: e.querySelector('[data-slider="total"]'),
        $next_num: e.querySelector('[data-slider="next-num"]'),
        $progressEl: e.querySelector('[data-slider="progress"]'),
        current: 0,
        prev: null,
        animating: !1,
        autoDuration: 6,
      };
      if (((l.length = l.$slides.length), !l.length)) return;
      if (1 === l.length) return void (l.$pag.style.display = "none");
      let c;
      (gsap.set(l.$slides, { display: "none", position: "absolute" }),
        gsap.set(l.$slides[l.current], {
          display: "block",
          position: "relative",
        }),
        r());
      (new IntersectionObserver(
        ([e]) => {
          e.isIntersecting ? (s(), (c = i())) : s();
        },
        { threshold: 0.2 },
      ).observe(e),
        document.addEventListener("visibilitychange", () => {
          document.hidden ? s() : (s(), (c = i()));
        }),
        l.$prev.addEventListener("click", () => {
          l.animating ||
            ((l.animating = !0),
            (l.prev = l.current),
            (l.current = 0 === l.current ? l.length - 1 : l.current - 1),
            r(),
            t(),
            s(),
            (c = i()));
        }),
        l.$next.addEventListener("click", () => {
          l.animating || (s(), (c = i()), a());
        }));
    });
}
function initCarousel() {
  document.querySelectorAll("[data-carousel]").forEach((e) => {
    const t = e.querySelector(".swiper");
    if (!t) return;
    const r = e.querySelector('[data-slider="progress"]'),
      a = e.querySelector('[data-slider="current"]'),
      o = e.querySelector('[data-slider="total"]');
    new Swiper(t, {
      direction: "horizontal",
      freeMode: {
        enabled: !0,
        momentum: !0,
        momentumRatio: 1,
        momentumBounce: !0,
        momentumBounceRatio: 1,
        sticky: !1,
      },
      a11y: { enabled: !1 },
      slidesPerView: "auto",
      grabCursor: !0,
      mousewheel: { forceToAxis: !0 },
      navigation: {
        nextEl: e.querySelector('[data-slider="next"]'),
        prevEl: e.querySelector('[data-slider="prev"]'),
      },
      speed: 800,
      on: {
        progress(e, t) {
          r && (r.style.width = 100 * t + "%");
        },
        slideChange(e) {
          a && (a.textContent = e.realIndex + 1);
        },
        afterInit(e) {
          (a && (a.textContent = 1), o && (o.textContent = e.slides.length));
        },
      },
    });
  });
}
function initLightbox() {
  function e() {
    (d && (d.textContent = String(m + 1).padStart(2, "0")),
      u && (u.textContent = String(p.length).padStart(2, "0")),
      g &&
        gsap.to(g, {
          width: ((m + 1) / p.length) * 100 + "%",
          duration: durS,
          ease: "Out",
        }));
  }
  function t(t) {
    ((m = t),
      (i.src = p[m]),
      e(),
      gsap.set(n, { display: "block" }),
      gsap.fromTo(
        n,
        { opacity: 0 },
        { opacity: 1, duration: durM, ease: "Out" },
      ),
      gsap.fromTo(
        i,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: durM, ease: "Out" },
      ),
      lockScroll());
  }
  function r() {
    (gsap.to(n, {
      opacity: 0,
      duration: durS,
      ease: "In",
      onComplete: () => {
        gsap.set(n, { display: "none" });
      },
    }),
      unlockScroll());
  }
  function a(t) {
    const r = 1 === t ? -125 : 125,
      a = 1 === t ? 125 : -125;
    gsap.to(i, {
      xPercent: r,
      duration: durS,
      ease: "In",
      onComplete: () => {
        ((m = (m + t + p.length) % p.length),
          (i.src = p[m]),
          e(),
          gsap.fromTo(
            i,
            { xPercent: a },
            { xPercent: 0, duration: durM, ease: "Out" },
          ));
      },
    });
  }
  const o = Array.from(document.querySelectorAll("[data-lightbox]")).filter(
    (e) => null !== e.offsetParent,
  );
  if (!o.length) return;
  const n = document.querySelector("[data-lightbox-modal]"),
    i = n.querySelector("[data-lightbox-img]"),
    s = n.querySelector('[data-slider="close"]'),
    l = n.querySelector('[data-slider="prev"]'),
    c = n.querySelector('[data-slider="next"]'),
    d = n.querySelector('[data-slider="current"]'),
    u = n.querySelector('[data-slider="total"]'),
    g = n.querySelector('[data-slider="progress"]');
  let m = 0;
  const p = Array.from(o).map((e) => e.src || e.dataset.src);
  (gsap.set(n, { display: "none" }),
    document.querySelectorAll("[data-lightbox-btn]").forEach((e) => {
      e.addEventListener("click", () => t(Number(e.dataset.lightboxBtn)));
    }),
    o.forEach((e, r) => e.addEventListener("click", () => t(r))),
    s.addEventListener("click", r),
    l.addEventListener("click", () => a(-1)),
    c.addEventListener("click", () => a(1)),
    document.addEventListener("keydown", (e) => {
      ("Escape" === e.key && r(),
        "ArrowLeft" === e.key && a(-1),
        "ArrowRight" === e.key && a(1));
    }));
}
function initImageZoom() {
  function e() {
    (d && gsap.to(d, { yPercent: 100, duration: durM, ease: "Out" }),
      u && gsap.to(u, { xPercent: 250, duration: durM, ease: "Out" }),
      g && gsap.to(g, { scale: 1.1, duration: durM, ease: "Out" }));
  }
  function t() {
    (d && gsap.to(d, { yPercent: 0, duration: durM, ease: "Out" }),
      u && gsap.to(u, { xPercent: 0, duration: durM, ease: "Out" }),
      g && gsap.to(g, { scale: 1, duration: durM, ease: "Out" }));
  }
  function r(e, t) {
    const r = e.clientX - t.clientX,
      a = e.clientY - t.clientY;
    return Math.sqrt(r * r + a * a);
  }
  function a(e, t) {
    return { x: (e.clientX + t.clientX) / 2, y: (e.clientY + t.clientY) / 2 };
  }
  function o() {
    gsap.set(c, { scale: f, x: w, y: b });
  }
  function n() {
    const e = c.getBoundingClientRect(),
      t = l.getBoundingClientRect(),
      r = Math.max(0, (e.width - t.width) / 2),
      a = Math.max(0, (e.height - t.height) / 2),
      o = Math.max(-r, Math.min(r, w)),
      n = Math.max(-a, Math.min(a, b));
    (o === w && n === b) ||
      ((w = o),
      (b = n),
      gsap.to(c, { x: w, y: b, duration: durS, ease: "Out" }));
  }
  function i() {
    ((f = 1),
      (w = 0),
      (b = 0),
      gsap.to(c, { scale: 1, x: 0, y: 0, duration: durM, ease: "Out" }),
      t());
  }
  function s() {
    ((f = 2.5),
      (w = 0),
      (b = 0),
      gsap.to(c, { scale: f, x: 0, y: 0, duration: durM, ease: "Out" }),
      e());
  }
  const l = document.querySelector("[data-lightbox-content]");
  if (!l) return;
  const c = l.querySelector("[data-lightbox-img]");
  if (!c) return;
  const d = l.parentElement?.querySelector(".modal_lightbox_pag"),
    u = l.parentElement?.querySelector(".modal_close"),
    g = document.querySelector(".modal_decor");
  if (window.innerWidth > breakPoint) {
    let A = !1,
      P = 0,
      k = 0,
      C = 0;
    function m() {
      ((C += 0.08 * (k - C)), gsap.set(c, { y: C }));
    }
    function p(e) {
      if (!A || P <= 0) return;
      const t = e.clientY / window.innerHeight;
      k = P * (1 - 2 * t);
    }
    function h() {
      A = !0;
      const t = window.innerWidth / c.offsetWidth,
        r = c.offsetHeight * t;
      ((P = Math.max(0, (r - window.innerHeight) / 2)),
        (C = 0),
        (k = 0),
        gsap.to(c, { scale: t, duration: durM, ease: "Out" }),
        gsap.ticker.add(m),
        document.addEventListener("mousemove", p),
        e(),
        (c.style.cursor = "zoom-out"));
    }
    function y() {
      ((A = !1),
        gsap.ticker.remove(m),
        document.removeEventListener("mousemove", p),
        (k = 0),
        gsap.to(c, { scale: 1, y: 0, duration: durM, ease: "Out" }),
        t(),
        (c.style.cursor = "zoom-in"));
    }
    return (
      (c.style.cursor = "zoom-in"),
      c.addEventListener("click", () => (A ? y() : h())),
      void document.addEventListener("keydown", (e) => {
        ("Escape" === e.key && y(),
          "ArrowLeft" === e.key && y(),
          "ArrowRight" === e.key && y());
      })
    );
  }
  if (window.innerWidth >= breakPoint) return;
  let f = 1,
    v = 1,
    S = 0,
    w = 0,
    b = 0,
    q = 0,
    E = 0,
    T = 0,
    x = 0,
    L = 0;
  ((c.style.touchAction = "none"),
    c.addEventListener(
      "touchstart",
      (t) => {
        if (2 === t.touches.length) {
          (t.preventDefault(), (S = r(t.touches[0], t.touches[1])), (v = f));
          const o = a(t.touches[0], t.touches[1]);
          ((T = o.x), (x = o.y), (q = w), (E = b), v <= 1 && e());
        } else if (1 === t.touches.length) {
          const e = Date.now();
          if (e - L < 300)
            return (t.preventDefault(), f > 1 ? i() : s(), void (L = 0));
          ((L = e),
            f > 1 &&
              (t.preventDefault(),
              (T = t.touches[0].clientX),
              (x = t.touches[0].clientY),
              (q = w),
              (E = b)));
        }
      },
      { passive: !1 },
    ),
    c.addEventListener(
      "touchmove",
      (e) => {
        if (2 === e.touches.length) {
          e.preventDefault();
          const t = r(e.touches[0], e.touches[1]),
            n = a(e.touches[0], e.touches[1]);
          ((f = Math.max(1, Math.min(v * (t / S), 5))),
            (w = q + (n.x - T)),
            (b = E + (n.y - x)),
            o());
        } else
          1 === e.touches.length &&
            f > 1 &&
            (e.preventDefault(),
            (w = q + (e.touches[0].clientX - T)),
            (b = E + (e.touches[0].clientY - x)),
            o());
      },
      { passive: !1 },
    ),
    c.addEventListener("touchend", (e) => {
      0 === e.touches.length && (f <= 1.05 ? i() : n());
    }));
}
function initTabs() {
  const e = document.querySelectorAll("[data-tabs]");
  e.length &&
    e.forEach((e) => {
      const t = [...e.querySelectorAll("[data-tab-trigger]")],
        r = e.querySelectorAll("[data-tab-content]");
      let a = 0,
        o = !1;
      (t[0].classList.add("is-active"),
        r[0].classList.add("is-active"),
        t.forEach((r, n) => {
          r.addEventListener("click", () => {
            if (n === a || o) return;
            const i = t[a],
              s = e.querySelector(
                `[data-tab-content="${i.getAttribute("data-tab-trigger")}"]`,
              ),
              l = s.querySelectorAll('[data-tab="h"]'),
              c = s.querySelectorAll('[data-tab="p"]'),
              d = s.querySelectorAll('[data-tab="ctn"]'),
              u = s.querySelectorAll('[data-tab="slide"]'),
              g = e.querySelector(
                `[data-tab-content="${r.getAttribute("data-tab-trigger")}"]`,
              ),
              m = g.querySelectorAll('[data-tab="h"]'),
              p = g.querySelectorAll('[data-tab="p"]'),
              h = g.querySelectorAll('[data-tab="ctn"]'),
              y = g.querySelectorAll('[data-tab="slide"]');
            (gsap.killTweensOf([s, g]),
              (o = !0),
              gsap
                .timeline({
                  onComplete: () => {
                    o = !1;
                  },
                })
                .set(g, { display: "block", position: "relative", zIndex: 1 })
                .set(s, { display: "block", position: "absolute", zIndex: 0 })
                .add(() => {
                  (animateTextH(m, "initial"),
                    animateTextP(p, "initial"),
                    animateCtn(h, "initial"),
                    animateSlide(y, "initial"));
                })
                .add(() => {
                  ScrollTrigger.refresh();
                })
                .add(() => {
                  (animateTextH(l, "hide", 0),
                    animateTextP(c, "hide", 0),
                    animateCtn(d, "hide", 0),
                    animateSlide(u, "hide", 0),
                    animateSlide(y, "reveal", 0));
                })
                .to({}, { duration: durM })
                .add(() => {
                  (animateTextH(m, "reveal", 0),
                    animateTextP(p, "reveal", 0),
                    animateCtn(h, "reveal", durS));
                })
                .to({}, { duration: durS })
                .set(s, { display: "none" }),
              i.classList.remove("is-active"),
              r.classList.add("is-active"),
              (a = n));
          });
        }));
    });
}
function initTabsHero() {
  function e() {
    const e = t.querySelector("[data-tab-trigger].is-active");
    e &&
      ((a.className = a.className.replace(/\bis-\S+/g, "").trim()),
      a.classList.add(`is-${e.getAttribute("data-tab-trigger")}`));
  }
  const t = document.querySelector("[data-tabs-hero]");
  if (!t) return;
  const r = [...t.querySelectorAll("[data-tab-trigger]")],
    a = t.querySelector(".hero-s_tabs_divider");
  let o = 0,
    n = !1;
  (r[0].classList.add("is-active"),
    e(),
    r.forEach((a, i) => {
      a.addEventListener("click", () => {
        if (i === o || n) return;
        const s = r[o],
          l = t.querySelector(
            `[data-tab-content="${s.getAttribute("data-tab-trigger")}"]`,
          ),
          c = t.querySelector(
            `[data-tab-content="${a.getAttribute("data-tab-trigger")}"]`,
          ),
          d = c.querySelector('[data-tab="img"]');
        (gsap.killTweensOf([l, c]),
          (n = !0),
          gsap
            .timeline({
              onComplete: () => {
                n = !1;
              },
            })
            .set(c, { display: "block", position: "relative", zIndex: 1 })
            .set(l, { display: "block", position: "absolute", zIndex: 0 })
            .add(() => {
              ScrollTrigger.refresh();
            })
            .fromTo(
              d,
              { opacity: 0 },
              { opacity: 1, duration: durM, ease: "InOut", overwrite: !0 },
            )
            .set(l, { display: "none" }),
          s.classList.remove("is-active"),
          a.classList.add("is-active"),
          (o = i),
          e());
      });
    }));
}
function initTabsHilight() {
  const e = document.querySelectorAll("[data-tabs-hilight]");
  e.length &&
    e.forEach((e) => {
      function t() {
        setTimeout(() => {
          const t = e.querySelector("[data-tab].is-active");
          t &&
            gsap.to(a, {
              ...(o
                ? { x: t.offsetLeft, width: t.offsetWidth }
                : { y: t.offsetTop, height: t.offsetHeight }),
              duration: durM,
              ease: "InOut",
            });
        }, 40);
      }
      const r = e.querySelectorAll("[data-tab]"),
        a = e.querySelector("[data-tab-hilight]");
      if (!r.length || !a) return;
      const o = "hor" === e.dataset.tabsHilight;
      (t(),
        r.forEach((e) => {
          e.addEventListener("click", () => t());
        }));
    });
}
function initModalCta() {
  document.querySelectorAll("[data-modal-cta-btn]").forEach((e) => {
    function t() {
      (gsap.set([o, i], { display: "block" }),
        gsap.fromTo(
          n,
          { scale: 0, rotateX: -90, yPercent: -100, rotate: -25 },
          {
            scale: 1,
            rotateX: 0,
            yPercent: 0,
            rotate: 0,
            duration: durL,
            ease: "Out",
            overwrite: !0,
          },
        ),
        gsap.fromTo(
          i,
          { opacity: 0 },
          { opacity: 1, duration: durL, ease: "Out", overwrite: !0 },
        ),
        lockScroll());
    }
    function r() {
      window.innerWidth;
      (gsap.to(n, {
        scale: 1,
        rotateX: 90,
        yPercent: 200,
        rotate: 25,
        duration: durM,
        ease: "In",
        onComplete: () => {
          gsap.set([o, i], { display: "none" });
        },
        overwrite: !0,
      }),
        gsap.to(i, { opacity: 0, duration: durM, ease: "In", overwrite: !0 }),
        unlockScroll());
    }
    const a = e.getAttribute("data-modal-cta-btn"),
      o = document.querySelector(`[data-modal-cta="${a}"]`);
    if (!o) return;
    const n = o.querySelector("[data-modal-container]"),
      i = o.querySelector("[data-modal-over]"),
      s = o.querySelectorAll("[data-modal-close]");
    let l = !1;
    (gsap.set(o, { display: "none" }),
      gsap.set(n, { transformPerspective: 1e3 }),
      e.addEventListener("click", () => {
        l || (t(), (l = !0));
      }),
      s.forEach((e) => {
        e.addEventListener("click", () => {
          l && (r(), (l = !1));
        });
      }),
      document.addEventListener("keydown", (e) => {
        "Escape" === e.key && l && (r(), (l = !1));
      }));
  });
}
function initModalMenu() {
  document.querySelectorAll("[data-modal-menu-btn]").forEach((e) => {
    function t() {
      (gsap.set([o, i], { display: "block" }),
        h.forEach((e) => {
          e.classList.contains("theme_on-dark") ||
            (e.classList.add("theme_on-dark"),
            e.setAttribute("data-modal-themed", ""));
        }),
        g.forEach((e) => e.classList.toggle("is-active")),
        gsap.fromTo(
          n,
          { yPercent: 0 },
          { yPercent: 0, duration: durL, ease: "Out", overwrite: !0 },
        ),
        gsap.to(m, {
          rotate: -45,
          duration: durM,
          ease: "InOut",
          overwrite: !0,
        }),
        gsap.to(p, {
          rotate: 45,
          duration: durM,
          ease: "InOut",
          overwrite: !0,
        }),
        gsap.fromTo(
          i,
          { opacity: 0 },
          { opacity: 1, duration: durM, ease: "Out", overwrite: !0 },
        ),
        animateTextA(l, "reveal"),
        animateTextH(c, "reveal"),
        animateTextP(d, "reveal"),
        animateCtn(u, "reveal"),
        lockScroll());
    }
    function r() {
      (h.forEach((e) => {
        e.hasAttribute("data-modal-themed") &&
          (e.classList.remove("theme_on-dark"),
          e.removeAttribute("data-modal-themed"));
      }),
        g.forEach((e) => e.classList.toggle("is-active")),
        gsap.to(n, {
          yPercent: 0,
          duration: durM,
          ease: "In",
          onComplete: () => {
            gsap.set([o, i], { display: "none" });
          },
          overwrite: !0,
        }),
        gsap.to(m, {
          rotate: 180,
          duration: durM,
          ease: "InOut",
          overwrite: !0,
        }),
        gsap.to(p, {
          rotate: 180,
          duration: durM,
          ease: "InOut",
          overwrite: !0,
        }),
        gsap.to(i, { opacity: 0, duration: durM, ease: "In", overwrite: !0 }),
        animateTextA(l, "hide"),
        animateTextH(c, "hide"),
        animateTextP(d, "hide"),
        animateCtn(u, "hide"),
        unlockScroll());
    }
    const a = e.getAttribute("data-modal-menu-btn"),
      o = document.querySelector(`[data-modal-menu="${a}"]`);
    if (!o) return;
    const n = o.querySelector("[data-modal-container]"),
      i = o.querySelector("[data-modal-over]"),
      s = document.querySelectorAll(`[data-modal-close="${a}"]`),
      l = o.querySelectorAll('[data-part="a"]'),
      c = o.querySelectorAll('[data-part="h"]'),
      d = o.querySelectorAll('[data-part="p"]'),
      u = o.querySelectorAll('[data-part="ctn"]'),
      g = e.querySelectorAll(".btn-menu_label"),
      m = e.querySelector('[data-ico-menu="is-1"]'),
      p = e.querySelector('[data-ico-menu="is-2"]'),
      h = document.querySelectorAll("[data-theme]");
    let y = !1;
    (gsap.set(o, { display: "none" }),
      gsap.set([m, p], { rotate: 180 }),
      e.addEventListener("click", () => {
        y ? (r(), (y = !1)) : (t(), (y = !0));
      }),
      s.forEach((e) => {
        e.addEventListener("click", () => {
          y && (r(), (y = !1));
        });
      }),
      document.addEventListener("keydown", (e) => {
        "Escape" === e.key && y && (r(), (y = !1));
      }));
  });
}
function initModalTip() {
  gsap.matchMedia().add(`(max-width: ${breakPoint - 1}px)`, () => {
    document.querySelectorAll("[data-modal-tip-btn]").forEach((e) => {
      function t() {
        (gsap.set([o, i], { display: "block" }),
          gsap.fromTo(
            n,
            { yPercent: 125 },
            { yPercent: 0, duration: durL, ease: "Out", overwrite: !0 },
          ),
          gsap.fromTo(
            i,
            { opacity: 0 },
            { opacity: 1, duration: durL, ease: "Out", overwrite: !0 },
          ),
          lockScroll());
      }
      function r() {
        (gsap.to(n, {
          yPercent: 125,
          duration: durM,
          ease: "In",
          onComplete: () => {
            gsap.set([o, i], { display: "none" });
          },
          overwrite: !0,
        }),
          gsap.to(i, { opacity: 0, duration: durM, ease: "In", overwrite: !0 }),
          unlockScroll());
      }
      const a = e.getAttribute("data-modal-tip-btn"),
        o = document.querySelector(`[data-modal-tip="${a}"]`);
      if (!o) return;
      const n = o.querySelector("[data-modal-container]"),
        i = o.querySelector("[data-modal-over]"),
        s = o.querySelectorAll("[data-modal-close]");
      let l = !1;
      (gsap.set(o, { display: "none" }),
        e.addEventListener("click", () => {
          l || (t(), (l = !0));
        }),
        s.forEach((e) => {
          e.addEventListener("click", () => {
            l && (r(), (l = !1));
          });
        }));
    });
  });
}
function initFloatingTips() {
  gsap.matchMedia().add(`(min-width: ${breakPoint}px)`, () => {
    function e(e, t, r) {
      const a = e.getBoundingClientRect();
      (e.classList.toggle("is-left", t + a.width > window.innerWidth),
        e.classList.toggle("is-top", r + a.height > window.innerHeight));
    }
    function t(t, r, a) {
      (gsap.set(t, { x: r, y: a }),
        e(t, r, a),
        t.classList.add("is-active"),
        o.add(t));
    }
    function r(e) {
      (e.classList.remove("is-active", "is-left", "is-top"), o.delete(e));
    }
    const a = new Map(
        [...document.querySelectorAll("[floating-tip]")].map((e) => [
          e.getAttribute("floating-tip"),
          e,
        ]),
      ),
      o = new Set();
    (document.addEventListener("mousemove", (t) => {
      o.forEach((r) => {
        (e(r, t.clientX, t.clientY),
          gsap.to(r, {
            x: t.clientX,
            y: t.clientY,
            duration: 2 * durL,
            ease: "power3",
          }));
      });
    }),
      document.querySelectorAll("[floating-tip-trigger]").forEach((e) => {
        const o = a.get(e.getAttribute("floating-tip-trigger"));
        o &&
          (e.addEventListener("mouseenter", (e) => t(o, e.clientX, e.clientY)),
          e.addEventListener("mouseleave", () => r(o)),
          e.matches(":hover") && t(o, 0, 0));
      }));
  });
}
function initFilter() {
  document.querySelectorAll("[data-filter]").forEach((e) => {
    function t() {
      return Object.keys(s).length
        ? l.filter((e) =>
            Object.entries(s).every(([t, r]) =>
              [...e.querySelectorAll(`[data-${t}]`)]
                .map((e) => e.dataset[t])
                .includes(r),
            ),
          )
        : l;
    }
    function r() {
      const e = t();
      if (
        (l
          .filter((t) => !e.includes(t))
          .forEach((e) => gsap.set(e, { display: "none" })),
        e.forEach((e) => gsap.set(e, { display: "" })),
        i &&
          (0 === e.length
            ? (gsap.set(i, { display: "" }),
              gsap.fromTo(
                i,
                { opacity: 0 },
                { opacity: 1, duration: durM, ease: "Out" },
              ))
            : gsap.set(i, { display: "none" })),
        n)
      ) {
        const t = { val: parseInt(n.textContent) || 0 };
        gsap.to(t, {
          val: e.length,
          duration: durM,
          ease: "Out",
          overwrite: !0,
          onUpdate: () => (n.textContent = Math.round(t.val)),
        });
      }
      gsap.fromTo(
        o,
        { opacity: 0, y: "10rem" },
        {
          opacity: 1,
          y: "0rem",
          duration: durL,
          ease: "Out",
          clearProps: "y",
          onComplete: () => ScrollTrigger.refresh(),
        },
      );
    }
    function a() {
      const e = new URLSearchParams(s).toString();
      history.replaceState(null, "", e ? `?${e}` : location.pathname);
    }
    const o = e.querySelector("[data-filter-list]");
    if (!o) return;
    const n = e.querySelector("[data-filter-count]"),
      i = e.querySelector("[data-filter-empty]"),
      s = {},
      l = [...o.querySelectorAll("[data-filter-item]")];
    (r(),
      e.querySelectorAll("[data-filter-trigger]").forEach((t) => {
        t.addEventListener("click", () => {
          const n = t.dataset.filterGroup,
            i = t.dataset.filterTrigger;
          (e
            .querySelectorAll(`[data-filter-group="${n}"]`)
            .forEach((e) => e.classList.remove("is-active")),
            t.classList.add("is-active"),
            "*" === i ? delete s[n] : (s[n] = i),
            a(),
            gsap
              .timeline()
              .to(o, { opacity: 0, duration: durS, ease: "Out", overwrite: !0 })
              .add(() => {
                r();
              }));
        });
      }));
    const c = new URLSearchParams(location.search);
    [
      ...new Set(
        [...e.querySelectorAll("[data-filter-trigger]")].map(
          (e) => e.dataset.filterGroup,
        ),
      ),
    ].forEach((t) => {
      const r = c.get(t),
        a = r
          ? e.querySelector(
              `[data-filter-group="${t}"][data-filter-trigger="${r}"]`,
            )
          : e.querySelector(
              `[data-filter-group="${t}"][data-filter-trigger="*"]`,
            );
      a && a.click();
    });
  });
}
function initSort() {
  document.querySelectorAll("[data-sort]").forEach((e) => {
    function t(e) {
      return e.replace(/-([a-z])/g, (e, t) => t.toUpperCase());
    }
    function r() {
      const e = t(`sort-${n.key}`);
      [...o]
        .sort((t, r) => {
          const a = t.querySelector(`[data-sort-${n.key}]`),
            o = r.querySelector(`[data-sort-${n.key}]`),
            i = a?.dataset[e] ?? "",
            s = o?.dataset[e] ?? "",
            l = parseFloat(i),
            c = parseFloat(s),
            d = !isNaN(l) && !isNaN(c) ? l - c : i.localeCompare(s);
          return "asc" === n.order ? d : -d;
        })
        .forEach((e) => a.appendChild(e));
    }
    const a = e.querySelector("[data-sort-list]");
    if (!a) return;
    const o = [...a.querySelectorAll("[data-sort-item]")];
    let n = { key: null, order: "asc" };
    e.querySelectorAll("[data-sort-trigger]").forEach((t) => {
      t.addEventListener("click", () => {
        t.classList.contains("is-active") ||
          ((n.key = t.dataset.sortTrigger),
          (n.order = t.dataset.sortOrder ?? "asc"),
          e
            .querySelectorAll("[data-sort-trigger]")
            .forEach((e) => e.classList.remove("is-active")),
          t.classList.add("is-active"),
          gsap
            .timeline()
            .to(a, { opacity: 0, duration: durS, ease: "Out", overwrite: !0 })
            .add(() => {
              (r(),
                gsap.fromTo(
                  a,
                  { opacity: 0, y: "10rem" },
                  {
                    opacity: 1,
                    y: "0rem",
                    duration: durL,
                    ease: "Out",
                    clearProps: "y",
                    onComplete: () => ScrollTrigger.refresh(),
                  },
                ));
            }));
      });
    });
    const i = e.querySelector("[data-sort-trigger]");
    i && i.click();
  });
}
function initReset() {
  function e() {
    const e = [
        ...document.querySelectorAll(
          '[data-filter-trigger]:not([data-filter-trigger="*"])',
        ),
      ].some((e) => e.classList.contains("is-active")),
      r = [...document.querySelectorAll("[data-sort-trigger]")],
      a = r.length && !r[0].classList.contains("is-active");
    t.forEach((t) => t.classList.toggle("is-disabled", !e && !a));
  }
  const t = document.querySelectorAll("[data-reset]");
  t.length &&
    (document
      .querySelectorAll("[data-filter-trigger], [data-sort-trigger]")
      .forEach((t) => {
        t.addEventListener("click", e);
      }),
    t.forEach((e) => {
      e.addEventListener("click", () => {
        if (e.classList.contains("is-disabled")) return;
        document
          .querySelectorAll('[data-filter-trigger="*"]')
          .forEach((e) => e.click());
        const t = document.querySelector("[data-sort-trigger]");
        t && t.click();
      });
    }),
    e());
}
function initTranistionFlow() {
  const e = document.querySelector(".hero-scroll-area");
  if (e) {
    const u = e.querySelector(".hero-s"),
      g = window.innerWidth < breakPoint,
      m = e.querySelector(".hero-w_bg"),
      p = m.querySelector(".img");
    function t() {
      const t = m.offsetHeight,
        r = gsap.timeline({
          scrollTrigger: {
            trigger: e,
            start: "top top",
            end: "bottom bottom",
            scrub: !0,
          },
        });
      (g ||
        r
          .fromTo(
            u,
            { y: 0 },
            {
              y: -(1.25 * t - window.innerHeight),
              ease: "Ease",
              duration: 0.6,
            },
          )
          .fromTo(
            m,
            { y: 0 },
            { y: -(t - window.innerHeight), ease: "Ease", duration: 0.6 },
            "<",
          ),
        r.fromTo(
          m,
          { scale: 1, translateZ: 10, transformOrigin: "50% 75%" },
          { scale: 2, translateZ: 10, ease: "In", duration: 0.6 },
          g ? ">" : "-=0.2",
        ));
    }
    p.complete ? t() : p.addEventListener("load", t, { once: !0 });
  }
  const r = document.querySelector(".benefits-intro-w");
  if (r) {
    const h = r.querySelectorAll("[data-circle-text]");
    gsap
      .timeline({
        scrollTrigger: {
          trigger: r,
          start: "top bottom",
          end: "bottom top",
          scrub: !0,
        },
      })
      .fromTo(
        h,
        { wordSpacing: "0rem" },
        { wordSpacing: "10rem", ease: "none" },
      );
  }
  const a = document.querySelector(".loc-info-w");
  if (a) {
    const y = a.querySelector(".loc-info-s"),
      f = a.querySelectorAll('[data-part="p"]'),
      v = a.querySelectorAll('[data-part="ctn"]');
    (animateTextP(f, "initial"),
      animateCtn(v, "initial"),
      gsap
        .timeline({
          scrollTrigger: {
            trigger: a,
            start: "top 30%",
            end: "bottom bottom",
            scrub: 0.5,
            onEnter: () => {
              (animateTextP(f, "reveal", 0.1), animateCtn(v, "reveal", 0.1));
            },
            onLeaveBack: () => {
              (animateTextP(f, "hide", 0), animateCtn(v, "hide", 0));
            },
          },
        })
        .fromTo(
          y,
          { opacity: 0, scale: 0.75 },
          { opacity: 1, scale: 1, ease: "none" },
          0,
        ));
  }
  const o = document.querySelector(".loc-scroll-area");
  o &&
    gsap.matchMedia().add(`(min-width: ${breakPoint}px)`, () => {
      const e = o.querySelector(".loc-scroll-area_track"),
        t = e.scrollWidth - o.offsetWidth;
      ((o.style.height = `${e.scrollWidth}px`), ScrollTrigger.refresh());
      const r = gsap.to(e, {
        x: -t,
        ease: "horScroll",
        scrollTrigger: {
          trigger: o,
          start: "2.5% top",
          end: "97.5% bottom",
          scrub: 0.25,
        },
      });
      o._horizontalTween = r;
      o.querySelector(".loc-intro-s_title");
      const a = o.querySelectorAll(".loc-intro-s_title_line");
      gsap.fromTo(
        a,
        { xPercent: gsap.utils.wrap([-5, 25, -15]) },
        {
          xPercent: gsap.utils.wrap([5, -25, 25]),
          ease: "none",
          scrollTrigger: {
            trigger: o,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.25,
          },
        },
      );
      const n = o.querySelector(".flower.loc-intro");
      gsap.fromTo(
        n,
        { xPercent: 0 },
        {
          xPercent: -25,
          ease: "none",
          scrollTrigger: {
            trigger: o,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.25,
          },
        },
      );
      const i = o.querySelector(".flower.loc-path");
      gsap.fromTo(
        i,
        { yPercent: 0 },
        {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: o,
            start: "bottom bottom",
            end: "bottom top",
            scrub: 0.25,
          },
        },
      );
    });
  const n = document.querySelector(".img.loc-path");
  if (n) {
    const S = n.closest("[data-scroll-horizontal]");
    gsap.fromTo(
      n,
      { clipPath: "inset(0% 100% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 2 * durL,
        ease: "Out",
        delay: durM,
        scrollTrigger: {
          trigger: n,
          containerAnimation: S?._horizontalTween,
          start: S ? "left bottom" : "top bottom",
          once: !0,
        },
      },
    );
  }
  const i = document.querySelector(".loc-w");
  if (i) {
    const w = i.querySelector(".loc-w_bg_img");
    gsap.from(w, {
      scale: 1.15,
      transformOrigin: "center bottom",
      ease: "Ease",
      scrollTrigger: {
        trigger: i,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 0.25,
      },
    });
  }
  const s = document.querySelector(".amen-scroll-area");
  if (s) {
    const b = s.querySelector(".amen-w"),
      q = s.querySelector(".amen-cms");
    gsap
      .timeline({
        scrollTrigger: {
          trigger: s,
          start: "top top",
          end: "bottom bottom",
          scrub: !0,
        },
      })
      .fromTo(q, { scale: 1 }, { scale: 2, ease: "In" })
      .fromTo(b, { opacity: 1 }, { opacity: 0, ease: "In" }, "<");
  }
  const l = document.querySelector(".arch-scroll-area");
  l &&
    gsap.matchMedia().add(`(min-width: ${breakPoint}px)`, () => {
      const e = l.querySelector(".arch-intro-s"),
        t = e.querySelector(".arch-intro-s_bg_l"),
        r = e.querySelector(".arch-intro-s_bg_r"),
        a = e.querySelector(".flower.arch-intro-l"),
        o = e.querySelector(".flower.arch-intro-r"),
        n = l.querySelector(".arch-w"),
        i = n.querySelector(".img"),
        s = (n.querySelector(".arch-s_t"), n.querySelector('[data-text="h"]')),
        c = n.querySelector('[data-text="p"]');
      (gsap
        .timeline({
          scrollTrigger: {
            trigger: e,
            start: "top bottom",
            end: "200% top",
            scrub: !0,
          },
        })
        .fromTo(
          t,
          {
            clipPath:
              "polygon(0% 0%, 0% 100%, 44.444% 100%, 44.444% 36.111%, 98.889% 36.111%, 98.889% 99.074%, 44.444% 99.074%, 1.111% 100%, 100% 100%, 100% 0%)",
          },
          {
            clipPath:
              "polygon(0% 0%, 0% 100%, 44.444% 100%, 44.444% 18.519%, 98.889% 18.519%, 98.889% 81.481%, 44.444% 81.481%, 1.111% 100%, 100% 100%, 100% 0%)",
            ease: "none",
            duration: 0.5,
          },
        )
        .fromTo(
          r,
          {
            clipPath:
              "polygon(0% 0%, 0% 100%, 1.111% 100%, 1.111% 0.926%, 55.556% 0.926%, 55.556% 63.889%, 1.111% 63.889%, 1.111% 100%, 100% 100%, 100% 0%)",
          },
          {
            clipPath:
              "polygon(0% 0%, 0% 100%, 1.111% 100%, 1.111% 18.519%, 55.556% 18.519%, 55.556% 81.481%, 1.111% 81.481%, 1.111% 100%, 100% 100%, 100% 0%)",
            ease: "none",
            duration: 0.5,
          },
          "<",
        )
        .to(t, {
          clipPath:
            "polygon(0% 0%, 0% 100%, 44.444% 100%, 44.444% 18.519%, 100% 18.519%, 100% 81.481%, 44.444% 81.481%, 1.111% 100%, 100% 100%, 100% 0%)",
          ease: "none",
          duration: 0.1,
        })
        .to(
          r,
          {
            clipPath:
              "polygon(0% 0%, 0% 100%, 0% 100%, 0% 18.519%, 55.556% 18.519%, 55.556% 81.481%, 0% 81.481%, 0% 100%, 100% 100%, 100% 0%)",
            ease: "none",
            duration: 0.1,
          },
          "<",
        )
        .fromTo(e, { scale: 1 }, { scale: 1.84, ease: "InOut", duration: 0.4 })
        .to(
          a,
          { scale: 1.84, xPercent: -50, ease: "InOut", duration: 0.4 },
          "<",
        )
        .to(o, { scale: 1.84, xPercent: 50, ease: "InOut", duration: 0.4 }, "<")
        .fromTo(
          n,
          { scale: 0.75, transformOrigin: "center top" },
          { scale: 1, ease: "InOut", duration: 0.4 },
          "<",
        ),
        animateTextH(s, "initial"),
        animateTextP(c, "initial"),
        ScrollTrigger.create({
          trigger: l,
          start: "30% top",
          onEnter: () => {
            (animateTextH(s, "reveal", 0), animateTextP(c, "reveal", durS));
          },
          onLeaveBack: () => {
            (animateTextH(s, "hide", 0), animateTextP(c, "hide", 0));
          },
        }),
        gsap.to(i, {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: l,
            start: "55% top",
            end: "bottom top",
            scrub: !0,
          },
        }));
    });
  const c = document.querySelector(".footer-w");
  if (c) {
    const E = document.querySelector("[data-footer-clip]"),
      T = c.querySelector(".footer-s"),
      x = c.querySelectorAll('[data-text="h"]'),
      L = c.querySelectorAll('[data-text="p"]'),
      A = c.querySelectorAll('[data-text="ctn"]'),
      P =
        window.innerWidth >= breakPoint
          ? "inset(8% 22% 8% 22%)"
          : "inset(4% 32% 4% 32%)";
    (animateTextH(x, "initial"),
      animateTextP(L, "initial"),
      animateCtn(A, "initial"),
      gsap
        .timeline({
          scrollTrigger: {
            trigger: c,
            start: "top 30%",
            end: "bottom bottom",
            scrub: 0.5,
            onEnter: () => {
              (animateTextH(x, "reveal", 0.1),
                animateTextP(L, "reveal", 0.1),
                animateCtn(A, "reveal", 0.1));
            },
            onLeaveBack: () => {
              (animateTextH(x, "hide", 0),
                animateTextP(L, "hide", 0),
                animateCtn(A, "hide", 0));
            },
          },
        })
        .fromTo(
          E,
          { clipPath: "inset(0% 0% 0% 0%)" },
          { clipPath: P, ease: "none" },
          0,
        )
        .fromTo(
          T,
          { opacity: 0, scale: 0.75 },
          { opacity: 1, scale: 1, ease: "none" },
          0,
        ));
    const k = document.querySelector(".s-down");
    k &&
      gsap.to(k, {
        opacity: 0,
        ease: "InOut",
        scrollTrigger: {
          trigger: c,
          start: "top bottom",
          end: "center bottom",
          scrub: !0,
        },
      });
  }
  const d = document.querySelector(".lot-w");
  if (d) {
    const C = d.querySelector(".lot-s_info_header"),
      M = d.querySelector(".lot-s_info_line");
    ScrollTrigger.create({
      trigger: d,
      start: "100px top",
      onEnter: () => {
        (C.classList.remove("is-top"), M.classList.remove("is-top"));
      },
      onLeaveBack: () => {
        (C.classList.add("is-top"), M.classList.add("is-top"));
      },
    });
  }
}
gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText);
let lenis = null,
  localLenisInstances = [],
  breakPoint = 992,
  resizeTimeout = null,
  lastScroll = 0,
  durS = 0.4,
  durM = 0.8,
  durL = 1.2,
  stagger = 0.1,
  delayReveal = 0.3;
(CustomEase.create("InOut", "0.75,0,0.25,1"),
  CustomEase.create("Out", "0.25,1,0.5,1"),
  CustomEase.create("In", "0.5,0,0.75,0"),
  CustomEase.create("Ease", "0.25,0.1,0.25,1"),
  CustomEase.create("Write", "0.333,0,0.667,1"),
  CustomEase.create("diveIn", "0.6,0,0,1"),
  CustomEase.create("horScroll", "0.25,0,0.75,1"),
  document.documentElement.style.setProperty(
    "--_100svh",
    `${window.innerHeight}px`,
  ),
  window.addEventListener("resize", () => {
    (clearTimeout(resizeTimeout),
      (resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh(!0);
      }, 40)));
  }),
  (history.scrollRestoration = "manual"),
  initPreloader());
