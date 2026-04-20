// Joint decision to leave a jQuery App and not a Vue app.
var basket_total = 0; // running total for selected machine config
var spares_total = 0; // running total for spares basket
var totalNumFilters = 7;
var numVisibleFilters = 3;
var filters_sliding = false;
var filter_title = "Additional filter";

var spareBasketUrl = "/ajax/ajax_spares_basket.php";
var TEST_spareBasketUrl = "/pp/mocks/ajax_spares_basket.php";

var filterUrl = "https://dev.marshall.sugarshaker.com/api/spares/filter/";
var TEST_filterUrl = "/pp/mocks/ajax_filter.php";

var resultsUrl = "https://dev.marshall.sugarshaker.com/api/spares";
var TEST_resultsUrl = "/pp/mocks/ajax_parts.php";

function clearFilters() {
  for (var i = 2; i <= totalNumFilters; i++) {
    var $filter = $("#filter" + i);
    $filter.empty().parent(".slide").removeClass("selected");
    $filter
      .parent(".slide")
      .find("h3")
      .html('<span class="empty">' + filter_title + "</span>")
      .removeClass("stepped-title");
  }
}

function clearPartsResults() {
  if (window.partsResultsApp) {
    window.partsResultsApp.resultsData = null;
  }
}

function updateFieldsMeta(level, cid) {
  $("#fields").data("level", level);
  $("#fields").data("cid", cid);
}

function clearInputFields() {
  $("#part_no").val("");
  $("#keyword").val("");
}

function showPartsResults(content) {
  if (window.partsResultsApp) {
    window.partsResultsApp.resultsData = content.data || [];
  }
}

var GLightBoxLinksObserver = new MutationObserver((mutations) => {
  window.MT.GLightBoxLinks.init();
});

