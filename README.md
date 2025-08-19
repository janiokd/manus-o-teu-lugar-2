# 🏠 Manus O Teu Lugar

Plataforma completa de imóveis desenvolvida com Next.js e Node.js.

## 🚀 Tecnologias

### Frontend
- **Next.js 13** - Framework React
- **TypeScript** - Tipagem estática
- **Material-UI** - Componentes de interface
- **Redux Toolkit** - Gerenciamento de estado
- **Axios** - Cliente HTTP

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados
- **Mongoose** - ODM para MongoDB
- **AWS S3** - Armazenamento de imagens

## 📋 Funcionalidades

- ✅ Listagem de imóveis com filtros avançados
- ✅ Pesquisa por localização, preço, características
- ✅ Upload e exibição de imagens
- ✅ Interface responsiva e moderna
- ✅ Integração com Google Maps
- ✅ Sistema de autenticação

## 🛠️ Instalação e Execução

### Backend
```bash
cd backend
npm install
npm start
# Servidor rodando na porta 3001
```

### Frontend
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
# Aplicação rodando na porta 4001
```

## 🌐 Deploy

### Produção
- **Frontend**: Vercel
- **Backend**: Vercel Functions
- **Banco**: MongoDB Atlas
- **Imagens**: AWS S3

## 📝 Variáveis de Ambiente

### Backend (.env)
```
PORT=3001
MONGODB_URI=mongodb+srv://...
SECRET_KEY=your_secret_key
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=eu-west-1
```

### Frontend (.env)
```
HOST_API=https://your-backend-url
NEXT_PUBLIC_PASSWORD=Admin@!
```

## 👥 Desenvolvido por

- **Manus AI** - Desenvolvimento e correções
- **Cliente** - Conceito e requisitos

## 📄 Licença

Este projeto está sob a licença MIT.

