$(document).ready(function() {
  loadPlanets();
  defineNavigationButtonsListeners();
});

function defineNavigationButtonsListeners() {
  $("#controll-buttons .btn").click(function() {
    var link = $(this).data("link");
    loadPlanets(link);
  });
}

function defineResidentsButtonsListeners() {
  $("#planet_data .resident").click(function() {
    ////////////planetTable.find("tr:not(:first)").remove();
    $(this).data("planet");
    $("#residents-modal").modal("show");
  });
}

function loadPlanets(url = "https://swapi.co/api/planets") {
  $.ajax({
    dataType: "json",
    type: "POST",
    url: url,
    success: function(response) {
      var residentTable = $("#residents_modulo");
      var planets = response.results;
      var planetTable = $("#planet_data");
      planetTable.find("tr:not(:first)").remove();

      for (var i = 0; i < planets.length; i++) {
        var planetData = planets[i];
        var diaInt = parseInt(planetData.diameter);
        var diameter = diaInt.toLocaleString();

        population = "unknown";
        if (planetData.population !== "unknown") {
          var populationInt = parseInt(planetData.population);
          population = populationInt.toLocaleString() + "people";
        }
        surfaceWater = "unknown";
        if (planetData.surface_water !== "unknown") {
          var surfaceWater = parseInt(planetData.surface_water);
          surfaceWater = surfaceWater.toLocaleString() + "%";
        }
        planetResidents = "NoKnownResidents";
        if (planetData.residents.length !== 0) {
          var planetResidentsString = planetData.residents.length;
          planetResidents = planetResidentsString + "resident(s)";
        }

        var planetRow = `
                <tr>
                    <td>${planetData.name}</td>
                    <td class="diam">${diameter}</td>
                    <td>${planetData.climate}</td>
                    <td>${planetData.terrain}</td>
                    <td class="water">${surfaceWater}</td>
                    <td class="ppl">${population}</td>
                    <td><input class="btn btn-primary resident" type="button" data-planet=${planetData.id} value=${planetResidents}></td>
                </tr>`;

        var residentRow = `
                <tr>              
                    <td>${planetData.residents.name}</td>
                    <td>${planetData.residents.height}</td>
                    <td>${planetData.residents.mass}</td>
                    <td>${planetData.residents.hair_color}</td>
                    <td>${planetData.residents.skin_color}</td>
                    <td>${planetData.residents.eye_color}</td>
                    <td>${planetData.residents.birth_year}</td>
                    <td>${planetData.residents.gender}</td>
                </tr>`;

        residentTable.append(residentRow);
        planetTable.append(planetRow);
        defineResidentsButtonsListeners();
      }
      if (response.previous !== null) {
        setNavigationButtonLinks(
          response.next.replace("http://", "https://"),
          response.previous.replace("http://", "https://")
        );
      } else {
        setNavigationButtonLinks(
          response.next.replace("http://", "https://"),
          response.previous
        );
      }
    }
  });
}

function setNavigationButtonLinks(nextLink, prevLink) {
  var nextButton = $("#next");
  var prevButton = $("#previous");

  if (nextLink !== null) {
    nextButton.data("link", nextLink);
    nextButton.show();
  } else {
    nextButton.hide();
  }
  if (prevLink !== null) {
    prevButton.data("link", prevLink);
    prevButton.show();
  } else {
    prevButton.hide();
  }
}
