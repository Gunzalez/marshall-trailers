(function () {
  "use strict";

  var machinesData = [
    {
      category: "Silage / Grain Trailers",
      options: [
        { id: "4", model: "QM-6", capacity: "6.5 tons" },
        { id: "6", model: "QM-8", capacity: "8.5 tons" },
        { id: "38", model: "QM-11", capacity: "11 tons" },
        { id: "39", model: "QM-12", capacity: "12 tons" },
        { id: "48", model: "QM-1200", capacity: "12 tons" },
        { id: "40", model: "QM-14", capacity: "14.5 tons" },
        { id: "49", model: "QM-1400", capacity: "14.5 tons" },
        { id: "41", model: "QM-16", capacity: "16.5 tons" },
        { id: "50", model: "QM-1600", capacity: "16.5 tons" },
        { id: "120", model: "QM-1800", capacity: "18.5 tons" },
      ],
    },
    {
      category: "Drop-Side Trailers",
      options: [
        { id: "59", model: "S-1", capacity: "1.5 tons" },
        { id: "42", model: "S-2", capacity: "2 tons" },
        { id: "43", model: "S-4", capacity: "4 tons" },
        { id: "44", model: "S-5", capacity: "5 tons" },
        { id: "45", model: "S-6", capacity: "6.5 tons" },
        { id: "46", model: "S-85", capacity: "8.5 tons" },
        { id: "47", model: "S-10", capacity: "10.5 tons" },
      ],
    },
    {
      category: "Flat / Bale Trailers",
      options: [
        { id: "33", model: "BC-21", spec: "21' x 8' / 10 tons" },
        { id: "34", model: "BC-25-10T", spec: "25' x 8'" },
        { id: "35", model: "BC-25-12T", spec: "25' x 8' 4\"" },
        { id: "36", model: "BC-28", spec: "28' x 8' 4\" / 14 tons" },
        { id: "37", model: "BC-32-TAN", spec: "32' x 8' 4\" / 14 tons" },
        { id: "127", model: "BC-32-TRI", spec: "32' x 8' 4\" / 16 tons" },
        { id: "133", model: "BC-36-TAN", spec: "36' x 8' 4\" / 16 tons" },
        { id: "134", model: "BC-36-TRI", spec: "36' x 8' 4\" / 16 tons" },
      ],
    },
    {
      category: "Low Loader Trailers",
      options: [
        { id: "141", model: "LL-26-TAN", capacity: "16 tons" },
        { id: "142", model: "LL-33-TRI", capacity: "21 tons" },
      ],
    },
    {
      category: "Dumper Trailers",
      options: [
        { id: "121", model: "HD-6", capacity: "6 tons / 3.7 cu.mtrs" },
        { id: "122", model: "HD-8", capacity: "8 tons / 5.4 cu.mtrs" },
        { id: "123", model: "HD-12", capacity: "12 tons / 7 cu.mtrs" },
        { id: "124", model: "HD-14", capacity: "14 tons / 8.7 cu.mtrs" },
        { id: "125", model: "HD-16", capacity: "16 tons / 10.5 cu.mtrs" },
      ],
    },
    {
      category: "Feed Trailers",
      options: [
        { id: "7", model: "FT-15", length: "15' Long" },
        { id: "8", model: "FT-20", length: "20' Long" },
      ],
    },
    {
      category: "Livestock Trailers / Containers",
      options: [
        { id: "137", model: "LST-21", length: "21' Long" },
        { id: "138", model: "LST-25", length: "25' Long" },
        { id: "139", model: "LST-28", length: "28' Long" },
        { id: "140", model: "LST-32", length: "32' Long" },
      ],
    },
    {
      category: "Muck Spreaders",
      options: [
        { id: "13", model: "MS-60", capacity: "6 cu.yds" },
        { id: "14", model: "MS-75", capacity: "7.5 cu.yds" },
        { id: "15", model: "MS-90", capacity: "9 cu.yds" },
        { id: "16", model: "MS-105", capacity: "10.5 cu.yds" },
      ],
    },
    {
      category: "Rear Discharge Muck Spreaders",
      options: [
        { id: "17", model: "VES-1500", capacity: "9 tons" },
        { id: "18", model: "VES-2000", capacity: "12 tons" },
        { id: "19", model: "VES-2500", capacity: "14 tons" },
      ],
    },
    {
      category: "Tankers",
      options: [
        { id: "20", model: "ST-1200", volume: "1220 gallons" },
        { id: "21", model: "ST-1400", volume: "1400 gallons" },
        { id: "22", model: "ST-1600", volume: "1550 gallons" },
        { id: "23", model: "ST-1800", volume: "1800 gallons" },
        { id: "24", model: "ST-2000", volume: "2150 gallons" },
        { id: "25", model: "ST-2300", volume: "2340 gallons" },
        { id: "26", model: "ST-2550", volume: "2560 gallons" },
        { id: "126", model: "ST-3000", volume: "3000 gallons" },
        { id: "135", model: "ST-3500", volume: "3500 gallons" },
      ],
    },
    {
      category: "People Carrier Trailers",
      options: [{ id: "136", model: "PC-21", spec: "21' x 8' / 27 People" }],
    },
  ];

  let vueApp = null;
  let isBusy = false;
  let productId = null;

  function showBasicInfo(data) {
    console.log({ data });
    $("#basic-machine").removeClass("display-none");
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

  function fetchMachineDetails() {
    if (!productId || isBusy) return;

    isBusy = true;
    showProcessing();
    hideBasicInfo();

    $.ajax({
      type: "post",
      url: "/ajax/ajax_configure_get_content.php",
      data: "product_id=" + productId,
      dataType: "json",
      success: function (data) {
        showBasicInfo(data);
        isBusy = false;
        hideProcessing();
      },
      error: function (xhr, status, error) {
        isBusy = false;
        hideProcessing();
        // TODO: Show user-friendly error message on the page
        console.log({ xhr, status, error });
        console.error("Error fetching machine details:", error);
      },
    });
  }

  function extractProductIdFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    productId = urlParams.get("id");

    if (productId) {
      const selectedMachine = machinesData.find(function (machine) {
        return machine.options.some(function (option) {
          return option.id === productId;
        });
      });

      if (selectedMachine) {
        $("#machine-select").val(selectedMachine.category).selectric("refresh");
        $("#machine-select").trigger("change");

        const selectedOption = selectedMachine.options.find(function (option) {
          return option.id === productId;
        });

        if (selectedOption) {
          $("#model-select").val(selectedOption.id).selectric("refresh");
        }
      }
    }
  }

  function updateUrlWithProductId() {
    const newUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?id=" +
      productId;
    window.history.pushState({ path: newUrl }, "", newUrl);
  }

  function initMachineSelect() {
    $("#machine-select")
      .append(
        machinesData.map(function (machine) {
          return $("<option>", {
            value: machine.category,
            text: machine.category,
          });
        }),
      )
      .selectric();

    $("#machine-select").on("change", function () {
      if (isBusy) return;

      hideBasicInfo();
      var selectedCategory = $(this).val();
      var selectedMachineOptions = machinesData.find(function (machine) {
        return machine.category === selectedCategory;
      }).options;

      if (!selectedMachineOptions) {
        $("#model-select").empty().prop("disabled", true).selectric("refresh");
        return;
      }

      $("#model-select")
        .empty()
        .append(
          $("<option>", { value: "", disabled: true, selected: true }).text(
            "Select model",
          ),
        )
        .append(
          selectedMachineOptions.map(function (option) {
            return $("<option>", {
              value: option.id,
              text:
                option.model +
                " - " +
                (option.capacity ||
                  option.length ||
                  option.volume ||
                  option.spec),
            });
          }),
        )
        .prop("disabled", false)
        .selectric("refresh");
    });
  }

  function initModelSelect() {
    $("#model-select")
      .on("change", function (e) {
        if (isBusy) return;

        var selectedOptionId = $(this).val();
        productId = selectedOptionId;
        updateUrlWithProductId();
        fetchMachineDetails();
      })
      .selectric();
  }

  if ($("#configure-app").length) {
    initMachineSelect();
    initModelSelect();
    extractProductIdFromURL();
    fetchMachineDetails();
  }
})();
