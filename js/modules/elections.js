import { getData, getMultipleData } from "../dataFetch.js";
const farRightDescription = `This graph shows the total percentage of votes for the Far Right (NVA, Vlaams Belang) in Belgium.`;
const farRightWImigrationFilterDescription = `This graph shows the total percentage of votes for the Far Right (NVA, Vlaams Belang) in Belgium. This map is overlayed with a filter that sets the saturation of every colour to the percentage of non-EU-born inhabitants.`;

async function setFarRightWithImigrationFilter(cities, description) {
  description.innerHTML = farRightWImigrationFilterDescription;
  const migrationData = await getData("https://raw.githubusercontent.com/B0llo/belgian-statistics/main/data/migrationData.json");
  const electionData = await getMultipleData([
    "https://raw.githubusercontent.com/B0llo/belgian-statistics/main/data/elections/nva.json",
    "https://raw.githubusercontent.com/B0llo/belgian-statistics/main/data/elections/vlaamsbelang.json",
  ]);

  cities.forEach((city) => {
    let pct = 0;
    electionData.forEach((party) => {
      const kantonId = city.dataset.kanton.substring(1);
      const kantonPct = party.results[kantonId].current;
      pct += kantonPct[0] ? kantonPct[0]["pct"] : 0;
    });
    city.style.fill = `rgba(254, 209, 14)`;
    city.style["fill-opacity"] = (pct / 100 / 70) * 100;
    let migrationPercentage = 0;
    migrationData
      .filter((el) => el.Naam === city.dataset.name)
      .forEach(
        (el) => (migrationPercentage += el["Bevolking geboren buiten EU"])
      );

    city.style.filter = `saturate(${migrationPercentage})`;
    city.innerHTML = `<title>${city.dataset.name} ~ ${pct}% ~ non EU27 members: ${migrationPercentage}%`;
  });
}

async function setFarRight(cities, description) {
  description.innerHTML = farRightDescription;
  const electionData = await getMultipleData([
    "https://raw.githubusercontent.com/B0llo/belgian-statistics/maindata/elections/nva.json",
    "https://raw.githubusercontent.com/B0llo/belgian-statistics/main/data/elections/vlaamsbelang.json",
  ]);

  cities.forEach((city) => {
    let pct = 0;
    electionData.forEach((party) => {
      const kantonId = city.dataset.kanton.substring(1);
      const kantonPct = party.results[kantonId].current;
      pct += kantonPct[0] ? kantonPct[0]["pct"] : 0;
    });
    city.style.fill = `rgba(254, 209, 14)`;
    city.style["fill-opacity"] = (pct / 100 / 70) * 100;
    city.innerHTML = `<title>${city.dataset.name} ~ ${pct}%`;
  });
}

async function setMostPopularParty(cities) {
  description.innerHTML = farRightDescription;
  const electionData = await getData("https://raw.githubusercontent.com/B0llo/belgian-statistics/main/data/data/elections/kamer.json");
  const colourData = await getData("https://raw.githubusercontent.com/B0llo/belgian-statistics/main/data/data/elections/mapColours.json");
  cities.forEach((city) => {
    const kantonId = city.dataset.kanton.substring(1);
    const kantonWinner = electionData.results[kantonId].current[0];
    city.style.fill = colourData[kantonWinner.color];
    city.innerHTML = `<title>${city.dataset.name} ~ ${kantonWinner.name}`;
  });
}

async function setMostPopularPartyWithImigrationFilter(cities) {
  const migrationData = await getData("https://raw.githubusercontent.com/B0llo/belgian-statistics/main/data/migrationData.json");
  description.innerHTML = farRightDescription;
  const electionData = await getData("https://raw.githubusercontent.com/B0llo/belgian-statistics/main/data/elections/kamer.json");
  const colourData = await getData("https://raw.githubusercontent.com/B0llo/belgian-statistics/main/data/elections/mapColours.json");
  cities.forEach((city) => {
    const kantonId = city.dataset.kanton.substring(1);
    const kantonWinner = electionData.results[kantonId].current[0];
    city.style.fill = colourData[kantonWinner.color];
    let migrationPercentage = 0;
    migrationData
      .filter((el) => el.Naam === city.dataset.name)
      .forEach(
        (el) => (migrationPercentage += el["Bevolking geboren buiten EU"])
      );

    city.style.filter = `opacity(${migrationPercentage / 40 * 100})`;
    city.innerHTML = `<title>${city.dataset.name} ~ ${kantonWinner.name} ~ non EU27 members: ${migrationPercentage}%`;
  });
}

export { setFarRightWithImigrationFilter, setFarRight, setMostPopularParty, setMostPopularPartyWithImigrationFilter };
