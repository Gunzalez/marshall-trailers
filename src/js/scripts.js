(function () {
  "use strict";

  var marshallTrailers = {};

  var dummyData = {
    productRangesData: [
      {
        id: "dropside-trailers",
        title: "Drop-side Trailers",
        image: "images/range-1.png",
        models: [
          {
            title: "QM-6 - 6.5 tons",
            id: "qm-6",
            image: "images/range-1.png",
            parent_id: "dropside-trailers",
          },
          {
            title: "QM-8 - 8.5 tons",
            id: "qm-8",
            image: "images/range-1.png",
            parent_id: "dropside-trailers",
          },
          {
            title: "QM-10 - 10 tons",
            id: "qm-10",
            image: "images/range-1.png",
            parent_id: "dropside-trailers",
          },
          {
            title: "QM-12 - 12 tons",
            id: "qm-12",
            image: "images/range-1.png",
            parent_id: "dropside-trailers",
          },
          {
            title: "QM-14 - 14 tons",
            id: "qm-14",
            image: "images/range-1.png",
            parent_id: "dropside-trailers",
          },
          {
            title: "QM-16 - 16 tons",
            id: "qm-16",
            image: "images/range-1.png",
            parent_id: "dropside-trailers",
          },
          {
            title: "QM-18 - 18 tons",
            id: "qm-18",
            image: "images/range-1.png",
            parent_id: "dropside-trailers",
          },
        ],
      },
      {
        id: "new-low-loaders",
        title: "New Low Loaders",
        image: "images/range-2.png",
        models: [
          {
            title: "LL-10T - 10 tons",
            id: "ll-10t",
            image: "images/range-2.png",
            parent_id: "new-low-loaders",
          },
          {
            title: "LL-14T - 14 tons",
            id: "ll-14t",
            image: "images/range-2.png",
            parent_id: "new-low-loaders",
          },
          {
            title: "LL-18T - 18 tons",
            id: "ll-18t",
            image: "images/range-2.png",
            parent_id: "new-low-loaders",
          },
          {
            title: "LL-24T - 24 tons",
            id: "ll-24t",
            image: "images/range-2.png",
            parent_id: "new-low-loaders",
          },
        ],
      },
      {
        id: "grain-and-silage",
        title: "Grain & Silage",
        image: "images/range-3.png",
        models: [
          {
            title: "GS-10 - 10m³",
            id: "gs-10",
            image: "images/range-3.png",
            parent_id: "grain-and-silage",
          },
          {
            title: "GS-15 - 15m³",
            id: "gs-15",
            image: "images/range-3.png",
            parent_id: "grain-and-silage",
          },
          {
            title: "GS-20 - 20m³",
            id: "gs-20",
            image: "images/range-3.png",
            parent_id: "grain-and-silage",
          },
          {
            title: "GS-25 - 25m³",
            id: "gs-25",
            image: "images/range-3.png",
            parent_id: "grain-and-silage",
          },
        ],
      },
      {
        id: "livestock-trailers-containers",
        title: "Livestock Containers",
        image: "images/range-4.png",
        models: [
          {
            title: "LC-10 - 10ft",
            id: "lc-10",
            image: "images/range-4.png",
            parent_id: "livestock-trailers-containers",
          },
          {
            title: "LC-14 - 14ft",
            id: "lc-14",
            image: "images/range-4.png",
            parent_id: "livestock-trailers-containers",
          },
          {
            title: "LC-18 - 18ft",
            id: "lc-18",
            image: "images/range-4.png",
            parent_id: "livestock-trailers-containers",
          },
        ],
      },
      {
        id: "multi-purpose-dumpsters",
        title: "Multi-purpose Dumpsters",
        image: "images/range-5.png",
        models: [
          {
            title: "MD-8 - 8 tons",
            id: "md-8",
            image: "images/range-5.png",
            parent_id: "multi-purpose-dumpsters",
          },
          {
            title: "MD-12 - 12 tons",
            id: "md-12",
            image: "images/range-5.png",
            parent_id: "multi-purpose-dumpsters",
          },
          {
            title: "MD-16 - 16 tons",
            id: "md-16",
            image: "images/range-5.png",
            parent_id: "multi-purpose-dumpsters",
          },
        ],
      },
      {
        id: "slurry-tankers",
        title: "Slurry Tankers",
        image: "images/range-7.png",
        models: [
          {
            title: "ST-2000 - 2000 gal",
            id: "st-2000",
            image: "images/range-7.png",
            parent_id: "slurry-tankers",
          },
          {
            title: "ST-2500 - 2500 gal",
            id: "st-2500",
            image: "images/range-7.png",
            parent_id: "slurry-tankers",
          },
          {
            title: "ST-3000 - 3000 gal",
            id: "st-3000",
            image: "images/range-7.png",
            parent_id: "slurry-tankers",
          },
        ],
      },
      {
        id: "muck-spreaders",
        title: "Muck Spreaders",
        image: "images/range-6.png",
        models: [
          {
            title: "MS-6 - 6m³",
            id: "ms-6",
            image: "images/range-6.png",
            parent_id: "muck-spreaders",
          },
          {
            title: "MS-8 - 8m³",
            id: "ms-8",
            image: "images/range-6.png",
            parent_id: "muck-spreaders",
          },
          {
            title: "MS-10 - 10m³",
            id: "ms-10",
            image: "images/range-6.png",
            parent_id: "muck-spreaders",
          },
        ],
      },
      {
        id: "new-feeder-trailers",
        title: "Feeder Trailers",
        image: "images/range-8.png",
        models: [
          {
            title: "FT-14 - 14ft",
            id: "ft-14",
            image: "images/range-8.png",
            parent_id: "new-feeder-trailers",
          },
          {
            title: "FT-18 - 18ft",
            id: "ft-18",
            image: "images/range-8.png",
            parent_id: "new-feeder-trailers",
          },
          {
            title: "FT-22 - 22ft",
            id: "ft-22",
            image: "images/range-8.png",
            parent_id: "new-feeder-trailers",
          },
        ],
      },
      {
        id: "people-carrier-trailers",
        title: "People Carrier Trailers",
        image: "images/range-9.png",
        models: [
          {
            title: "PC-16 - 16 Seats",
            id: "pc-16",
            image: "images/range-9.png",
            parent_id: "people-carrier-trailers",
          },
          {
            title: "PC-24 - 24 Seats",
            id: "pc-24",
            image: "images/range-9.png",
            parent_id: "people-carrier-trailers",
          },
        ],
      },
      {
        id: "flat-bale-trailers",
        title: "Flat/Bale Trailers",
        image: "images/range-10.png",
        models: [
          {
            title: "FB-20 - 20ft",
            id: "fb-20",
            image: "images/range-10.png",
            parent_id: "flat-bale-trailers",
          },
          {
            title: "FB-24 - 24ft",
            id: "fb-24",
            image: "images/range-10.png",
            parent_id: "flat-bale-trailers",
          },
          {
            title: "FB-30 - 30ft",
            id: "fb-30",
            image: "images/range-10.png",
            parent_id: "flat-bale-trailers",
          },
        ],
      },
      {
        id: "new-dump-trailers",
        title: "Dump Trailers",
        image: "images/range-11.png",
        models: [
          {
            title: "RDS-10 - 10 tons",
            id: "hd6",
            image: "images/range-11.png",
            parent_id: "new-dump-trailers",
          },
          {
            title: "RDS-14 - 14 tons",
            id: "hd8",
            image: "images/range-11.png",
            parent_id: "new-dump-trailers",
          },
        ],
      },
      {
        id: "tankers",
        title: "Tankers",
        image: "images/range-12.png",
        models: [
          {
            title: "T-1800 - 1800 gal",
            id: "t-1800",
            image: "images/range-12.png",
            parent_id: "tankers",
          },
          {
            title: "T-2200 - 2200 gal",
            id: "t-2200",
            image: "images/range-12.png",
            parent_id: "tankers",
          },
          {
            title: "T-3000 - 3000 gal",
            id: "t-3000",
            image: "images/range-12.png",
            parent_id: "tankers",
          },
          {
            title: "T-4000 - 4000 gal",
            id: "t-4000",
            image: "images/range-12.png",
            parent_id: "tankers",
          },
          {
            title: "T-5000 - 5000 gal",
            id: "t-5000",
            image: "images/range-12.png",
            parent_id: "tankers",
          },
          {
            title: "T-6000 - 6000 gal",
            id: "t-6000",
            image: "images/range-12.png",
            parent_id: "tankers",
          },
          {
            title: "T-8000 - 8000 gal",
            id: "t-8000",
            image: "images/range-12.png",
            parent_id: "tankers",
          },
          {
            title: "T-10000 - 10000 gal",
            id: "t-10000",
            image: "images/range-12.png",
            parent_id: "tankers",
          },
        ],
      },
      {
        id: "rear-discharge-muck-spreaders",
        title: "Rear Discharge Muck Spreaders",
        image: "images/range-2.png",
        models: [
          {
            title: "FES-8 - 8m³",
            id: "fes-8",
            image: "images/range-2.png",
            parent_id: "rear-discharge-muck-spreaders",
          },
          {
            title: "FES-12 - 12m³",
            id: "fes-12",
            image: "images/range-2.png",
            parent_id: "rear-discharge-muck-spreaders",
          },
        ],
      },
      {
        id: "even-more-tankers",
        title: "Even More Tankers",
        image: "images/range-4.png",
        models: [
          {
            title: "ET-2400 - 2400 gal",
            id: "et-2400",
            image: "images/range-4.png",
            parent_id: "even-more-tankers",
          },
          {
            title: "ET-3200 - 3200 gal",
            id: "et-3200",
            image: "images/range-4.png",
            parent_id: "even-more-tankers",
          },
          {
            title: "ET-4000 - 4000 gal",
            id: "et-4000",
            image: "images/range-4.png",
            parent_id: "even-more-tankers",
          },
          {
            title: "ET-6000 - 6000 gal",
            id: "et-6000",
            image: "images/range-4.png",
            parent_id: "even-more-tankers",
          },
          {
            title: "ET-8000 - 8000 gal",
            id: "et-8000",
            image: "images/range-4.png",
            parent_id: "even-more-tankers",
          },
        ],
      },
    ],
  };

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

  /**
   * @miniCarousel
   * Implements the Slick plugin for the mini carousel
   */
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

  /* --------------------------------------------------------------- */

  var createTrigger = function (productsCount) {
    var trigger = document.createElement("button");
    trigger.classList = "trigger";
    trigger.type = "button";
    trigger.addEventListener("click", function () {
      var dropdown = this.parentNode.querySelector(".structure");
      dropdown.classList.toggle("hide");
    });

    trigger.textContent = "Select from " + productsCount + " models";
    return trigger;
  };

  var showDropdown = function (products) {
    var structure = document.createElement("div");
    structure.classList.add("structure", "hide");

    products.forEach(function (product) {
      var option = document.createElement("button");
      option.classList.add("option");
      option.type = "button";
      option.addEventListener("click", function () {
        var dropdown = this.parentNode;
        dropdown.classList.add("hide");
        window.location.href = "product.html?id=" + product.id;
      });

      option.textContent = product.title;
      structure.appendChild(option);
    });
    return structure;
  };

  /**
   * @fancySelect
   * Highjacks standard select elements to create custom dropdowns
   */
  marshallTrailers.fancySelect = {
    init: function (productRanges) {
      productRanges.forEach(function (range) {
        var component = document.createElement("div");
        component.classList.add("fancy-select-component");

        component.addEventListener("mouseleave", function () {
          this.querySelector(".structure").classList.add("hide");
        });

        var trigger = createTrigger(range.models.length);
        var dropdown = showDropdown(range.models);

        component.appendChild(trigger);
        component.appendChild(dropdown);
        var printArea = document.getElementById(
          range.id + "-selector"
        ).parentElement;
        printArea.appendChild(component);
      });
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

    window.fancySelect = marshallTrailers.fancySelect;
    window.heroCarousel = marshallTrailers.carousel;
    window.miniCarousel = marshallTrailers.miniCarousel;
    window.dummyData = dummyData;
  };

  /** Runs the global init */
  marshallTrailers.init();
})();
