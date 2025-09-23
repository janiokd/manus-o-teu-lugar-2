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
      multiples: true,
    });

    const [fields, files] = await form.parse(req);
    const imageFiles = files.images;

    if (!imageFiles || (Array.isArray(imageFiles) && imageFiles.length === 0)) {
      return res.status(400).json({
        success: false,
        message: 'Nenhuma imagem foi enviada'
      });
    }

    console.log('Upload de múltiplas imagens recebido');

    const uploadedUrls: string[] = [];
    const filesToProcess = Array.isArray(imageFiles) ? imageFiles : [imageFiles];

    // Upload de cada arquivo
    for (const file of filesToProcess) {
      try {
        // Ler o arquivo
        const fileBuffer = fs.readFileSync(file.filepath);
        
        // Gerar nome único para o arquivo
        const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}-${file.originalFilename}`;
        
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
        uploadedUrls.push(result.Location);
        
        console.log(`Upload bem-sucedido: ${result.Location}`);
        
        // Limpar arquivo temporário
        fs.unlinkSync(file.filepath);
        
      } catch (fileError) {
        console.error(`Erro no upload do arquivo ${file.originalFilename}:`, fileError);
        // Continuar com os outros arquivos
      }
    }
    
    if (uploadedUrls.length === 0) {
      return res.status(500).json({
        success: false,
        message: 'Falha no upload de todas as imagens'
      });
    }
    
    res.json({
      success: true,
      images: uploadedUrls,
      message: `${uploadedUrls.length} imagem(ns) enviada(s) com sucesso`
    });
    
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({
      success: false,
      message: 'Erro no upload das imagens',
      error: error.message
    });
  }
}

