const db = require("../_helpers/db");
const Property = db.Property;
const mongoose = require("mongoose");
const { geocodeAddress, getDefaultCoordinatesBH } = require("../services/geocoding.service");

module.exports = {
  getAll,
  get,
  getById,
  create,
  update,
  delete: _delete,
  deleteByIds: deleteByIds,
  deleteAll,
};

async function getAll() {
  const properties = await Property.find();
  return properties.map(property => normalizeProperty(property));
}

// Função para normalizar dados dos imóveis
function normalizeProperty(property) {
  if (!property) return property;
  
  // Criar cópia do objeto
  const normalized = { ...property.toObject ? property.toObject() : property };
  
  // Mapear dados das features para campos diretos
  if (normalized.features && normalized.features.private_area) {
    const privateArea = normalized.features.private_area;
    
    // Mapear campos para estrutura mais simples
    normalized.bedrooms = parseInt(privateArea.number_of_bedrooms) || 0;
    normalized.number_of_bedrooms = parseInt(privateArea.number_of_bedrooms) || 0;
    
    normalized.suites = parseInt(privateArea.number_of_bathrooms) || 0;
    normalized.number_of_suites = parseInt(privateArea.number_of_bathrooms) || 0;
    
    normalized.parking_spaces = parseInt(privateArea.number_of_car_in_garage) || 0;
    normalized.number_of_parking_spaces = parseInt(privateArea.number_of_car_in_garage) || 0;
    
    normalized.area = parseInt(privateArea.area) || 0;
    normalized.total_area = parseInt(privateArea.area) || 0;
  }
  
  // Garantir que images seja um array
  if (!normalized.images) {
    normalized.images = [];
  }
  
  return normalized;
}

async function get(params) {
  console.log('Search params:', params);

  let con = {};

  // Filtro por categorias/tipos
  if (params.categories && params.categories.length > 0) {
    con.negotiation = { $in: params.categories };
  }

  // Filtro por preço
  if (params.minPrice || params.maxPrice) {
    con.price = {};
    if (params.minPrice) {
      con.price.$gte = params.minPrice;
    }
    if (params.maxPrice) {
      con.price.$lte = params.maxPrice;
    }
  }

  // Filtro por localização (compatível com ambas as estruturas)
  if (params.location) {
    con.$or = [
      { address: { $regex: params.location, $options: 'i' } },
      { 'city.name': { $regex: params.location, $options: 'i' } },
      { 'state.name': { $regex: params.location, $options: 'i' } },
      { 'neighborhood.name': { $regex: params.location, $options: 'i' } },
      { city: { $regex: params.location, $options: 'i' } },
      { state: { $regex: params.location, $options: 'i' } },
      { neighborhood: { $regex: params.location, $options: 'i' } }
    ];
  }

  // Filtro por cidade (compatível com ambas as estruturas)
  if (params.city) {
    const cityName = params.city.name || params.city;
    con.$or = [
      { 'city.name': { $regex: cityName, $options: 'i' } },
      { city: { $regex: cityName, $options: 'i' } }
    ];
  }

  // Filtro por estado (compatível com ambas as estruturas)
  if (params.state) {
    const stateName = params.state.name || params.state;
    con.$or = [
      { 'state.name': { $regex: stateName, $options: 'i' } },
      { state: { $regex: stateName, $options: 'i' } }
    ];
  }

  // Filtro por bairro (compatível com ambas as estruturas)
  if (params.neighborhood) {
    const neighborhoodName = params.neighborhood.name || params.neighborhood;
    con.$or = [
      { 'neighborhood.name': { $regex: neighborhoodName, $options: 'i' } },
      { neighborhood: { $regex: neighborhoodName, $options: 'i' } }
    ];
  }

  // Filtro por características dos quartos
  if (params.subFeatures) {
    if (params.subFeatures.bedrooms > 0) {
      con['features.bedrooms'] = { $gte: params.subFeatures.bedrooms };
    }
    if (params.subFeatures.bathroom > 0) {
      con['features.bathroom'] = { $gte: params.subFeatures.bathroom };
    }
    if (params.subFeatures.vacancies > 0) {
      con['features.vacancies'] = { $gte: params.subFeatures.vacancies };
    }
  }

  // Filtro por palavra-chave
  if (params.keyword) {
    con.$or = [
      { title: { $regex: params.keyword, $options: 'i' } },
      { description: { $regex: params.keyword, $options: 'i' } },
      { address: { $regex: params.keyword, $options: 'i' } }
    ];
  }

  console.log('MongoDB query:', con);

  const aggregate = [{ $match: { ...con } }, { $sort: { createdDate: -1 } }];

  if (params.skip) aggregate.push({ $skip: parseInt(params.skip) });

  if (params.limit) aggregate.push({ $limit: parseInt(params.limit) });

  const results = await Property.aggregate(aggregate);
  
  // Normalizar todos os resultados
  return results.map(property => normalizeProperty(property));
}

async function getById(id) {
  const property = await Property.findById(id);
  return normalizeProperty(property);
}

async function create(propertyParam) {
  // Geocodificar endereço se fornecido
  if (propertyParam.address) {
    const geocodeResult = await geocodeAddress(propertyParam.address);
    
    if (geocodeResult.success) {
      propertyParam.latitude = geocodeResult.latitude;
      propertyParam.longitude = geocodeResult.longitude;
      console.log(`Geocodificação bem-sucedida: ${propertyParam.address} -> ${geocodeResult.latitude}, ${geocodeResult.longitude}`);
    } else {
      // Usar coordenadas padrão de Belo Horizonte se a geocodificação falhar
      const defaultCoords = getDefaultCoordinatesBH();
      propertyParam.latitude = defaultCoords.latitude;
      propertyParam.longitude = defaultCoords.longitude;
      console.log(`Geocodificação falhou, usando coordenadas padrão de BH: ${defaultCoords.latitude}, ${defaultCoords.longitude}`);
    }
  }

  const property = new Property({ ...propertyParam });

  // var property = new Event(propertyParam);

  // Object.keys(property).forEach((k) => {
  //   property.markModified(k);
  // });

  // save property
  return await property.save();
}

async function update(id, propertyParam) {
  const property = await Property.findById(id);

  // validate
  if (!property) throw "property not found";

  Object.assign(property, propertyParam);

  return await property.save();
}

async function _delete(id) {
  await Property.findByIdAndRemove(id);
}

async function deleteByIds(ids) {
  return await Property.deleteMany({ _id: { $in: ids } });
}

async function deleteAll() {
  await Property.deleteMany();
}
