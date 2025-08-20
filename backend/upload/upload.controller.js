const express = require('express');
const router = express.Router();
const { upload } = require('../services/s3.service');

// Endpoint para upload de múltiplas imagens
router.post('/images', upload.array('images', 10), uploadImages);

// Endpoint para upload de imagem única
router.post('/image', upload.single('image'), uploadSingleImage);

module.exports = router;

function uploadImages(req, res, next) {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nenhum arquivo foi enviado' 
      });
    }

    // Extrair URLs dos arquivos enviados
    const imageUrls = req.files.map(file => file.location);
    
    console.log(`${req.files.length} imagens enviadas para S3:`, imageUrls);
    
    res.json({
      success: true,
      message: `${req.files.length} imagens enviadas com sucesso`,
      images: imageUrls,
      count: req.files.length
    });
  } catch (error) {
    console.error('Erro no upload de imagens:', error);
    next(error);
  }
}

function uploadSingleImage(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nenhum arquivo foi enviado' 
      });
    }

    console.log('Imagem enviada para S3:', req.file.location);
    
    res.json({
      success: true,
      message: 'Imagem enviada com sucesso',
      image: req.file.location
    });
  } catch (error) {
    console.error('Erro no upload de imagem:', error);
    next(error);
  }
}

