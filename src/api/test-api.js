const BASE_URL = "https://api.harvardartmuseums.org";
const KEY = "apikey=24bbcfe8-d036-41d1-8b1e-b4a8e2d81499"; // USE YOUR KEY HERE

function fetchObjects() {
  const url = `${BASE_URL}/object?${KEY}`;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });
}

fetchObjects();

/*Or using flatten the Code method of async and await*/

async function fetchObjects() {
  const url = `${BASE_URL}/object?${KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

fetchObjects().then((x) => console.log(x)); // { info: {}, records: [{}, {},]}
