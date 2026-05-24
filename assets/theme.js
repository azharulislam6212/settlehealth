window.theme = window.theme || {};
var THMHelper = window.BEYHelper || {};
THMHelper.qs = document.querySelector.bind(document);
THMHelper.qsa = document.querySelectorAll.bind(document);
THMHelper.qid = document.getElementById.bind(document);
THMHelper.qde = document.documentElement;

var Thm = {
    init: function () {
        this.Basic.init();
    },
    Basic: {
        init: function () {
            this.smoothScroll();
            this.drawerToggler();
            this.marqueeScroller();
            this.sticky_header();
            this.slideshowSwiper();
                 this.video_media();
                 this.collapsibleContent();
        },
        sticky_header: function () {

            var header = document.querySelector('[data-sticky-type="always"]');

            if (header != null) {
                onScroll = () => {
                    var scrolledPage = Math.round(window.pageYOffset);
                    if (scrolledPage > 80) {
                        header.classList.add('sticky');
                    } else {
                        header.classList.remove('sticky');
                    }
                }
                document.addEventListener('scroll', onScroll);
            }
        },
        smoothScroll: function () {
            document.querySelectorAll('a[href*="#"]:not([href="#"]):not([href="#0"]):not([href="#recover"]):not([href="#login"])').forEach(a => {
                a.addEventListener('click', function (e) {
                    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                        var target = document.querySelector(this.hash) || document.querySelector('[name=' + this.hash.slice(1) + ']');
                        if (target) {
                            e.preventDefault();
                            window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
                            setTimeout(() => {
                                target.focus();
                                if (!target.matches(':focus')) {
                                    target.setAttribute('tabindex', '-1');
                                    target.focus();
                                }
                            }, 600);
                        }
                    }
                });
            });

        },
        marqueeScroller: function () {
            if (!customElements.get("marquee-content")) {
                class Marquee extends HTMLElement {
                    constructor() {
                        super();
                    }
                    connectedCallback() {
                        this.init();
                    }
                    calculationPaddingSection() {
                        (this.heightSection = this.offsetHeight),
                            (this.heightSection =
                                this.heightSection < 18
                                    ? 18
                                    : 96 < this.heightSection
                                        ? 96
                                        : this.heightSection),
                            this.closest(".js-running-content").style.setProperty(
                                "--spacing-padding-block",
                                this.heightSection + "px"
                            );
                    }
                    init() {
                        (this.distance =
                            this.querySelector(".js-marquee-item").offsetWidth),
                            (this.speed = this.dataset.speed),
                            this.style.setProperty(
                                "--marquee-duration",
                                this.distance / this.speed + "s"
                            );
                    }
                }
                customElements.define("marquee-content", Marquee);
            }
        },
        drawerToggler: function () {
            const drawerToggleButtons = document.querySelectorAll('[data-drawer-toggle]');
            const body = document.body;

            drawerToggleButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const drawerTarget = button.getAttribute('data-drawer-toggle');
                    const drawer = document.querySelector(`[data-drawer="${drawerTarget}"]`);

                    if (!drawer) return;

                    const isOpen = drawer.classList.contains('drawer--visible');

                    if (!isOpen) {
                        openDrawer(drawer);
                    } else {
                        closeDrawer(drawer);
                    }
                });
            });
            // Close button
            const drawerCloseButtons = document.querySelectorAll('.drawer__close_button');
            drawerCloseButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const drawer = button.closest('[data-drawer]');
                    closeDrawer(drawer);
                });
            });

            // Underlay click
            const drawerUnderlays = document.querySelectorAll('[data-drawer-underlay]');
            drawerUnderlays.forEach(underlay => {
                underlay.addEventListener('click', () => {
                    const drawer = underlay.closest('[data-drawer]');
                    closeDrawer(drawer);
                });
            });

            function openDrawer(drawer) {
                drawer.classList.add('drawer--visible');

                body.classList.add('drawer-open'); // for body overflow hidden
                body.style.overflow = 'hidden';
            }

            function closeDrawer(drawer) {
                drawer.classList.remove('drawer--visible');

                body.classList.remove('drawer-open');
                body.style.overflow = '';
            }
        },
        slideshowSwiper: function () {

            class slideshowSwiper extends HTMLElement {
                constructor() {
                    super();
                }
                connectedCallback() {
                    this.sliderWrapper = this.querySelector(".slideshow__swiper");

                    let centered_slides =
                        this.sliderWrapper.dataset.centeredslides !== undefined
                            ? JSON.parse(this.sliderWrapper.dataset.centeredslides)
                            : undefined;
                    let effect_fade =
                        this.sliderWrapper.dataset.effectfade !== undefined
                            ? JSON.parse(this.sliderWrapper.dataset.effectfade)
                            : undefined;
                    let next = this.querySelector(".swiper-button-next");
                    let prev = this.querySelector(".swiper-button-prev");
                    let pagination = this.querySelector(".swiper-pagination");
                    let scroll = this.querySelector(".swiper-scrollbar");

                    new Swiper(this.sliderWrapper, {
                        effect: effect_fade ? "fade" : "slide",
                        centeredSlides: centered_slides ? centered_slides : false,
                        slidesPerView: parseInt(this.sliderWrapper.dataset.slidesmobile),
                        spaceBetween: parseInt(this.sliderWrapper.dataset.mobilespace),
                        grabCursor: false,
                        horizontal: true,
                        watchSlidesProgress: true,
                        draggable: !0,
                        autoHeight: !1,
                        watchOverflow: !0,
                        threshold: 10,
                        freeMode: JSON.parse(this.sliderWrapper.dataset.freemode),
                        loop: JSON.parse(this.sliderWrapper.dataset.loop),
                        speed: 700,
                        mousewheel: {
                            forceToAxis: true,
                        },
                        autoplay: {
                            enabled: JSON.parse(this.sliderWrapper.dataset.autoplay),
                            disableOnInteraction: false,
                            delay: parseInt(this.sliderWrapper.dataset.delay),
                        },
                        navigation: {
                            nextEl: next,
                            prevEl: prev,
                        },
                        pagination: {
                            el: pagination,
                            clickable: true,
                        },
                        scrollbar: {
                            el: scroll,
                            draggable: true,
                        },
                        breakpoints: {
                            359: {
                                slidesPerView: parseFloat(this.sliderWrapper.dataset.slidesmobile),
                                spaceBetween: parseInt(this.sliderWrapper.dataset.mobilespace),
                            },
                            768: {
                                slidesPerView: parseFloat(this.sliderWrapper.dataset.slidestab),
                                spaceBetween: parseInt(this.sliderWrapper.dataset.tabspace),
                            },
                            1024: {
                                slidesPerView: parseFloat(this.sliderWrapper.dataset.slidesdesktop),
                                spaceBetween: parseInt(this.sliderWrapper.dataset.desktopspace),
                            },
                        },
                    });
                }
            }
            customElements.define("slideshow-swiper", slideshowSwiper);

        },
       video_media: function () {


            class THMLazyLoadingVideo extends HTMLElement {
                constructor() {
                    super();
                    this.isLoaded = false; // internal flag
                }

                loadVideo() {
                    if (this.isLoaded) return; // prevent duplicate loading
                    this.isLoaded = true;

                    if (this.dataVideoType === "local_video") {
                        const videoElement = this.querySelector("video");
                        const sourceElement = videoElement?.querySelector("source");
                        const videoSrc = sourceElement?.getAttribute("data-src");

                        if (videoSrc) {
                            sourceElement.setAttribute("src", videoSrc);
                            videoElement.load();
                            videoElement.muted = true;

                            videoElement.addEventListener("canplay", () => {
                                videoElement.play().catch(err => {
                                    console.warn("Autoplay failed:", err);
                                });
                            });
                        } else {
                            console.warn("Missing data-src on local video source.");
                        }
                    } else if (this.dataVideoType === "youtube" || this.dataVideoType === "vimeo") {
                        const iframe = this.querySelector("iframe");
                        const iframeSrc = iframe?.getAttribute("data-src");

                        if (iframe && iframeSrc) {
                            iframe.setAttribute("src", iframeSrc);
                        } else {
                            console.warn("Missing data-src on iframe.");
                        }
                    }
                }

                execute() {
                    if (Shopify.designMode) {
                        this.loadVideo();
                    } else {
                        const loadOnce = () => this.loadVideo();

                        ['mousemove', 'touchstart', 'scroll', 'click'].forEach(event => {
                            window.addEventListener(event, loadOnce, { once: true });
                        });

                        // fallback: load anyway after 3 seconds if user does nothing
                        setTimeout(() => {
                            this.loadVideo();
                        }, 10);
                    }
                }

                static get observedAttributes() {
                    return ["data-video-type", "data-video-id"];
                }

                set dataVideoType(val) {
                    this.setAttribute("data-video-type", val);
                }
                get dataVideoType() {
                    return this.getAttribute("data-video-type");
                }

                set dataVideoId(val) {
                    this.setAttribute("data-video-id", val);
                }
                get dataVideoId() {
                    return this.getAttribute("data-video-id");
                }

                attributeChangedCallback(name, oldValue, newValue) {
                    if (oldValue !== newValue) {
                        this.execute();
                    }
                }

                connectedCallback() {
                    this.execute();
                }

                disconnectedCallback() {
                    // optional: clean up if you had dynamic event listeners, but since we used { once: true }, nothing to clean
                }
            }

            customElements.define("thm-load-video", THMLazyLoadingVideo);



            class THMLoadMedia extends HTMLElement {
                constructor() {
                    super(),
                        (this.$ = this.querySelector.bind(this)),
                        (this.sectionID = this.dataset.sectionId),
                        (this.idVideo = this.dataset.idVideo),
                        (this.typeVideo = this.dataset.type),
                        (this.eleVideo = `shtVideo-${this.sectionID}-` + this.idVideo),
                        (this.onPlayerStateYTChange = this.onPlayerStateYTChange.bind(this)),
                        (this.onPlayerPlay = this.onPlayerPlay.bind(this)),
                        (this.playPauseButton = this.$(".video-play-pause-button")),
                        (this.trigger = this.$(".js-load-media-trigger")),
                        this.trigger && this.trigger.addEventListener("click", this.handlePlayVideo.bind(this));

                    if (this.playPauseButton) {
                        this.playPauseButton.addEventListener("click", this.togglePlayPauseVideo.bind(this));
                    }
                }


                togglePlayPauseVideo() {
                    this.classList.add("playing");
                    this.loadContent();

                    const video = this.$(".js-media-item-video");

                    if (!video) return;

                    // First time play: pause others, play this
                    if (video.paused || video.ended) {
                        this.pauseAllVideo(video);
                        video.play();
                        this.updatePlayPauseIcon(true);
                    } else {
                        video.pause();
                        this.updatePlayPauseIcon(false);
                    }

                    // ✅ If YouTube player is present
                    if (this.player && typeof this.player.getPlayerState === "function") {
                        const state = this.player.getPlayerState();
                        if (state === YT.PlayerState.PAUSED || state === YT.PlayerState.ENDED) {
                            this.pauseAllVideo(this.player);
                            this.player.playVideo();
                            this.updatePlayPauseIcon(true);
                        } else if (state === YT.PlayerState.PLAYING) {
                            this.player.pauseVideo();
                            this.updatePlayPauseIcon(false);
                        }
                    }



                }

                updatePlayPauseIcon(isPlaying) {
                    const playIcon = this.playPauseButton?.querySelector(".video-play-icon");
                    const pauseIcon = this.playPauseButton?.querySelector(".video-pause-icon");

                    if (!playIcon || !pauseIcon) return;

                    if (isPlaying) {
                        playIcon.style.display = "none";
                        pauseIcon.style.display = "inline";
                    } else {
                        playIcon.style.display = "inline";
                        pauseIcon.style.display = "none";
                    }
                }



                handlePlayVideo() {
                    this.classList.add("playing");
                    this.loadContent();
                    const t = this.querySelector(".js-media-item-video");
                    t &&
                        t.addEventListener("play", () => {
                            this.pauseAllVideo(t), t.play();
                        });
                }
                onYouTubeIframeAPIReady() {
                    if ("undefined" != typeof YT && void 0 !== YT.Player)
                        try {
                            this.player = new YT.Player(this.eleVideo, {
                                videoId: this.idVideo,
                                playerVars: { playsinline: 1 },
                                events: {
                                    onReady: this.onPlayerYTReady,
                                    onStateChange: this.onPlayerStateYTChange,
                                },
                            });
                        } catch (t) {
                            console.error("Lỗi khi tạo trình phát YouTube:", t);
                        }
                    else {
                        var t = document.createElement("script"),
                            e =
                                ((t.src = "https://www.youtube.com/iframe_api"),
                                    (t.onload = () => {
                                        this.onYouTubeIframeAPIReady();
                                    }),
                                    document.getElementsByTagName("script")[0]);
                        e.parentNode.insertBefore(t, e);
                    }
                }
                onVimeoIframeAPIReady() {
                    if ("undefined" != typeof Vimeo && void 0 !== Vimeo.Player)
                        try {
                            var t = { id: this.idVideo, autoplay: 1 };
                            (this.playerVimeo = new Vimeo.Player(this.eleVideo, t)),
                                this.playerVimeo.on("play", () => {
                                    this.pauseAllVideo(this.playerVimeo);
                                });
                        } catch (t) {
                            console.error("Lỗi khi tạo trình phát Vimeo:", t);
                        }
                    else {
                        var t = document.createElement("script"),
                            e =
                                ((t.src = "https://player.vimeo.com/api/player.js"),
                                    (t.onload = () => {
                                        this.onVimeoIframeAPIReady();
                                    }),
                                    document.getElementsByTagName("script")[0]);
                        e.parentNode.insertBefore(t, e);
                    }
                }
                onPlayerYTReady = () => {
                    this.pauseAllVideo(this.player), this.player.playVideo();
                };
                // onPlayerStateYTChange = (t) => {
                //   1 == t.data && this.onPlayerPlay();
                // };

                onPlayerStateYTChange = (t) => {
                    const state = t.data;

                    if (state === YT.PlayerState.PLAYING) {
                        this.onPlayerPlay(); // pause other videos
                        this.updatePlayPauseIcon(true); // 👈 show pause icon
                    } else if (
                        state === YT.PlayerState.PAUSED ||
                        state === YT.PlayerState.ENDED
                    ) {
                        this.updatePlayPauseIcon(false); // 👈 show play icon
                    }
                };



                onPlayerPlay = () => {
                    this.pauseAllVideo(this.player);
                };
                loadContent() {
                    if (!this.getAttribute("loaded")) {
                        if (this.$("template")) {
                            var t = this.$("template").content.firstElementChild.cloneNode(!0);
                            this.appendChild(t),
                                this.isLoaded(!0),
                                this.trigger && this.trigger.remove();

                            // 🔽 ADD HERE AFTER APPENDING VIDEO
                            const video = this.$(".js-media-item-video");
                            if (video && !video.hasAttribute("data-listeners-added")) {
                                video.addEventListener("play", () => this.updatePlayPauseIcon(true));
                                video.addEventListener("pause", () => this.updatePlayPauseIcon(false));
                                video.addEventListener("ended", () => this.updatePlayPauseIcon(false));
                                video.setAttribute("data-listeners-added", "true");
                            }

                        } else {
                            if ("youtube" == this.typeVideo) this.onYouTubeIframeAPIReady();
                            else {
                                if ("vimeo" != this.typeVideo) return !0;
                                this.onVimeoIframeAPIReady();
                            }
                            this.trigger?.classList.add("d-none"),
                                this.$(".js-media-item").classList.add("d-flex");

                            // 🔽 ALSO ADD HERE in case video is not loaded via <template>
                            const video = this.$(".js-media-item-video");
                            if (video && !video.hasAttribute("data-listeners-added")) {
                                video.addEventListener("play", () => this.updatePlayPauseIcon(true));
                                video.addEventListener("pause", () => this.updatePlayPauseIcon(false));
                                video.addEventListener("ended", () => this.updatePlayPauseIcon(false));
                                video.setAttribute("data-listeners-added", "true");
                            }

                        }
                        return !0;
                    }
                }
                pauseAllVideo(e) {
                    THMHelper.qsa(
                        ".js-product-media-deferred-video:has([data-type='youtube']"
                    ).forEach((t) => {
                        t.player && e !== t.player && t.player?.pauseVideo();
                    }),
                        THMHelper.qsa(
                            ".js-product-media-deferred-video:has([data-type='vimeo'])"
                        ).forEach((t) => {
                            t.playerVimeo !== e && t.playerVimeo?.pause();
                        }),
                        THMHelper.qsa(".js-media-item-video").forEach((t) => {
                            t !== e && t.pause();
                        });
                }
                isLoaded(t) {
                    t ? this.setAttribute("loaded", !0) : this.removeAttribute("loaded");
                }
            }
            customElements.define("thm-load-media", THMLoadMedia);




        },
        collapsibleContent: function () {
            if (!customElements.get("collapsible-content")) {
                class collapsibleContent extends HTMLElement {
                    constructor() {
                        super();
                        this.disclosure = this.querySelector('details');
                        this.toggle = this.querySelector('summary');
                        this.panel = this.toggle.nextElementSibling;
                        this.init();
                    }

                    init() {
                        // Check if the content element has a CSS transition.
                        if (window.getComputedStyle(this.panel).transitionDuration !== '0s') {
                            this.toggle.addEventListener('click', this.handleToggle.bind(this));
                            this.disclosure.addEventListener('transitionend', this.handleTransitionEnd.bind(this));
                        }
                    }

                    /**
                     * Handles 'click' events on the summary element.
                     * @param {object} evt - Event object.
                     */
                    handleToggle(evt) {
                        evt.preventDefault();

                        if (!this.disclosure.open) {
                            this.open();
                        } else {
                            this.close();
                        }
                    }

                    /**
                     * Handles 'transitionend' events on the details element.
                     * @param {object} evt - Event object.
                     */
                    handleTransitionEnd(evt) {
                        if (evt.target !== this.panel) return;

                        if (this.disclosure.classList.contains('is-closing')) {
                            this.disclosure.classList.remove('is-closing');
                            this.disclosure.open = false;
                        }

                        this.panel.removeAttribute('style');
                    }

                    /**
                     * Adds inline 'height' style to the content element, to trigger open transition.
                     */
                    addContentHeight() {
                        this.panel.style.height = `${this.panel.scrollHeight}px`;
                    }

                    /**
                     * Opens the details element.
                     */
                    open() {
                        // Set content 'height' to zero before opening the details element.
                        this.panel.style.height = '0';

                        // Open the details element
                        this.disclosure.open = true;

                        // Set content 'height' to its scroll height, to enable CSS transition.
                        this.addContentHeight();
                    }

                    /**
                     * Closes the details element.
                     */
                    close() {
                        // Set content height to its scroll height, to enable transition to zero.
                        this.addContentHeight();

                        // Add class to enable styling of content or toggle icon before or during close transition.
                        this.disclosure.classList.add('is-closing');

                        // Set content height to zero to trigger the transition.
                        // Slight delay required to allow scroll height to be applied before changing to '0'.
                        setTimeout(() => {
                            this.panel.style.height = '0';
                        });
                    }
                }
                customElements.define('collapsible-content', collapsibleContent);
            }
        }
            
    }
};


