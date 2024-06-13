import { getData } from "../dataFetch.js";
async function updateMap(cities) {
  const placeData = await getData("../../data/belgium.json");
  cities.forEach((city) => {
    const id = city.id.substring(1);
    city.dataset.name = placeData?.mapping[id].name;
    const nisCode = placeData?.mapping[id].resultNisCode;
    city.dataset.kanton = "_" + nisCode;
    if (placeData?.results[nisCode]) {
      placeData?.results[nisCode].towns.forEach((town) => {
        if (town.nisCode == id) {
          city.dataset.name = town.name;
        }
      });
    }
  });
}

function clearMap (cities) {
    cities.forEach(city => {
        city.style = "";
    })
}
export { updateMap, clearMap };
