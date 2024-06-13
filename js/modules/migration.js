import { getData } from "../dataFetch.js";

const migrationDescription = `
    This graph shows the percentage of inhabitants that were not born a EU27 country.
`;

const colorscheme = [
  "#FFFFFF",
  "#E0E0E0",
  "#C0C0C0",
  "#A0A0A0",
  "#808080",
  "#606060",
  "#404040",
  "#202020",
  "#000000",
];
const setMigrationData = async (description) => {
  description.innerHTML = migrationDescription;
  const migrationData = await getData("https://raw.githubusercontent.com/B0llo/belgian-statistics/main/data/migrationData.json");
  migrationData.forEach((el) => {
    document.querySelectorAll(`[data-name="${el.Naam}"]`).forEach((item) => {
      item.style.fill = colorscheme[el.categorie - 1];
      const percentage =
        Math.round(el["Bevolking geboren buiten EU"] * 10000) / 100;
      item.innerHTML = `<title>${el.Naam} ~ ${percentage}%`;
    });
  });
};
export { setMigrationData};