document.addEventListener('DOMContentLoaded', function () {
    Thm.init();
});


 

function buildAnimation() {

  const button = gsap.utils.toArray(".button");

  if (button != null) {
    button.forEach((item) => {
      let span = item.querySelector(".button--text");
      let tl = gsap.timeline({ paused: true });
      if (span != null) {
        tl.to(span, { duration: 0.2, xPercent: -150, ease: "power2.in" });
        tl.set(span, { xPercent: 150 });
        tl.to(span, { duration: 0.2, xPercent: 0 });
        item.addEventListener("mouseenter", () => tl.play(0));
        item.addEventListener("mouseleave", () => tl.reverse());
      }
    });
  }

}


function initBlogIsotope(section) {
  // section is optional: if provided, scope querySelector inside it
  var scope = section || document;
  var elem = scope.querySelector('.blog-articles');

  if (!elem) return;

  // Destroy previous Isotope instance if it exists
  if (elem._isotopeInstance) {
    elem._isotopeInstance.destroy();
  }

  // Initialize Isotope
  var grid = new Isotope(elem, {
    itemSelector: '.article__item',
    layoutMode: 'fitRows'
  });

  // Store instance for later cleanup
  elem._isotopeInstance = grid;

  // Filter select
  var select = scope.querySelector('.blog-filter-select');
  if (select) {
    select.addEventListener('change', function () {
      var filterValue = this.value;
      filterValue = (window.filterFns && window.filterFns[filterValue]) || filterValue;
      grid.arrange({ filter: filterValue });
    });
  }
}

