const fs = require('fs');
const path = require('path');

const STORAGE_FILE = path.join(__dirname, '../data/properties-fallback.json');

// Ensure data directory exists
const dataDir = path.dirname(STORAGE_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize storage file if it doesn't exist
if (!fs.existsSync(STORAGE_FILE)) {
  fs.writeFileSync(STORAGE_FILE, JSON.stringify([], null, 2));
}

module.exports = {
  saveProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
};

function saveProperty(propertyData) {
  try {
    const properties = getAllProperties();
    
    // Generate a simple ID
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    
    const newProperty = {
      _id: id,
      ...propertyData,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString()
    };
    
    properties.push(newProperty);
    
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(properties, null, 2));
    
    console.log('✅ Property saved to fallback storage:', id);
    return newProperty;
  } catch (error) {
    console.error('❌ Error saving to fallback storage:', error);
    throw error;
  }
}

function getAllProperties() {
  try {
    const data = fs.readFileSync(STORAGE_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ Error reading fallback storage:', error);
    return [];
  }
}

function getPropertyById(id) {
  const properties = getAllProperties();
  return properties.find(p => p._id === id);
}

function updateProperty(id, updateData) {
  try {
    const properties = getAllProperties();
    const index = properties.findIndex(p => p._id === id);
    
    if (index === -1) {
      throw new Error('Property not found');
    }
    
    properties[index] = {
      ...properties[index],
      ...updateData,
      updatedDate: new Date().toISOString()
    };
    
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(properties, null, 2));
    
    console.log('✅ Property updated in fallback storage:', id);
    return properties[index];
  } catch (error) {
    console.error('❌ Error updating fallback storage:', error);
    throw error;
  }
}

function deleteProperty(id) {
  try {
    const properties = getAllProperties();
    const filteredProperties = properties.filter(p => p._id !== id);
    
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(filteredProperties, null, 2));
    
    console.log('✅ Property deleted from fallback storage:', id);
    return true;
  } catch (error) {
    console.error('❌ Error deleting from fallback storage:', error);
    throw error;
  }
}

