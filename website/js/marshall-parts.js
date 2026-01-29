var basket_total = 0; // running total for selected machine config
var spares_total = 0; // running total for spares basket
var num_filters = 7;

function clearFilters() {
  for (var i = 2; i < num_filters; i++) {
    $("#filter" + i)
      .empty()
      .parent(".slide")
      .removeClass("selected");
  }
}

function clearResults() {
  $("#results").empty();
}

function refreshSelectric() {
  if ($.fn.selectric) {
    $(".filter-select").selectric("refresh");
  }
}

function updateFieldsMeta(level, cid) {
  $("#fields").data("level", level);
  $("#fields").data("cid", cid);
}

function showResults(content) {
  $("#results").html(content).show();
  refreshFsLightbox();
  if ($.fn.selectric) {
    $(".quantity-select").selectric({
      maxHeight: 168,
      disableOnMobile: true,
      nativeOnMobile: true,
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  $("#filter1").on("change", function () {
    $("#processing").fadeIn("fast");

    $("#range").val("").prop("disabled", false);
    $("#model").empty().prop("disabled", true);

    // set data, used by model, range selects //
    var category_id = $(this).val();
    updateFieldsMeta(1, category_id);

    clearFilters();
    // get child cats //
    if (category_id !== "df" && category_id !== "") {
      $.ajax({
        type: "get",
        url: "/ajax/ajax_filter.php",
        data: "level=2&pid=" + category_id,
        dataType: "json",
        success: function (dat) {
          if (dat.cats != null) {
            $("#filter2").parent(".slide").addClass("selected");

            for (var i = 0; i < dat.cats.length; i++) {
              $("#filter2").append(
                '<li><a href="#" data-cid="' +
                  dat.cats[i].id +
                  '" class="filter">' +
                  dat.cats[i].category_name +
                  "</a></li>",
              );
            }
          }
        },
      });
    } else {
      $("#range").prop("disabled", true);
    }

    refreshSelectric();
    clearResults();
    // get spares results //
    $.ajax({
      type: "get",
      url: "/ajax/ajax_filter_results.php",
      data:
        "level=1&cid=" +
        $(this).val() +
        "&range=" +
        $("#range").val() +
        "&model=" +
        $("#model").val(),
      dataType: "html",
      success: function (content) {
        $("#processing").fadeOut("fast");
        showResults(content);
      },
    });
  });

  $(".parts-filters").on("click", ".filter", function (event) {
    event.preventDefault();

    $("#processing").fadeIn("fast");
    $(this).parent().addClass("selected");
    $(this).parent().siblings().removeClass("selected");

    var level = parseInt($(this).parent("li").parent("ol").data("level"));
    var nextFilter = level + 1;

    var cat_id = $(this).data("cid");

    // set data, used by model, range selects //
    updateFieldsMeta(level, cat_id);

    // get child cats //
    $.ajax({
      type: "get",
      url: "/ajax/ajax_filter.php",
      data: "level=" + nextFilter + "&pid=" + cat_id,
      dataType: "json",
      success: function (dat) {
        var $desktop = $("html").hasClass("desktop");

        for (var i = nextFilter; i <= num_filters; i++) {
          $("#filter" + i)
            .parent(".slide")
            .removeClass("selected");
          $("#filter" + i).empty();

          // if (i > 5 && $desktop) {
          //   $("#filter" + i)
          //     .parent("li")
          //     .addClass("display-none");
          // }
        }

        if (dat.cats !== null) {
          $("#filter" + nextFilter)
            .parent(".slide")
            .addClass("selected");
          // .removeClass("display-none");

          for (var i = 0; i < dat.cats.length; i++) {
            $("#filter" + nextFilter).append(
              '<li><a href="#" data-cid="' +
                dat.cats[i].id +
                '" class="filter">' +
                dat.cats[i].category_name +
                "</a></li>",
            );
          }

          if (nextFilter > 3) {
            window.marshallTrailers.partsFilters.next();
          }

          // if (nextFilter > 5 && $desktop) {
          //   $("#filter_nav #btn_right").click();
          //   $("#filter_nav").fadeIn();
          // }
        }

        if (level < 5 && $desktop) {
          filters_sliding = true;
          $(".filters").animate({ left: "0" }, "swing", function () {
            filters_sliding = false;
            $("#filter_nav").fadeOut();
          });
        }

        // if ($(window).width() < marshall.properties.deviceWidth.phone) {
        //   $("html, body").animate(
        //     {
        //       scrollTop: $(this).parents("li").offset().top - 30,
        //     },
        //     500,
        //   );
        // } else {
        //   marshall.spares.adjustFilterHeights();
        // }
      },
    });

    // get spares results //
    $.ajax({
      type: "get",
      url: "/ajax/ajax_filter_results.php",
      data:
        "level=" +
        level +
        "&cid=" +
        cat_id +
        "&range=" +
        $("#range").val() +
        "&model=" +
        $("#model").val(),
      dataType: "html",
      success: function (content) {
        $("#processing").fadeOut("fast");
        showResults(content);
      },
    });
  });

  $("#range").on("change", function () {
    $("#processing").fadeIn("fast");

    var level = $("#fields").data("level");
    var cat_id = $("#fields").data("cid");

    $("#model").empty().prop("disabled", false);
    refreshSelectric();

    // get products //
    $.ajax({
      type: "get",
      url: "/ajax/ajax_get_products.php",
      data: "rid=" + $(this).val(),
      dataType: "json",
      success: function (dat) {
        if (dat.products != null) {
          $("#model").append('<option value=""> Select a model </option>');
          for (var i = 0; i < dat.products.length; i++) {
            $("#model").append(
              '<option value="' +
                dat.products[i].id +
                '"> ' +
                dat.products[i].product_title +
                " </option>",
            );
          }
          $("#model").prop("disabled", false);
          refreshSelectric();
        }
      },
    });

    // get spares results //
    $.ajax({
      type: "get",
      url: "/ajax/ajax_filter_results.php",
      data: "level=" + level + "&cid=" + cat_id + "&range=" + $(this).val(),
      dataType: "html",
      success: function (content) {
        $("#processing").fadeOut("fast");
        showResults(content);
      },
    });
  });

  $("#model").on("change", function () {
    $("#processing").fadeIn("fast");

    var level = $("#fields").data("level");
    var cat_id = $("#fields").data("cid");

    // get spares result //
    $.ajax({
      type: "get",
      url: "/ajax/ajax_filter_results.php",
      data:
        "level=" +
        level +
        "&cid=" +
        cat_id +
        "&range=" +
        $("#range").val() +
        "&model=" +
        $(this).val(),
      dataType: "html",
      success: function (content) {
        $("#processing").fadeOut("fast");
        showResults(content);
      },
    });
  });

  refreshSelectric();

  var filters_sliding = false;

  $("#filter_nav #btn_left").on("click", function (event) {
    event.preventDefault();

    var pos = $(".spares-filters .filters").position();

    if (pos == "undefined") {
      var left = $(".spares-filters .filters").css("left");
    } else {
      var left = pos.left;
    }

    if (!filters_sliding && left < 0) {
      filters_sliding = true;
      $(".filters").animate({ left: "+=196" }, "swing", function () {
        filters_sliding = false;
      });
    }
  });

  $("#filter_nav #btn_right").on("click", function (event) {
    event.preventDefault();

    var pos = $(".spares-filters .filters").position();

    if (pos == "undefined") {
      var left = $(".spares-filters .filters").css("left");
    } else {
      var left = pos.left;
    }

    if (!filters_sliding && left > -392) {
      filters_sliding = true;
      $(".filters").animate({ left: "-=196" }, "swing", function () {
        filters_sliding = false;
      });
    }
  });

  $("#search-filter").on("submit", function (event) {
    event.preventDefault();

    $("#processing").fadeIn("fast");

    $("#filter1").val("");
    $("#range").val("").prop("disabled", true);
    $("#model").empty().prop("disabled", true);
    refreshSelectric();

    for (var i = 2; i < num_filters; i++) {
      $("#filter" + i)
        .parent("li")
        .removeClass("selected");
      $("#filter" + i).empty();
    }

    // get spares results //
    $.ajax({
      type: "post",
      url: "/ajax/ajax_filter_results.php",
      data:
        "part_no=" + $("#part_no").val() + "&keyword=" + $("#keyword").val(),
      dataType: "html",
      success: function (content) {
        $("#processing").fadeOut("fast");
        showResults(content);
      },
    });
  });

  $("#results").on("click", ".btn_addBasket", function (event) {
    event.preventDefault();

    marshallTrailers.basket.open();
    $("#basket #progress").show();

    var li = $(this).parent("li").prev("li");
    var data =
      "sid=" +
      $(li).children(".sid").val() +
      "&qty=" +
      $(li).children(".quantity").val() +
      "&price=" +
      $(li).children(".price").val();

    $.ajax({
      type: "post",
      url: "/ajax/ajax_spares_basket.php",
      data: data,
      dataType: "json",
      success: function (dat) {
        if (dat.status == "success") {
          $("#basket #progress").hide();

          var strS = dat.basket_count > 1 ? "s" : "";
          $("#num_items").text(dat.basket_count + " Item" + strS);
          $("#basket_total").text(dat.basket_total);
        }
      },
    });
  });

  $("#results").on("click", ".btn_addBasketRelated", function (event) {
    event.preventDefault();

    marshallTrailers.basket.open();
    $("#basket #progress").show();

    var li = $(this).parent(".add").parent("li");
    var data =
      "sid=" + $(li).data("sid") + "&qty=1&price=" + $(li).data("price");

    $.ajax({
      type: "post",
      url: "/ajax/ajax_spares_basket.php",
      data: data,
      dataType: "json",
      success: function (dat) {
        if (dat.status == "success") {
          $("#basket #progress").hide();

          var strS = dat.basket_count > 1 ? "s" : "";
          $("#num_items").text(dat.basket_count + " Item" + strS);
          $("#basket_total").text(dat.basket_total);
        }
      },
    });
  });

  $(".btn_delBasket").click(function (event) {
    event.preventDefault();

    var tr = $(this).parent("td").parent("tr");
    var data = "a=del&sid=" + $(tr).attr("id");

    $.ajax({
      type: "post",
      url: "/ajax/ajax_spares_basket.php",
      data: data,
      dataType: "json",
      success: function (dat) {
        if (dat.status == "success") {
          $("#total_cost").text(dat.basket_total);

          $(tr).fadeOut("normal", function () {
            if ($(tr).siblings().length > 0) {
              $(tr).remove();
            } else {
              $(tr).replaceWith(
                '<tr><td colspan="7" class="emptybasket">Your basket is currently empty.</td></tr>',
              );
              $("#send_order").hide();
            }
          });
        }
      },
    });
  });

  $(".basketQty").change(function (event) {
    event.preventDefault();

    var tr = $(this).parent("td").parent("tr");
    var data = "sid=" + $(tr).attr("id") + "&qty=" + $(this).val();

    $.ajax({
      type: "post",
      url: "/ajax/ajax_spares_basket.php",
      data: data,
      dataType: "json",
      success: function (dat) {
        if (dat.status == "success") {
          $(tr).find(".item_total").text(dat.item_total);
          $("#total_cost").text(dat.basket_total);
        }
      },
    });
  });

  $("#btn_sendOrder").click(function (event) {
    event.preventDefault();

    $("#spares_order:hidden").fadeIn("fast", function () {
      $("html, body").animate(
        {
          scrollTop: $("#spares_order").offset().top - 30,
        },
        500,
      );
    });
  });

  $("#btn_pdfOrder").click(function (event) {
    event.preventDefault();

    $("#spares_order:hidden").fadeOut();

    $("#order_form_pdf").submit();

    $("#basket_content")
      .empty()
      .append(
        '<tr><td colspan="7" class="emptybasket">Your basket is currently empty.</td></tr>',
      );
    $("#total_cost").text("0.00");

    $("#notes").val("");
    $("#order_form_pdf:visible").slideUp();
  });

  $("#btn_continueShop").click(function (event) {
    event.preventDefault();
    document.location.href = "/spares";
  });

  $("#order_form").submit(function (e) {
    $(".progress").remove();

    if (!e.isDefaultPrevented()) {
      e.preventDefault();

      $("#send_form").after('<span class="progress">&nbsp;</span>');

      $.ajax({
        type: "post",
        url: "/ajax/ajax_spares_order.php",
        data: $(this).serialize() + "&notes=" + $("#notes").val(),
        dataType: "json",
        success: function (dat) {
          $(".progress").remove();

          if (dat.status == "success") {
            $("#thankyou")
              .html(
                "<p><strong>Thank you for your order, we'll be in touch shortly.</strong></p>",
              )
              .show();
            $("#order_form").fadeOut();

            $("#basket_content")
              .empty()
              .append(
                '<tr><td colspan="7" class="emptybasket">Your basket is currently empty.</td></tr>',
              );
            $("#total_cost").text("0.00");

            $("#notes").val("");
            $("#order_form_pdf:visible").slideUp();
          } else {
            if (dat.message) {
              $("#thankyou")
                .css("color", "red")
                .html("<p>" + dat.message + "</p>")
                .show();
            } else {
              $("#thankyou")
                .css("color", "red")
                .html(
                  "<p>Sorry we are unable to add your order at the moment, please try later.</p>",
                )
                .show();
            }
          }
        },
      });
    }
  });
});