// Initial call on page load
document.addEventListener('DOMContentLoaded', function () {
  initBlogIsotope();
  buildAnimation();
});

// Shopify section/block events
document.addEventListener('shopify:section:load', function (event) {
  initBlogIsotope(event.target);
  buildAnimation(event.target);
});

document.addEventListener('shopify:section:reorder', function (event) {
  initBlogIsotope(event.target);
  buildAnimation(event.target);
});

document.addEventListener('shopify:block:select', function (event) {
  initBlogIsotope(event.target);
    buildAnimation(event.target);
});


 
 
    
        
 
    class DeferredMediaCustom extends HTMLElement {
      constructor() {
        super();

        this.$ = this.querySelector.bind(this);

        this.sectionID = this.dataset.sectionId;
        this.idVideo = this.dataset.idVideo;
        this.typeVideo = this.dataset.type;
        this.eleVideo = `DeferredVideo-${this.sectionID}-` + this.idVideo;

        this.trigger = this.$('.js-load-media-trigger');
        this.playPauseButton = this.$('.video-play-pause-button');


        this.onPlayerStateYTChange = this.onPlayerStateYTChange.bind(this);
        this.onPlayerPlay = this.onPlayerPlay.bind(this);

        this.trigger?.addEventListener('click', () => this.handleToggle());

  

      }

      connectedCallback() {
        if (Shopify && Shopify.designMode && this.getAttribute('data-autoplay') === 'true') {
          this.loadContent();
        } else if (this.getAttribute('data-autoplay') === 'true') {
          this.loadContent();
        }
      }

      /* ===============================
         TOGGLE
      =============================== */
      handleToggle() {

      

        this.classList.add('playing');
        this.loadContent();

        const video = this.$('.js-media-item-video') || this.$('.js-media-item-video-mobile');

        if (video) {
          if (video.paused || video.ended) {
            this.pauseAllVideo(video);
            video.play();
            this.setButtonState(true);
          } else {
            video.pause();
            this.setButtonState(false);
          }
        }

        if (this.player && typeof this.player.getPlayerState === 'function') {
          const state = this.player.getPlayerState();

          if (
            state === YT.PlayerState.PAUSED ||
            state === YT.PlayerState.ENDED
          ) {
            this.pauseAllVideo(this.player);
            this.player.playVideo();
            this.setButtonState(true);
          } else if (state === YT.PlayerState.PLAYING) {
            this.player.pauseVideo();
            this.setButtonState(false);
          }
        }
      }

      /* ===============================
         BUTTON STATE
      =============================== */
      setButtonState(isPlaying) {
        if (!this.playPauseButton) return;
        this.playPauseButton.dataset.playing = isPlaying ? 'true' : 'false';
      }

      /* ===============================
         YOUTUBE
      =============================== */
      onYouTubeIframeAPIReady() {
        if (this.player) return;

        if (typeof YT !== 'undefined' && YT.Player) {
          this.player = new YT.Player(this.eleVideo, {
            videoId: this.idVideo,
            playerVars: { playsinline: 1 },
            events: {
              onReady: this.onPlayerYTReady,
              onStateChange: this.onPlayerStateYTChange,
            },
          });
          return;
        }

        // load script only once
        if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
          const script = document.createElement('script');
          script.src = 'https://www.youtube.com/iframe_api';
          document.head.appendChild(script);
        }

        // IMPORTANT: global callback (YouTube requirement)
        window.onYouTubeIframeAPIReady = () => {
          this.onYouTubeIframeAPIReady();
        };
      }

      onPlayerYTReady = () => {
        this.pauseAllVideo(this.player);
        this.player.playVideo();
      };

      onPlayerStateYTChange(t) {
        if (t.data === YT.PlayerState.PLAYING) {
          this.onPlayerPlay();
          this.setButtonState(true);
        } else if (
          t.data === YT.PlayerState.PAUSED ||
          t.data === YT.PlayerState.ENDED
        ) {
          this.setButtonState(false);
        }
      }

      onPlayerPlay() {
        this.pauseAllVideo(this.player);
      }

      /* ===============================
         VIMEO
      =============================== */

      createVimeoPlayer() {
        if (this.playerVimeo) return;

        this.playerVimeo = new Vimeo.Player(this.eleVideo, {
          id: this.idVideo,
          autoplay: true,
        });

        this.playerVimeo.on('play', () => {
          this.pauseAllVideo(this.playerVimeo);
        });
      }


      onVimeoIframeAPIReady() {
        if (typeof Vimeo !== 'undefined' && Vimeo.Player) {
          this.createVimeoPlayer();
          return;
        }

        const src = 'https://player.vimeo.com/api/player.js';

        // prevent duplicate script injection
        let script = document.querySelector(`script[src="${src}"]`);

        if (!script) {
          script = document.createElement('script');
          script.src = src;

          script.onload = () => {
            this.createVimeoPlayer();
          };

          document.head.appendChild(script);
          return;
        }

        // script already exists → wait until Vimeo becomes available
        const check = setInterval(() => {
          if (typeof Vimeo !== 'undefined' && Vimeo.Player) {
            clearInterval(check);
            this.createVimeoPlayer();
          }
        }, 50);
      }
      /* ===============================
         LOAD CONTENT
      =============================== */

      loadContent() {
        if (this.hasAttribute('loaded')) return;

        // 🔹 YOUTUBE / VIMEO → hide trigger only
        if (this.typeVideo === 'youtube' || this.typeVideo === 'vimeo') {
          this.trigger?.classList.add('d-none');
        }

        // 🔹 Load template if exists
        if (this.$('template')) {
          const node = this.$('template').content.firstElementChild.cloneNode(true);
          this.appendChild(node);

        } else {
          if (this.typeVideo === 'youtube') {
            this.onYouTubeIframeAPIReady();
            this.buttonWrapper?.classList.add('display-none');
          }

          if (this.typeVideo === 'vimeo') {
            this.onVimeoIframeAPIReady();
          }
        }


        // 🔹 Handle autoplay (lazy-load logic)
        if (this.getAttribute('data-autoplay') === 'true') {


          // HTML5 video
          const localVideo = this.$('video');


          if (localVideo) {
            const source = localVideo.querySelector('source');
            const src = source?.getAttribute('data-src');
            if (src) {
              source.setAttribute('src', src);
              localVideo.load();
              localVideo.muted = true
              localVideo.play().catch((err) => {
                console.warn("Autoplay failed:", err);
              });
            }
            else {
              console.warn("Missing data-src on local video source.");
            }
          }

          // iframe video (YouTube/Vimeo)
          const iframe = this.$('iframe');
          if (iframe) {
            const src = iframe.getAttribute('data-src');
            if (src) {
              iframe.setAttribute('src', src);

              iframe.addEventListener(
                'load',
                () => {
                  if (this.typeVideo === 'youtube') {
                    iframe.contentWindow.postMessage(
                      '{"event":"command","func":"playVideo","args":""}',
                      '*'
                    );
                  }

                  if (this.typeVideo === 'vimeo') {
                    iframe.contentWindow.postMessage('{"method":"play"}', '*');
                  }
                },
                { once: true }
              );
            }
          }
        }

        this.isLoaded(true);

        // 🔹 Trigger listeners remain
        const video = this.$('.js-media-item-video');
        if (video && !video.dataset.listenersAdded) {
          video.addEventListener('play', () => this.setButtonState(true));
          video.addEventListener('pause', () => this.setButtonState(false));
          video.addEventListener('ended', () => this.setButtonState(false));
          video.dataset.listenersAdded = 'true';
        }
      }

      /* ===============================
         PAUSE ALL
      =============================== */
      pauseAllVideo(current) {
        document
          .querySelectorAll(
            ".js-media-item-video:has([data-type='youtube'])"
          )
          .forEach((el) => {
            el.player && el.player !== current && el.player.pauseVideo();
          });

        document
          .querySelectorAll(
            ".js-media-item-video:has([data-type='vimeo'])"
          )
          .forEach((el) => {
            el.playerVimeo &&
              el.playerVimeo !== current &&
              el.playerVimeo.pause();
          });

        document
          .querySelectorAll('.js-media-item-video')
          .forEach((v) => v !== current && v.pause());
      }

      isLoaded(val) {
        val ? this.setAttribute('loaded', '') : this.removeAttribute('loaded');
      }
    }

customElements.define("deferred-media-custom", DeferredMediaCustom);

 