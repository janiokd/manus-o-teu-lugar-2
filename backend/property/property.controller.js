const express = require('express');
const router = express.Router();
const propertyService = require('./property.service');
const AWS = require('aws-sdk');

// Configurar S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'eu-west-1'
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'oteulugar1';

// routes
router.post('/register', register);
router.get('/map-data', getMapData);
router.get('/', getAll);
router.get('/get', get);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.post('/deleteByIds', _deleteByIds);
router.post('/deleteAll', deleteAll);

module.exports = router;

// Função para upload de base64 para S3
async function uploadBase64ToS3(base64Data, fileName) {
  try {
    // Remover prefixo data:image/...;base64, se existir
    const base64Clean = base64Data.replace(/^data:image\/[a-z]+;base64,/, '');
    
    // Converter base64 para buffer
    const buffer = Buffer.from(base64Clean, 'base64');
    
    // Parâmetros do upload
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: `properties/${fileName}`,
      Body: buffer,
      ContentType: 'image/jpeg',
      ACL: 'public-read'
    };

    console.log(`Uploading ${fileName} to S3...`);
    
    // Fazer upload
    const result = await s3.upload(uploadParams).promise();
    
    console.log(`Upload successful: ${result.Location}`);
    return result.Location;
    
  } catch (error) {
    console.error('Erro no upload S3:', error);
    throw error;
  }
}

async function register(req, res, next) {
    try {
        console.log('Dados recebidos:', req.body);
        
        let propertyData = { ...req.body };
        
        // Processar imagens se existirem
        if (req.body.imageBase64Array && Array.isArray(req.body.imageBase64Array) && req.body.imageBase64Array.length > 0) {
            console.log(`Processando ${req.body.imageBase64Array.length} imagens...`);
            
            try {
                // Upload das imagens para S3
                const uploadPromises = req.body.imageBase64Array.map(async (base64Data, index) => {
                    const fileName = `property_${Date.now()}_${index}.jpg`;
                    return await uploadBase64ToS3(base64Data, fileName);
                });
                
                const imageUrls = await Promise.all(uploadPromises);
                
                console.log(`Upload concluído: ${imageUrls.length} imagens`);
                
                // Substituir dados base64 por URLs reais
                propertyData.images = imageUrls;
                delete propertyData.imageBase64Array; // Remover dados base64
                
            } catch (uploadError) {
                console.error('Erro no upload de imagens:', uploadError);
                return res.status(500).json({
                    success: false,
                    message: 'Erro ao fazer upload das imagens',
                    error: uploadError.message
                });
            }
        }
        
        // Criar propriedade no banco
        const property = await propertyService.create(propertyData);
        
        console.log('Propriedade criada com sucesso:', property.id);
        
        res.json({
            success: true,
            property: property,
            message: 'Propriedade cadastrada com sucesso!'
        });
        
    } catch (err) {
        console.error('Erro no cadastro:', err);
        next(err);
    }
}

function getAll(req, res, next) {
    propertyService.getAll()
        .then(propertys => res.json(propertys))
        .catch(err => next(err));
}

function get(req, res, next) {
    propertyService.get(req.query)
        .then(propertys => res.json(propertys))
        .catch(err => next(err));
}

function getMapData(req, res, next) {
    propertyService.getAll()
        .then(properties => {
            // Filtrar apenas propriedades com coordenadas válidas
            const mapData = properties
                .filter(property => property.latitude && property.longitude)
                .map(property => ({
                    id: property.id,
                    title: property.title,
                    price: property.price,
                    address: property.address,
                    latitude: property.latitude,
                    longitude: property.longitude,
                    type: property.type,
                    neighborhood: property.neighborhood
                }));
            res.json(mapData);
        })
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    propertyService.getById(req.property.sub)
        .then(property => property ? res.json(property) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    propertyService.getById(req.params.id)
        .then(property => property ? res.json(property) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    propertyService.update(req.params.id, req.body)
        .then((property) => res.json(property))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    propertyService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _deleteByIds(req, res, next) {
    propertyService.deleteByIds(req.body.ids)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function deleteAll(req, res, next) {
    propertyService.deleteAll()
        .then(() => res.json({}))
        .catch(err => next(err));
}