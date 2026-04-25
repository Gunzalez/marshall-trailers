// This code fetches machine details.
// Passes to the Vue app on configure.html
(function () {
  "use strict";

  var configureAjaxUrl = "https://dev.marshall.sugarshaker.com/api/configure/";

  let isAjaxBusy = false;
  window.basicMachine = null;

  function clearAppData() {
    if (window.configureMachineApp) {
      window.configureMachineApp.optionsData = [];
      window.configureMachineApp.initialOption = null;
    }
  }

  $("#product-detail").on("click", ".btn_AddOptions", function () {
    if (
      !window.basicMachine ||
      (window.basicMachine.options || []).length === 0
    )
      return;

    var $addOptionsButtons = $(".btn_AddOptions");
    $addOptionsButtons.prop("disabled", true);
    clearAppData();

    if (window.configureMachineApp) {
      window.configureMachineApp.initialOption = window.basicMachine;
      window.configureMachineApp.optionsData = window.basicMachine.options;
    }
    var data =
      "id=" +
      window.basicMachine.id +
      "&qty=" +
      1 +
      "&price=" +
      window.basicMachine.price;
    window.MT.basket.update(data);
  });

  function printValueSpans(value) {
    if (Array.isArray(value)) {
      return value.map(function (item) {
        return "<span>" + item + "</span> ";
      });
    }
    return "<span>" + value + "</span>";
  }

  function showBasicInfo(data) {
    var imageUrl = data.image ? data.image : "images/sample-hero-bg.jpg";
    $("#product-hero-image").css("background-image", "url('" + imageUrl + "')");
    var $specsContent = $("#basic-machine .specs-content");
    $specsContent.find(".title").text(data.title);

    var $specsList = data.specs.map(function (spec) {
      var $li = $("<li>").html(
        "<span class='label'>" + spec.label + "</span> ",
      );
      var $valueSpan = $("<span class='value'></span>");
      $valueSpan.append(printValueSpans(spec.value));
      $li.append($valueSpan);
      return $li;
    });
    $specsContent.find(".specs-list").empty().html($specsList);
    var price = window.MT.utils.formatCurrency(data.price);
    $specsContent.find(".product-price .value").text(price);
    $("#basic-machine").removeClass("display-none");
    window.basicMachine = data;
  }

  function hideBasicInfo() {
    $("#basic-machine").addClass("display-none");
  }

  function showProcessing() {
    $("#processing").show();
  }

  function hideProcessing() {
    $("#processing").hide();
  }

  function fetchMachineDetails(product_Id) {
    if (isAjaxBusy) return;

    isAjaxBusy = true;
    showProcessing();
    hideBasicInfo();

    $.ajax({
      type: "get",
      url: configureAjaxUrl + product_Id,
      dataType: "json",
      success: function (response) {
        showBasicInfo(response.data);
        isAjaxBusy = false;
        hideProcessing();
      },
      error: function (xhr, status, error) {
        isAjaxBusy = false;
        hideProcessing();
        // TODO: Show user-friendly error message on the page
        console.log({ xhr, status, error });
        console.error("Error fetching machine details:", error);
      },
    });
  }

  function updateSelect(product_Id) {
    $("#machine-select").val(product_Id).selectric("refresh");
  }

  function getParamFromUrl(parameterName) {
    const urlParams = new URLSearchParams(window.location.search);
    const queryId = urlParams.get(parameterName);

    if (queryId) return queryId;

    const segments = window.location.pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    return lastSegment ? lastSegment.replace(".html", "") : null;
  }

  function updateUrlWithProductId(product_Id) {
    const newUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?id=" +
      product_Id;
    window.history.pushState({ path: newUrl }, "", newUrl);
  }

  function initMachineSelect() {
    $("#machine-select").on("change", function () {
      if (isAjaxBusy) return;

      var product_Id = $(this).val();
      if (!product_Id?.trim()) return;

      clearAppData();
      updateUrlWithProductId(product_Id);
      fetchMachineDetails(product_Id);

      $(".btn_AddOptions").prop("disabled", false);
    });
  }

  // Initialize if on the configure page
  if ($("#configure-app").length) {
    initMachineSelect();

    var urlProductId = getParamFromUrl("id");
    if (urlProductId) {
      updateSelect(urlProductId);
      fetchMachineDetails(urlProductId);
    }
  }
})();
