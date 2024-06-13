import {
  setFarRight,
  setFarRightWithImigrationFilter,
  setMostPopularParty,
  setMostPopularPartyWithImigrationFilter,
} from "./modules/elections.js";
import { updateMap, clearMap } from "./modules/map.js";
import { setMigrationData } from "./modules/migration.js";
const svg = document.querySelector("svg");
const cities = document.querySelectorAll("svg #belgium_cities path");
const mapSelector = document.querySelector("#map_selector");
const title = document.querySelector("#map_name");
const description = document.querySelector("#description");

const mapSelected = async () => {
  clearMap(cities);
  switch (mapSelector.value) {
    case "far_right_in_belgium":
      setFarRight(cities, description);
      break;
    case "migration_in_belgium":
      await setMigrationData(description);
      break;
    case "justification_for_racism":
      await setFarRightWithImigrationFilter(cities, description);
      break;
    case "most_popular_party":
      await setMostPopularParty(cities, description);
      break;
    case "most_popular_party_with_filter":
      await setMostPopularPartyWithImigrationFilter(cities, description);
      break;
    default:
      clearMap(cities);
  }
  title.innerHTML = mapSelector.value.replaceAll("_", " ");
};
await updateMap(cities);
mapSelector.addEventListener("change", mapSelected);
mapSelected();
