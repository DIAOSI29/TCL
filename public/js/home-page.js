$(document).ready(function() {
  var locationDropDownMenu = $("#location-chosen-select");
  // locationDropDownMenu.empty();

  // locationDropDownMenu.append(
  //   $("<option>")
  //     .val("what")
  //     .text("what")
  // );
  $.get("/api/events", function(data) {
    const locations = _.map(data, datum => {
      return datum.location;
    });
    var dataLocationDropDown = _.uniq(locations);
    for (let i = 0; i < dataLocationDropDown.length; i++) {
      console.log(dataLocationDropDown[i]);
      locationDropDownMenu
        .append(
          $("<option>")
            .val(dataLocationDropDown[i])
            .text(dataLocationDropDown[i])
        )
        .trigger("chosen:updated");
    }
  });
  // Or with a CSS selector

  TinyDatePicker(".date-example");
  // function createLocationMenu(location) {
  //   var menuOption = $("<option>");
  //   menuOption.attr("value", location);
  //   menuOption.text(location);
  // }

  $("#date-section").hide();
  $("#location-section").hide();
  $("#category-section").hide();

  $("#date-button").click(() => {
    $("#date-section").toggle();
    $("#location-section").hide();
    $("#category-section").hide();
  });
  $("#b1").click(() => {
    $("#date-section").hide();
  });

  $("#location-button").click(() => {
    $("#location-section").toggle();
    $("#date-section").hide();
    $("#category-section").hide();
  });
  $("#b2").click(() => {
    $("#location-section").hide();
  });

  $("#category-button").click(() => {
    $("#category-section").toggle();
    $("#date-section").hide();
    $("#location-section").hide();
  });
  $("#b3").click(() => {
    $("#category-section").hide();
  });

  var config = {
    ".chosen-select": {},
    ".chosen-select-deselect": {
      allow_single_deselect: true
    },
    ".chosen-select-no-single": {
      disable_search_threshold: 10
    },
    ".chosen-select-no-results": {
      no_results_text: "Oops, No Events Found!"
    },
    ".chosen-select-width": {
      width: "95%"
    }
  };

  for (var selector in config) {
    $(selector).chosen(config[selector]);
  }

  // Form validation
  function validateForm() {
    var isValid = true;
    $(".form-control").each(function() {
      if ($(this).val() === "") {
        isValid = false;
      }
    });

    var questionLenghts = $(".chosen-select").length;
    console.log(questionLenghts);
    for (var i = 0; i < questionLenghts; i++) {
      if (
        $(".chosen-select")
          .eq(i)
          .val() === ""
      ) {
        isValid = false;
      }
    }
    return isValid;
  }

  $("#category-select").on("change", function() {
    //alert( this.value );

    window.location.href =
      "events/?category=" +
      $("#category-select option:selected")
        .text()
        .toLowerCase();
  });

  $("#location-submit").on("click", function() {
    //alert( this.value );
    window.location.href =
      "events/?location=" + $("#location-chosen-select").val();
  });

  $("#date-confirm-button").on("click", function() {
    //alert( this.value );
    window.location.href =
      "events/?date=" +
      moment($(".date-example").val(), "MM-DD-YYYY").format("YYYY-MM-DD");
  });
});
