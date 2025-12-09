(function () {
  "use strict";

  var marshallTrailers = {};

  /**
   * @menu
   * Implements the dropdown menu behaviour
   */
  marshallTrailers.mobileNavigation = {
    init: function () {
      var menu = new Mmenu(
        "#desktop-navigation",
        {
          extensions: ["position-right", "pagedim-black", "position-front"],
        },
        {
          offCanvas: {
            clone: true,
          },
        }
      );
      var api = menu.API;

      $("#toggle-mobile-navigation").on("click", function (event) {
        event.preventDefault();
        api.open();
      });
    },
  };

  /*---------------------------------------------------------------- */

  /**
   * @utils
   * A collection of utility functions
   * Used by other functions
   */
  marshallTrailers.utils = {
    /**
     * ### function preloadImage
     * preloads a single image
     *
     * @param url A string, the address of the image
     * @param anImageLoadedCallback A callback to call when the image is loaded
     * @returns void
     */
    preloadImage: function (url, anImageLoadedCallback) {
      var img = new Image();
      img.onload = anImageLoadedCallback;
      img.src = url;
    },

    /**
     * ### function preloadImages
     * Preloads a list of images tracking when all have loaded, then
     * execute the passed callback.
     *
     * @param urls A string array of background image urls
     * @param allImagesLoadedCallback A callback to call when all images are loaded
     * @returns void
     */
    preloadImages: function (urls, allImagesLoadedCallback) {
      var loadedCounter = 0;
      var toBeLoadedNumber = urls.length;
      urls.forEach(function (url) {
        marshallTrailers.utils.preloadImage(url, function () {
          loadedCounter++;
          if (loadedCounter == toBeLoadedNumber) {
            allImagesLoadedCallback();
          }
        });
      });
    },

    /**
     * ### function getUrlVars
     * Extracts data from query strings in url
     *
     * @returns Array of strings
     */
    getUrlVars: function () {
      var vars = [],
        hash;
      var hashes = window.location.href
        .slice(window.location.href.indexOf("?") + 1)
        .split("&");
      for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split("=");
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
      }
      return vars;
    },

    /**
     * ### object attributes
     * utils for adding and extracting data attributes from HTMl elements
     *
     * @returns object containing setter and getter functions
     */
    attributes: {
      set: function (element, attr, value) {
        element.setAttribute(attr, value);
      },
      get: function (element, attr) {
        return element.getAttribute(attr);
      },
    },
  };

  /*---------------------------------------------------------------- */

  /**
   * @carousel
   * Implements the Slick plugin
   * Preloads images before plugin initiation
   */
  marshallTrailers.carousel = {
    init: function () {
      /** get list of images to preload */
      var imgUrls = [];
      $(".carousel-main .slide").each(function (_, item) {
        imgUrls.push(
          $(item)
            .css("background-image")
            .replace(/^url\(['"](.+)['"]\)/, "$1")
        );
      });

      /** initiate carousel after images are loaded */
      marshallTrailers.carousel.preloadImages(
        imgUrls,
        marshallTrailers.carousel.initSlick
      );
    },

    /** initiate the carousel */
    initSlick: function () {
      $(".carousel-main .slide").removeClass("preload");
      $(".carousel-main").slick({
        dots: true,
        infinite: true,
        autoplay: true,
        arrows: false,
        fade: true,
        autoplaySpeed: 7000,
        cssEase: "linear",
      });

      console.log("carousel again initiated");
    },

    /**
     * ### function preloadImage
     * preloads a single image
     *
     * @param url A string, the address of the image
     * @param anImageLoadedCallback A callback to call when the image is loaded
     * @returns void
     */
    preloadImage: function (url, anImageLoadedCallback) {
      var img = new Image();
      img.onload = anImageLoadedCallback;
      img.src = url;
    },

    /**
     * ### function preloadImages
     * Preloads a list of images tracking when all have loaded, then
     * execute the passed callback.
     *
     * @param urls A string array of background image urls
     * @param allImagesLoadedCallback A callback to call when all images are loaded
     * @returns void */
    preloadImages: function (urls, allImagesLoadedCallback) {
      var loadedCounter = 0;
      var toBeLoadedNumber = urls.length;
      urls.forEach(function (url) {
        marshallTrailers.carousel.preloadImage(url, function () {
          loadedCounter++;
          if (loadedCounter == toBeLoadedNumber) {
            allImagesLoadedCallback();
          }
        });
      });
    },
  };

  marshallTrailers.miniCarousel = {
    $carouselMini: null,

    init: function () {
      this.$carouselMini = $(".carousel-mini").slick({
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: false,
        centerPadding: "40px",
        autoplaySpeed: 2000,
        infinite: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      });
    },

    next: function () {
      this.$carouselMini.slick("slickNext");
    },

    prev: function () {
      this.$carouselMini.slick("slickPrev");
    },
  };

  /*---------------------------------------------------------------- */

  /**
   * @products
   * Handles dropdown switching behaviour for mobile
   * Handles tabs filtering for desktop
   */
  marshallTrailers.products = {
    init: function () {
      $("#mobile-switcher").on("submit", function (event) {
        event.preventDefault();
      });

      var $productList = $("#product-items");
      var $desktopSwitcher = $("#desktop-switcher");
      var $mobileSwitcher = $("#mobile-switcher");

      var narrowSelectedClass = "narrow-selected";
      $mobileSwitcher.on("change", "select", function () {
        $productList
          .find("." + narrowSelectedClass)
          .removeClass(narrowSelectedClass);
        $productList.find("#" + this.value).addClass(narrowSelectedClass);
      });

      var buttonSelectedClass = "active";
      var wideSelectedClass = "wide-selected";
      var clearButtons = function () {
        $desktopSwitcher
          .find("." + buttonSelectedClass)
          .removeClass(buttonSelectedClass);
      };
      var clearProductList = function () {
        $productList
          .find("." + wideSelectedClass)
          .removeClass(wideSelectedClass);
      };
      var clearButtonsAndList = function () {
        clearButtons();
        clearProductList();
      };

      $desktopSwitcher.on("click", "button", function () {
        if (!$(this).hasClass(buttonSelectedClass)) {
          clearButtonsAndList();

          var activeCategory = $(this).data("category");
          $productList.find("." + activeCategory).addClass(wideSelectedClass);

          $desktopSwitcher.find("button").each(function (_, button) {
            if ($(button).data("category") === activeCategory) {
              $(button).addClass(buttonSelectedClass);
            }
          });
        } else {
          clearButtonsAndList();
        }
      });
    },
  };

  /**
   * @backToTop
   * Helps navigate up and down long pages
   */
  marshallTrailers.backToTop = {
    init: function () {
      var btn = $("#back-to-top");

      $(window).scroll(function () {
        if ($(window).scrollTop() > 300) {
          btn.addClass("show");
        } else {
          btn.removeClass("show");
        }
      });

      btn.on("click", function (e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "300");
      });
    },
  };

  /**
   * @topNavigation
   * Handles the desktop navigation drawer behaviour
   */
  marshallTrailers.topNavigation = {
    init: function () {
      var openBtn = $("#open-navigation");
      var closeBtn = $("#close-navigation");

      openBtn.on("click", function (e) {
        e.preventDefault();
        marshallTrailers.topNavigation.open();
      });

      closeBtn.on("click", function (e) {
        e.preventDefault();
        marshallTrailers.topNavigation.close();
      });
    },

    open: function () {
      $("#top-navigation").addClass("opened");
    },

    scrolled: function () {
      $("#top-navigation").addClass("scrolled");
    },

    close: function () {
      $("#top-navigation").removeClass("opened").removeClass("scrolled");
    },
  };

  // resize events */
  $(window).on("resize", function () {
    marshallTrailers.topNavigation.close();
  });

  // scroll events */
  var lastScrollY = window.scrollY;
  var SCROLLED_DISTANCE = 200;
  var DISTANCE_TO_HIDE = 400;
  $(window).on("scroll", function () {
    var currentScrollY = window.scrollY;
    var scrolledDistance = Math.abs(currentScrollY - lastScrollY);

    if (scrolledDistance >= SCROLLED_DISTANCE) {
      if (currentScrollY > lastScrollY) {
        marshallTrailers.topNavigation.scrolled();
      } else {
        if (currentScrollY <= DISTANCE_TO_HIDE) {
          marshallTrailers.topNavigation.close();
        }
      }
      lastScrollY = currentScrollY;
    }
  });

  /**
   * @init
   * one init to rule them all
   */
  marshallTrailers.init = function () {
    marshallTrailers.topNavigation.init();
    marshallTrailers.mobileNavigation.init();

    window.heroCarousel = marshallTrailers.carousel;
    window.miniCarousel = marshallTrailers.miniCarousel;
  };

  /** Runs the global init */
  marshallTrailers.init();
})();