document.addEventListener("DOMContentLoaded", () => {
  $("#filter1").on("change", function () {
    $("#range").val("").prop("disabled", true).selectric("refresh");
    $("#model").empty().prop("disabled", true).selectric("refresh");
    clearFilters();
    clearPartsResults();
    clearInputFields();

    var category_id = $(this).val();
    if (category_id === "df" || category_id === "") {
      return;
    }

    $("#range").prop("disabled", false).selectric("refresh");

    $("#processing").fadeIn("fast");

    // set data, used by model, range selects
    var category_id = $(this).val();
    updateFieldsMeta(1, category_id);
    var selectedItemName = $("#filter1 option:selected").text();

    // get child cats //
    $.ajax({
      type: "get",
      url: filterUrl + category_id,
      dataType: "json",
      success: function (response) {
        $("#filter2")
          .parent(".slide")
          .addClass("selected")
          .find("h3")
          .addClass("stepped-title short")
          .html(
            '<span class="step-number">Step 02:</span> <span class="truncate">' +
              selectedItemName +
              "</span>",
          );

        if (response.data.length > 0) {
          for (var i = 0; i < response.data.length; i++) {
            $("#filter2").append(
              '<li><a href="#" data-cid="' +
                response.data[i].id +
                '" class="filter">' +
                response.data[i].category_name +
                "</a></li>",
            );
          }
        }
        $("#processing").fadeOut("fast");
      },
    });

    // get spares results //
    // $.ajax({
    //   type: "get",
    //   url: TEST_resultsUrl,
    //   data:
    //     "level=1&cid=" +
    //     $(this).val() +
    //     "&range=" +
    //     $("#range").val() +
    //     "&model=" +
    //     $("#model").val(),
    //   dataType: "json",
    //   success: function (content) {
    //     $("#processing").fadeOut("fast");
    //     showPartsResults(content);
    //   },
    //   error: function (error) {
    //     console.log(error["statusText"]);
    //     $("#processing").fadeOut("fast");
    //   },
    // });
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
      url: TEST_filterUrl,
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
            .addClass("stepped-title short")
            .html(
              '<span class="step-number">Step ' +
                nextFilter +
                ":</span> <span>" +
                selectedItemName +
                "</span>",
            );

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
            var $slide = $("#filter" + nextFilter).parent(".slide");
            var slideIndex = $slide.index();
            window.MT.partsFilters.carousel.slick("slickGoTo", slideIndex - 2);
          }
        }

        $("#processing").fadeOut("fast");
      },
    });

    clearPartsResults();
    // get spares results //
    $.ajax({
      type: "get",
      url: TEST_resultsUrl,
      data:
        "level=" +
        level +
        "&cid=" +
        cat_id +
        "&range=" +
        $("#range").val() +
        "&model=" +
        $("#model").val(),
      dataType: "json",
      success: function (content) {
        $("#processing").fadeOut("fast");
        showPartsResults(content);
      },
    });
  });

  $("#range").on("change", function () {
    $("#model").empty().prop("disabled", true).selectric("refresh");
    var rid = $(this).val();
    if (rid.trim() === "") {
      return;
    }

    $("#processing").fadeIn("fast");

    var level = $("#fields").data("level");
    var cat_id = $("#fields").data("cid");

    // get products //
    $.ajax({
      type: "get",
      url: "/ajax/ajax_get_products.php",
      data: "rid=" + rid,
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

    clearPartsResults();
    // get spares results //
    $.ajax({
      type: "get",
      url: TEST_resultsUrl,
      data: "level=" + level + "&cid=" + cat_id + "&range=" + rid,
      dataType: "json",
      success: function (content) {
        $("#processing").fadeOut("fast");
        showPartsResults(content);
      },
    });
  });

  $("#model").on("change", function () {
    var model_id = $(this).val();
    if (model_id.trim() === "") {
      return;
    }

    $("#processing").fadeIn("fast");

    var level = $("#fields").data("level");
    var cat_id = $("#fields").data("cid");

    clearPartsResults();
    // get spares result //
    $.ajax({
      type: "get",
      url: TEST_resultsUrl,
      data:
        "level=" +
        level +
        "&cid=" +
        cat_id +
        "&range=" +
        $("#range").val() +
        "&model=" +
        model_id,
      dataType: "json",
      success: function (content) {
        $("#processing").fadeOut("fast");
        showPartsResults(content);
      },
    });
  });

  $("#filter-form").on("submit", function (event) {
    event.preventDefault();

    var part_no = $("#part_no").val().trim();
    var keyword = $("#keyword").val().trim();
    if (part_no === "" && keyword === "") {
      return;
    }
    var postData = {
      part_no: part_no || "",
      keyword: keyword || "",
    };

    $("#processing").fadeIn("fast");

    $("#filter1").val("").selectric("refresh");
    $("#range").val("").prop("disabled", true).selectric("refresh");
    $("#model").empty().prop("disabled", true).selectric("refresh");

    clearFilters();
    clearPartsResults();
    // get spares results //
    $.ajax({
      type: "post",
      url: resultsUrl,
      data: postData,
      dataType: "json",
      success: function (content) {
        $("#processing").fadeOut("fast");
        showPartsResults(content);
        setTimeout(() => {
          $("#parts-results-app")[0].scrollIntoView({ behavior: "smooth" });
        }, 100);
      },
    });
  });

  $("#serial-number-form").on("submit", function (event) {
    event.preventDefault();
    $("#serial-number").removeClass("error");

    var serialNumber = $("#serial-number").val().trim();
    if (serialNumber === "") {
      $("#serial-number").addClass("error");
      return;
    }

    var destination = $(this).attr("action");
    window.location.href =
      destination + "?serial-number=" + encodeURIComponent(serialNumber);
  });

  $(".btn_addBasketAll").on("click", function (event) {
    event.preventDefault();

    var $form = $(this).parents(".form");
    var sid = $form.find("input.sid").val();
    var price = $form.find("input.price").val();
    var qty = $form.find(".quantity").val();
    var data = "sid=" + sid + "&qty=" + qty + "&price=" + price;
    window.MT.basket.update(data);
  });

  $(".btn_BuyNowAll").on("click", function (event) {
    event.preventDefault();

    var $form = $(this).parents(".form");
    var sid = $form.find("input.sid").val();
    var price = $form.find("input.price").val();
    var qty = $form.find(".quantity").val();
    var data = "sid=" + sid + "&qty=" + qty + "&price=" + price;
    var destination = $form.attr("action");
    window.location.href = destination + "?" + data;
  });

  $(".btn_enquireAll").on("click", function (event) {
    event.preventDefault();

    var $form = $(this).parents(".form");
    var price = $form.find("input.price").val();
    var part_no = $form.find("input.part_no").val();
    var title = encodeURIComponent($form.find("input.title").val());
    var data = "part_no=" + part_no + "&title=" + title + "&price=" + price;
    var formAction = $form.attr("action");
    var destination = formAction + "?" + data;
    window.location.href = destination;
  });

  // TODO: Implement basket functionality

  $(".btn_delBasket").click(function (event) {
    event.preventDefault();

    var tr = $(this).parent("td").parent("tr");
    var data = "a=del&sid=" + $(tr).attr("id");

    $.ajax({
      type: "post",
      url: TEST_spareBasketUrl,
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
      url: TEST_spareBasketUrl,
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

  // TODO: --end

  if ($("#parts-results-app").length) {
    /* Initialize GLightBoxLinks for any dynamically 
    loaded content in the parts results section */
    GLightBoxLinksObserver.observe(
      document.querySelector("#parts-results-app"),
      {
        childList: true,
        subtree: true,
      },
    );
  }

  $("#btn_ContinueShop").click(function (event) {
    event.preventDefault();
    document.location.href = "/spares";
  });

  $(".filter-select").selectric({
    maxHeight: 202,
  });

  $("#reload-filters").removeClass("display-none");
});
