import { S3Client, PutObjectCommand, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { CustomFile } from 'src/components/upload';

const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
const region = process.env.AWS_REGION!;

// AWS S3 client setup
const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const fileToBase64 = async (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string); // Type assertion to string
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file); // Convert file to base64
  });

// Function to upload file to S3
export const uploadFileToS3 = async (file: CustomFile): Promise<string> => {
  try {
    // Convert the file to Base64
    const base64File = await fileToBase64(file);

    // Extract mimeType and base64Data from the file's Base64 string
    const matches = base64File.match(/^data:(.+);base64,(.+)$/);
    if (!matches) {
      throw new Error('Invalid file format. Make sure it is Base64 encoded.');
    }

    const mimeType = matches[1]; // MimeType (e.g., image/jpeg)
    const base64Data = matches[2]; // Base64 string data
    const buffer = Buffer.from(base64Data, 'base64');

    // Prepare S3 upload parameters
    const params = {
      Bucket: 'oteulugar1', // Your S3 bucket name
      Key: `users/${file.name}`, // Make sure fileName is passed correctly
      Body: buffer, // File buffer
      ContentType: mimeType, // MimeType of the file
      // ACL: "public-read", // Optional: set ACL to make the file public
    };

    // Upload file to S3
    const command = new PutObjectCommand(params);
    const data = await s3Client.send(command);

    const fileUrl = `https://oteulugar1.s3.${process.env.AWS_REGION}.amazonaws.com/users/${file.name}`;
    console.log('File uploaded successfully:', data);

    return fileUrl; // Return the S3 URL
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Function to delete multiple files from S3
export const batchDeleteFromS3 = async (fileKeys: string[]): Promise<any> => {
  const params = {
    Bucket: 'oteulugar1',
    Delete: {
      Objects: fileKeys.map((key) => ({ Key: key })),
      Quiet: false,
    },
  };

  try {
    const command = new DeleteObjectsCommand(params);
    const data = await s3Client.send(command);
    return data.Deleted;
  } catch (err) {
    console.error('Error deleting files: ', err);
    throw err;
  }
};
