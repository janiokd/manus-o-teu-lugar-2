const AWS = require('aws-sdk');

// Configurar S3 com variáveis de ambiente
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'eu-west-1'
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'oteulugar1';

/**
 * Upload de arquivo base64 para S3
 * @param {string} base64Data - Dados da imagem em base64
 * @param {string} fileName - Nome do arquivo
 * @param {string} contentType - Tipo do arquivo (image/jpeg, image/png, etc)
 * @returns {Promise<string>} URL pública do arquivo
 */
async function uploadBase64ToS3(base64Data, fileName, contentType = 'image/jpeg') {
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
      ContentType: contentType,
      ContentEncoding: 'base64',
      ACL: 'public-read' // Tornar arquivo público
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

/**
 * Upload de múltiplos arquivos base64
 * @param {Array} base64Files - Array de objetos {data, name, type}
 * @returns {Promise<Array>} Array de URLs públicas
 */
async function uploadMultipleBase64ToS3(base64Files) {
  try {
    const uploadPromises = base64Files.map((file, index) => {
      const fileName = file.name || `image_${Date.now()}_${index}.jpg`;
      return uploadBase64ToS3(file.data, fileName, file.type);
    });
    
    const urls = await Promise.all(uploadPromises);
    return urls;
    
  } catch (error) {
    console.error('Erro no upload múltiplo S3:', error);
    throw error;
  }
}

module.exports = {
  uploadBase64ToS3,
  uploadMultipleBase64ToS3
};

