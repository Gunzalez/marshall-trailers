var basket_total = 0; // running total for selected machine config
var spares_total = 0; // running total for spares basket
var totalNumFilters = 7;
var numVisibleFilters = 3;
var filters_sliding = false;
var filter_title = "Additional filter";

function clearFilters() {
  for (var i = 2; i <= totalNumFilters; i++) {
    var $filter = $("#filter" + i);
    $filter.empty().parent(".slide").removeClass("selected");
    $filter.parent(".slide").find("h3").text(filter_title);
  }
}

function clearResults() {
  $("#results").empty();
}

function updateFieldsMeta(level, cid) {
  $("#fields").data("level", level);
  $("#fields").data("cid", cid);
}

function showResults(content) {
  $("#results").html(content).show();

  // re-init lightbox for new content //
  window.MT.lcLightBoxLinks.soloImageLinks();
  window.MT.lcLightBoxLinks.soloTextLinks();

  // re-init selectric for new content //
  window.MT.quantitySelects.init();
}

document.addEventListener("DOMContentLoaded", () => {
  $("#filter1").on("change", function () {
    $("#processing").fadeIn("fast");

    $("#range").val("").prop("disabled", false).selectric("refresh");
    $("#model").empty().prop("disabled", true).selectric("refresh");

    // set data, used by model, range selects //
    var category_id = $(this).val();
    updateFieldsMeta(1, category_id);
    var selectedItemName = $("#filter1 option:selected").text();

    clearFilters();
    // get child cats //
    if (category_id !== "df" && category_id !== "") {
      $.ajax({
        type: "get",
        url: "/ajax/ajax_filter.php",
        data: "level=2&pid=" + category_id,
        dataType: "json",
        success: function (dat) {
          if (dat.cats !== null) {
            $("#filter2").parent(".slide").addClass("selected");

            $("#filter2").parent(".slide").find("h3").text(selectedItemName);

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
      $("#range").prop("disabled", true).selectric("refresh");
    }

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
      error: function (error) {
        console.log(error["statusText"]);
        $("#processing").fadeOut("fast");
      },
    });
  });

  $("#parts-filters").on("click", ".filter", function (event) {
    event.preventDefault();

    $("#processing").fadeIn("fast");
    $(this).parent().addClass("selected");
    $(this).parent().siblings().removeClass("selected");

    var level = parseInt($(this).parent("li").parent("ol").data("level"));
    var nextFilter = level + 1;
    var selectedItemName = $(this).text();

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
        for (var i = nextFilter; i <= totalNumFilters; i++) {
          $("#filter" + i)
            .parent(".slide")
            .removeClass("selected");
          $("#filter" + i).empty();
        }

        if (dat.cats !== null) {
          $("#filter" + nextFilter)
            .parent(".slide")
            .addClass("selected");

          $("#filter" + nextFilter)
            .parent(".slide")
            .find("h3")
            .text(selectedItemName);

          for (var i = 0; i < dat.cats.length; i++) {
            $("#filter" + nextFilter).append(
              '<li><a href="#" data-cid="' +
                dat.cats[i].id +
                '" class="filter">' +
                dat.cats[i].category_name +
                "</a></li>",
            );
          }

          // Scrolls only on desktop. This value is null on mobile, as the carousel is not initialised on mobile.
          if (window.MT.partsFilters.carousel) {
            if (nextFilter > numVisibleFilters) {
              window.MT.partsFilters.carousel.slick(
                "slickGoTo",
                nextFilter - numVisibleFilters,
              );
            }
          }
        }

        $("#processing").fadeOut("fast");
      },
    });

    clearResults();
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

    $("#model").empty().prop("disabled", false).selectric("refresh");

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
          $("#model").prop("disabled", false).selectric("refresh");
        }
      },
    });

    clearResults();
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

    clearResults();
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

  $("#filter-form").on("submit", function (event) {
    event.preventDefault();

    $("#processing").fadeIn("fast");

    $("#filter1").val("").selectric("refresh");
    $("#range").val("").prop("disabled", true).selectric("refresh");
    $("#model").empty().prop("disabled", true).selectric("refresh");

    clearFilters();
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

  $("#serial-number-form").on("submit", function (event) {
    event.preventDefault();

    var serialNumber = $("#serial-number").val().trim();
    if (serialNumber === "") {
      return;
    }

    var destination = $(this).attr("action");
    window.location.href =
      destination + "?serial-number=" + encodeURIComponent(serialNumber);
  });

  $("#results").on("click", ".btn_addBasket", function (event) {
    event.preventDefault();

    var pricing = $(this).parents(".pricing");
    var sid = pricing.find("input.sid").val();
    var price = pricing.find("input.price").val();
    var qty = pricing.find(".quantity").val();
    var data = "sid=" + sid + "&qty=" + qty + "&price=" + price;

    window.MT.basket.setToBusy();

    $.ajax({
      type: "post",
      url: "/ajax/ajax_spares_basket.php",
      data: data,
      dataType: "json",
      success: function (dat) {
        if (dat.status == "success") {
          window.MT.basket.update(dat.basket_count, dat.basket_total);
        }
      },
    });
  });

  $("#results").on("click", ".btn_addBasketRelated", function (event) {
    event.preventDefault();

    var li = $(this).parent("li");
    var sid = $(li).data("sid");
    var price = $(li).data("price");
    var qty = 1;
    var data = "sid=" + sid + "&qty=" + qty + "&price=" + price;

    window.MT.basket.setToBusy();

    $.ajax({
      type: "post",
      url: "/ajax/ajax_spares_basket.php",
      data: data,
      dataType: "json",
      success: function (dat) {
        if (dat.status == "success") {
          window.MT.basket.update(dat.basket_count, dat.basket_total);
        }
      },
    });
  });

  $(".btn_addBasketAll").on("click", function (event) {
    event.preventDefault();

    var form = $(this).parents(".form");
    var sid = form.find("input.sid").val();
    var price = form.find("input.price").val();
    var qty = form.find(".quantity").val();
    var data = "sid=" + sid + "&qty=" + qty + "&price=" + price;

    window.MT.basket.setToBusy();

    $.ajax({
      type: "post",
      url: "/ajax/ajax_spares_basket.php",
      data: data,
      dataType: "json",
      success: function (dat) {
        if (dat.status == "success") {
          window.MT.basket.update(dat.basket_count, dat.basket_total);
        }
      },
    });
  });

  // TODO: Implement basket functionality

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

  $(".filter-select").selectric({
    maxHeight: 202,
  });
});
