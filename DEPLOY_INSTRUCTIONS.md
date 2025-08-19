# 🚀 Instruções de Deploy no Vercel

## 📋 **Pré-requisitos**
- Conta no Vercel (https://vercel.com)
- Repositório no GitHub: https://github.com/janiokd/manus_o_teu_lugar

## 🎯 **Deploy do Frontend**

### 1. **Conectar Repositório**
1. Acesse: https://vercel.com/new
2. Clique em "Import Git Repository"
3. Selecione: `janiokd/manus_o_teu_lugar`
4. **Root Directory**: `frontend`
5. **Framework Preset**: Next.js

### 2. **Configurar Variáveis de Ambiente**
Na seção "Environment Variables", adicione:

```
INSTAGRAM_ACCESS_TOKEN=YOUR_INSTAGRAM_TOKEN

CLIENT_SECRET=YOUR_CLIENT_SECRET

CLIENT_ID=YOUR_CLIENT_ID

AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY

AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY

AWS_REGION=eu-west-1

MONGODB_URI=YOUR_MONGODB_URI

NEXT_PUBLIC_PASSWORD=Admin@!

HOST_API=https://manus-o-teu-lugar-backend.vercel.app

MAPBOX_API=YOUR_MAPBOX_API_KEY
```

### 3. **Deploy**
- Clique em "Deploy"
- Aguarde o build completar

## 🎯 **Deploy do Backend**

### 1. **Novo Projeto**
1. Acesse: https://vercel.com/new
2. Selecione o mesmo repositório: `janiokd/manus_o_teu_lugar`
3. **Root Directory**: `backend`
4. **Framework Preset**: Other

### 2. **Configurar Variáveis de Ambiente**
```
PORT=3001

EXPIRES_IN=7d

SECRET_KEY=your_place_secret_key_2024

MONGODB_URI=YOUR_MONGODB_URI

AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY

AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY

AWS_REGION=eu-west-1
```

### 3. **Deploy**
- Clique em "Deploy"
- Anote a URL do backend (ex: https://manus-o-teu-lugar-backend.vercel.app)

## 🔄 **Atualizar Frontend**

Após o deploy do backend:
1. Vá para o projeto frontend no Vercel
2. Acesse "Settings" → "Environment Variables"
3. Atualize `HOST_API` com a URL real do backend
4. Faça um novo deploy

## ✅ **Verificação**

1. **Frontend**: Deve carregar a página inicial
2. **Backend**: Teste acessando `/property` na URL do backend
3. **Integração**: Teste a pesquisa de imóveis no frontend

## 🆘 **Problemas Comuns**

### Build Error no Frontend
- Verifique se todas as variáveis de ambiente estão configuradas
- Certifique-se que o Root Directory está como `frontend`

### Backend não responde
- Verifique se o `vercel.json` está correto
- Confirme se as variáveis de ambiente estão configuradas
- Teste a conexão com MongoDB

### CORS Error
- Verifique se o CORS está habilitado no backend
- Confirme se a URL do backend está correta no frontend

## 📞 **Suporte**

Se encontrar problemas, verifique:
1. Logs do Vercel (Functions tab)
2. Console do navegador (F12)
3. Variáveis de ambiente configuradas corretamente

