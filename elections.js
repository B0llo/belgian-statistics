"use strict";
(function () {
  const svg = document.querySelector("svg");
  const cities = document.querySelectorAll("svg #belgium_cities path");

  let placeData = {};

  const getCityNames = async () => {
    const res = await fetch("./belgium.json");
    if (res.ok) {
      let json = await res.json();
      placeData = json;
    }
    setCityNames();
  };
  const setCityNames = () => {
    cities.forEach((el) => {
      const id = el.id.substring(1);
      el.dataset.name = placeData?.mapping[id].name;
      const nisCode = placeData?.mapping[id].resultNisCode;
      el.dataset.kanton = "_" + nisCode;
      if (placeData?.results[nisCode]) {
        placeData?.results[nisCode].towns.forEach((t) => {
          if (t.nisCode == id) {
            el.dataset.name = t.name;
          }
        });
      }
    });
  };
  getCityNames();

  let migrationData = [];
  const getMigrationData = async () => {
    const res = await fetch("./migrationData.json");
    if (res.ok) {
      let json = await res.json();
      migrationData = json;
    }
  };

  getMigrationData();
  let electionFarRightData = [];

  const getElectionData = async () => {
    let res = await fetch("./elections/nva.json");
    if (res.ok) {
      let json = await res.json();
      electionFarRightData.push(json);
    }
    res = await fetch("./elections/vlaamsbelang.json");
    if (res.ok) {
      let json = await res.json();
      electionFarRightData.push(json);
    }
    setElectionData();
  };
  let max = 0;
  const setElectionData = async () => {
    console.log(placeData);
    cities.forEach((city) => {
      let pct = 0;
      electionFarRightData.forEach((party) => {
        const kantonId = city.dataset.kanton.substring(1);
        const kantonPct = party.results[kantonId].current;
        pct += kantonPct[0] ? kantonPct[0]["pct"] : 0;
      });
      city.style.fill = `rgba(254, 209, 14)`;
      city.style["fill-opacity"] = pct / 100 / 70 * 100;
      let migrationPercentage = 0;
      migrationData
        .filter((el) => el.Naam === city.dataset.name)
        .forEach(
          (el) => (migrationPercentage += el["Bevolking geboren buiten EU"])
        );
      if (pct > max) {
        max = pct;
        console.log(max);
      }
      city.style.filter = `saturate(${migrationPercentage})`;
      city.innerHTML = `<title>${city.dataset.name} ~ ${pct}% ~ immi: ${migrationPercentage}%`;
    });
  };
  getElectionData();
})();
