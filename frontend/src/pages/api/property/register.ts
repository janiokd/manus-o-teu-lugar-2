import { NextApiRequest, NextApiResponse } from 'next';

const BACKEND_URL = process.env.BACKEND_URL || 'https://manus-o-teu-lugar-2-36x6.vercel.app';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Proxy para backend - dados recebidos:', req.body);
    
    // Fazer proxy para o backend
    const response = await fetch(`${BACKEND_URL}/api/property/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Erro do backend:', data);
      return res.status(response.status).json(data);
    }

    console.log('Resposta do backend:', data);
    res.json(data);
    
  } catch (error) {
    console.error('Erro no proxy para backend:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor',
      error: error.message
    });
  }
}

