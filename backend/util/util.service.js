const axios = require("axios");

module.exports = {
  fetchCep,
  getNeighborhoods,
};

async function fetchCep(params) {
  const response = await axios.get(
    `https://viacep.com.br/ws/${params.zipCode}/json/`
  );

  return response.data;
}

async function getNeighborhoods(params) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${params.location}&radius=${params.radius}&type=neighborhood&key=${params.key}`
  );

  return response.data;
}