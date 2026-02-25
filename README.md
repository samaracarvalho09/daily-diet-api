 <h1 align="center">Daily Diet API</h1><br>


<p align="center"> API REST para controle de refeições com autenticação JWT. </p> 

<p align="center"> <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" /> <img src="https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white" /> <img src="https://img.shields.io/badge/PostgreSQL-Database-316192?style=for-the-badge&logo=postgresql&logoColor=white" /> <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge&logo=jsonwebtokens" /> </p>

## 📌 Sobre o Projeto

A Daily Diet API é uma API REST desenvolvida para controle de refeições, permitindo:

- Cadastro de usuários
- Autenticação via JWT
- Registro de refeições
- Controle de métricas nutricionais
- Proteção de rotas com autenticação

<br>

## 🚀 Como Executar o Projeto

1️⃣ Instalar dependências

Dependências principais

```js
npm install express prisma @prisma/client dotenv bcryptjs jsonwebtoken
```

Dependências de desenvolvimento

```js
npm install -D typescript ts-node-dev @types/express @types/node @types/bcryptjs @types/jsonwebtoken
```

2️⃣ Configurar TypeScript

```js
npx tsc --init
```

3️⃣ Rodar o servidor

```js
npm run dev
```

4️⃣ Visualizar banco de dados (Prisma Studio)

```js
npx prisma studio
```

<br>

## Estrutura do Projeto

```pgsql
src/
│
├── server.ts
├── app.ts
│
├── routes/
│   ├── user.routes.ts
│   ├── session.routes.ts
│   └── meal.routes.ts
│
├── controllers/
│   ├── user.controller.ts
│   ├── session.controller.ts
│   └── meal.controller.ts
│
├── services/
│   ├── user.service.ts
│   ├── session.service.ts
│   └── meal.service.ts
│
├── middlewares/
│   └── auth.middleware.ts
│
├── lib/
│   └── prisma.ts
│
└── utils/
prisma/
├── schema.prisma
└── migrations/
```
<br>

## Autenticação

A autenticação é feita via JWT.

Após login, envie o token no header:

`Authorization: Bearer <token>`


Todas as rotas de /meals exigem autenticação.

<br>

## Rotas da API

  ### Usuário
🔹 Registrar usuário

```js
POST http://localhost:3333/users

{
  "name": "Teste",
  "email": "teste@email.com",
  "password": "123456"
}
```

🔹 Login

```js
POST http://localhost:3333/sessions

{
  "email": "teste@email.com",
  "password": "123456"
}
```

### Refeições

🔹 Cadastrar refeição

```js
POST http://localhost:3333/meals

{
  "name": "Café da manhã",
  "description": "Omelete e suco",
  "date": "2026-02-17T08:00:00.000Z",
  "isOnDiet": true
}
```

🔹 Listar refeições
```js
GET http://localhost:3333/meals

Header:
Authorization: Bearer <token>
```

🔹 Visualizar refeição específica

```js
GET http://localhost:3333/meals/:id
```

🔹 Atualizar refeição

```js
PUT http://localhost:3333/meals/:id

{
  "name": "Sorvetinho",
  "description": "Sobremesa",
  "date": "2026-02-17T12:00:00.000Z",
  "isOnDiet": false
}
```

🔹 Deletar refeição
```js
DELETE http://localhost:3333/meals/:id
```

🔹 Recuperar métricas
```js
GET http://localhost:3333/meals/metrics

Resposta:

{
  "totalMeals": 0,
  "totalOnDiet": 0,
  "totalOffDiet": 0,
  "bestOnDietSequence": 0
}
```
<br>

## Regras de Segurança

- O usuário só pode visualizar, editar e deletar refeições que ele criou
- Todas as rotas de meals exigem autenticação
- O user_id nunca deve ser enviado no body
- O user_id deve ser extraído do token JWT

<br>

## Funcionalidades

- Cadastro de usuário
- Login com JWT
- CRUD completo de refeições
- Métricas de desempenho da dieta
- Proteção de rotas
 Separação em camadas (Controller, Service, Middleware)

<br>


## Testes Automatizados

<b>A aplicação possui testes automatizados utilizando:</br>

- Vitest – Framework de testes
- Supertest – Testes de requisições HTTP
- Prisma (SQLite) – Banco de dados isolado para testes

<b>Os testes validam:</b>

- Registro de usuário
- Login e geração de JWT
- Criação de refeição autenticada
- Listagem de refeições
- Busca de refeição específica
- Atualização de refeição

 ### Estrutura de Testes
  
  ```pgsql
test/
├── meal.test.ts
└── session.test.ts
```

### Banco de Dados de Teste

Foi criado um banco exclusivo para testes:

  ```pgsql
prisma/test.db
```

Esse banco é utilizado apenas durante a execução dos testes, garantindo:

- Isolamento do banco de desenvolvimento
- Segurança dos dados reais
- Testes independentes

### Configuração do Vitest

<b>Arquivo:</b>

  ```pgsql
vitest.config.ts
```
<b>Responsável por:</b>

- Configurar ambiente de testes
- Definir banco de dados de teste
- Gerenciar setup e teardown

### Como Executar os Testes

<b>Instalar dependências de teste:</b>

```js
npm install -D vitest supertest @types/supertest
```

<b>Rodar os testes:</b>

```js
npm run test
```


### Cobertura

Os testes garantem a validação do fluxo completo de autenticação e CRUD de refeições, assegurando:

- Integridade das regras de negócio
- Proteção de rotas via JWT
- Isolamento de usuários
- Persistência correta no banco de dados

