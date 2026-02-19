(function () {
  "use strict";

  var marshallTrailers = {
    CONSTS: {
      scrollThreshold: 200,
    },
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
        },
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
            .replace(/^url\(['"](.+)['"]\)/, "$1"),
        );
      });

      /** initiate carousel after images are loaded */
      marshallTrailers.carousel.preloadImages(
        imgUrls,
        marshallTrailers.carousel.initSlick,
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

  marshallTrailers.responsiveTabs = {
    init: function () {
      var $tabsContainer = $(".tabs-section");
      var startIndex = $tabsContainer.data("active-tab-index");

      $tabsContainer.find(".tab-item").each(function (index, tabItem) {
        var $tabItem = $(tabItem);
        var $$tabHeader = $tabItem.find(".tab-header");

        var setActiveTab = function () {
          if ($tabItem.hasClass("active") && window.innerWidth < 768) {
            $tabsContainer.find(".tab-item").removeClass("active");
            return;
          }
          $tabsContainer.find(".tab-item").removeClass("active");
          $tabItem.addClass("active");
          $tabsContainer.find(".tabs-list button").removeClass("active");
          $tabsContainer.find(".tabs-list button").eq(index).addClass("active");
        };

        $$tabHeader.on("click", setActiveTab);

        var tabTitle = $$tabHeader.text().trim();
        var $tabButton = $(
          '<button type="button" role="tab">' + tabTitle + "</button>",
        );
        $tabButton.on("click", setActiveTab);
        var $li = $("<li></li>");
        $li.append($tabButton);
        $tabsContainer.find(".tabs-list").append($li);
      });

      $tabsContainer
        .find(".tabs-list button")
        .eq(startIndex)
        .addClass("active");
      $tabsContainer.find(".tab-item").eq(startIndex).addClass("active");
      $tabsContainer.find(".tab-item").last().addClass("last-tab");
    },
  };

  /**
    <div data-active-tab-index="0" class="tabs-section">
        <ul class="tabs-list desktop-only" role="presentation"></ul>
        <div class="tab-content">
            {% for item in items %}
                <div class="tab-item">
                    <h3 class="header">{{ item.header }}</h3>
                    <div class="content-wrapper">
                        {{ item.content }}
                    </div>
                </div>
            {% endfor %}
        </div>
    </div>
  **/

  /*---------------------------------------------------------------- */

  marshallTrailers.carouselMini = {
    carouselMini: null,
    next: function () {
      this.carouselMini.slick("slickNext");
    },
    previous: function () {
      this.carouselMini.slick("slickPrev");
    },
    init: function () {
      this.carouselMini = $(".carousel-mini").slick({
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

      $(".mini-carousel-next").on("click", function () {
        marshallTrailers.carouselMini.next();
      });

      $(".mini-carousel-prev").on("click", function () {
        marshallTrailers.carouselMini.previous();
      });

      $("#carousel-mini").removeClass("preload");
    },
  };

  /*---------------------------------------------------------------- */

  marshallTrailers.partsFilters = {
    carousel: null,
    totalSlides: 7,
    visibleSlides: 3,
    desktopWidthThreshold: 1200,

    next: function () {
      this.carousel.slick("slickNext");
    },

    previous: function () {
      this.carousel.slick("slickPrev");
    },

    reset: function () {
      this.carousel.slick("slickGoTo", 0);
    },

    init: function () {
      if (window.innerWidth < this.desktopWidthThreshold) {
        $("#parts-filters").removeClass("display-none");
        return;
      }

      this.carousel = $("#parts-filters")
        .slick({
          dots: false,
          slidesToShow: this.visibleSlides,
          slidesToScroll: 1,
          autoplay: false,
          draggable: false,
          swipe: false,
          touchMove: false,
          infinite: false,
          arrows: false,
        })
        .removeClass("display-none");
      $(".parts-filters-wrapper").addClass("initialized");
      $(".carousel-controls").removeClass("display-none");

      this.carousel.on(
        "beforeChange",
        function (event, slick, currentSlideIndex, nextSlideIndex) {
          if (currentSlideIndex > nextSlideIndex) {
            $(
              "#filter" +
                (nextSlideIndex + marshallTrailers.partsFilters.visibleSlides),
            )
              .find("li")
              .removeClass("selected");
          }
        },
      );

      this.carousel.on(
        "afterChange",
        function (event, slick, currentSlideIndex) {
          if (currentSlideIndex > 0) {
            $(".prev-filter").prop("disabled", false);
          } else {
            $(".prev-filter").prop("disabled", true);
          }

          if (
            currentSlideIndex >=
            marshallTrailers.partsFilters.totalSlides -
              marshallTrailers.partsFilters.visibleSlides
          ) {
            $(".reset-filters").prop("disabled", false);
          } else {
            $(".reset-filters").prop("disabled", true);
          }
        },
      );

      $(".prev-filter").on("click", function () {
        marshallTrailers.partsFilters.previous();
      });

      $(".next-filter").on("click", function () {
        marshallTrailers.partsFilters.next();
      });

      $(".reset-filters").on("click", function () {
        marshallTrailers.partsFilters.reset();
      });
    },
  };

  /*---------------------------------------------------------------- */

  marshallTrailers.rangeSelects = {
    init: function () {
      var $selects = $(".product-selector select").selectric({
        maxHeight: 164,
      });

      $selects.on("change", function () {
        var $this = $(this);
        var selectedValue = $this.val();
        var destination = $this.data("destination");

        if (selectedValue && destination) {
          window.location.href =
            destination + "?id=" + encodeURIComponent(selectedValue);
        }
      });
    },
  };

  /*---------------------------------------------------------------- */

  marshallTrailers.quantitySelects = {
    init: function () {
      $(".quantity-select").selectric({
        maxHeight: 168,
      });
    },
  };

  /*---------------------------------------------------------------- */

  marshallTrailers.basket = {
    $element: null,
    busyState: false,

    open: function () {
      this.$element.addClass("open");
    },

    close: function () {
      this.$element.removeClass("open");
    },

    write: function (numItems, totalPrice) {
      var strS = numItems > 1 ? "s" : "";
      this.$element.find("#num_items").text(numItems + " item" + strS);
      this.$element.find("#total_price").text(totalPrice);
      this.$element.removeClass("busy");
    },

    update: function (data) {
      if (!data || this.busyState) return;

      this.$element.addClass("open busy");
      this.busyState = true;

      $.ajax({
        type: "post",
        url: "/ajax/ajax_spares_basket.php",
        data: data,
        dataType: "json",
        success: function (response) {
          var numItems = response.basket_count || 0;
          var totalPrice = response.basket_total || "£0.00";
          marshallTrailers.basket.write(numItems, totalPrice);
          marshallTrailers.basket.$element.removeClass("busy");
          marshallTrailers.basket.busyState = false;
        },
        error: function (xhr, status, error) {
          console.log(xhr, status, error);
          marshallTrailers.basket.$element.removeClass("busy");
          marshallTrailers.basket.busyState = false;
        },
      });
    },

    init: function () {
      this.$element = $("#floating-basket");
      this.$element.find(".desktop-button").on("click", function () {
        marshallTrailers.basket.$element.toggleClass("open");
      });
      this.$element.find(".close-basket-button").on("click", function () {
        marshallTrailers.basket.close();
      });
      this.$element.find(".checkout-bttn").on("click", function () {
        window.location.href = "basket.html";
      });
    },
  };

  /*---------------------------------------------------------------- */

  /**
   * @lc_lightbox
   * Attaches lightbox functionality to links, gallery and single image
   */
  marshallTrailers.lcLightBoxLinks = {
    mobileWidthThreshold: 768,

    galleryImageLinks: function () {
      if (window.innerWidth < this.mobileWidthThreshold) {
        $(".lc_lightbox_gallery_link").on("click", function (e) {
          e.preventDefault();
        });
        return;
      }

      lc_lightbox(".lc_lightbox_gallery_link", {
        wrap_class: "lcl_fade_oc",
        gallery: true,
        skin: "dark",
        socials: false,
        fullscreen: false,
        // thumbs_nav: false,
        touchswipe: false,
        mousewheel: false,
        txt_toggle_cmd: false,
        max_width: "80%",
        max_height: "75%",
      });
    },

    soloImageLinks: function () {
      if (window.innerWidth < this.mobileWidthThreshold) {
        $(".lc_lightbox_link").on("click", function (e) {
          e.preventDefault();
        });
        return;
      }

      lc_lightbox(".lc_lightbox_link", {
        wrap_class: "lcl_fade_oc",
        gallery: false,
        skin: "dark",
        txt_toggle_cmd: false,
        max_width: "80%",
        max_height: "75%",
      });
    },

    soloTextLinks: function () {
      lc_lightbox(".lc_lightbox_link_text", {
        wrap_class: "lcl_fade_oc",
        gallery: false,
        skin: "dark",
        txt_toggle_cmd: false,
        max_width: "80%",
        max_height: "75%",
      });
    },

    init: function () {
      this.galleryImageLinks();
      this.soloImageLinks();
      this.soloTextLinks();
    },
  };

  /*---------------------------------------------------------------- */

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
   * and mega menu population and interactivity
   */
  marshallTrailers.topNavigation = {
    init: function () {
      var $topDrawer = $("#top-drawer");
      var $topNavigation = $("#top-navigation");
      var topNavHeight = $topNavigation.outerHeight();

      $("#desktop-navigation .main-menu > li")
        .on("mouseenter", function () {
          if ($(this).find("> ul").length > 0) {
            var submenuHeight = $(this).find("> ul").outerHeight();
            $topNavigation.css("height", topNavHeight + submenuHeight + "px");
            $topDrawer.addClass("open");
          }
        })
        .on("mouseleave", function () {
          $topNavigation.css("height", topNavHeight + "px");
          $topDrawer.removeClass("open");
        });

      $("#mega-nav-list").on("mouseenter", "li", function () {
        var imageSrc = $(this).find("> a").data("image-src");
        var textDesc = $(this).find("> a").text().trim();
        $("#product-image-placeholder").attr("src", imageSrc);
        $("#product-title-placeholder").text(textDesc);
        $("#product-spotlight").stop(true, true).fadeIn();

        $("#mega-nav-list").find("li").removeClass("active");
        $(this).addClass("active");
      });

      $("#mega-nav-list").on("mouseleave", function () {
        $("#product-image-placeholder").attr("src", "");
        $("#product-title-placeholder").text("");
        $("#product-spotlight").stop(true, true).fadeOut("fast");
        $("#mega-nav-list").find("li").removeClass("active");
      });

      $("#open-navigation").on("click", function () {
        $topDrawer.addClass("peek");
      });

      $("#close-navigation").on("click", function () {
        $topDrawer.removeClass("peek");
      });

      if (window.scrollY > marshallTrailers.CONSTS.scrollThreshold) {
        $topDrawer.addClass("scrolled");
      }

      $topDrawer.removeClass("pre-script");
    },

    scrollEvents: function () {
      var currentScrollY = window.scrollY;
      var difference = currentScrollY - marshallTrailers.CONSTS.scrollThreshold;

      if ($("#top-drawer").hasClass("open")) {
        return;
      }

      if (difference < marshallTrailers.CONSTS.scrollThreshold) {
        $("#top-drawer").removeClass("peek");
      }

      $("#top-drawer").toggleClass(
        "scrolled",
        window.scrollY > marshallTrailers.CONSTS.scrollThreshold,
      );
    },
  };

  // resize events */
  $(window).on("resize", function () {
    marshallTrailers.basket.close();
  });

  $(window).on("scroll", function () {
    marshallTrailers.topNavigation.scrollEvents();
  });

  /**
   * @init
   * one init to rule them all
   */
  marshallTrailers.init = function () {
    marshallTrailers.topNavigation.init();
    marshallTrailers.mobileNavigation.init();
    marshallTrailers.lcLightBoxLinks.init();
    marshallTrailers.responsiveTabs.init();
    marshallTrailers.carousel.init();
    marshallTrailers.carouselMini.init();
    marshallTrailers.rangeSelects.init();
    marshallTrailers.quantitySelects.init();
    marshallTrailers.basket.init();
    marshallTrailers.partsFilters.init();

    window.MT = marshallTrailers;
  };

  /** Runs the global init */
  marshallTrailers.init();
})();
