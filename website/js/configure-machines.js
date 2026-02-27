// Fetches machine details, passes to the Vue app on configure.html
(function () {
  "use strict";

  let isAjaxBusy = false;
  window.basicMachine = null;

  function showBasicInfo(data) {
    var $specsContent = $("#basic-machine .specs-content");
    $specsContent.find(".title").text(data.title);
    var $specsList = data.specs.map(function (spec) {
      return $("<li>").html(
        "<span class='label'>" +
          spec.label +
          "</span><span class='value'>" +
          spec.value +
          "</span>",
      );
    });
    $specsContent.find(".specs-list").empty().append($specsList);
    $specsContent.find(".product-price .value").text(data.price);
    $("#basic-machine").removeClass("display-none");
    console.log("time now: ", new Date().getTime());
    var timeNow = new Date().getTime();
    // change to human readable format
    var humanReadableTime = new Date(timeNow).toLocaleString();

    var dataWithTime = Object.assign({}, data, {
      title: data.title + " : " + humanReadableTime,
    });
    window.basicMachine = dataWithTime;
    console.log("basicMachine set to: ", window.basicMachine);
  }

  function hideOptionsApp() {
    $("#options-app").addClass("display-none");
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
      type: "post",
      url: "/ajax/ajax_configure_get_content.php",
      data: "product_id=" + product_Id,
      dataType: "json",
      success: function (data) {
        showBasicInfo(data);
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

  function extractProductIdFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var product_Id = urlParams.get("id");

    return product_Id;
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

      hideOptionsApp();
      updateUrlWithProductId(product_Id);
      fetchMachineDetails(product_Id);

      $(".btn_AddOptions").prop("disabled", false);
    });
  }

  // Initialize if on the configure page
  if ($("#configure-app").length) {
    initMachineSelect();

    var urlProductId = extractProductIdFromURL();
    if (urlProductId) {
      updateSelect(urlProductId);
      fetchMachineDetails(urlProductId);
    }
  }
})();
