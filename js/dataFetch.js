const getData = async (link) => {
  try {
    const res = await fetch(link);
    let json;
    if (res.ok) {
      json = await res.json();
    }
    return json;
  } catch (e) {
    console.error(e);
  }
};
const getMultipleData = async (links) => {
  let dataArr = [];
  for (const link of links) {
    const data = await getData(link);
    dataArr.push(data);
  }
  return dataArr;
};

export { getData, getMultipleData };
