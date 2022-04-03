Estrutura Basica Projeto Node + Typescript + Express

Comandos:

git clone git remote add origin https://github.com/Aguape21/estrutura-basica-node-express-typescript.git pasta

cd pasta

npm i

npm run start

npm run build


Prisma
- Iniciado banco de dados
npx prisma init --datasource-provider sqlite

-- Criar uma migração
npx prisma migrate dev --name 0000

-- Criar banco de dados conforme esquema Normalmente da ruim
npx prisma db push

-- Atualizar variáveis para autocomplete
npx prisma generate

