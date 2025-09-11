const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

// Configurar AWS usando apenas variáveis de ambiente
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'eu-west-1'
});

const s3 = new AWS.S3();

// Configurar multer para upload direto para S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME || 'oteulugar1',
    // acl: 'public-read', // Remover ACL - bucket não permite ACLs
    key: function (req, file, cb) {
      // Gerar nome único para o arquivo
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      const filename = `properties/${uniqueSuffix}${extension}`;
      cb(null, filename);
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limite
  },
  fileFilter: function (req, file, cb) {
    // Aceitar apenas imagens
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas arquivos de imagem são permitidos!'), false);
    }
  }
});

// Função para deletar arquivo do S3
const deleteFromS3 = async (fileUrl) => {
  try {
    // Extrair a chave do arquivo da URL
    const urlParts = fileUrl.split('/');
    const key = urlParts.slice(-2).join('/'); // properties/filename.jpg
    
    const params = {
      Bucket: process.env.S3_BUCKET_NAME || 'oteulugar1',
      Key: key
    };
    
    await s3.deleteObject(params).promise();
    console.log(`Arquivo deletado do S3: ${key}`);
    return true;
  } catch (error) {
    console.error('Erro ao deletar arquivo do S3:', error);
    return false;
  }
};

module.exports = {
  upload,
  deleteFromS3,
  s3
};

