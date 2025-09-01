const express = require("express");
const router = express.Router();
const utilService = require("./util.service");
const { uploadBase64ToS3, uploadMultipleBase64ToS3 } = require('./s3-simple');

// routes
router.get("/getNeighborhoods", getNeighborhoods);
router.get("/fetchCep", fetchCep);
router.post('/upload-images', uploadImages);
router.post('/upload-image', uploadImage);

module.exports = router;


function fetchCep(req, res, next) {
  utilService
    .fetchCep(req.query)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function getNeighborhoods(req, res, next) {
  utilService
    .getNeighborhoods(req.query)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

// Upload de múltiplas imagens (base64)
async function uploadImages(req, res, next) {
    try {
        const { images } = req.body;
        
        if (!images || !Array.isArray(images) || images.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Nenhuma imagem foi enviada'
            });
        }

        console.log(`Recebidas ${images.length} imagens para upload`);
        
        // Upload para S3
        const urls = await uploadMultipleBase64ToS3(images);
        
        res.json({
            success: true,
            message: `${urls.length} imagens enviadas com sucesso`,
            images: urls,
            count: urls.length
        });
        
    } catch (error) {
        console.error('Erro no upload de imagens:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno no upload',
            error: error.message
        });
    }
}

// Upload de imagem única (base64)
async function uploadImage(req, res, next) {
    try {
        const { image, name, type } = req.body;
        
        if (!image) {
            return res.status(400).json({
                success: false,
                message: 'Nenhuma imagem foi enviada'
            });
        }

        console.log('Recebida imagem para upload:', name || 'unnamed');
        
        // Upload para S3
        const fileName = name || `image_${Date.now()}.jpg`;
        const url = await uploadBase64ToS3(image, fileName, type);
        
        res.json({
            success: true,
            message: 'Imagem enviada com sucesso',
            image: url
        });
        
    } catch (error) {
        console.error('Erro no upload de imagem:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno no upload',
            error: error.message
        });
    }
}
