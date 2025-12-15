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
            title: "QM-6",
            id: "qm6",
            image: "images/range-1.png",
            range_id: "dropside-trailers",
          },
          {
            title: "QM-8",
            id: "qm8",
            image: "images/range-1.png",
            range_id: "dropside-trailers",
          },
          {
            title: "QM-10",
            id: "qm10",
            image: "images/range-1.png",
            range_id: "dropside-trailers",
          },
          {
            title: "QM-12",
            id: "qm12",
            image: "images/range-1.png",
            range_id: "dropside-trailers",
          },
          {
            title: "QM-14",
            id: "qm14",
            image: "images/range-1.png",
            range_id: "dropside-trailers",
          },
          {
            title: "QM-16",
            id: "qm16",
            image: "images/range-1.png",
            range_id: "dropside-trailers",
          },
          {
            title: "QM-18",
            id: "qm18",
            image: "images/range-1.png",
            range_id: "dropside-trailers",
          },
        ],
      },
      {
        id: "new-low-loaders",
        title: "New Low Loaders",
        image: "images/range-2.png",
        models: [
          {
            title: "LL-10T",
            id: "ll-10t",
            image: "images/range-2.png",
            range_id: "new-low-loaders",
          },
          {
            title: "LL-14T",
            id: "ll-14t",
            image: "images/range-2.png",
            range_id: "new-low-loaders",
          },
          {
            title: "LL-18T",
            id: "ll-18t",
            image: "images/range-2.png",
            range_id: "new-low-loaders",
          },
          {
            title: "LL-24T",
            id: "ll-24t",
            image: "images/range-2.png",
            range_id: "new-low-loaders",
          },
        ],
      },
      {
        id: "grain-and-silage",
        title: "Grain & Silage",
        image: "images/range-3.png",
        models: [
          {
            title: "GS-10",
            id: "gs-10",
            image: "images/range-3.png",
            range_id: "grain-and-silage",
          },
          {
            title: "GS-15",
            id: "gs-15",
            image: "images/range-3.png",
            range_id: "grain-and-silage",
          },
          {
            title: "GS-20",
            id: "gs-20",
            image: "images/range-3.png",
            range_id: "grain-and-silage",
          },
          {
            title: "GS-25",
            id: "gs-25",
            image: "images/range-3.png",
            range_id: "grain-and-silage",
          },
        ],
      },
      {
        id: "livestock-trailers-containers",
        title: "Livestock Containers",
        image: "images/range-4.png",
        models: [
          {
            title: "LC-10",
            id: "lc-10",
            image: "images/range-4.png",
            range_id: "livestock-trailers-containers",
          },
          {
            title: "LC-14",
            id: "lc-14",
            image: "images/range-4.png",
            range_id: "livestock-trailers-containers",
          },
          {
            title: "LC-18",
            id: "lc-18",
            image: "images/range-4.png",
            range_id: "livestock-trailers-containers",
          },
        ],
      },
      {
        id: "multi-purpose-dumpsters",
        title: "Multi-purpose Dumpsters",
        image: "images/range-5.png",
        models: [
          {
            title: "MD-8",
            id: "md-8",
            image: "images/range-5.png",
            range_id: "multi-purpose-dumpsters",
          },
          {
            title: "MD-12",
            id: "md-12",
            image: "images/range-5.png",
            range_id: "multi-purpose-dumpsters",
          },
          {
            title: "MD-16",
            id: "md-16",
            image: "images/range-5.png",
            range_id: "multi-purpose-dumpsters",
          },
        ],
      },
      {
        id: "slurry-tankers",
        title: "Slurry Tankers",
        image: "images/range-7.png",
        models: [
          {
            title: "ST-2000",
            id: "st-2000",
            image: "images/range-7.png",
            range_id: "slurry-tankers",
          },
          {
            title: "ST-2500",
            id: "st-2500",
            image: "images/range-7.png",
            range_id: "slurry-tankers",
          },
          {
            title: "ST-3000",
            id: "st-3000",
            image: "images/range-7.png",
            range_id: "slurry-tankers",
          },
        ],
      },
      {
        id: "muck-spreaders",
        title: "Muck Spreaders",
        image: "images/range-6.png",
        models: [
          {
            title: "MS-6",
            id: "ms-6",
            image: "images/range-6.png",
            range_id: "muck-spreaders",
          },
          {
            title: "MS-8",
            id: "ms-8",
            image: "images/range-6.png",
            range_id: "muck-spreaders",
          },
          {
            title: "MS-10",
            id: "ms-10",
            image: "images/range-6.png",
            range_id: "muck-spreaders",
          },
        ],
      },
      {
        id: "new-feeder-trailers",
        title: "Feeder Trailers",
        image: "images/range-8.png",
        models: [
          {
            title: "FT-14",
            id: "ft-14",
            image: "images/range-8.png",
            range_id: "new-feeder-trailers",
          },
          {
            title: "FT-18",
            id: "ft-18",
            image: "images/range-8.png",
            range_id: "new-feeder-trailers",
          },
          {
            title: "FT-22",
            id: "ft-22",
            image: "images/range-8.png",
            range_id: "new-feeder-trailers",
          },
        ],
      },
      {
        id: "people-carrier-trailers",
        title: "People Carrier Trailers",
        image: "images/range-9.png",
        models: [
          {
            title: "PC-16",
            id: "pc-16",
            image: "images/range-9.png",
            range_id: "people-carrier-trailers",
          },
          {
            title: "PC-24",
            id: "pc-24",
            image: "images/range-9.png",
            range_id: "people-carrier-trailers",
          },
        ],
      },
      {
        id: "flat-bale-trailers",
        title: "Flat/Bale Trailers",
        image: "images/range-10.png",
        models: [
          {
            title: "FB-20",
            id: "fb-20",
            image: "images/range-10.png",
            range_id: "flat-bale-trailers",
          },
          {
            title: "FB-24",
            id: "fb-24",
            image: "images/range-10.png",
            range_id: "flat-bale-trailers",
          },
          {
            title: "FB-30",
            id: "fb-30",
            image: "images/range-10.png",
            range_id: "flat-bale-trailers",
          },
        ],
      },
      {
        id: "new-dump-trailers",
        title: "Dump Trailers",
        image: "images/range-11.png",
        models: [
          {
            title: "RDS-10",
            id: "hd6",
            image: "images/range-11.png",
            range_id: "new-dump-trailers",
          },
          {
            title: "RDS-14",
            id: "hd8",
            image: "images/range-11.png",
            range_id: "new-dump-trailers",
          },
        ],
      },
      {
        id: "tankers",
        title: "Tankers",
        image: "images/range-12.png",
        models: [
          {
            title: "T-1800",
            id: "t-1800",
            image: "images/range-12.png",
            range_id: "tankers",
          },
          {
            title: "T-2200",
            id: "t-2200",
            image: "images/range-12.png",
            range_id: "tankers",
          },
          {
            title: "T-3000",
            id: "t-3000",
            image: "images/range-12.png",
            range_id: "tankers",
          },
          {
            title: "T-4000",
            id: "t-4000",
            image: "images/range-12.png",
            range_id: "tankers",
          },
          {
            title: "T-5000",
            id: "t-5000",
            image: "images/range-12.png",
            range_id: "tankers",
          },
          {
            title: "T-6000",
            id: "t-6000",
            image: "images/range-12.png",
            range_id: "tankers",
          },
          {
            title: "T-8000",
            id: "t-8000",
            image: "images/range-12.png",
            range_id: "tankers",
          },
          {
            title: "T-10000",
            id: "t-10000",
            image: "images/range-12.png",
            range_id: "tankers",
          },
        ],
      },
      {
        id: "rear-discharge-muck-spreaders",
        title: "Rear Discharge Muck Spreaders",
        image: "images/range-2.png",
        models: [
          {
            title: "FES-8",
            id: "fes-8",
            image: "images/range-2.png",
            range_id: "rear-discharge-muck-spreaders",
          },
          {
            title: "FES-12",
            id: "fes-12",
            image: "images/range-2.png",
            range_id: "rear-discharge-muck-spreaders",
          },
        ],
      },
      {
        id: "even-more-tankers",
        title: "Even More Tankers",
        image: "images/range-4.png",
        models: [
          {
            title: "ET-2400",
            id: "et-2400",
            image: "images/range-4.png",
            range_id: "even-more-tankers",
          },
          {
            title: "ET-3200",
            id: "et-3200",
            image: "images/range-4.png",
            range_id: "even-more-tankers",
          },
          {
            title: "ET-4000",
            id: "et-4000",
            image: "images/range-4.png",
            range_id: "even-more-tankers",
          },
          {
            title: "ET-6000",
            id: "et-6000",
            image: "images/range-4.png",
            range_id: "even-more-tankers",
          },
          {
            title: "ET-8000",
            id: "et-8000",
            image: "images/range-4.png",
            range_id: "even-more-tankers",
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

  /*---------------------------------------------------------------- */

  marshallTrailers.featureTabs = {
    init: function () {
      var $tabsContainer = $("#feature-tabs");
      $tabsContainer.find(".tab-item").each(function (index, tabItem) {
        var $tabItem = $(tabItem);
        var $$tabHeader = $tabItem.find(">.header");

        var setActiveTab = function () {
          $tabsContainer.find(".tab-item").removeClass("active");
          $tabItem.addClass("active");
          $tabsContainer.find(".tabs-list button").removeClass("active");
          $tabsContainer.find(".tabs-list button").eq(index).addClass("active");
        };

        $$tabHeader.on("click", setActiveTab);

        var tabTitle = $$tabHeader.text().trim();
        var activeClass = $tabItem.hasClass("active") ? "active" : "";
        var appClass = $tabItem.hasClass("tab-item-app") ? "tab-item-app" : "";
        var $tabButton = $(
          '<button type="button" role="tab" class="' +
            activeClass +
            " " +
            appClass +
            '">' +
            tabTitle +
            "</button>"
        );
        $tabButton.on("click", setActiveTab);
        var $li = $("<li></li>");
        $li.append($tabButton);
        $tabsContainer.find(".tabs-list").append($li);
      });

      // dummy data
      var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);
      var model = urlParams.get("id");

      if (model) {
        var models = dummyData.productRangesData.flatMap(function (range) {
          return range.models;
        });
        var modelProduct = models.filter(function (product) {
          return product.id.toLowerCase() === model.toLowerCase();
        });

        if (modelProduct.length === 0) {
          return;
        }

        $(".js-parent-link").attr(
          "href",
          "products.html?model=" + modelProduct[0].range_id
        );
        $(".js-product-title").text(modelProduct[0].title);
        var randomPrice = Math.floor(Math.random() * 9000) + 5000;

        $(".js-product-price").text("£" + randomPrice.toLocaleString("en-US"));
      }
    },
  };

  /*---------------------------------------------------------------- */

  /**
   * @fsLightBoxLinks
   * Attaches fsLightbox to links with the none-gallery-fsLightbox class
   * Allows single image lightbox popups
   */
  marshallTrailers.fsLightBoxLinks = {
    init: function () {
      $(".none-gallery-fsLightbox").on("click", function (e) {
        e.preventDefault();
        var source = $(this).attr("href");
        var lightbox = new FsLightbox();
        lightbox.props.sources = [source];
        lightbox.open();
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
    marshallTrailers.fsLightBoxLinks.init();
    marshallTrailers.featureTabs.init();

    window.heroCarousel = marshallTrailers.carousel;
    window.dummyData = dummyData;
  };

  /** Runs the global init */
  marshallTrailers.init();
})();
