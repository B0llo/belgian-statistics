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

  const colorscheme = [
    "#FFFFFF",
    // "#F0F0F0",
    "#E0E0E0",
    // "#D0D0D0",
    "#C0C0C0",
    // "#B0B0B0",
    "#A0A0A0",
    // "#909090",
    "#808080",
    // "#707070",
    "#606060",
    // "#505050",
    "#404040",
    // "#303030",
    "#202020",
    // "#101010",
    "#000000",
  ];
  let migrationData = [];

  const getMigrationData = async () => {
    const res = await fetch("./migrationData.json");
    if (res.ok) {
      let json = await res.json();
      migrationData = json;
    }
    setMigrationData();
  };
  const setMigrationData = async () => {
    migrationData.forEach((el) => {
      document.querySelectorAll(`[data-name="${el.Naam}"]`).forEach((item) => {
        item.style.fill = colorscheme[el.categorie - 1];
        const percentage = Math.round(el["Bevolking geboren buiten EU"]*10000)/100;
        item.innerHTML = `<title>${el.Naam} ~ ${percentage}%`;
      });
    });
  };
  getMigrationData();
})();
