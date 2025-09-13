(function () {
  "use strict";

  var abim = {};

  /**
   * @menu
   * Implements the dropdown menu behaviour
   */
  abim.menu = {
    init: function () {
      var menu = new Mmenu(
        "#menu",
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

      $("#toggle-navigation").on("click", function (evnt) {
        evnt.preventDefault();
        api.open();
      });

      // $(".close-menu").on("click", function (evnt) {
      //   evnt.preventDefault();
      //   api.close();
      // });

      // adds chevrons to desktopp menu AFTER it has been cloned for mobile nav above
      $("#menu ul ul")
        .parent()
        .append('<i class="fa-solid fa-caret-down"></i>');
    },
  };

  /*---------------------------------------------------------------- */

  /**
   * @utils
   * A collection of utility functions
   * Used by other functions
   */
  abim.utils = {
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
        abim.utils.preloadImage(url, function () {
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
     * @returns object containing swetter and getter functions
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
  abim.carousel = {
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
      abim.carousel.preloadImages(imgUrls, abim.carousel.initSlick);
    },

    /** initiate the carousel */
    initSlick: function () {
      $(".carousel-main .slide").removeClass("preload");
      $(".carousel-main").slick({
        dots: true,
        infinite: true,
        autoplay: true,
        arrows: false,
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
        abim.carousel.preloadImage(url, function () {
          loadedCounter++;
          if (loadedCounter == toBeLoadedNumber) {
            allImagesLoadedCallback();
          }
        });
      });
    },
  };

  /*---------------------------------------------------------------- */

  /**
   * @products
   * Handles dropdown switching behaviour for mobile
   * Handles tabs filtering for desktop
   */
  abim.products = {
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
  abim.backToTop = {
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
   * @init
   * one init to rule them all
   */
  abim.init = function () {
    abim.menu.init();
    abim.carousel.init();
    abim.products.init();
    abim.backToTop.init();
  };

  /** Runs the global init */
  abim.init();
})();
