const axios = require('axios');

// Função para geocodificar endereço usando OpenStreetMap Nominatim (gratuito)
async function geocodeAddress(address) {
  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`;
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'O-Teu-Lugar-Platform/1.0'
      }
    });
    
    if (response.data && response.data.length > 0) {
      const result = response.data[0];
      return {
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
        success: true
      };
    }
    
    return {
      latitude: null,
      longitude: null,
      success: false,
      error: 'Endereço não encontrado'
    };
  } catch (error) {
    console.error('Erro na geocodificação:', error);
    return {
      latitude: null,
      longitude: null,
      success: false,
      error: error.message
    };
  }
}

// Coordenadas padrão para Belo Horizonte caso a geocodificação falhe
function getDefaultCoordinatesBH() {
  return {
    latitude: -19.9167,
    longitude: -43.9345
  };
}

module.exports = {
  geocodeAddress,
  getDefaultCoordinatesBH
};

