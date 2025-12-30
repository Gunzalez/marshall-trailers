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

  marshallTrailers.singleInputForms = {
    init: function () {
      var $forms = $(".single-input-form");
      $forms.each(function (_idx, form) {
        var $input = $(form).find("input");
        if ($input.val().trim() === "") {
          $(form).find("button").prop("disabled", true);
        }
        $input.on("input", function () {
          if ($input.val().trim() === "") {
            $(form).find("button").prop("disabled", true);
          } else {
            $input.val($input.val().replace(/[^0-9]/g, ""));
            $(form).find("button").prop("disabled", false);
          }
        });
        $(form)
          .find("button")
          .on("click", function (e) {
            var val = $input.val().trim();
            if (val === "") {
              e.preventDefault();
            } else {
              var name = $input.attr("name");
              console.log({ name: name, quantity: val });

              // form.submit();
              // TODO Replace with js to add to global basket
              // TODO Probably a session variable to hold basket items
            }
          });
      });
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
          '<button type="button" role="tab">' + tabTitle + "</button>"
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
    },
  };

  /*---------------------------------------------------------------- */

  marshallTrailers.rangeSelects = {
    init: function () {
      var createTrigger = function (productsCount) {
        return $("<button>", {
          class: "trigger",
          type: "button",
          text: "Select from " + productsCount + " models",
        }).on("click", function () {
          $(this).siblings(".structure").toggleClass("hide");
        });
      };

      var showDropdown = function (products) {
        var $structure = $("<div>").addClass("structure hide");

        $.each(products, function (_idx, product) {
          $("<button>", {
            class: "option",
            type: "button",
            text: product.title,
          })
            .on("click", function () {
              $(this).parent().addClass("hide");
              window.location.href = "product.html?id=" + product.id;
            })
            .appendTo($structure);
        });

        return $structure;
      };

      // $(".product-selector").each(function () {
      //   var $range = $(this);

      //   var $component = $("<div>")
      //     .addClass("fancy-select-component")
      //     .on("mouseleave", function () {
      //       $(this).find(".structure").addClass("hide");
      //     });

      //   var $models = $range.find("option").slice(1);
      //   var buttonsData = $models
      //     .map(function () {
      //       return {
      //         id: $(this).val(),
      //         title: $(this).text(),
      //       };
      //     })
      //     .get();

      //   var $trigger = createTrigger($models.length);
      //   var $dropdown = showDropdown(buttonsData);
      //   $component.append($trigger).append($dropdown);

      //   $("#" + this.id + "-selector")
      //     .parent()
      //     .removeClass("preload")
      //     .append($component);
      // });
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
   * and mega menu population and interactivity
   */
  marshallTrailers.topNavigation = {
    megaNavInit: function () {
      var $megaNavList = $("#mega-nav-list");
      var $megaNav = $("#mega-nav");

      var $megaNavContent = $("<div></div>");
      $megaNavContent.attr("id", "mega-nav-content");
      $megaNavContent.addClass("mega-nav-content");
      $megaNav.append($megaNavContent);

      var $rangeContainer = $("<div></div>");
      $rangeContainer.addClass("products-range");

      var $modelsContainer = $("<div></div>");
      $modelsContainer.addClass("product-models");

      var $detailsContainer = $("<div></div>");
      $detailsContainer.addClass("product-image");

      var $imageWrapper = $("<div></div>");
      $imageWrapper.addClass("image-wrapper");

      var $imageLink = $("<a></a>");
      $imageLink.attr("href", "#");
      $imageLink.attr("id", "link-placeholder");
      $imageLink.addClass("placeholder");

      var $image = $("<img>");
      $image.attr("src", "#");
      $image.attr("id", "image-placeholder");
      $imageLink.append($image);
      $imageWrapper.append($imageLink);
      $detailsContainer.append($imageWrapper);

      var $specsContainer = $("<p></p>");
      $specsContainer
        .addClass("product-specifications")
        .addClass("placeholder");
      $specsContainer.attr("id", "product-details");
      $detailsContainer.append($specsContainer);
      $megaNavContent.append($detailsContainer);

      var $rangeItems = $("<ul></ul>");
      $megaNavList.find("> li").each(function () {
        var $rangeLink = $(this).find("> a").clone();
        var $li = $("<li></li>");
        $rangeItems.append($li.append($rangeLink));

        var $productModels = $(this).find("ul").clone();
        $modelsContainer.append($productModels);
      });
      $rangeContainer.append($rangeItems);

      $megaNavContent.prepend($modelsContainer);
      $megaNavContent.prepend($rangeContainer);

      $modelsContainer.find("li").each(function (index) {
        $(this).on("mouseenter", function () {
          $modelsContainer.find("li").removeClass("active");
          $(this).addClass("active");
        });
      });

      $rangeItems.find("li").each(function (index) {
        $(this).on("mouseenter", function () {
          $rangeContainer.find("li").removeClass("active");
          $(this).addClass("active");
          $modelsContainer.find("ul").removeClass("active");
          $modelsContainer.find(".active").removeClass("active");
          $modelsContainer.find("ul").eq(index).addClass("active");
        });
      });

      $megaNavContent.find("li").on("mouseenter", function () {
        var imgSrc = $(this).find("a").data("image-src");
        var linkHref = $(this).find("a").attr("href");
        var title = $(this).find("a").text().trim();
        var $imagePlaceholder = $("#image-placeholder");
        var $linkPlaceholder = $("#link-placeholder");
        $imagePlaceholder.attr("src", imgSrc);
        $linkPlaceholder.attr("href", linkHref);
        $specsContainer.text(title);
      });
    },

    openMegaNav: function () {
      $(".mega-nav").addClass("active");
    },

    closeMegaNav: function () {
      $(".mega-nav").removeClass("active");
      $(".mega-nav").find(".active").removeClass("active");
    },

    open: function () {
      $("#top-navigation").addClass("opened");
    },

    scrolled: function () {
      $("#top-navigation").addClass("scrolled");
    },

    close: function () {
      marshallTrailers.topNavigation.closeMegaNav();
      $("#top-navigation").removeClass("opened").removeClass("scrolled");
    },

    init: function () {
      var $openBtn = $("#open-navigation");
      var $closeBtn = $("#close-navigation");
      var $topNavigation = $("#top-navigation");
      var $topDrawer = $("#top-drawer");

      $openBtn.on("click", function (e) {
        e.preventDefault();
        marshallTrailers.topNavigation.open();
      });

      $closeBtn.on("click", function (e) {
        e.preventDefault();
        marshallTrailers.topNavigation.close();
      });

      $topDrawer.on("mouseleave", function () {
        marshallTrailers.topNavigation.closeMegaNav();
      });

      $topNavigation.find(".main-menu > li").hover(function () {
        if ($(this).hasClass("has-mega-nav")) {
          marshallTrailers.topNavigation.openMegaNav();
        } else {
          marshallTrailers.topNavigation.closeMegaNav();
        }
      });

      this.megaNavInit();
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
    marshallTrailers.responsiveTabs.init();
    marshallTrailers.carousel.init();
    marshallTrailers.carouselMini.init();
    marshallTrailers.rangeSelects.init();
    marshallTrailers.singleInputForms.init();

    $(".model-select").selectric({
      maxHeight: 200,
      disableOnMobile: true,
      nativeOnMobile: true,
    });
    // $(".model-select").on("change", function () {
    //   window.location.href = "product.html?id=" + this.value;
    // });
    // .customSelect({
    //   search: false,
    // });
  };

  /** Runs the global init */
  marshallTrailers.init();
})();
