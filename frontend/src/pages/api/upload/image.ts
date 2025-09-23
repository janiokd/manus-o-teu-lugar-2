import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import AWS from 'aws-sdk';
import fs from 'fs';

// Configurar S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION || 'eu-west-1'
});

const BUCKET_NAME = process.env.S3_BUCKET_NAME || 'oteulugar1';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const form = formidable({
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    const [fields, files] = await form.parse(req);
    const file = Array.isArray(files.image) ? files.image[0] : files.image;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'Nenhuma imagem foi enviada'
      });
    }

    console.log('Upload de imagem recebido:', file.originalFilename);

    // Ler o arquivo
    const fileBuffer = fs.readFileSync(file.filepath);
    
    // Gerar nome único para o arquivo
    const fileName = `${Date.now()}-${file.originalFilename}`;
    
    // Parâmetros do upload
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: `properties/${fileName}`,
      Body: fileBuffer,
      ContentType: file.mimetype || 'image/jpeg',
    };

    console.log(`Fazendo upload: ${fileName}`);
    
    // Fazer upload
    const result = await s3.upload(uploadParams).promise();
    
    console.log(`Upload bem-sucedido: ${result.Location}`);
    
    // Limpar arquivo temporário
    fs.unlinkSync(file.filepath);
    
    res.json({
      success: true,
      image: result.Location,
      message: 'Upload realizado com sucesso'
    });
    
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({
      success: false,
      message: 'Erro no upload da imagem',
      error: error.message
    });
  }
}

